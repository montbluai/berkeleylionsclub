type CalendarEventRecord = Record<string, unknown>;

interface Env {
  GHL_PRIVATE_INTEGRATION_TOKEN?: string;
  GHL_CALENDAR_ID?: string;
  GHL_LOCATION_ID?: string;
  GHL_CALENDAR_EVENTS_URL?: string;
  GHL_API_VERSION?: string;
  EVENT_TIME_ZONE?: string;
  BLC_VOLUNTEER_URL?: string;
}

interface ParsedCalendarEvent {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  flyerImageUrl: string | null;
  flyerDownloadUrl: string | null;
  ticketPrice: string | null;
  ticketUrl: string | null;
  sponsorTablePrice: string | null;
  sponsorTableSeats: string | null;
  sponsorTableUrl: string | null;
}

interface PublicCalendarEvent extends ParsedCalendarEvent {
  volunteerUrl: string;
}

const BERKELEY_CALENDAR_ID = 'fVdt3UmX89lyOrk7iIsq';
const BERKELEY_LOCATION_ID = 'JNAfwzMJ5Pla2DIM97SO';
const DEFAULT_TIME_ZONE = 'America/Los_Angeles';

const jsonHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'public, max-age=300',
};

const respond = (body: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      ...jsonHeaders,
      ...(init.headers ?? {}),
    },
  });

const getDatePartsInTimeZone = (date: Date, timeZone: string) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  return {
    year: Number(parts.find((part) => part.type === 'year')?.value),
    month: Number(parts.find((part) => part.type === 'month')?.value),
    day: Number(parts.find((part) => part.type === 'day')?.value),
  };
};

const getTodayMidnightInTimeZone = (timeZone: string) => {
  const { year, month, day } = getDatePartsInTimeZone(new Date(), timeZone);
  const utcGuess = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  const offsetMinutes = getTimeZoneOffsetMinutes(utcGuess, timeZone);
  return new Date(utcGuess.getTime() - offsetMinutes * 60 * 1000);
};

const getTimeZoneOffsetMinutes = (date: Date, timeZone: string) => {
  const timeZoneName = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'shortOffset',
  })
    .formatToParts(date)
    .find((part) => part.type === 'timeZoneName')?.value;

  const match = timeZoneName?.match(/^GMT([+-])(\d{1,2})(?::(\d{2}))?$/);
  if (!match) return 0;

  const direction = match[1] === '-' ? -1 : 1;
  const hours = Number(match[2]);
  const minutes = Number(match[3] ?? 0);
  return direction * (hours * 60 + minutes);
};

const asString = (value: unknown): string => {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) return asString(value[0]);

  if (value && typeof value === 'object') {
    const objectValue = value as Record<string, unknown>;
    return asString(
      objectValue.url ??
        objectValue.fileUrl ??
        objectValue.file_url ??
        objectValue.value ??
        objectValue.name ??
        objectValue.label
    );
  }

  return '';
};

const nullIfBlank = (value: string) => (value.trim() ? value.trim() : null);

const parseDescription = (rawDescription: string) => {
  const lines = rawDescription.replace(/\r\n/g, '\n').split('\n');
  const separatorIndex = lines.findIndex((line) => line.trim() === '---');
  const displayDescription =
    separatorIndex === -1 ? rawDescription.trim() : lines.slice(0, separatorIndex).join('\n').trim();
  const metadataLines = separatorIndex === -1 ? [] : lines.slice(separatorIndex + 1);
  const metadata = new Map<string, string | null>();

  metadataLines.forEach((line) => {
    const match = line.match(/^([A-Z0-9_]+):\s*(.*)$/);
    if (!match) return;
    metadata.set(match[1], nullIfBlank(match[2] ?? ''));
  });

  return {
    displayDescription,
    metadata,
  };
};

const getRecords = (payload: unknown): CalendarEventRecord[] => {
  if (!payload || typeof payload !== 'object') return [];

  const body = payload as Record<string, unknown>;
  const nestedData = body.data && typeof body.data === 'object' ? (body.data as Record<string, unknown>) : {};
  const candidates = [
    body.events,
    body.appointments,
    body.calendarEvents,
    body.calendar_events,
    body.items,
    body.data,
    nestedData.events,
    nestedData.appointments,
    nestedData.items,
  ];
  const records = candidates.find(Array.isArray);

  return Array.isArray(records) ? (records as CalendarEventRecord[]) : [];
};

const readLocation = (record: CalendarEventRecord) =>
  asString(record.location) ||
  asString(record.address) ||
  asString(record.calendarLocation) ||
  asString(record.meetingLocation) ||
  asString(record.appointmentLocation);

const normalizeEvent = (record: CalendarEventRecord): ParsedCalendarEvent | null => {
  const title = asString(record.title) || asString(record.name) || asString(record.eventTitle);
  const rawDescription = asString(record.description) || asString(record.notes) || asString(record.body);
  const startTime = asString(record.startTime) || asString(record.start_time) || asString(record.startDate);
  const endTime = asString(record.endTime) || asString(record.end_time) || asString(record.endDate) || startTime;
  const location = readLocation(record);

  if (!title || !startTime || !endTime) return null;

  const { displayDescription, metadata } = parseDescription(rawDescription);

  return {
    title,
    description: displayDescription,
    startTime,
    endTime,
    location,
    flyerImageUrl: metadata.get('FLYER_IMAGE') ?? null,
    flyerDownloadUrl: metadata.get('FLYER_DOWNLOAD') ?? metadata.get('FLYER_IMAGE') ?? null,
    ticketPrice: metadata.get('TICKET_PRICE') ?? null,
    ticketUrl: metadata.get('TICKET_URL') ?? null,
    sponsorTablePrice: metadata.get('SPONSOR_TABLE_PRICE') ?? null,
    sponsorTableSeats: metadata.get('SPONSOR_TABLE_SEATS') ?? null,
    sponsorTableUrl: metadata.get('SPONSOR_TABLE_URL') ?? null,
  };
};

const buildCalendarUrls = (env: Env) => {
  if (env.GHL_CALENDAR_EVENTS_URL) return [env.GHL_CALENDAR_EVENTS_URL];

  const calendarId = env.GHL_CALENDAR_ID || BERKELEY_CALENDAR_ID;
  const locationId = env.GHL_LOCATION_ID || BERKELEY_LOCATION_ID;
  const startTime = String(Date.now() - 24 * 60 * 60 * 1000);
  const endTime = String(Date.now() + 370 * 24 * 60 * 60 * 1000);
  const paths = ['calendars/events', 'calendars/events/appointments'];

  return paths.map((path) => {
    const url = new URL(`https://services.leadconnectorhq.com/${path}`);
    url.searchParams.set('calendarId', calendarId);
    url.searchParams.set('startTime', startTime);
    url.searchParams.set('endTime', endTime);
    url.searchParams.set('locationId', locationId);
    return url.toString();
  });
};

const fetchCalendarPayload = async (env: Env) => {
  let lastStatus = 0;

  for (const url of buildCalendarUrls(env)) {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${env.GHL_PRIVATE_INTEGRATION_TOKEN}`,
        Version: env.GHL_API_VERSION || '2021-07-28',
      },
    });

    lastStatus = response.status;
    if (response.ok) return response.json();
  }

  throw new Error(`GHL calendar request failed with ${lastStatus}`);
};

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function onRequestGet(context: { env: Env; request: Request }) {
  const { env, request } = context;

  if (!env.GHL_PRIVATE_INTEGRATION_TOKEN) {
    return respond({ error: 'GHL calendar source is not configured.', event: null }, { status: 503 });
  }

  try {
    const payload = await fetchCalendarPayload(env);
    const timeZone = env.EVENT_TIME_ZONE || DEFAULT_TIME_ZONE;
    const todayMidnight = getTodayMidnightInTimeZone(timeZone);
    const volunteerUrl = env.BLC_VOLUNTEER_URL || new URL('/#volunteer', request.url).toString();

    const events: PublicCalendarEvent[] =
      getRecords(payload)
        .map(normalizeEvent)
        .filter((item): item is ParsedCalendarEvent => {
          if (!item) return false;
          const endTime = new Date(item.endTime);
          return !Number.isNaN(endTime.getTime()) && endTime >= todayMidnight;
        })
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
        .map((event) => ({
          ...event,
          volunteerUrl,
        }));

    if (new URL(request.url).searchParams.get('all') === 'true') {
      return respond({ events });
    }

    const event = events[0] ?? null;

    if (!event) {
      return respond({ event: null });
    }

    return respond({ event });
  } catch (error) {
    console.error(error);
    return respond({ error: 'Unable to load upcoming events from GHL.', event: null }, { status: 502 });
  }
}

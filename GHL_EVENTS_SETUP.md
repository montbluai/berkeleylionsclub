# GHL Calendar Featured Event Setup

The homepage featured event now comes from the GHL calendar named `Berkeley Lions Events`.

The site uses:

1. GHL Calendar events for content management.
2. A Cloudflare Pages Function at `/api/upcoming-event` as the secure backend proxy.
3. The native React card in `src/components/UpcomingEventCard.tsx`.

No GHL API key is exposed in browser code.

## GHL Calendar

Calendar ID:

```text
fVdt3UmX89lyOrk7iIsq
```

Calendar name:

```text
Berkeley Lions Events
```

Club members should add/edit events in GHL under Calendars -> Berkeley Lions Events.

## Event Description Template

Put the public description first. Then add `---` and the optional metadata fields.

```text
Short event description, usually 1-2 sentences.

---
FLYER_IMAGE: https://...
FLYER_DOWNLOAD: https://...
TICKET_PRICE: $75
TICKET_URL: https://...
SPONSOR_TABLE_PRICE: $500
SPONSOR_TABLE_SEATS: 10
SPONSOR_TABLE_URL: https://...
```

Rules:

- Everything above `---` appears as the event description.
- Each metadata row is `KEY: value`.
- Missing or blank metadata values are treated as empty.
- `FLYER_IMAGE` should be a public image URL from GHL Media Library or another public file host.
- `FLYER_DOWNLOAD` is optional. If missing, the widget uses `FLYER_IMAGE` for the flyer button.
- `TICKET_PRICE: Free` shows a Free Event badge.
- A paid `TICKET_PRICE` with `TICKET_URL` shows a Get Tickets button.
- Sponsor table details only show when both `SPONSOR_TABLE_PRICE` and `SPONSOR_TABLE_URL` exist.

## Cloudflare Environment Variables

In Cloudflare Pages, go to Settings -> Environment variables and add:

```text
GHL_PRIVATE_INTEGRATION_TOKEN
GHL_CALENDAR_ID=fVdt3UmX89lyOrk7iIsq
GHL_LOCATION_ID=JNAfwzMJ5Pla2DIM97SO
EVENT_TIME_ZONE=America/Los_Angeles
```

Optional:

```text
GHL_API_VERSION=2021-07-28
BLC_VOLUNTEER_URL=https://www.berkeleylionsclub.com/#volunteer
GHL_CALENDAR_EVENTS_URL
```

Use `GHL_CALENDAR_EVENTS_URL` only if the default HighLevel calendar endpoint needs to be overridden after live testing with the private integration key.

## Volunteer Anchor

The SPA now treats this as a direct Volunteer page URL:

```text
https://www.berkeleylionsclub.com/#volunteer
```

If the production domain is `.org`, the same anchor works there:

```text
https://www.berkeleylionsclub.org/#volunteer
```

## How The Event Rolls Over

The Cloudflare Function filters events by `endTime >= today at midnight` in `America/Los_Angeles`, then sorts by start time and returns the first event.

That means an event remains visible through its event date. The next day, the homepage automatically shows the next upcoming calendar event.

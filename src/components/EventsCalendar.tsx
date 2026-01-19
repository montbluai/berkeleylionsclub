import { useState } from 'react';
import { Calendar as CalendarIcon, Check } from 'lucide-react';

interface EventsCalendarProps {
  calendars: {
    id: string;
    name: string;
    color: string;
  }[];
  title?: string;
  description?: string;
  showToggle?: boolean;
  viewMode?: 'AGENDA' | 'WEEK' | 'MONTH';
}

export function EventsCalendar({ calendars, title, description, showToggle = true, viewMode = 'AGENDA' }: EventsCalendarProps) {
  const [visibleCalendars, setVisibleCalendars] = useState<string[]>(
    calendars.map(c => c.id)
  );

  const toggleCalendar = (id: string) => {
    setVisibleCalendars(prev =>
      prev.includes(id)
        ? prev.filter(calId => calId !== id)
        : [...prev, id]
    );
  };

  // Build the Google Calendar embed URL
  const buildCalendarUrl = () => {
    const baseUrl = 'https://calendar.google.com/calendar/embed';
    const visibleCals = calendars.filter(cal => visibleCalendars.includes(cal.id));
    
    if (visibleCals.length === 0) return null;

    // Properly encode calendar IDs and colors
    const srcParams = visibleCals.map(cal => `src=${encodeURIComponent(cal.id)}`).join('&');
    const colorParams = visibleCals.map(cal => {
      const encodedColor = cal.color.replace('#', '%23');
      return `color=${encodedColor}`;
    }).join('&');
    
    // Using dynamic view mode with proper settings to show all events
    return `${baseUrl}?${srcParams}&${colorParams}&ctz=America%2FLos_Angeles&showTitle=0&showNav=1&showPrint=0&showCalendars=0&showTz=0&mode=${viewMode}`;
  };

  const calendarUrl = buildCalendarUrl();

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#00338D' }} aria-hidden="true">
              <CalendarIcon className="text-white" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl mb-4" style={{ color: '#00338D' }}>
              {title || 'Upcoming Events'}
            </h2>
            {description && (
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>

          {/* Calendar Toggles */}
          {showToggle && calendars.length > 1 && (
            <div className="flex flex-wrap gap-3 justify-center mb-6" role="group" aria-label="Event type filters">
              {calendars.map(calendar => (
                <button
                  key={calendar.id}
                  onClick={() => toggleCalendar(calendar.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    visibleCalendars.includes(calendar.id)
                      ? 'shadow-md'
                      : 'opacity-60 hover:opacity-80'
                  }`}
                  style={{
                    backgroundColor: visibleCalendars.includes(calendar.id) ? calendar.color : '#e5e7eb',
                    color: visibleCalendars.includes(calendar.id) ? '#ffffff' : '#4b5563',
                    outlineColor: calendar.color
                  }}
                  aria-pressed={visibleCalendars.includes(calendar.id)}
                  aria-label={`${visibleCalendars.includes(calendar.id) ? 'Hide' : 'Show'} ${calendar.name.replace(/[^\w\s]/gi, '')}`}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    visibleCalendars.includes(calendar.id) ? 'border-white' : 'border-gray-400'
                  }`}
                  aria-hidden="true"
                  >
                    {visibleCalendars.includes(calendar.id) && (
                      <Check size={14} className="text-white" />
                    )}
                  </div>
                  <span>{calendar.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Calendar Embed */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {calendarUrl ? (
              <iframe
                src={calendarUrl}
                className="w-full h-[600px] border-0"
                title="Berkeley Lions Club Events Calendar"
                tabIndex={0}
                aria-label="Interactive calendar showing Berkeley Lions Club events. Use tab key to navigate through calendar controls."
              />
            ) : (
              <div className="h-[600px] flex items-center justify-center text-gray-500">
                <p>Select at least one calendar to view events</p>
              </div>
            )}
          </div>

          {/* Calendar Legend */}
          {showToggle && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Click the buttons above to show/hide different event types
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
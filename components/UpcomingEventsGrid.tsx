import { CalendarDays, ExternalLink, HandHeart, ImageIcon, MapPin, Ticket, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface UpcomingEvent {
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
  volunteerUrl: string;
}

const TIME_ZONE = 'America/Los_Angeles';

const formatDateLabel = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const formatTimeLabel = (dateString: string) =>
  new Date(dateString).toLocaleTimeString('en-US', {
    timeZone: TIME_ZONE,
    hour: 'numeric',
    minute: '2-digit',
  });

const isFreeEvent = (ticketPrice: string | null) => ticketPrice?.trim().toLowerCase() === 'free';

interface UpcomingEventsGridProps {
  onNavigate?: (page: string) => void;
}

export function UpcomingEventsGrid({ onNavigate }: UpcomingEventsGridProps) {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      try {
        const response = await fetch('/api/upcoming-event?all=true', {
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Upcoming events request failed with ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) setEvents(Array.isArray(payload.events) ? payload.events : []);
      } catch (error) {
        console.error('Error loading upcoming events:', error);
        if (isMounted) setEvents([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedEvent(null);
        setIsTicketModalOpen(false);
      }
    };

    if (selectedEvent || isTicketModalOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [selectedEvent, isTicketModalOpen]);

  const navigateToVolunteer = () => {
    if (onNavigate) {
      onNavigate('volunteer');
    } else {
      window.location.hash = 'volunteer';
    }
  };

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl mb-4" style={{ color: '#1740a5' }}>
          Upcoming <span style={{ color: '#f2ca47' }}>Events</span>
        </h2>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-lg" style={{ color: '#1740a5' }}>
            Loading upcoming events...
          </p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-lg text-gray-700">Upcoming event flyers will appear here soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {events.map((event) => (
            <button
              key={`${event.title}-${event.startTime}`}
              onClick={() => setSelectedEvent(event)}
              className="group text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 rounded-lg"
              style={{ outlineColor: '#1740a5' }}
            >
              <div className="aspect-[4/5] rounded-lg overflow-hidden bg-white shadow-md transition-all group-hover:shadow-xl">
                {event.flyerImageUrl ? (
                  <img src={event.flyerImageUrl} alt={`${event.title} flyer`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center px-4"
                    style={{ color: '#1740a5', backgroundColor: '#F5F0E8' }}
                  >
                    <ImageIcon size={36} aria-hidden="true" />
                    <span className="mt-3 text-sm">Flyer coming soon</span>
                  </div>
                )}
              </div>
              <span className="block mt-3 text-base leading-snug group-hover:underline" style={{ color: '#1740a5' }}>
                {event.title}
              </span>
            </button>
          ))}
        </div>
      )}

      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50"
          onClick={() => {
            setSelectedEvent(null);
            setIsTicketModalOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-details-title"
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-auto p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setSelectedEvent(null);
                setIsTicketModalOpen(false);
              }}
              className="sticky top-0 ml-auto mb-2 flex bg-white/90 hover:bg-gray-100 p-2 rounded-full"
              aria-label="Close event details"
            >
              <X size={28} />
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-2/5 flex-shrink-0">
                {selectedEvent.flyerImageUrl ? (
                  <img
                    src={selectedEvent.flyerImageUrl}
                    alt={`${selectedEvent.title} flyer`}
                    referrerPolicy="no-referrer"
                    className="w-full rounded-2xl shadow-md"
                  />
                ) : (
                  <div
                    className="aspect-[4/5] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center px-6 text-center"
                    style={{ borderColor: '#D8C98F', color: '#1B2B5C', backgroundColor: '#FAF7EE' }}
                  >
                    <ImageIcon size={44} aria-hidden="true" />
                    <p className="mt-4 text-lg">Flyer coming soon</p>
                  </div>
                )}
              </div>

              <div className="flex-1 text-left" style={{ color: '#1B2B5C' }}>
                <h3 id="event-details-title" className="text-2xl md:text-3xl mb-4">
                  {selectedEvent.title}
                </h3>
                {selectedEvent.description && <p className="text-lg mb-5 leading-relaxed">{selectedEvent.description}</p>}

                <div className="space-y-4 mb-6">
                  <p className="flex items-start gap-3">
                    <CalendarDays className="mt-1 flex-shrink-0" size={22} aria-hidden="true" />
                    <span>
                      <strong>{formatDateLabel(selectedEvent.startTime)}</strong>
                      <br />
                      {formatTimeLabel(selectedEvent.startTime)} - {formatTimeLabel(selectedEvent.endTime)}
                    </span>
                  </p>
                  {selectedEvent.location && (
                    <p className="flex items-start gap-3">
                      <MapPin className="mt-1 flex-shrink-0" size={22} aria-hidden="true" />
                      <span>{selectedEvent.location}</span>
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center">
                  {selectedEvent.flyerDownloadUrl && (
                    <a
                      href={selectedEvent.flyerDownloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 min-w-[150px] items-center justify-center gap-2 rounded-md px-6 text-base font-medium transition-opacity hover:opacity-90"
                      style={{ backgroundColor: '#F5C518', color: '#1B2B5C' }}
                    >
                      <ExternalLink size={18} aria-hidden="true" />
                      View Flyer
                    </a>
                  )}

                  {isFreeEvent(selectedEvent.ticketPrice) ? (
                    <span
                      className="inline-flex h-12 min-w-[150px] items-center justify-center rounded-md px-6 text-base font-medium"
                      style={{ backgroundColor: '#E7F5EA', color: '#1F6B3A' }}
                    >
                      Free Event
                    </span>
                  ) : selectedEvent.ticketPrice ? (
                    <Button
                      onClick={() => setIsTicketModalOpen(true)}
                      disabled={!selectedEvent.ticketUrl}
                      className="inline-flex h-12 min-w-[150px] items-center justify-center gap-2 px-6 text-base disabled:cursor-not-allowed disabled:opacity-60"
                      style={{ backgroundColor: selectedEvent.ticketUrl ? '#F5C518' : '#D1D5DB', color: '#1B2B5C' }}
                    >
                      <Ticket size={18} aria-hidden="true" />
                      Get Tickets
                    </Button>
                  ) : null}

                  <Button
                    onClick={navigateToVolunteer}
                    className="inline-flex h-12 min-w-[150px] items-center justify-center gap-2 rounded-md px-6 text-base transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#1B2B5C', color: '#FFFFFF' }}
                  >
                    <HandHeart size={18} aria-hidden="true" />
                    Volunteer
                  </Button>
                </div>
              </div>
            </div>

            {isTicketModalOpen && selectedEvent.ticketUrl && (
              <div className="mt-8 rounded-xl border p-5" style={{ borderColor: '#E5E7EB', color: '#1B2B5C' }}>
                <p className="text-lg mb-3">
                  <strong>{selectedEvent.ticketPrice}</strong> per person
                </p>
                <a
                  href={selectedEvent.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#F5C518', color: '#1B2B5C' }}
                >
                  Buy Tickets
                  <ExternalLink size={18} aria-hidden="true" />
                </a>

                {selectedEvent.sponsorTablePrice && selectedEvent.sponsorTableUrl && (
                  <div className="border-t mt-5 pt-5">
                    <p className="text-lg mb-1">
                      <strong>Sponsor a Table</strong> - {selectedEvent.sponsorTablePrice} per table
                    </p>
                    {selectedEvent.sponsorTableSeats && <p className="mb-3">Seats {selectedEvent.sponsorTableSeats} people</p>}
                    <a
                      href={selectedEvent.sponsorTableUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 transition-opacity hover:opacity-90"
                      style={{ backgroundColor: '#1B2B5C', color: '#FFFFFF' }}
                    >
                      Sponsor a Table
                      <ExternalLink size={18} aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

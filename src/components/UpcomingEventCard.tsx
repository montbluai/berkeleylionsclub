import { CalendarDays, ExternalLink, HandHeart, ImageIcon, MapPin, Ticket, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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

interface UpcomingEventCardProps {
  onNavigate?: (page: string) => void;
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

export function UpcomingEventCard({ onNavigate }: UpcomingEventCardProps) {
  const [event, setEvent] = useState<UpcomingEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFlyerModalOpen, setIsFlyerModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const flyerTriggerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let isMounted = true;

    const loadUpcomingEvent = async () => {
      try {
        const response = await fetch('/api/upcoming-event', {
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Upcoming event request failed with ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) setEvent(payload.event ?? null);
      } catch (error) {
        console.error('Error loading upcoming event:', error);
        if (isMounted) setEvent(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadUpcomingEvent();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFlyerModalOpen(false);
        setIsTicketModalOpen(false);
        flyerTriggerRef.current?.focus();
      }
    };

    if (isFlyerModalOpen || isTicketModalOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isFlyerModalOpen, isTicketModalOpen]);

  if (!isLoading && !event) {
    return null;
  }

  return (
    <section className="py-16" style={{ backgroundColor: '#F5F0E8' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-6">
            <span style={{ color: '#F5C518' }}>Featured</span> <span style={{ color: '#1B2B5C' }}>Event</span>
          </h2>

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6" aria-live="polite">
            {isLoading ? (
              <div className="py-12">
                <p className="text-lg" style={{ color: '#1B2B5C' }}>
                  Loading upcoming event...
                </p>
              </div>
            ) : event ? (
              <>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-2/5 flex-shrink-0">
                    {event.flyerImageUrl ? (
                      <img
                        src={event.flyerImageUrl}
                        alt={`${event.title} flyer`}
                        referrerPolicy="no-referrer"
                        className="w-full rounded-2xl shadow-md cursor-pointer hover:shadow-xl transition-shadow"
                        onClick={() => setIsFlyerModalOpen(true)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setIsFlyerModalOpen(true);
                          }
                        }}
                        ref={flyerTriggerRef}
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
                    <h3 className="text-2xl md:text-3xl mb-4">{event.title}</h3>
                    {event.description && <p className="text-lg mb-5 leading-relaxed">{event.description}</p>}

                    <div className="space-y-4 mb-6">
                      <p className="flex items-start gap-3">
                        <CalendarDays className="mt-1 flex-shrink-0" size={22} aria-hidden="true" />
                        <span>
                          <strong>{formatDateLabel(event.startTime)}</strong>
                          <br />
                          {formatTimeLabel(event.startTime)} - {formatTimeLabel(event.endTime)}
                        </span>
                      </p>
                      {event.location && (
                        <p className="flex items-start gap-3">
                          <MapPin className="mt-1 flex-shrink-0" size={22} aria-hidden="true" />
                          <span>{event.location}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center">
                      {event.flyerDownloadUrl && (
                        <a
                          href={event.flyerDownloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-12 min-w-[150px] items-center justify-center gap-2 rounded-md px-6 text-base font-medium transition-opacity hover:opacity-90"
                          style={{ backgroundColor: '#F5C518', color: '#1B2B5C' }}
                        >
                          <ExternalLink size={18} aria-hidden="true" />
                          View Flyer
                        </a>
                      )}

                      {isFreeEvent(event.ticketPrice) ? (
                        <span
                          className="inline-flex h-12 min-w-[150px] items-center justify-center rounded-md px-6 text-base font-medium"
                          style={{ backgroundColor: '#E7F5EA', color: '#1F6B3A' }}
                        >
                          Free Event
                        </span>
                      ) : event.ticketPrice ? (
                        <Button
                          onClick={() => setIsTicketModalOpen(true)}
                          disabled={!event.ticketUrl}
                          className="inline-flex h-12 min-w-[150px] items-center justify-center gap-2 px-6 text-base disabled:cursor-not-allowed disabled:opacity-60"
                          style={{ backgroundColor: event.ticketUrl ? '#F5C518' : '#D1D5DB', color: '#1B2B5C' }}
                        >
                          <Ticket size={18} aria-hidden="true" />
                          Get Tickets
                        </Button>
                      ) : null}

                      <Button
                        onClick={() => {
                          if (onNavigate) {
                            onNavigate('volunteer');
                          } else {
                            window.location.hash = 'volunteer';
                          }
                        }}
                        className="inline-flex h-12 min-w-[150px] items-center justify-center gap-2 rounded-md px-6 text-base transition-opacity hover:opacity-90"
                        style={{ backgroundColor: '#1B2B5C', color: '#FFFFFF' }}
                      >
                        <HandHeart size={18} aria-hidden="true" />
                        Volunteer
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {isFlyerModalOpen && event?.flyerImageUrl && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
          onClick={() => setIsFlyerModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="flyer-modal-title"
        >
          <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsFlyerModalOpen(false)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors z-10"
              aria-label="Close flyer"
            >
              <X size={32} />
            </button>

            <div className="w-full h-full overflow-auto flex items-start justify-center p-4">
              <img
                src={event.flyerImageUrl}
                alt={`${event.title} flyer`}
                referrerPolicy="no-referrer"
                className="w-full max-w-full h-auto"
                id="flyer-modal-title"
              />
            </div>
          </div>
        </div>
      )}

      {isTicketModalOpen && event && event.ticketUrl && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          onClick={() => setIsTicketModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ticket-modal-title"
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 md:p-8"
            style={{ color: '#1B2B5C' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <h3 id="ticket-modal-title" className="text-2xl">
                Get Tickets
              </h3>
              <button onClick={() => setIsTicketModalOpen(false)} aria-label="Close ticket options" className="p-2 rounded-full hover:bg-gray-100">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-lg mb-3">
                  <strong>{event.ticketPrice}</strong> per person
                </p>
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#F5C518', color: '#1B2B5C' }}
                >
                  Buy Tickets
                  <ExternalLink size={18} aria-hidden="true" />
                </a>
              </div>

              {event.sponsorTablePrice && event.sponsorTableUrl && (
                <div className="border-t pt-5">
                  <p className="text-lg mb-1">
                    <strong>Sponsor a Table</strong> - {event.sponsorTablePrice} per table
                  </p>
                  {event.sponsorTableSeats && <p className="mb-3">Seats {event.sponsorTableSeats} people</p>}
                  <a
                    href={event.sponsorTableUrl}
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
          </div>
        </div>
      )}
    </section>
  );
}

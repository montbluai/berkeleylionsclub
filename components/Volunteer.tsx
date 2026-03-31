import { Calendar, MapPin, Users } from 'lucide-react';
import { EventsCalendar } from './EventsCalendar';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FeaturedEvent {
  posterUrl: string;
  eventName: string;
  description: string;
  date: string;
  time: string;
  locationName: string;
  address: string;
  volunteersNeeded: string;
  ageRequirement: string;
  volunteerTasks: string[];
  isFree: boolean;
  ticketPrice?: string;
  squarePaymentLink?: string;
  togoAvailable: boolean;
  additionalInfo?: string;
}

export function Volunteer() {
  const [featuredEvent, setFeaturedEvent] = useState<FeaturedEvent | null>(null);

  useEffect(() => {
    const loadFeaturedEvent = () => {
      try {
        const stored = localStorage.getItem('featured_event_queue');
        if (stored) {
          const eventQueue = JSON.parse(stored);
          
          // Find the next upcoming event
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          const upcomingEvent = eventQueue.find((event: any) => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate >= today;
          });
          
          if (upcomingEvent) {
            setFeaturedEvent(upcomingEvent);
          } else {
            setFeaturedEvent(null);
          }
        } else {
          setFeaturedEvent(null);
        }
      } catch (error) {
        console.error('Error loading featured event:', error);
        setFeaturedEvent(null);
      }
    };

    loadFeaturedEvent();
  }, []);

  const getEventBadge = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `Featured Event - ${month} ${year}`;
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const scrollToCalendar = () => {
    const calendarSection = document.getElementById('volunteer-calendar');
    if (calendarSection) {
      calendarSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4" style={{ color: '#1740a5' }}>
            Volunteer <span style={{ color: '#f2ca47' }}>Opportunities</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Make a difference in Berkeley! Join us for upcoming events—members and community supporters welcome.
          </p>
        </div>

        {/* Featured Event Card */}
        {featuredEvent && (
          <div className="max-w-lg mx-auto mb-16">
            <div 
              className="rounded-2xl shadow-2xl overflow-hidden"
              style={{ backgroundColor: '#2563EB' }}
            >
              {/* Event Poster */}
              <div className="p-6 pb-4">
                <ImageWithFallback
                  src={featuredEvent.posterUrl}
                  alt={`${featuredEvent.eventName} poster`}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>

              {/* Event Badge - Yellow Pill */}
              <div className="px-6 pb-6 text-center">
                <span 
                  className="inline-block px-6 py-2 rounded-full text-sm font-bold"
                  style={{ backgroundColor: '#EBB700', color: '#1E40AF' }}
                >
                  {getEventBadge(featuredEvent.date)}
                </span>
              </div>

              {/* Event Title */}
              <div className="px-8 pb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white text-center leading-tight">
                  {featuredEvent.eventName}
                </h2>
              </div>

              {/* Event Description */}
              <div className="px-8 pb-8">
                <p className="text-white text-center text-base leading-relaxed">
                  {featuredEvent.description}
                </p>
              </div>

              {/* Event Details Grid - No Panel Background */}
              <div className="px-8 pb-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* When */}
                  <div className="flex items-start gap-3">
                    <Calendar className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#EBB700' }} />
                    <div>
                      <div className="text-sm font-bold mb-1" style={{ color: '#EBB700' }}>
                        When
                      </div>
                      <div className="text-white text-sm font-medium">
                        {formatEventDate(featuredEvent.date)}
                      </div>
                      <div className="text-white text-sm mt-0.5">
                        {featuredEvent.time}
                      </div>
                    </div>
                  </div>

                  {/* Where */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#EBB700' }} />
                    <div>
                      <div className="text-sm font-bold mb-1" style={{ color: '#EBB700' }}>
                        Where
                      </div>
                      <div className="text-white text-sm font-medium">
                        {featuredEvent.locationName}
                      </div>
                      <div className="text-white text-sm mt-0.5">
                        {featuredEvent.address}
                      </div>
                    </div>
                  </div>

                  {/* Volunteers Needed */}
                  <div className="flex items-start gap-3">
                    <Users className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#EBB700' }} />
                    <div>
                      <div className="text-sm font-bold mb-1" style={{ color: '#EBB700' }}>
                        Volunteers Needed
                      </div>
                      <div className="text-white text-sm font-medium">
                        {featuredEvent.volunteersNeeded}
                      </div>
                      <div className="text-white text-sm mt-0.5">
                        {featuredEvent.ageRequirement}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What You'll Do Section - Darker Blue Panel */}
              {featuredEvent.volunteerTasks.length > 0 && (
                <div className="mx-8 mb-8 rounded-xl p-6" style={{ backgroundColor: 'rgba(30, 64, 175, 0.6)' }}>
                  <h3 
                    className="text-lg font-bold mb-4"
                    style={{ color: '#EBB700' }}
                  >
                    What You'll Do:
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    {featuredEvent.volunteerTasks.map((task, index) => (
                      <li key={index} className="text-white text-sm flex items-start mb-2">
                        <span className="mr-2">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ticket Information - No Panel Background */}
              <div className="px-8 pb-2 text-center">
                <div className="text-sm mb-0 text-white">
                  {featuredEvent.isFree ? (
                    <span className="font-bold" style={{ color: '#EBB700' }}>
                      FREE Event
                    </span>
                  ) : (
                    <span>
                      <span style={{ color: '#EBB700' }}>Tickets: </span>
                      <span className="font-bold" style={{ color: '#EBB700' }}>{featuredEvent.ticketPrice}</span>
                      {featuredEvent.togoAvailable && <span> • To-go orders available</span>}
                    </span>
                  )}
                </div>
                {featuredEvent.squarePaymentLink && (
                  <a
                    href={featuredEvent.squarePaymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 rounded-lg font-bold text-sm transition-all hover:opacity-90 shadow-lg mt-4"
                    style={{ backgroundColor: '#EBB700', color: '#1E40AF' }}
                  >
                    Purchase Tickets
                  </a>
                )}
              </div>

              {/* Additional Info - No Panel Background */}
              {featuredEvent.additionalInfo && (
                <div className="px-8 pb-8 pt-2 text-center">
                  <p className="text-sm text-white">
                    {featuredEvent.additionalInfo}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Volunteer Events Calendar */}
        <div id="volunteer-calendar">
          <EventsCalendar
            calendars={[
              {
                id: '4407935e25481954fdb2a82e75f3cb977cb897283481cd2c8c8c0b45882d2a8@group.calendar.google.com',
                name: '🤝 Volunteer Opportunities',
                color: '#1740a5'
              },
              {
                id: '230dbe79b903ae2fa91d462591b91a12c751a69972ac68c0e6d612779836ea29@group.calendar.google.com',
                name: '💰 Fundraising Events',
                color: '#f2ca47'
              }
            ]}
            title="Volunteer Events Calendar"
            description="Browse all upcoming volunteer opportunities and fundraising events that need volunteers!"
            showToggle={true}
            viewMode="AGENDA"
          />
        </div>

        {/* Signup Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl text-center mb-6" style={{ color: '#1740a5' }}>
              Sign Up to <span style={{ color: '#f2ca47' }}>Volunteer</span>
            </h2>

            {/* GoHighLevel Volunteer Form */}
            <div style={{ minHeight: '708px' }}>
              <iframe
                src="https://links.montbluai.com/widget/form/3XipndQKk8cyAunXuiQu"
                style={{ width: '100%', height: '708px', border: 'none', borderRadius: '3px' }}
                id="inline-3XipndQKk8cyAunXuiQu" 
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Volunteer with the Berkeley Lions Club"
                data-height="708"
                data-layout-iframe-id="inline-3XipndQKk8cyAunXuiQu"
                data-form-id="3XipndQKk8cyAunXuiQu"
                title="Volunteer with the Berkeley Lions Club"
              >
              </iframe>
              <script src="https://links.montbluai.com/js/form_embed.js"></script>
            </div>

            <p className="text-sm text-gray-600 mt-4 text-center">
              Questions? Email us at <a href="mailto:volunteer@berkeleylions.org" className="hover:underline" style={{ color: '#1740a5' }}>volunteer@berkeleylions.org</a>
            </p>
          </div>
        </div>

        {/* Why Volunteer */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-yellow-50 to-white rounded-lg p-8">
            <h3 className="text-2xl text-center mb-6" style={{ color: '#1740a5' }}>
              Why Volunteer with <span style={{ color: '#f2ca47' }}>Berkeley Lions</span>?
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="mb-2" style={{ color: '#1740a5' }}>Make Real Impact</h4>
                <p className="text-gray-700">
                  Every volunteer hour directly helps Berkeley families and strengthens our community.
                </p>
              </div>
              <div>
                <h4 className="mb-2" style={{ color: '#1740a5' }}>Meet Great People</h4>
                <p className="text-gray-700">
                  Connect with neighbors who share your passion for service and giving back.
                </p>
              </div>
              <div>
                <h4 className="mb-2" style={{ color: '#1740a5' }}>Flexible Commitment</h4>
                <p className="text-gray-700">
                  Volunteer at events that fit your schedule—one time or regularly.
                </p>
              </div>
              <div>
                <h4 className="mb-2" style={{ color: '#1740a5' }}>No Experience Needed</h4>
                <p className="text-gray-700">
                  We provide all training and materials. Just bring your enthusiasm!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
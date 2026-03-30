import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import { EventsCalendar } from './EventsCalendar';
import { supabase, FeaturedEvent, isSupabaseConfigured } from '../lib/supabase';
import { Button } from './ui/button';

const crabFeedPoster = 'https://i.imgur.com/bq8P4wS.png';

export function Volunteer() {
  const [featuredEvent, setFeaturedEvent] = useState<FeaturedEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [useHardcodedEvent, setUseHardcodedEvent] = useState(!isSupabaseConfigured);

  useEffect(() => {
    if (isSupabaseConfigured) {
      loadFeaturedEvent();
    } else {
      // Supabase not configured, show hardcoded event
      setUseHardcodedEvent(true);
      setLoading(false);
    }
  }, []);

  const loadFeaturedEvent = async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('featured_events')
        .select('*')
        .gte('event_date', today)
        .order('event_date', { ascending: true })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 means no rows returned, which is fine
        throw error;
      }

      setFeaturedEvent(data);
    } catch (error) {
      console.error('Error loading featured event:', error);
      setFeaturedEvent(null);
    } finally {
      setLoading(false);
    }
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getEventBadge = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `Featured Event - ${month} ${year}`;
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

        {/* Featured Event Section */}
        {loading ? (
          <div className="max-w-4xl mx-auto mb-16 text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading featured event...</p>
          </div>
        ) : useHardcodedEvent ? (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-2xl overflow-hidden" style={{ backgroundColor: '#1740a5' }}>
              {/* Event Poster Image */}
              <div className="relative p-8 md:p-12 flex justify-center">
                <img 
                  src={crabFeedPoster} 
                  alt="Crab Feed poster"
                  className="w-3/4 h-auto rounded-lg shadow-lg"
                />
              </div>

              {/* Event Details */}
              <div className="p-8 md:p-12 text-white">
                <div className="text-center mb-8">
                  <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#f2ca47', color: '#1740a5' }}>
                    {getEventBadge('2023-10-21')}
                  </div>
                  <h2 className="text-3xl md:text-4xl mb-4">
                    Berkeley Lions Club Crab Feed
                  </h2>
                  <p className="text-xl text-white/90">
                    Join us for a delicious crab feed to support our community!
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-start gap-3">
                    <Calendar className="flex-shrink-0 mt-1" size={24} style={{ color: '#f2ca47' }} />
                    <div>
                      <div style={{ color: '#f2ca47' }}>When</div>
                      <div>{formatEventDate('2023-10-21')}</div>
                      <div>6:00 PM - 8:00 PM</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="flex-shrink-0 mt-1" size={24} style={{ color: '#f2ca47' }} />
                    <div>
                      <div style={{ color: '#f2ca47' }}>Where</div>
                      <div>UC Berkeley Faculty Club</div>
                      <div>201 McLaughlin Hall, Berkeley, CA 94720</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="flex-shrink-0 mt-1" size={24} style={{ color: '#f2ca47' }} />
                    <div>
                      <div style={{ color: '#f2ca47' }}>Volunteers Needed</div>
                      <div>10</div>
                      <div>No age restrictions</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-6 mb-6">
                  <h3 className="text-xl mb-3" style={{ color: '#f2ca47' }}>What You'll Do:</h3>
                  <ul className="space-y-2">
                    <li>• Help set up tables and chairs</li>
                    <li>• Serve food and drinks</li>
                    <li>• Assist with cleanup</li>
                  </ul>
                </div>

                <div className="text-center">
                  <p className="mb-4">
                    <span style={{ color: '#f2ca47' }}>
                      Tickets: $20
                    </span>
                    {true && ' • To-go orders available'}
                  </p>
                  {true && (
                    <p className="mb-4">
                      <span style={{ color: '#f2ca47' }}>Join us for a fun evening of food and community!</span>
                    </p>
                  )}
                  {true && (
                    <div className="mt-6">
                      <Button
                        onClick={() => window.open('https://square.link/u/5Gz6Q5Q5', '_blank')}
                        className="text-white px-8 py-4 text-lg"
                        style={{ backgroundColor: '#f2ca47', color: '#1740a5' }}
                      >
                        Purchase Tickets
                        <ExternalLink className="ml-2" size={20} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : featuredEvent ? (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-2xl overflow-hidden" style={{ backgroundColor: '#1740a5' }}>
              {/* Event Poster Image */}
              <div className="relative p-8 md:p-12 flex justify-center">
                <img 
                  src={featuredEvent.image_url} 
                  alt={`${featuredEvent.event_name} poster`}
                  className="w-3/4 h-auto rounded-lg shadow-lg"
                />
              </div>

              {/* Event Details */}
              <div className="p-8 md:p-12 text-white">
                <div className="text-center mb-8">
                  <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#f2ca47', color: '#1740a5' }}>
                    {getEventBadge(featuredEvent.event_date)}
                  </div>
                  <h2 className="text-3xl md:text-4xl mb-4">
                    {featuredEvent.event_name}
                  </h2>
                  <p className="text-xl text-white/90">
                    {featuredEvent.event_description}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-start gap-3">
                    <Calendar className="flex-shrink-0 mt-1" size={24} style={{ color: '#f2ca47' }} />
                    <div>
                      <div style={{ color: '#f2ca47' }}>When</div>
                      <div>{formatEventDate(featuredEvent.event_date)}</div>
                      <div>{featuredEvent.event_time}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="flex-shrink-0 mt-1" size={24} style={{ color: '#f2ca47' }} />
                    <div>
                      <div style={{ color: '#f2ca47' }}>Where</div>
                      <div>{featuredEvent.location_name}</div>
                      <div>{featuredEvent.location_address}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="flex-shrink-0 mt-1" size={24} style={{ color: '#f2ca47' }} />
                    <div>
                      <div style={{ color: '#f2ca47' }}>Volunteers Needed</div>
                      <div>{featuredEvent.volunteers_needed}</div>
                      <div>{featuredEvent.age_requirements}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-6 mb-6">
                  <h3 className="text-xl mb-3" style={{ color: '#f2ca47' }}>What You'll Do:</h3>
                  <ul className="space-y-2">
                    {featuredEvent.volunteer_tasks.map((task, index) => (
                      <li key={index}>• {task}</li>
                    ))}
                  </ul>
                </div>

                <div className="text-center">
                  <p className="mb-4">
                    <span style={{ color: '#f2ca47' }}>
                      {featuredEvent.is_free ? 'Free Event' : `Tickets: ${featuredEvent.ticket_price}`}
                    </span>
                    {featuredEvent.to_go_available && ' • To-go orders available'}
                  </p>
                  {featuredEvent.additional_info && (
                    <p className="mb-4">
                      <span style={{ color: '#f2ca47' }}>{featuredEvent.additional_info}</span>
                    </p>
                  )}
                  {featuredEvent.square_payment_link && !featuredEvent.is_free && (
                    <div className="mt-6">
                      <Button
                        onClick={() => window.open(featuredEvent.square_payment_link!, '_blank')}
                        className="text-white px-8 py-4 text-lg"
                        style={{ backgroundColor: '#f2ca47', color: '#1740a5' }}
                      >
                        Purchase Tickets
                        <ExternalLink className="ml-2" size={20} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // No Upcoming Events - Show Calendar Link
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-yellow-50 rounded-lg shadow-lg p-12 text-center">
              <Calendar size={64} className="mx-auto mb-6" style={{ color: '#1740a5' }} />
              <h2 className="text-3xl mb-4" style={{ color: '#1740a5' }}>
                No Featured Events Right Now
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                Check our volunteer events calendar below for upcoming opportunities!
              </p>
              <Button
                onClick={scrollToCalendar}
                className="text-white px-8 py-4 text-lg"
                style={{ backgroundColor: '#1740a5' }}
              >
                View Calendar
              </Button>
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
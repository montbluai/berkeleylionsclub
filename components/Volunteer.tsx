import { EventsCalendar } from './EventsCalendar';
import { GHLForm } from './GHLForm';
import { UpcomingEventsGrid } from './UpcomingEventsGrid';

interface VolunteerProps {
  onNavigate?: (page: string) => void;
}

export function Volunteer({ onNavigate }: VolunteerProps) {
  return (
    <div id="volunteer" className="py-16 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4" style={{ color: '#1740a5' }}>
            Volunteer <span style={{ color: '#f2ca47' }}>Opportunities</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Make a difference in Berkeley! Join us for upcoming events—members and community supporters welcome.
          </p>
        </div>

        <UpcomingEventsGrid onNavigate={onNavigate} />

        <div id="volunteer-calendar">
          <EventsCalendar
            calendars={[
              {
                id: '44079359e25481954fdb2a82e75f3cb977cb897283481cd2c8c8c0b45882d2a8@group.calendar.google.com',
                name: '🤝 Volunteer Opportunities',
                color: '#1740a5',
              },
              {
                id: '230dbe79b903ae2fa91d462591b91a12c751a69972ac68c0e6d612779836ea29@group.calendar.google.com',
                name: '💰 Fundraising Events',
                color: '#f2ca47',
              },
            ]}
            title="Volunteer Events Calendar"
            description="Browse all upcoming volunteer opportunities and fundraising events that need volunteers!"
            showToggle={true}
            viewMode="AGENDA"
          />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl text-center mb-6" style={{ color: '#1740a5' }}>
              Sign Up to <span style={{ color: '#f2ca47' }}>Volunteer</span>
            </h2>

            <div style={{ minHeight: '708px' }}>
              <GHLForm formId="3XipndQKk8cyAunXuiQu" formName="Volunteer with the Berkeley Lions Club" height={708} />
            </div>

            <p className="text-sm text-gray-600 mt-4 text-center">
              Questions? Email us at{' '}
              <a href="mailto:lionsberkeley@gmail.com" className="hover:underline" style={{ color: '#1740a5' }}>
                lionsberkeley@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-yellow-50 to-white rounded-lg p-8">
            <h3 className="text-2xl text-center mb-6" style={{ color: '#1740a5' }}>
              Why Volunteer with <span style={{ color: '#f2ca47' }}>Berkeley Lions</span>?
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="mb-2" style={{ color: '#1740a5' }}>
                  Make Real Impact
                </h4>
                <p className="text-gray-700">Every volunteer hour directly helps Berkeley families and strengthens our community.</p>
              </div>
              <div>
                <h4 className="mb-2" style={{ color: '#1740a5' }}>
                  Meet Great People
                </h4>
                <p className="text-gray-700">Connect with neighbors who share your passion for service and giving back.</p>
              </div>
              <div>
                <h4 className="mb-2" style={{ color: '#1740a5' }}>
                  Flexible Commitment
                </h4>
                <p className="text-gray-700">Volunteer at events that fit your schedule—one time or regularly.</p>
              </div>
              <div>
                <h4 className="mb-2" style={{ color: '#1740a5' }}>
                  No Experience Needed
                </h4>
                <p className="text-gray-700">We provide all training and materials. Just bring your enthusiasm!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

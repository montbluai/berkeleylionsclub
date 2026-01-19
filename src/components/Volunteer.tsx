import { Calendar, MapPin, Users } from 'lucide-react@0.487.0';
import { EventsCalendar } from './EventsCalendar';
import crabFeedPoster from 'figma:asset/ed80879201c1cf41cfe0b5bc0b92edde2982635a.png';

export function Volunteer() {
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

        {/* Featured Event Poster */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-2xl overflow-hidden" style={{ backgroundColor: '#1740a5' }}>
            {/* Event Poster Image */}
            <div className="relative p-8 md:p-12 flex justify-center">
              <img 
                src={crabFeedPoster} 
                alt="Berkeley Lions Club Crab Feed 2026 - February 7, 2026 at Northbrae Community Church"
                className="w-3/4 h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Event Details */}
            <div className="p-8 md:p-12 text-white">
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#f2ca47', color: '#1740a5' }}>
                  Featured Event - February 2026
                </div>
                <h2 className="text-3xl md:text-4xl mb-4">
                  Berkeley Lions Club Crab Feed 2026
                </h2>
                <p className="text-xl text-white/90">
                  Join us for our annual fundraising dinner! Volunteers needed to help make this event a success.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <Calendar className="flex-shrink-0 mt-1" size={24} style={{ color: '#f2ca47' }} />
                  <div>
                    <div style={{ color: '#f2ca47' }}>When</div>
                    <div>Friday, Feb 7, 2026</div>
                    <div>Doors at 5pm, Dinner at 7pm</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="flex-shrink-0 mt-1" size={24} style={{ color: '#f2ca47' }} />
                  <div>
                    <div style={{ color: '#f2ca47' }}>Where</div>
                    <div>Northbrae Community Church</div>
                    <div>941 the Alameda, Berkeley, CA</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="flex-shrink-0 mt-1" size={24} style={{ color: '#f2ca47' }} />
                  <div>
                    <div style={{ color: '#f2ca47' }}>Volunteers Needed</div>
                    <div>20-30 people</div>
                    <div>All ages welcome!</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-6 mb-6">
                <h3 className="text-xl mb-3" style={{ color: '#f2ca47' }}>What You'll Do:</h3>
                <ul className="space-y-2">
                  <li>• Cook and prepare food</li>
                  <li>• Serve dinner to guests</li>
                  <li>• Set up tables and dining room</li>
                  <li>• Break down dining room after event</li>
                  <li>• Welcome and thank diners</li>
                  <li>• Help pack to-go orders</li>
                  <li>• General event support</li>
                </ul>
              </div>

              <div className="text-center">
                <p className="mb-4">
                  <span style={{ color: '#f2ca47' }}>Tickets: $80</span> • To-go orders available
                </p>
                <p className="mb-4">
                  <span style={{ color: '#f2ca47' }}>No experience necessary!</span> We provide training and all supplies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Volunteer Events Calendar */}
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
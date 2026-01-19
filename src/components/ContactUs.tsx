import { Calendar, MapPin, Mail, Users, Video } from 'lucide-react@0.487.0';

export function ContactUs() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4" style={{ color: '#1740a5' }}>
            Contact <span style={{ color: '#f2ca47' }}>Us</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Get in touch with the Berkeley Lions Club
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <h2 className="text-3xl text-center mb-8" style={{ color: '#1740a5' }}>
              Send Us a Message
            </h2>

            {/* GoHighLevel Contact Form */}
            <div style={{ minHeight: '738px' }}>
              <iframe
                src="https://links.montbluai.com/widget/form/rWp85r99A08OuqoRWAux"
                style={{ width: '100%', height: '738px', border: 'none', borderRadius: '3px' }}
                id="inline-rWp85r99A08OuqoRWAux" 
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Contact the Berkeley Lions Club"
                data-height="738"
                data-layout-iframe-id="inline-rWp85r99A08OuqoRWAux"
                data-form-id="rWp85r99A08OuqoRWAux"
                title="Contact the Berkeley Lions Club"
              >
              </iframe>
              <script src="https://links.montbluai.com/js/form_embed.js"></script>
            </div>

            <p className="text-center text-sm text-gray-600 mt-4">
              We respect <a href="/privacy" className="hover:underline" style={{ color: '#1740a5' }}>your privacy</a>. Unsubscribe at any time.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Meeting Information */}
          <div className="mb-12">
            <h2 className="text-3xl mb-6 text-center" style={{ color: '#1740a5' }}>
              Join Our <span style={{ color: '#f2ca47' }}>Meetings</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Calendar size={40} style={{ color: '#1740a5' }} className="flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl mb-2" style={{ color: '#1740a5' }}>When</h3>
                    <p className="text-lg text-gray-700">
                      1st & 3rd Thursday<br />
                      12:30 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-start gap-4 mb-6">
                  <MapPin size={40} style={{ color: '#f2ca47' }} className="flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl mb-2" style={{ color: '#1740a5' }}>Where</h3>
                    <p className="text-lg text-gray-700">
                      Berkeley City Club<br />
                      2315 Durant Avenue<br />
                      Berkeley, CA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Zoom Option */}
            <div className="mt-6 bg-gradient-to-br from-blue-50 to-yellow-50 rounded-lg p-8">
              <div className="flex items-start gap-4">
                <Video size={40} style={{ color: '#1740a5' }} className="flex-shrink-0" />
                <div>
                  <h3 className="text-xl mb-2" style={{ color: '#1740a5' }}>Join Online via Zoom</h3>
                  <p className="text-gray-700">
                    Can't make it in person? We also meet online via Zoom.<br />
                    Please contact us for a meeting invitation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Leadership & Contact Information */}
          <div className="mb-12">
            <h2 className="text-3xl mb-6 text-center" style={{ color: '#1740a5' }}>
              Club <span style={{ color: '#f2ca47' }}>Leadership</span>
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="pb-4 border-b border-gray-200">
                    <h4 className="mb-2" style={{ color: '#1740a5' }}>President</h4>
                    <p className="text-gray-700">Vivian Freeman</p>
                  </div>

                  <div className="pb-4 border-b border-gray-200">
                    <h4 className="mb-2" style={{ color: '#1740a5' }}>Vice President</h4>
                    <p className="text-gray-700">Joe Santini</p>
                  </div>

                  <div className="pb-4 border-b border-gray-200">
                    <h4 className="mb-2" style={{ color: '#1740a5' }}>Secretary</h4>
                    <p className="text-gray-700">Lion Jay Touriel</p>
                  </div>

                  <div className="pb-4">
                    <h4 className="mb-2" style={{ color: '#1740a5' }}>Treasurer</h4>
                    <p className="text-gray-700">Mark Fujikawa</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="pb-4 border-b border-gray-200">
                    <h4 className="mb-2" style={{ color: '#1740a5' }}>Membership Chairman</h4>
                    <p className="text-gray-700">Vivian Freeman</p>
                  </div>

                  <div className="pb-4 border-b border-gray-200">
                    <h4 className="mb-2" style={{ color: '#1740a5' }}>Service Chair</h4>
                    <p className="text-gray-700">Karen Roze</p>
                  </div>

                  <div className="pb-4">
                    <h4 className="mb-2" style={{ color: '#1740a5' }}>District 4-C3 District Governor</h4>
                    <p className="text-gray-700">Darlene Ridle</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* General Contact Information */}
          <div>
            <h2 className="text-3xl mb-6 text-center" style={{ color: '#1740a5' }}>
              General <span style={{ color: '#f2ca47' }}>Contact</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-start gap-4">
                  <Mail size={40} style={{ color: '#1740a5' }} className="flex-shrink-0" />
                  <div>
                    <h3 className="text-xl mb-4" style={{ color: '#1740a5' }}>Mailing Address</h3>
                    <p className="text-gray-700">
                      Berkeley Lions Club<br />
                      P.O. Box 874<br />
                      Berkeley, CA 94701
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-start gap-4">
                  <Users size={40} style={{ color: '#f2ca47' }} className="flex-shrink-0" />
                  <div>
                    <h3 className="text-xl mb-4" style={{ color: '#1740a5' }}>Email Us</h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-600">General Inquiries:</p>
                        <a 
                          href="mailto:info@berkeleylions.org"
                          className="hover:underline"
                          style={{ color: '#1740a5' }}
                        >
                          info@berkeleylions.org
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8" style={{ backgroundColor: '#1740a5' }}>
              <h3 className="text-2xl text-white mb-4">
                New Members & Visitors Welcome!
              </h3>
              <p className="text-white/90 text-lg mb-6">
                Interested in joining us at a meeting or learning more about Berkeley Lions Club?<br />
                We'd love to hear from you!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="mailto:membership@berkeleylions.org"
                  className="px-8 py-4 rounded-lg transition-opacity hover:opacity-90 inline-block"
                  style={{ backgroundColor: '#f2ca47', color: '#1740a5' }}
                >
                  Contact Membership Chairman
                </a>
                <a
                  href="mailto:secretary@berkeleylions.org"
                  className="px-8 py-4 rounded-lg bg-white transition-opacity hover:opacity-90 inline-block"
                  style={{ color: '#1740a5' }}
                >
                  Email Secretary
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
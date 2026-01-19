import { DollarSign, UserCheck, Award, Heart } from 'lucide-react';
import { Button } from './ui/button';

export function Join() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4" style={{ color: '#1740a5' }}>
            Join <span style={{ color: '#f2ca47' }}>Berkeley Lions Club</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Become part of the world's largest service organization and make a lasting impact in your community
          </p>
        </div>

        {/* Membership Interest Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#1740a5' }}>
                <Heart className="text-white" size={32} aria-hidden="true" />
              </div>
              <h2 className="text-3xl mb-2" style={{ color: '#1740a5' }}>
                Express Your Interest
              </h2>
              <p className="text-gray-700">
                Fill out this form and we'll reach out to start your membership journey
              </p>
            </div>

            {/* GoHighLevel Membership Form */}
            <div style={{ minHeight: '614px' }}>
              <iframe
                src="https://links.montbluai.com/widget/form/KvQ7hz6FwjAe4YVJj92i"
                style={{ width: '100%', height: '614px', border: 'none', borderRadius: '3px' }}
                id="inline-KvQ7hz6FwjAe4YVJj92i" 
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Join the Berkeley Lions Club"
                data-height="614"
                data-layout-iframe-id="inline-KvQ7hz6FwjAe4YVJj92i"
                data-form-id="KvQ7hz6FwjAe4YVJj92i"
                title="Join the Berkeley Lions Club"
              >
              </iframe>
              <script src="https://links.montbluai.com/js/form_embed.js"></script>
            </div>

            <p className="text-sm text-gray-600 mt-6 text-center">
              We respect <a href="/privacy" className="hover:underline" style={{ color: '#1740a5' }}>your privacy</a>. Unsubscribe at any time.
            </p>

            <p className="text-sm text-gray-600 mt-2 text-center">
              Questions? Contact our Membership Chair at{' '}
              <a href="mailto:membership@berkeleylions.org" className="hover:underline" style={{ color: '#1740a5' }}>
                membership@berkeleylions.org
              </a>
            </p>
          </div>
        </div>

        {/* Membership Benefits */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl text-center mb-8" style={{ color: '#1740a5' }}>
            Why Join the <span style={{ color: '#f2ca47' }}>Lions</span>?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1740a5' }}>
                  <Heart className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl mb-2" style={{ color: '#1740a5' }}>Make a Real Difference</h3>
                  <p className="text-gray-700">
                    Participate in meaningful service projects that directly impact lives in Berkeley and around the world.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f2ca47' }}>
                  <UserCheck style={{ color: '#1740a5' }} size={24} />
                </div>
                <div>
                  <h3 className="text-xl mb-2" style={{ color: '#1740a5' }}>Build Connections</h3>
                  <p className="text-gray-700">
                    Form lifelong friendships with fellow Lions who share your values and commitment to service.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1740a5' }}>
                  <Award className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl mb-2" style={{ color: '#1740a5' }}>Leadership Opportunities</h3>
                  <p className="text-gray-700">
                    Develop leadership skills through club roles and connect with 1.4 million Lions globally.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f2ca47' }}>
                  <Heart style={{ color: '#1740a5' }} size={24} />
                </div>
                <div>
                  <h3 className="text-xl mb-2" style={{ color: '#1740a5' }}>Fun & Fellowship</h3>
                  <p className="text-gray-700">
                    Enjoy social events, dinners, and activities while serving your community together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Membership Process */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl text-center mb-8" style={{ color: '#1740a5' }}>
            The <span style={{ color: '#f2ca47' }}>Membership Process</span>
          </h2>
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-8 shadow-lg">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#1740a5' }}>
                  1
                </div>
                <div>
                  <h3 className="text-xl mb-2" style={{ color: '#1740a5' }}>Submit Your Interest</h3>
                  <p className="text-gray-700">
                    Fill out the interest form at the top of this page. This helps us learn about you and your motivation for joining.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#1740a5' }}>
                  2
                </div>
                <div>
                  <h3 className="text-xl mb-2" style={{ color: '#1740a5' }}>Meet Your Sponsor</h3>
                  <p className="text-gray-700">
                    A current Berkeley Lions Club member will be assigned as your sponsor. They'll reach out to answer 
                    questions, introduce you to fellow Lions, and guide you through the process.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#1740a5' }}>
                  3
                </div>
                <div>
                  <h3 className="text-xl mb-2" style={{ color: '#1740a5' }}>Attend a Meeting</h3>
                  <p className="text-gray-700">
                    Visit one of our club meetings to meet members, learn about ongoing projects, and experience the 
                    Lions spirit firsthand. Meetings are welcoming and informal!
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#1740a5' }}>
                  4
                </div>
                <div>
                  <h3 className="text-xl mb-2" style={{ color: '#1740a5' }}>Induction Ceremony</h3>
                  <p className="text-gray-700">
                    Once approved, you'll be officially inducted as a Berkeley Lion! This special ceremony welcomes 
                    you into our club and the global Lions family.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fees & Expectations */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Membership Fees */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign size={32} style={{ color: '#f2ca47' }} />
                <h2 className="text-2xl" style={{ color: '#1740a5' }}>Membership Fees</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span style={{ color: '#1740a5' }}>One-time Entrance Fee:</span>
                    <span className="text-xl">$30</span>
                  </div>
                  <p className="text-sm text-gray-600">Covers your Lions pin and new member materials</p>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span style={{ color: '#1740a5' }}>Annual Dues:</span>
                    <span className="text-xl">$120/year</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Includes Lions Clubs International dues, district fees, and local club operations
                  </p>
                </div>
                <div className="bg-blue-50 rounded p-4 mt-4">
                  <p className="text-sm" style={{ color: '#1740a5' }}>
                    💡 <strong>Note:</strong> Dues can be paid quarterly or monthly if preferred. Financial assistance 
                    is available—don't let fees prevent you from joining!
                  </p>
                </div>
              </div>
            </div>

            {/* Member Expectations */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <UserCheck size={32} style={{ color: '#1740a5' }} />
                <h2 className="text-2xl" style={{ color: '#1740a5' }}>What We Ask of Members</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2" style={{ color: '#1740a5' }}>Meeting Attendance</h4>
                  <p className="text-gray-700">
                    Attend monthly club meetings (typically 2nd Tuesday evening). We understand life gets busy!
                  </p>
                </div>
                <div>
                  <h4 className="mb-2" style={{ color: '#1740a5' }}>Service Participation</h4>
                  <p className="text-gray-700">
                    Participate in service projects when you can. Even a few hours makes a difference!
                  </p>
                </div>
                <div>
                  <h4 className="mb-2" style={{ color: '#1740a5' }}>Community Spirit</h4>
                  <p className="text-gray-700">
                    Live the Lions motto "We Serve" and uphold our values of kindness, integrity, and service.
                  </p>
                </div>
                <div className="bg-yellow-50 rounded p-4 mt-4">
                  <p className="text-sm text-gray-700">
                    <strong style={{ color: '#1740a5' }}>Remember:</strong> We welcome all commitment levels. 
                    Whether you can volunteer weekly or monthly, every contribution matters!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-12 max-w-3xl mx-auto" style={{ backgroundColor: '#1740a5' }}>
            <h2 className="text-3xl md:text-4xl text-white mb-4">
              Ready to Become a Lion?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join a global network of changemakers and start making a difference today
            </p>
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-lg px-10 py-6"
              style={{ backgroundColor: '#f2ca47', color: '#1740a5' }}
            >
              Submit Your Interest Above
            </Button>
            <p className="mt-6 text-white/80">
              Questions? Contact us at membership@berkeleylions.org
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
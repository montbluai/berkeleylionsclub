import { ExternalLink, Globe, History, Calendar, MapPin } from 'lucide-react@0.487.0';
import { Button } from './ui/button';

export function About() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4" style={{ color: '#1740a5' }}>
            About <span style={{ color: '#f2ca47' }}>Berkeley Lions Club</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Part of Lions Clubs International, the world's largest service organization
          </p>
        </div>

        {/* Our Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl mb-6" style={{ color: '#1740a5' }}>
              Our <span style={{ color: '#f2ca47' }}>Story</span>
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Founded on June 14, 1919, the Berkeley Lions Club has been serving our community for 
                over a century, bringing together neighbors who share a passion for service and fellowship. 
                As part of Lions Clubs International, we are connected to 1.4 million members in over 200 
                countries and geographic areas.
              </p>
              <p className="mb-4">
                Our motto, "We Serve," embodies our commitment to making a meaningful difference in 
                Berkeley and beyond. From vision care and hunger relief to environmental initiatives 
                and youth programs, our members dedicate their time, energy, and resources to causes 
                that matter.
              </p>
              <p>
                But being a Lion isn't just about service—it's about friendship, fun, and personal 
                growth. Our members form lasting bonds while working together to improve lives and 
                strengthen our community.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-8 shadow-md">
            <h3 className="text-2xl mb-4" style={{ color: '#1740a5' }}>Our Mission</h3>
            <p className="text-gray-700">
              To empower volunteers to serve their communities, meet humanitarian needs, encourage 
              peace and promote international understanding through Lions clubs.
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-white rounded-lg p-8 shadow-md">
            <h3 className="text-2xl mb-4" style={{ color: '#f2ca47' }}>Our Values</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Compassion and Service</li>
              <li>• Integrity and Accountability</li>
              <li>• Collaboration and Inclusivity</li>
              <li>• Leadership and Community Impact</li>
            </ul>
          </div>
        </div>

        {/* Links Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl text-center mb-8" style={{ color: '#1740a5' }}>
            Learn <span style={{ color: '#f2ca47' }}>More</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Lions International */}
            <a
              href="https://www.lionsclubs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow"
              style={{ outlineColor: '#1740a5' }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Globe size={40} style={{ color: '#1740a5' }} aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl mb-2 flex items-center gap-2" style={{ color: '#1740a5' }}>
                    Lions Clubs International
                    <ExternalLink size={18} aria-hidden="true" />
                  </h3>
                  <p className="text-gray-700">
                    Learn about our global organization and the impact Lions make worldwide.
                  </p>
                </div>
              </div>
            </a>

            {/* Club History */}
            <button 
              disabled
              aria-disabled="true"
              className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow text-left w-full opacity-60 cursor-not-allowed"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <History size={40} style={{ color: '#f2ca47' }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl mb-2" style={{ color: '#1740a5' }}>
                    Berkeley Lions History
                  </h3>
                  <p className="text-gray-700">
                    Explore our club's rich history and the milestones we've achieved together.
                  </p>
                  <p className="text-sm mt-2 italic text-gray-600">
                    (Coming soon - Historical archives and articles)
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 max-w-3xl mx-auto" style={{ backgroundColor: '#1740a5' }}>
            <h3 className="text-2xl md:text-3xl text-white mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-white/90 text-lg mb-6">
              Join a community of dedicated volunteers making Berkeley a better place
            </p>
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-lg px-8 py-6"
              style={{ backgroundColor: '#f2ca47', color: '#1740a5' }}
              aria-label="Scroll to top of page to access membership form"
            >
              Join Berkeley Lions Club
            </Button>
            <p className="text-white/80 text-sm mt-4">
              Click to return to the top and learn about membership
            </p>
          </div>
        </div>

        {/* Meeting Information */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl text-center mb-8" style={{ color: '#1740a5' }}>
            Join Us at Our <span style={{ color: '#f2ca47' }}>Meetings</span>
          </h2>
          <div className="bg-gradient-to-br from-blue-50 to-yellow-50 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div className="flex items-start gap-4">
                <Calendar size={32} style={{ color: '#1740a5' }} className="flex-shrink-0" />
                <div>
                  <h3 className="text-xl mb-2" style={{ color: '#1740a5' }}>When We Meet</h3>
                  <p className="text-gray-700">
                    1st & 3rd Thursday<br />
                    12:30 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={32} style={{ color: '#f2ca47' }} className="flex-shrink-0" />
                <div>
                  <h3 className="text-xl mb-2" style={{ color: '#1740a5' }}>Where We Meet</h3>
                  <p className="text-gray-700">
                    Berkeley City Club<br />
                    2315 Durant Avenue<br />
                    Berkeley, CA
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center pt-6 border-t border-gray-300">
              <p className="text-gray-700 mb-4">
                We also meet online via Zoom. Visitors and prospective members are always welcome!
              </p>
              <p className="text-sm text-gray-600">
                For full contact information and meeting details, visit our Contact Us page
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
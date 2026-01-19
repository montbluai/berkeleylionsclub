import { Shield, Glasses, Smartphone, Ear, FileHeart, MapPin, ExternalLink, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

// Organization logos
const orgLogos: Record<string, string | string[]> = {
  'Alameda County Food Bank': 'https://i.imgur.com/9QFliZC.png',
  'Bay Area Alternative Press': 'https://i.imgur.com/q13LUaC.png',
  'Berkeley Community Chorus': 'https://i.imgur.com/4PTMyAn.png',
  'Berkeley Firefighter\'s Assn, Holiday Food Baskets': 'https://i.imgur.com/9pulREH.png',
  'Berkeley Historical Society': 'https://i.imgur.com/2Nc6lib.png',
  'Berkeley Youth Alternative': 'https://i.imgur.com/OwAqGyk.png',
  'Berkeley-Alameda Little League': 'https://i.imgur.com/XTxEffk.png',
  'BOSS': 'https://i.imgur.com/lojntT8.png',
  'Boy Scout Troop 19': 'https://i.imgur.com/onYHnyd.png',
  'California Lion\'s Foundation': 'https://i.imgur.com/3DszkpX.png',
  'Canine Companions': 'https://i.imgur.com/TWI3NU2.png',
  'Cub Scout Pack 30': 'https://i.imgur.com/UWY3esG.png',
  'Delta & Diablo Valley Veteran\'s Group': [
    'https://i.imgur.com/GiuaznL.png',
    'https://i.imgur.com/f04pyYF.png'
  ],
  'East Bay Center for the Blind': 'https://i.imgur.com/3m9MHXE.png',
  'Food Bank of Contra Costa & Solano': 'https://i.imgur.com/wYQMRhi.png',
  'Hawaii Firefighter\'s Relief': 'https://i.imgur.com/VR8JvCw.png',
  'Hawaii Lions Foundation': 'https://i.imgur.com/2vQ97QO.png',
  'International Rescue Committee': 'https://i.imgur.com/FCpmRtM.png',
  'Lion\'s Center for the Visually Impaired': 'https://i.imgur.com/AaFEMdf.png',
  'Lion\'s Club International Foundation': 'https://i.imgur.com/WlN8qWO.png',
  'Lion\'s Eye Foundation': 'https://i.imgur.com/Rm537Bs.png',
  'Lion\'s Hearing Foundation': 'https://i.imgur.com/CW93y9Q.png',
  'Lion\'s In Sight': 'https://i.imgur.com/yq6euHS.png',
  'Lion\'s International Youth Camps & Exchange': 'https://i.imgur.com/GD6Yklf.png',
  'Lion\'s Peace Poster Contest': 'https://i.imgur.com/laZy9o0.png',
  'Lion\'s SightSavers Foundation': 'https://i.imgur.com/ddlR0ih.png',
  'Lion\'s Student Speakers Foundation': 'https://i.imgur.com/mRI4xks.png',
  'Lion\'s Vision Resource Network': 'https://i.imgur.com/v7Yj1J1.png',
  'Lion\'s Wilderness Camp for Deaf Children': 'https://i.imgur.com/OQXvSyI.png',
  'MLK Breakfast': 'https://i.imgur.com/Qglwqxm.png',
  'National Coalition Against Prescription Drug Abuse': 'https://i.imgur.com/l5Del0J.png',
  'NOLL & SOLL North Oakland and South Oakland Little Leagues': 'https://i.imgur.com/tnDL3q1.png',
  'Rebuilding Together': 'https://i.imgur.com/zJcVzoQ.png',
  'Sweatshirts for Unhoused BUSD children': 'https://i.imgur.com/1ZUnixT.png',
  'The Women\'s Daytime Drop-in Center': 'https://i.imgur.com/rhJ2iPa.png',
  'United Nations Assoc of the East Bay': 'https://i.imgur.com/nRPDXXX.png',
  'Waterside Workshops': 'https://i.imgur.com/mPrv0rQ.png',
  'Women of Color Resource Center': 'https://i.imgur.com/sVgASKY.png',
  'YEAH! Youth Empowerment for Advancement Hangout': 'https://i.imgur.com/4RGRoJl.png',
};

export function Donate() {
  const [isPlannedGivingModalOpen, setIsPlannedGivingModalOpen] = useState(false);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4" style={{ color: '#1740a5' }}>
            Support Our <span style={{ color: '#f2ca47' }}>Mission</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Your generous donation helps Berkeley Lions Club serve our community and change lives
          </p>
        </div>

        {/* Tax Deductible Notice */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg p-6 flex items-start gap-4">
            <Shield size={32} style={{ color: '#1740a5' }} className="flex-shrink-0" />
            <div>
              <h3 className="text-xl mb-2" style={{ color: '#1740a5' }}>Tax-Deductible Contribution</h3>
              <p className="text-gray-700">
                Berkeley Lions Club is a 501(c)(3) charitable organization. Your donation is tax-deductible 
                to the full extent allowed by law.
              </p>
              <p className="mt-2" style={{ color: '#1740a5' }}>
                <strong>Tax ID (EIN):</strong> 83-2807583
              </p>
              <p className="text-sm text-gray-600 mt-2">
                You will receive an official tax receipt via email immediately after your donation.
              </p>
            </div>
          </div>
        </div>

        {/* Donation Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <h2 className="text-3xl text-center mb-8" style={{ color: '#1740a5' }}>
              Make a <span style={{ color: '#f2ca47' }}>Donation</span>
            </h2>

            {/* Square Payment Widget */}
            <div style={{ minHeight: '820px' }}>
              <iframe
                src="https://square.link/u/UAOQi9rh?src=embed"
                style={{ width: '100%', height: '820px', border: 'none', borderRadius: '3px' }}
                title="Berkeley Lions Club Donation - Secure Payment via Square"
              >
              </iframe>
            </div>
          </div>
        </div>

        {/* Leave a Legacy - Planned Giving/Bequest */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 md:p-12" style={{ background: `linear-gradient(135deg, #1740a5 0%, #7A2582 100%)` }}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-4">
                <FileHeart className="text-white" size={40} />
              </div>
              <h2 className="text-3xl md:text-4xl text-white mb-4">
                Leave a Lasting <span style={{ color: '#f2ca47' }}>Legacy</span>
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                A bequest to Berkeley Lions Club ensures your commitment to service continues for generations to come
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
              <h3 className="text-xl text-white mb-4">What is a Bequest?</h3>
              <p className="text-white/90 mb-4">
                A bequest is a gift made through your will or estate plan. It's a meaningful way to support the 
                Berkeley Lions Club's mission without affecting your current finances. Your legacy gift will help 
                fund vital community programs, vision care, disaster relief, and other Lions initiatives long into the future.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-white mb-2">Specific Amount</h4>
                  <p className="text-sm text-white/80">
                    Leave a designated dollar amount to the club
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-white mb-2">Percentage</h4>
                  <p className="text-sm text-white/80">
                    Gift a percentage of your estate
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-white mb-2">Residual</h4>
                  <p className="text-sm text-white/80">
                    Leave what remains after other bequests
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-8">
              <h3 className="text-xl text-white mb-3">Tax Benefits</h3>
              <p className="text-white/90">
                Bequests to Berkeley Lions Club (a 501(c)(3) organization) are fully deductible from your estate taxes, 
                helping maximize the benefit to your heirs while supporting a cause you care about.
              </p>
            </div>

            <div className="text-center">
              <p className="text-white/90 mb-4">
                <strong className="text-white">Interested in learning more about planned giving?</strong><br />
                Contact us for a confidential conversation about how your legacy can make a lasting impact.
              </p>
              <Button
                onClick={() => setIsPlannedGivingModalOpen(true)}
                className="text-lg px-8 py-6"
                style={{ backgroundColor: '#f2ca47', color: '#1740a5' }}
              >
                <FileHeart className="mr-2" size={20} />
                Contact Us About Planned Giving
              </Button>
              <p className="text-white/80 text-sm mt-4">
                Email: legacy@berkeleylions.org | Phone: (510) XXX-XXXX
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-sm text-white/70 text-center">
                <strong>Sample Bequest Language:</strong> "I give, devise, and bequeath to Berkeley Lions Club 
                (Tax ID: 83-2807583) the sum of $______ [or ___% of my estate] to be used for its general purposes."
              </p>
            </div>
          </div>
        </div>

        {/* Organizations We Support */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-4" style={{ color: '#1740a5' }}>
            Organizations We <span style={{ color: '#f2ca47' }}>Support</span>
          </h2>
          <p className="text-center text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Your donations help us support these wonderful organizations in our community and beyond
          </p>

          {/* Community Programs */}
          <div className="mb-12">
            <h3 className="text-2xl text-center mb-6" style={{ color: '#1740a5' }}>
              Community Programs
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                'Alameda County Food Bank',
                'Bay Area Alternative Press',
                'Berkeley Community Chorus',
                'Berkeley Firefighter\'s Assn, Holiday Food Baskets',
                'Berkeley Historical Society',
                'Berkeley Youth Alternative',
                'Berkeley-Alameda Little League',
                'BOSS',
                'Boy Scout Troop 19',
                'Cub Scout Pack 30',
                'Delta & Diablo Valley Veteran\'s Group',
                'East Bay Center for the Blind',
                'Food Bank of Contra Costa & Solano',
                'Hawaii Firefighter\'s Relief',
                'International Rescue Committee',
                'MLK Breakfast',
                'National Coalition Against Prescription Drug Abuse',
                'NOLL & SOLL North Oakland and South Oakland Little Leagues',
                'Rebuilding Together',
                'Sweatshirts for Unhoused BUSD children',
                'The Women\'s Daytime Drop-in Center',
                'United Nations Assoc of the East Bay',
                'Waterside Workshops',
                'Women of Color Resource Center',
                'YEAH! Youth Empowerment for Advancement Hangout'
              ].map((org, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center text-center min-h-[100px] hover:shadow-lg transition-shadow"
                >
                  {orgLogos[org] ? (
                    Array.isArray(orgLogos[org]) ? (
                      <div className="flex items-center justify-center gap-3">
                        {(orgLogos[org] as string[]).map((logo, logoIndex) => (
                          <img 
                            key={logoIndex}
                            src={logo} 
                            alt={`${org} logo ${logoIndex + 1}`}
                            title={org}
                            className="max-w-[45%] max-h-[50px] object-contain"
                          />
                        ))}
                      </div>
                    ) : (
                      <img 
                        src={orgLogos[org] as string} 
                        alt={org}
                        title={org}
                        className="max-w-full max-h-[50px] object-contain"
                      />
                    )
                  ) : (
                    <p className="text-sm text-gray-700">{org}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Lion's Programs */}
          <div>
            <h3 className="text-2xl text-center mb-6" style={{ color: '#1740a5' }}>
              Lion's Programs
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                'California Lion\'s Foundation',
                'Canine Companions',
                'Hawaii Lions Foundation',
                'Lion\'s Center for the Visually Impaired',
                'Lion\'s Club International Foundation',
                'Lion\'s Eye Foundation',
                'Lion\'s Hearing Foundation',
                'Lion\'s In Sight',
                'Lion\'s International Youth Camps & Exchange',
                'Lion\'s Peace Poster Contest',
                'Lion\'s SightSavers Foundation',
                'Lion\'s Student Speakers Foundation',
                'Lion\'s Vision Resource Network',
                'Lion\'s Wilderness Camp for Deaf Children'
              ].map((org, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center text-center min-h-[100px] hover:shadow-lg transition-shadow"
                  style={{ borderTop: `3px solid #f2ca47` }}
                >
                  {org === 'Lion\'s Peace Poster Contest' ? (
                    <img 
                      src={orgLogos[org] as string} 
                      alt="Lions International Peace Poster Contest"
                      title="Lions International Peace Poster Contest"
                      className="max-w-full max-h-[50px] object-contain"
                    />
                  ) : orgLogos[org] ? (
                    Array.isArray(orgLogos[org]) ? (
                      <div className="flex items-center justify-center gap-3">
                        {(orgLogos[org] as string[]).map((logo, logoIndex) => (
                          <img 
                            key={logoIndex}
                            src={logo} 
                            alt={`${org} logo ${logoIndex + 1}`}
                            title={org}
                            className="max-w-[45%] max-h-[50px] object-contain"
                          />
                        ))}
                      </div>
                    ) : (
                      <img 
                        src={orgLogos[org] as string} 
                        alt={org}
                        title={org}
                        className="max-w-full max-h-[50px] object-contain"
                      />
                    )
                  ) : (
                    <p className="text-sm text-gray-700">{org}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Donation Drop-off Sites */}
        <div className="mt-16 max-w-5xl mx-auto">
          <h2 className="text-3xl text-center mb-4" style={{ color: '#1740a5' }}>
            Donation <span style={{ color: '#f2ca47' }}>Drop-off Sites</span>
          </h2>
          <p className="text-center text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            To support Lions International efforts and raise funds for our partner charities, 
            we accept physical item donations
          </p>

          {/* What We Accept */}
          <div className="bg-gradient-to-br from-blue-50 to-yellow-50 rounded-lg p-8 mb-8">
            <h3 className="text-2xl mb-6 text-center" style={{ color: '#1740a5' }}>
              We Accept:
            </h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3" style={{ backgroundColor: '#1740a5' }}>
                  <Glasses className="text-white" size={32} />
                </div>
                <h4 className="mb-2" style={{ color: '#1740a5' }}>Eyeglasses</h4>
                <p className="text-sm text-gray-700">
                  Used eyeglasses and prescription sunglasses
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3" style={{ backgroundColor: '#f2ca47' }}>
                  <Smartphone style={{ color: '#1740a5' }} size={32} />
                </div>
                <h4 className="mb-2" style={{ color: '#1740a5' }}>Cell Phones</h4>
                <p className="text-sm text-gray-700">
                  Old or unused cell phones
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3" style={{ backgroundColor: '#1740a5' }}>
                  <Ear className="text-white" size={32} />
                </div>
                <h4 className="mb-2" style={{ color: '#1740a5' }}>Hearing Aids</h4>
                <p className="text-sm text-gray-700">
                  Used hearing aids in any condition
                </p>
              </div>
            </div>
          </div>

          {/* Drop-off Locations */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start gap-4">
                <MapPin size={32} style={{ color: '#1740a5' }} className="flex-shrink-0" />
                <div>
                  <h3 className="text-xl mb-2" style={{ color: '#1740a5' }}>Sacred Rose Tattoo</h3>
                  <p className="text-gray-700 mb-2">
                    1960 San Pablo Ave<br />
                    Berkeley, CA
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=1960+San+Pablo+Ave+Berkeley+CA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm inline-flex items-center gap-1 hover:underline"
                    style={{ color: '#1740a5' }}
                  >
                    Get Directions <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start gap-4">
                <MapPin size={32} style={{ color: '#f2ca47' }} className="flex-shrink-0" />
                <div>
                  <h3 className="text-xl mb-2" style={{ color: '#1740a5' }}>Berkeley Optometrics</h3>
                  <p className="text-gray-700 mb-2">
                    2414 Shattuck Ave<br />
                    Berkeley, CA 94704
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=2414+Shattuck+Ave+Berkeley+CA+94704"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm inline-flex items-center gap-1 hover:underline"
                    style={{ color: '#1740a5' }}
                  >
                    Get Directions <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Link */}
          <div className="text-center">
            <a
              href="https://www.google.com/maps/d/u/0/viewer?ie=UTF8&hl=en&msa=0&z=12&mid=1YzCjTrcBhMpnr6B3MTFylRjLLEk&ll=37.87025459104505%2C-122.29652531298831"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="text-white px-8 py-4 inline-flex items-center gap-2"
                style={{ backgroundColor: '#1740a5' }}
              >
                <MapPin size={20} />
                View All Drop-off Locations on Map
                <ExternalLink size={16} />
              </Button>
            </a>
            <p className="text-sm text-gray-600 mt-4">
              See Google map of other locations to drop off your items in and near Berkeley
            </p>
          </div>
        </div>
      </div>

      {/* Planned Giving Modal */}
      {isPlannedGivingModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          onClick={() => setIsPlannedGivingModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="planned-giving-modal-title"
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-center relative z-10">
              <h2 id="planned-giving-modal-title" className="text-2xl text-center" style={{ color: '#1740a5' }}>
                Contact Us About Planned Giving
              </h2>
              <button
                onClick={() => setIsPlannedGivingModalOpen(false)}
                className="absolute right-6 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <X size={28} />
              </button>
            </div>

            {/* Modal Content - GHL Form */}
            <div className="p-6">
              <p className="text-gray-700 mb-6 text-center">
                Thank you for considering a planned gift to Berkeley Lions Club. Please fill out the form below and we'll be in touch soon to discuss how your legacy can make a lasting impact.
              </p>
              
              <div style={{ minHeight: '964px' }}>
                <iframe
                  src="https://links.montbluai.com/widget/form/ZRdEZmK5eF5tDJrRl1Mt"
                  style={{ width: '100%', height: '964px', border: 'none', borderRadius: '3px' }}
                  id="inline-ZRdEZmK5eF5tDJrRl1Mt" 
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Planned Giving"
                  data-height="964"
                  data-layout-iframe-id="inline-ZRdEZmK5eF5tDJrRl1Mt"
                  data-form-id="ZRdEZmK5eF5tDJrRl1Mt"
                  title="Planned Giving"
                >
                </iframe>
                <script src="https://links.montbluai.com/js/form_embed.js"></script>
              </div>

              <p className="text-center text-sm text-gray-600 mt-4">
                We respect <a href="/privacy" className="underline hover:no-underline" style={{ color: '#1740a5' }}>your privacy</a>. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
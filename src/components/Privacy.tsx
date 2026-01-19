import { FileText, Shield, Eye } from 'lucide-react';

type Page = 'home' | 'about' | 'gallery' | 'volunteer' | 'join' | 'donate' | 'contact' | 'privacy' | 'privacy-policy' | 'terms' | 'disclosures' | 'admin-upload';

interface PrivacyProps {
  onNavigate: (page: Page) => void;
}

export function Privacy({ onNavigate }: PrivacyProps) {
  const privacyLinks = [
    {
      title: 'Privacy Policy',
      description: 'Learn how we collect, use, and protect your personal information.',
      icon: Shield,
      page: 'privacy-policy' as Page,
      color: '#1740a5'
    },
    {
      title: 'Terms of Use',
      description: 'Review the terms and conditions for using our website and services.',
      icon: FileText,
      page: 'terms' as Page,
      color: '#7A2582'
    },
    {
      title: 'Disclosures',
      description: 'View important legal disclosures and regulatory information.',
      icon: Eye,
      page: 'disclosures' as Page,
      color: '#f2ca47'
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl mb-4" style={{ color: '#1740a5' }}>
              Your Privacy
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Berkeley Lions Club take the privacy of members, donors and volunteers seriously and continue to improve safety, security and service to anyone who visits our sites or uses our applications.
            </p>
          </div>

          {/* Privacy Links Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {privacyLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left"
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${link.color}15` }}
                  >
                    <Icon size={32} style={{ color: link.color }} />
                  </div>
                  <h2 className="text-2xl mb-3" style={{ color: link.color }}>
                    {link.title}
                  </h2>
                  <p className="text-gray-600">
                    {link.description}
                  </p>
                  <div className="mt-4 flex items-center" style={{ color: link.color }}>
                    <span className="mr-2">Learn More</span>
                    <span>→</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Additional Information */}
          <div className="bg-blue-50 rounded-lg p-8 mt-12">
            <h3 className="text-2xl mb-4" style={{ color: '#1740a5' }}>
              Questions or Concerns?
            </h3>
            <p className="text-gray-700 mb-4">
              If you have any questions about our privacy practices, terms of use, or legal disclosures, 
              please don't hesitate to contact us. We're here to help and ensure you feel comfortable 
              with how we handle your information.
            </p>
            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <div className="flex items-start">
                <div className="mr-3 mt-1">📧</div>
                <div>
                  <strong style={{ color: '#1740a5' }}>Email:</strong>
                  <p className="text-gray-700">legal@berkeleylions.org</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-3 mt-1">📞</div>
                <div>
                  <strong style={{ color: '#1740a5' }}>Phone:</strong>
                  <p className="text-gray-700">(510) 555-LION</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
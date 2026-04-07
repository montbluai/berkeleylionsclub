// Custom Facebook SVG Icon Component
const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// Custom Instagram SVG Icon Component
const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

type Page = 'home' | 'about' | 'gallery' | 'volunteer' | 'join' | 'donate' | 'contact' | 'privacy' | 'privacy-policy' | 'terms' | 'disclosures' | 'admin-upload';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNavigate = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load chat widget script
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[data-widget-id="69d498b39a2211e8cc58afd2"]');
    if (existingScript) {
      return;
    }

    try {
      const script = document.createElement('script');
      script.src = 'https://widgets.leadconnectorhq.com/loader.js';
      script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
      script.setAttribute('data-widget-id', '69d498b39a2211e8cc58afd2');
      script.async = true;
      
      document.body.appendChild(script);
    } catch (error) {
      console.error('Failed to load chat widget:', error);
    }
  }, []);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Tagline */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="https://i.imgur.com/M3Rdn46.png" alt="Berkeley Lions Club" className="h-16 w-16" />
              <div>
                <div className="text-xl">Berkeley Lions Club</div>
                <div className="text-sm" style={{ color: '#f2ca47' }}>We Serve</div>
              </div>
            </div>
            <p className="text-gray-400 max-w-md">
              Making a difference in Berkeley through service, fellowship, and community. 
              Part of Lions Clubs International since 1919.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4" style={{ color: '#f2ca47' }}>Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigate('about')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('gallery')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('volunteer')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Volunteer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('join')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Join Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('donate')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Donate
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('contact')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4" style={{ color: '#f2ca47' }}>Connect With Us</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="https://www.facebook.com/BerkeleyLions/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon size={20} />
              </a>
              <a
                href="https://www.instagram.com/berkeleylions/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
            </div>
            <div className="text-gray-400 text-sm">
              <p>Email: lionsberkeley@gmail.com</p>
              <p className="mt-1">Phone: (510) 391-LION</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="text-center md:text-left">
              <p>
                © 2026 Berkeley Lions Club. All rights reserved. | Tax ID: 83-2807583
              </p>
              <p className="mt-1">
                Website by Ami Saunders • <a 
                  href="https://montbluai.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  style={{ color: '#f2ca47' }}
                >
                  MontBlu AI
                </a>
              </p>
            </div>
            <div className="flex gap-6">
              <button 
                onClick={() => handleNavigate('privacy')}
                className="hover:text-white transition-colors"
              >
                Your Privacy
              </button>
              <button 
                onClick={() => handleNavigate('admin-upload')}
                className="hover:text-white transition-colors"
              >
                Admin Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
import { Facebook, Instagram } from 'lucide-react@0.487.0';

// Custom TikTok SVG Icon Component
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
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
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
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
                href="https://facebook.com/berkeleylionsclub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/berkeleylionsclub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://tiktok.com/@berkeleylionsclub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 hover:bg-black transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon size={20} />
              </a>
            </div>
            <div className="text-gray-400 text-sm">
              <p>Email: info@berkeleylions.org</p>
              <p className="mt-1">Phone: (510) 555-LION</p>
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
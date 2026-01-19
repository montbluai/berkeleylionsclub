import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

type Page = 'home' | 'about' | 'gallery' | 'volunteer' | 'join' | 'donate' | 'contact' | 'privacy' | 'terms';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLButtonElement>(null);

  const menuItems = [
    { id: 'home' as Page, label: 'Home' },
    { id: 'about' as Page, label: 'About Us' },
    { id: 'gallery' as Page, label: 'Photo Gallery' },
    { id: 'volunteer' as Page, label: 'Volunteer' },
    { id: 'join' as Page, label: 'Join Us' },
    { id: 'contact' as Page, label: 'Contact' },
  ];

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  // Focus management when mobile menu opens
  useEffect(() => {
    if (mobileMenuOpen) {
      firstMenuItemRef.current?.focus();
    }
  }, [mobileMenuOpen]);

  return (
    <nav 
      className="bg-white shadow-md sticky top-0 z-50"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded flex-shrink-0"
            style={{ 
              outlineColor: '#00338D'
            }}
            aria-label="Berkeley Lions Club, We Serve - Go to homepage"
          >
            <img src="https://i.imgur.com/M3Rdn46.png" alt="Berkeley Lions Club Logo" className="h-16 w-16" />
            <div className="text-left hidden sm:block whitespace-nowrap">
              <div style={{ color: '#00338D' }}>Berkeley Lions Club</div>
              <div className="text-sm" style={{ color: '#00338D' }}>We Serve</div>
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 ml-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`transition-all pb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded px-2 ${
                  currentPage === item.id
                    ? 'border-b-[3px]'
                    : 'hover:opacity-70 border-b-[3px] border-transparent'
                }`}
                style={{ 
                  color: '#00338D',
                  borderBottomColor: currentPage === item.id ? '#EBB700' : 'transparent',
                  borderBottomStyle: 'solid',
                  borderRadius: '4px 4px 0 0',
                  fontWeight: currentPage === item.id ? 600 : 400,
                  outlineColor: '#00338D'
                }}
                aria-current={currentPage === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavigate('donate')}
              className="px-6 py-2 rounded-lg transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ 
                backgroundColor: '#EBB700', 
                color: '#00338D',
                outlineColor: '#EBB700'
              }}
              aria-label="Make a donation to Berkeley Lions Club"
            >
              Donate
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={mobileMenuButtonRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
            style={{ 
              color: '#00338D',
              outlineColor: '#00338D'
            }}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden py-4 border-t border-gray-200"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                ref={index === 0 ? firstMenuItemRef : null}
                onClick={() => handleNavigate(item.id)}
                className={`block w-full text-left px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-inset ${
                  currentPage === item.id ? 'border-l-4' : 'border-l-4 border-transparent'
                }`}
                style={{ 
                  color: '#00338D',
                  borderLeftColor: currentPage === item.id ? '#EBB700' : 'transparent',
                  fontWeight: currentPage === item.id ? 600 : 400,
                  backgroundColor: currentPage === item.id ? '#F5F5F5' : 'transparent',
                  outlineColor: '#00338D'
                }}
                role="menuitem"
                aria-current={currentPage === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavigate('donate')}
              className="w-full mt-2 mx-4 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                backgroundColor: '#EBB700', 
                color: '#00338D',
                width: 'calc(100% - 2rem)',
                outlineColor: '#EBB700'
              }}
              role="menuitem"
              aria-label="Make a donation to Berkeley Lions Club"
            >
              Donate
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
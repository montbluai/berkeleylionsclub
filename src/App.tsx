import { useState } from 'react';
import { Home } from './components/Home';
import { About } from './components/About';
import { PhotoGallery } from './components/PhotoGallery';
import { Volunteer } from './components/Volunteer';
import { Join } from './components/Join';
import { Donate } from './components/Donate';
import { ContactUs } from './components/ContactUs';
import { Privacy } from './components/Privacy';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfUse } from './components/TermsOfUse';
import { Disclosures } from './components/Disclosures';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { AdminGalleryUpload } from './components/AdminGalleryUpload';

type Page = 'home' | 'about' | 'gallery' | 'volunteer' | 'join' | 'donate' | 'contact' | 'privacy' | 'privacy-policy' | 'terms' | 'disclosures' | 'admin-upload';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    // Scroll to top of page when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'gallery':
        return <PhotoGallery />;
      case 'volunteer':
        return <Volunteer />;
      case 'join':
        return <Join />;
      case 'donate':
        return <Donate />;
      case 'contact':
        return <ContactUs />;
      case 'privacy':
        return <Privacy onNavigate={handleNavigate} />;
      case 'privacy-policy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsOfUse />;
      case 'disclosures':
        return <Disclosures />;
      case 'admin-upload':
        return <AdminGalleryUpload />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
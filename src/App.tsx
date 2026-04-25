import { useState, useEffect } from 'react';
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
import { AdminDashboard } from './components/AdminDashboard';

type Page = 'home' | 'about' | 'gallery' | 'volunteer' | 'join' | 'donate' | 'contact' | 'privacy' | 'privacy-policy' | 'terms' | 'disclosures' | 'admin-upload';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Initialize demo featured event if none exists or if existing event is past
  useEffect(() => {
    const existing = localStorage.getItem('featured_event');
    let shouldCreateDemo = false;
    
    if (!existing) {
      shouldCreateDemo = true;
    } else {
      try {
        const event = JSON.parse(existing);
        const eventDate = new Date(event.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (eventDate < today) {
          shouldCreateDemo = true;
        }
      } catch (e) {
        shouldCreateDemo = true;
      }
    }
    
    if (shouldCreateDemo) {
      const demoEvent = {
        posterUrl: 'https://images.unsplash.com/photo-1768162125903-e142cba00c9f?w=800',
        eventName: 'Berkeley Lions Club Spring BBQ Event',
        description: 'Join us for our spring community event! Volunteers needed to help make this event a success.',
        date: '2026-05-15',
        time: 'Doors at 5:00 PM, Dinner at 6:00 PM',
        locationName: 'Northbrae Community Church',
        address: '941 the Alameda, Berkeley, CA',
        volunteersNeeded: '15-20 people',
        ageRequirement: 'All ages welcome!',
        volunteerTasks: [
          'Set up tables and chairs',
          'Grill burgers and hot dogs',
          'Serve food to guests',
          'Welcome attendees',
          'Help with cleanup',
          'Assist with beverage station',
          'General event support'
        ],
        isFree: false,
        ticketPrice: '$25 per person',
        squarePaymentLink: '',
        togoAvailable: false,
        additionalInfo: 'No experience necessary! We provide training and all supplies.'
      };
      localStorage.setItem('featured_event', JSON.stringify(demoEvent));
    }
  }, []);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
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
        return <AdminDashboard />;
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
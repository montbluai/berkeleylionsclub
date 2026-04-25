import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Eye, Heart, Users, HandHeart, Calendar, MapPin, Play, Pause, Ticket, X, Download } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { EventsCalendar } from './EventsCalendar';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const heroImages = [
  {
    url: 'https://i.imgur.com/gmLKfYP.jpg',
    caption: 'Making a Difference Together'
  },
  {
    url: 'https://i.imgur.com/3LofKup.jpg',
    caption: 'Serving Our Community'
  },
  {
    url: 'https://i.imgur.com/8RE6Gy7.jpg',
    caption: 'Building Better Bonds'
  },
  {
    url: 'https://i.imgur.com/yrJ6DEM.jpg',
    caption: 'Fun and Fellowship'
  }
];

export function Home({ onNavigate }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFlyerModalOpen, setIsFlyerModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const carouselRef = useRef<HTMLElement>(null);
  const mainContentRef = useRef<HTMLElement>(null);
  const flyerTriggerRef = useRef<HTMLImageElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // Check for prefers-reduced-motion and auto-pause if enabled
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsPaused(true);
    }
  }, []);

  // Auto-pause when carousel receives focus (keyboard navigation)
  useEffect(() => {
    const handleFocusIn = () => {
      setIsPaused(true);
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('focusin', handleFocusIn);
      return () => carousel.removeEventListener('focusin', handleFocusIn);
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const skipToMainContent = () => {
    mainContentRef.current?.focus();
    mainContentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Handle ESC key for modals
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isTicketModalOpen) {
          setIsTicketModalOpen(false);
          // Return focus to the last focused element
          if (lastFocusedElement.current) {
            lastFocusedElement.current.focus();
          }
        } else if (isFlyerModalOpen) {
          setIsFlyerModalOpen(false);
          flyerTriggerRef.current?.focus();
        }
      }
    };
    
    if (isTicketModalOpen || isFlyerModalOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isTicketModalOpen, isFlyerModalOpen]);

  return (
    <div>
      {/* Skip to Main Content Link */}
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          skipToMainContent();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:rounded-md focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
        style={{ backgroundColor: '#00338D' }}
      >
        Skip to main content
      </a>

      {/* Hero Slideshow */}
      <section 
        className="relative h-[500px] md:h-[600px] overflow-hidden"
        role="region"
        aria-label="Photo slideshow"
        aria-live="polite"
        aria-atomic="true"
        ref={carouselRef}
      >
        {heroImages.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={index !== currentSlide}
          >
            <img
              src={slide.url}
              alt={slide.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl mb-4">{slide.caption}</h1>
                <p className="text-xl md:text-2xl mb-8" style={{ color: '#EBB700' }}>
                  Join the Berkeley Lions Club
                </p>
                <Button
                  onClick={() => onNavigate('join')}
                  className="text-white text-lg px-8 py-6"
                  style={{ backgroundColor: '#00338D' }}
                  tabIndex={index === currentSlide ? 0 : -1}
                  aria-hidden={index !== currentSlide}
                >
                  Become a Lion Today
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ color: '#00338D', outlineColor: '#00338D' }}
          aria-label="Previous slide"
        >
          <ChevronLeft size={32} aria-hidden="true" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ color: '#00338D', outlineColor: '#00338D' }}
          aria-label="Next slide"
        >
          <ChevronRight size={32} aria-hidden="true" />
        </button>

        {/* Pause/Play Control */}
        <button
          onClick={togglePause}
          className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ color: '#00338D', outlineColor: '#00338D' }}
          aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
          aria-pressed={isPaused}
        >
          {isPaused ? <Play size={24} aria-hidden="true" /> : <Pause size={24} aria-hidden="true" />}
        </button>

        {/* Slide Indicators */}
        <div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
          role="group"
          aria-label="Slideshow navigation"
        >
          {heroImages.map((slide, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}: ${slide.caption}`}
              aria-current={index === currentSlide ? 'true' : 'false'}
            />
          ))}
        </div>

        {/* Screen reader status */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Slide {currentSlide + 1} of {heroImages.length}: {heroImages[currentSlide].caption}
        </div>
      </section>

      {/* Quick Intro */}
      <section 
        id="main-content"
        ref={mainContentRef}
        tabIndex={-1}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-6" style={{ color: '#00338D' }}>
              Welcome to the Berkeley Lions Club
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              We are a vibrant community of volunteers dedicated to serving Berkeley and beyond. 
              From vision care to hunger relief, we tackle the challenges our community faces while 
              having fun and building lasting friendships.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                onClick={() => onNavigate('about')}
                className="text-white px-6 py-3"
                style={{ backgroundColor: '#00338D' }}
              >
                Learn About Us
              </Button>
              <Button
                onClick={() => onNavigate('gallery')}
                className="text-white px-6 py-3"
                style={{ backgroundColor: '#EBB700' }}
              >
                View Photo Gallery
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl text-center mb-12" style={{ color: '#EBB700' }}>
            How We Serve
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#00338D' }}>
                <Heart className="text-white" size={32} aria-hidden="true" />
              </div>
              <h3 className="text-xl mb-3" style={{ color: '#00338D' }}>Community Service</h3>
              <p className="text-gray-700">
                From food drives to environmental cleanups, we're committed to making Berkeley better.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#EBB700' }}>
                <Users className="text-white" size={32} aria-hidden="true" />
              </div>
              <h3 className="text-xl mb-3" style={{ color: '#00338D' }}>Fellowship & Fun</h3>
              <p className="text-gray-700">
                Build meaningful friendships while making a difference in your community.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#00338D' }}>
                <HandHeart className="text-white" size={32} aria-hidden="true" />
              </div>
              <h3 className="text-xl mb-3" style={{ color: '#00338D' }}>Volunteer Opportunities</h3>
              <p className="text-gray-700">
                Monthly events where you can give back, whether you're a member or community supporter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-6">
              <span style={{ color: '#EBB700' }}>Featured</span> <span style={{ color: '#00338D' }}>Event</span>
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
                {/* Event Flyer - Clickable */}
                <div className="w-full md:w-2/5 flex-shrink-0">
                  <img 
                    src="https://i.imgur.com/18gfyLU.jpg"
                    alt="Berkeley Lions Club Casino Night 2026. Saturday, May 30, 2026. Northbrae Community Church, 941 The Alameda, Berkeley, California. Doors 6:00 PM to Closing 10:00 PM. $75 per ticket. $1000 Sponsor Tables (10 tickets per sponsor table). Buffet Dinner. No Host Bar. Roaring '20s Theme. Costume Contest. Blackjack, Roulette, Craps. A night of: Raffle Prizes, Live Vegas Lounge Act, Dancing & Entertainment. Try Your Luck and Win Big! Event benefiting our local community projects, the Lions Center for the Visually Impaired, and the Berkeley Youth Alternative."
                    className="w-full rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => setIsFlyerModalOpen(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsFlyerModalOpen(true);
                      }
                    }}
                    ref={flyerTriggerRef}
                  />
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    Click to view full size
                  </p>
                </div>
                
                {/* Event Details */}
                <div className="flex-1 text-left">
                  <h3 className="text-2xl mb-4" style={{ color: '#00338D' }}>
                    Berkeley Lions Casino Night 2026
                  </h3>
                  <p className="text-lg text-gray-700 mb-4">
                    Join us for our first annual Casino Night event! An evening of fun, food, and activities to support our community service programs.
                  </p>
                  <p className="mb-4" style={{ color: '#00338D' }}>
                    <strong>Saturday, May 30th, 2026</strong><br />
                    Doors at 6:00 PM to 10:00 PM<br />
                    Northbrae Community Church, 941 the Alameda, Berkeley, CA
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setIsTicketModalOpen(true)}
                  className="text-lg px-8 py-4 inline-flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#EBB700', color: '#00338D' }}
                >
                  <Ticket size={20} aria-hidden="true" />
                  Buy Tickets
                </Button>
                <Button
                  onClick={() => onNavigate('volunteer')}
                  className="text-white text-lg px-8 py-4 inline-flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#00338D' }}
                >
                  <HandHeart size={20} aria-hidden="true" />
                  Volunteer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Calendar - All Events */}
      <EventsCalendar
        calendars={[
          {
            id: '44079359e25481954fdb2a82e75f3cb977cb897283481cd2c8c8c0b45882d2a8@group.calendar.google.com',
            name: '🤝 Volunteer Opportunities',
            color: '#00338D'
          },
          {
            id: '230dbe79b903ae2fa91d462591b91a12c751a69972ac68c0e6d612779836ea29@group.calendar.google.com',
            name: '💰 Fundraising Events',
            color: '#EBB700'
          },
          {
            id: 'f3cdc1051ae2cf0820279bbb8d51621da9cc2266ba33405e132a9c7a600b2bec@group.calendar.google.com',
            name: '📋 Member Meetings',
            color: '#7A2582'
          }
        ]}
        title="Upcoming Events"
        description="Stay up to date with all Berkeley Lions Club activities. Toggle event types to customize your view."
        showToggle={true}
      />

      {/* Flyer Modal */}
      {isFlyerModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
          onClick={() => setIsFlyerModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="flyer-modal-title"
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsFlyerModalOpen(false)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors z-10"
              aria-label="Close modal"
            >
              <X size={32} />
            </button>

            {/* Download Button */}
            <a
              href="https://i.imgur.com/18gfyLU.jpg"
              download="Berkeley-Lions-Casino-Night-2026-Flyer.jpg"
              className="absolute top-4 left-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors z-10 inline-flex items-center gap-2"
              aria-label="Download flyer"
            >
              <Download size={32} />
            </a>

            {/* Scrollable Image Container */}
            <div className="w-full h-full overflow-auto flex items-start justify-center p-4">
              <img
                src="https://i.imgur.com/18gfyLU.jpg"
                alt="Berkeley Lions Club Casino Night 2026. Saturday, May 30, 2026. Northbrae Community Church, 941 The Alameda, Berkeley, California. Doors 6:00 PM to Closing 10:00 PM. $75 per ticket. $1000 Sponsor Tables (10 tickets per sponsor table). Buffet Dinner. No Host Bar. Roaring '20s Theme. Costume Contest. Blackjack, Roulette, Craps. A night of: Raffle Prizes, Live Vegas Lounge Act, Dancing & Entertainment. Try Your Luck and Win Big! Event benefiting our local community projects, the Lions Center for the Visually Impaired, and the Berkeley Youth Alternative."
                className="w-full max-w-full h-auto"
                id="flyer-modal-title"
              />
            </div>
          </div>
        </div>
      )}

      {/* Ticket Modal */}
      {isTicketModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setIsTicketModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ticket-modal-title"
        >
          <div
            className="relative bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsTicketModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Modal Title */}
            <h2 id="ticket-modal-title" className="text-3xl mb-2 text-center" style={{ color: '#00338D' }}>
              Choose Your Ticket
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Berkeley Lions Casino Night 2026 • May 30, 2026
            </p>

            {/* Ticket Options */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Single Ticket */}
              <div className="border-2 rounded-lg p-6 text-center hover:shadow-lg transition-shadow" style={{ borderColor: '#00338D' }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#00338D' }}>
                  <Ticket className="text-white" size={32} aria-hidden="true" />
                </div>
                <h3 className="text-2xl mb-2" style={{ color: '#00338D' }}>Single Tickets</h3>
                <p className="text-4xl mb-4" style={{ color: '#00338D' }}>$75</p>
                <p className="text-gray-700 mb-6">
                  Individual admission with buffet dinner, gaming chips, and entertainment
                </p>
                <Button
                  onClick={() => window.open('https://square.link/u/glCEEYYF', '_blank')}
                  className="w-full text-white text-lg px-6 py-3"
                  style={{ backgroundColor: '#00338D' }}
                >
                  Purchase Single Tickets
                </Button>
              </div>

              {/* Sponsor Table */}
              <div className="border-2 rounded-lg p-6 text-center hover:shadow-lg transition-shadow relative" style={{ borderColor: '#EBB700' }}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: '#7A2582' }}>
                  Best Value
                </div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#EBB700' }}>
                  <Users className="text-white" size={32} aria-hidden="true" />
                </div>
                <h3 className="text-2xl mb-2" style={{ color: '#00338D' }}>Sponsor Table</h3>
                <p className="text-4xl mb-4" style={{ color: '#00338D' }}>$1,000</p>
                <p className="text-gray-700 mb-6">
                  Table of 10 with premium seating, company recognition, and all the perks
                </p>
                <Button
                  onClick={() => window.open('https://square.link/u/tqCLM2qY', '_blank')}
                  className="w-full text-lg px-6 py-3"
                  style={{ backgroundColor: '#EBB700', color: '#00338D' }}
                >
                  Purchase Sponsor Table
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
              <p>Proceeds benefit local community projects and vision care programs</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
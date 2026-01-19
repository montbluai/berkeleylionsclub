import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Users, HandHeart, Pause, Play } from 'lucide-react@0.487.0';
import { Button } from './ui/button';
import { EventsCalendar } from './EventsCalendar';
import { EmailSignup } from './EmailSignup';

type Page = 'home' | 'about' | 'gallery' | 'volunteer' | 'join' | 'donate';

interface HomeProps {
  onNavigate: (page: Page) => void;
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
  const carouselRef = useRef<HTMLElement>(null);
  const mainContentRef = useRef<HTMLElement>(null);

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

      {/* Current Volunteer Opportunity */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-6">
              <span style={{ color: '#EBB700' }}>Featured</span> <span style={{ color: '#00338D' }}>Volunteer Opportunity</span>
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <h3 className="text-2xl mb-4" style={{ color: '#00338D' }}>
                Berkeley Lions Club Crab Feed 2026
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Join us for our annual fundraising dinner! We need 20-30 volunteers of all ages 
                to help make this event a success. Cook and serve food, set up and break down the 
                dining room, welcome diners, help with to-go orders, and more. No experience necessary 
                - we provide training and all supplies!
              </p>
              <p className="mb-6" style={{ color: '#00338D' }}>
                Friday, February 7th, 2026 | Doors at 5:00 PM, Dinner at 7:00 PM | Northbrae Community Church, 941 the Alameda, Berkeley, CA
              </p>
              <Button
                onClick={() => onNavigate('volunteer')}
                className="text-white text-lg px-8 py-4"
                style={{ backgroundColor: '#00338D' }}
              >
                Sign Up to Volunteer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Calendar - All Events */}
      <EventsCalendar
        calendars={[
          {
            id: '4407935e25481954fdb2a82e75f3cb977cb897283481cd2c8c8c0b45882d2a8@group.calendar.google.com',
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

      {/* Email Signup */}
      <EmailSignup />
    </div>
  );
}
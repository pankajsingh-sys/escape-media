import { useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader/Preloader';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Stats from './components/Stats/Stats';
import About from './components/About/About';
import Statement from './components/Statement/Statement';
import Services from './components/Services/Services';
import SocialProof from './components/SocialProof/SocialProof';
import FAQ from './components/FAQ/FAQ';
import ContactCTA from './components/ContactCTA/ContactCTA';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);

    // Hero content reveal sequence
    const heroElements = document.querySelectorAll('[data-animate="hero"]');
    gsap.fromTo(heroElements,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.1,
      }
    );

    // Hero image clip-path reveal
    const heroMedia = document.querySelector('.hero-media');
    if (heroMedia) {
      gsap.fromTo(heroMedia,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power3.inOut',
        }
      );
    }
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <div className="grain-overlay" aria-hidden="true"></div>

      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Statement />
        <Services />
        <SocialProof />
        <FAQ />
        <ContactCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

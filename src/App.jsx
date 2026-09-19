import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Stats from './components/Stats/Stats';
import About from './components/About/About';
import Statement from './components/Statement/Statement';
import Services from './components/Services/Services';
import SocialProof from './components/SocialProof/SocialProof';
import Testimonials from './components/Testimonials/Testimonials';
import FAQ from './components/FAQ/FAQ';
import ContactCTA from './components/ContactCTA/ContactCTA';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import AboutPage from './pages/About/AboutPage';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [location.hash]);

  return (
    <main>
      <Hero />
      <Stats />
      <About />
      <Statement />
      <Services />
      <SocialProof />
      <Testimonials number="05" />
      <FAQ />
      <ContactCTA />
      <Contact />
    </main>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <div className="grain-overlay" aria-hidden="true"></div>

      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </>
  );
}

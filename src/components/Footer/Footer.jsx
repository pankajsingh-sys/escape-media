import { useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/' + id);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-accent-line', {
        scaleX: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%', once: true },
      });
      gsap.from('.footer-brand-logo', {
        opacity: 0, y: 20, duration: 0.6,
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%', once: true },
      });
      gsap.from('.footer-col', {
        opacity: 0, y: 15, duration: 0.4, stagger: 0.1,
        scrollTrigger: { trigger: '.footer-top', start: 'top 90%', once: true },
      });
      gsap.from('.footer-tagline', {
        opacity: 0, y: 10, duration: 0.5, delay: 0.5,
        scrollTrigger: { trigger: '.footer-bottom', start: 'top 95%', once: true },
      });
      gsap.from('.footer-massive-text', {
        opacity: 0,
        y: 100,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-massive-text', start: 'top 95%', once: true },
      });
      
      // Infinite marquee animation
      gsap.to('.marquee-content', {
        xPercent: -50,
        ease: 'none',
        duration: 45, // Slowed down significantly
        repeat: -1,
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={footerRef} role="contentinfo">
      <div className="container">
        <div className="footer-accent-line" aria-hidden="true"></div>

        <div className="footer-top">
          <div className="footer-col">
            <div className="footer-brand-logo">
              <img src="/images/logo.png" alt="Escape Media" className="footer-logo-img" />
            </div>
            <p className="footer-brand-blurb">
              Escape Media is a creative agency turning bold ideas into memorable brands. We blend strategy, storytelling, design, and content to help brands stand out, connect, and grow.
            </p>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">Extra links</p>
            <div className="footer-col-links">
              <a href="#" className="footer-link">Esckul</a>
              <a href="#" className="footer-link">Escape Events</a>
              <a href="#contact" className="footer-link" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
            </div>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">Popular Topics</p>
            <div className="footer-col-links">
              <a href="#services" className="footer-link" onClick={(e) => handleNavClick(e, '#services')}>Our Services</a>
              <a href="#contact" className="footer-link" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
              <Link to="/about" className="footer-link">About Us</Link>
            </div>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">Contact</p>
            <div className="footer-col-links">
              <span className="footer-link" style={{ lineHeight: 1.5 }}>
                Plot D, Phase 8B, Industrial Area,<br />
                Sector 74, Sahibzada Ajit Singh Nagar,<br />
                Punjab 140307
              </span>
              <a href="tel:+91828916265" className="footer-link">+91 828916265</a>
              <a href="mailto:info@escapemedia.com" className="footer-link">info@escapemedia.com</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copyright">© 2026 Escape Media</span>
          <span className="footer-tagline">Your Brand. Our Creativity.</span>
        </div>

        <div className="footer-massive-text" aria-hidden="true">
          <div className="marquee-content">
            <span>ESCAPE MEDIA • ESCAPE MEDIA • ESCAPE MEDIA •&nbsp;</span>
            <span>ESCAPE MEDIA • ESCAPE MEDIA • ESCAPE MEDIA •&nbsp;</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

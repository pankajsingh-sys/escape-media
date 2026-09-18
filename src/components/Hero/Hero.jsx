import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle parallax on mouse move (desktop only)
      if (window.matchMedia('(hover: hover)').matches) {
        const handleMouseMove = (e) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 10;
          const y = (e.clientY / window.innerHeight - 0.5) * 10;
          gsap.to(imageRef.current, {
            x, y,
            duration: 1.2,
            ease: 'power2.out'
          });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const scrollToContent = () => {
    const stats = document.querySelector('#stats');
    if (stats) stats.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" ref={heroRef} id="hero" aria-label="Hero">
      <div className="hero-media">
        <img
          ref={imageRef}
          src="/images/hero-bg.jpg"
          alt="Professional creative production team working in a cinematic film studio"
          loading="eager"
          fetchPriority="high"
          style={{ transform: 'scale(1.05)' }}
        />
      </div>
      <div className="hero-overlay" aria-hidden="true"></div>

      <div className="hero-content">
        <p className="hero-eyebrow" data-animate="hero">
          Creative Agency · India
        </p>
        <h1 className="hero-heading" data-animate="hero">
          Your Brand.<br />
          Our <span className="accent">Creativity.</span>
        </h1>
        <p className="hero-sub" data-animate="hero">
          We transform ambitious ideas into bold brands, powerful content, and digital experiences that demand attention.
        </p>
        <div className="hero-buttons" data-animate="hero">
          <a href="#services" className="btn btn-primary" onClick={(e) => handleNavClick(e, '#services')}>
            Explore Services <span className="btn-arrow">→</span>
          </a>
          <a href="#contact" className="btn btn-secondary" onClick={(e) => handleNavClick(e, '#contact')}>
            Book a Call <span className="btn-arrow">↗</span>
          </a>
        </div>
      </div>

      <div className="hero-scroll" onClick={scrollToContent} data-animate="hero" role="button" tabIndex={0} aria-label="Scroll to explore">
        <span>Scroll to Explore</span>
        <div className="hero-scroll-line" aria-hidden="true"></div>
      </div>
    </section>
  );
}

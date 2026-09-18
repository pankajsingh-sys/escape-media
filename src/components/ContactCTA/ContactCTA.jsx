import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactCTA.css';

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      });
      tl.from('.contact-cta-heading', { opacity: 0, y: 40, duration: 0.8 })
        .from('.contact-cta-buttons .btn', { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }, '-=0.3');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="contact-cta" ref={sectionRef} aria-label="Call to action">
      <div className="container">
        <div className="contact-cta-inner">
          <h2 className="contact-cta-heading">
            Ready to make<br />
            something <span className="accent">unforgettable?</span>
          </h2>
          <div className="contact-cta-buttons">
            <a href="#contact" className="btn btn-primary" onClick={(e) => handleClick(e, '#contact')}>
              Book a Call <span className="btn-arrow">→</span>
            </a>
            <a href="#contact" className="btn btn-secondary" onClick={(e) => handleClick(e, '#contact')}>
              Contact Us <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

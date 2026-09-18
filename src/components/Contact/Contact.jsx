import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-heading', {
        opacity: 0, y: 30, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
      gsap.from('.contact-block', {
        opacity: 0, y: 20, duration: 0.5, stagger: 0.15,
        scrollTrigger: { trigger: '.contact-grid', start: 'top 85%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="contact" id="contact" ref={sectionRef} aria-label="Contact information">
      <div className="container">
        <h2 className="contact-heading">Get in Touch</h2>
        <div className="contact-grid">
          <div className="contact-block">
            <p className="contact-label">Address</p>
            <p className="contact-value">
              Plot D, Phase 8B, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab 140307
            </p>
          </div>
          <div className="contact-block">
            <p className="contact-label">Phone</p>
            <a href="tel:+91828916265" className="contact-link">+91 828916265</a>
          </div>
          <div className="contact-block">
            <p className="contact-label">Email</p>
            <a href="mailto:info@escapemedia.com" className="contact-link">info@escapemedia.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}

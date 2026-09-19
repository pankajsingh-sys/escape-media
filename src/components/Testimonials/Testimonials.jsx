import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Rahul Mehta',
    role: 'Founder, India',
    quote: 'Escape Media helped me turn my expertise into a personal brand with a clear voice and strong presence. The entire process felt strategic, creative, and genuinely aligned with who I am.',
  },
  {
    name: 'Ahmed Al Mansoori',
    role: 'Business Owner, Dubai',
    quote: 'Escape Media brought a completely different level of strategy to our digital marketing. The campaigns became more focused, measurable, and aligned with our business goals.',
  },
  {
    name: 'James Wilson',
    role: 'Founder, Australia',
    quote: 'Escape Media took our social media from inconsistent posting to a proper content strategy. The quality of the creative and the consistency of execution have been impressive.',
  },
  {
    name: 'Daniel Carter',
    role: 'CEO, Canada',
    quote: 'We wanted a brand that looked as professional as the business we had built. Escape Media understood our vision and created an identity that feels distinctive, modern, and memorable.',
  },
  {
    name: 'Liam Thompson',
    role: 'Entrepreneur, New Zealand',
    quote: 'Escape Media helped me understand that personal branding is much more than posting online. They gave me a clear strategy and transformed my expertise into a brand people can connect with.',
  },
  {
    name: 'Felix Schneider',
    role: 'Marketing Director, Germany',
    quote: 'The team understood our story quickly and translated it into a powerful visual concept. The production quality, creative direction, and attention to detail were excellent.',
  },
  {
    name: 'Oliver Bennett',
    role: 'Managing Director, UK',
    quote: 'Escape Media brought clarity and structure to our performance marketing. Their approach to creative testing, targeting, and campaign strategy gave us a much stronger marketing engine.',
  },
];

function initials(name) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2);
}

export default function Testimonials({ number = '05' }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.section-label', {
        opacity: 0, y: 20, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
      gsap.from('.testimonials-heading', {
        opacity: 0, y: 30, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
      gsap.from('.testimonial-card', {
        opacity: 0, y: 25, duration: 0.6, stagger: 0.1,
        scrollTrigger: { trigger: '.testimonials-track', start: 'top 85%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // A trackpad's "vertical" scroll almost always carries a tiny horizontal
    // component. Since this track scrolls horizontally, the browser would
    // otherwise swallow the whole gesture trying to scroll it sideways,
    // making the page feel stuck here. When the gesture is vertically
    // dominant, forward it to the page instead of letting the track eat it.
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        window.scrollBy(0, e.deltaY);
      }
    };

    track.addEventListener('wheel', handleWheel, { passive: false });
    return () => track.removeEventListener('wheel', handleWheel);
  }, []);

  const scrollToSlide = useCallback((index) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index];
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  }, []);

  const handlePrev = () => scrollToSlide(Math.max(0, activeSlide - 1));
  const handleNext = () => scrollToSlide(Math.min(testimonials.length - 1, activeSlide + 1));

  const handleTrackScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children);
    const trackLeft = track.scrollLeft;
    let closest = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - track.offsetLeft - trackLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveSlide(closest);
  }, []);

  return (
    <section className="testimonials" ref={sectionRef} id="testimonials" aria-label="Client testimonials">
      <div className="container">
        <div className="testimonials-header">
          <div>
            <p className="section-label"><span>{number}</span> — Testimonials</p>
            <h2 className="section-heading testimonials-heading">Words From Our Clients.</h2>
          </div>
          <div className="testimonial-nav">
            <button
              type="button"
              className="testimonial-nav-btn"
              onClick={handlePrev}
              disabled={activeSlide === 0}
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              type="button"
              className="testimonial-nav-btn"
              onClick={handleNext}
              disabled={activeSlide === testimonials.length - 1}
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>

        <div
          className="testimonials-track"
          ref={trackRef}
          onScroll={handleTrackScroll}
          role="list"
        >
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.name} role="listitem">
              <span className="testimonial-quote-mark" aria-hidden="true">&ldquo;</span>
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-meta">
                <span className="testimonial-avatar">{initials(t.name)}</span>
                <div>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonial-dots">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              className={`testimonial-dot${i === activeSlide ? ' active' : ''}`}
              onClick={() => scrollToSlide(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

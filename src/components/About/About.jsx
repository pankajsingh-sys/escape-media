import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        }
      });

      tl.from('.about-heading', { opacity: 0, y: 30, duration: 0.7 })
        .from('.about-image-wrapper', {
          opacity: 0,
          clipPath: 'inset(100% 0 0 0)',
          duration: 1,
          ease: 'power3.out',
        }, '-=0.4')
        .from('.about-body p', { opacity: 0, y: 20, duration: 0.5, stagger: 0.15 }, '-=0.5')
        .from('.statement-word', { opacity: 0, y: 20, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, '-=0.2')
        .from('.about-tagline', { opacity: 0, y: 10, duration: 0.4 }, '-=0.2')
        .from('.about .btn-text', { opacity: 0, y: 10, duration: 0.4 }, '-=0.1');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const el = document.querySelector('#about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="about" id="about" ref={sectionRef} aria-label="About Escape Media">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <h2 className="about-heading">
              Built Different.<br />
              Created With Purpose.
            </h2>
            <div className="about-body">
              <p>
                Escape Media is a creative agency helping ambitious brands stand out, connect, and grow.
                We combine strategy, storytelling, design, and content to turn ideas into experiences
                that leave a lasting impression.
              </p>
            </div>
            <p className="about-statement">
              {'We create stories people feel. Content people watch. Brands people remember.'.split(' ').map((word, i) => (
                <span key={i} className="statement-word">{word}&nbsp;</span>
              ))}
            </p>
            <p className="about-tagline">Your Brand. Our Creativity.</p>
            <a href="#about" className="btn-text" onClick={handleClick}>
              Learn More <span className="btn-arrow">→</span>
            </a>
          </div>
          <div className="about-image-wrapper">
            <img
              src="/images/about-team-portrait.jpg"
              alt="Escape Media creative team collaborating in their studio"
              loading="lazy"
              width="600"
              height="800"
            />
            <span className="about-image-caption">Team Escape Media</span>
          </div>
        </div>
      </div>
    </section>
  );
}

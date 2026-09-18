import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Statement.css';

gsap.registerPlugin(ScrollTrigger);

const lines = [
  'We create stories people feel.',
  'Content people watch.',
  'Brands people remember.',
];

export default function Statement() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.statement-line', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      });
      gsap.from('.statement-accent', {
        scaleX: 0,
        duration: 0.8,
        delay: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="statement" ref={sectionRef} aria-label="Brand statement">
      <div className="container">
        <div className="statement-inner">
          {lines.map((line, i) => (
            <p key={i} className="statement-line">{line}</p>
          ))}
          <div className="statement-accent" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  );
}

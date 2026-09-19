import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SocialProof.css';

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { name: 'Aura', svg: <svg viewBox="0 0 100 30" fill="currentColor" width="100"><text x="50" y="22" fontSize="22" fontFamily="var(--font-heading)" fontWeight="600" textAnchor="middle" letterSpacing="2">AURA</text></svg> },
  { name: 'Vortex', svg: <svg viewBox="0 0 100 30" fill="currentColor" width="100"><text x="50" y="22" fontSize="24" fontFamily="serif" fontStyle="italic" textAnchor="middle" letterSpacing="1">Vortex</text></svg> },
  { name: 'Lumina', svg: <svg viewBox="0 0 100 30" fill="currentColor" width="100"><text x="50" y="22" fontSize="18" fontFamily="var(--font-heading)" fontWeight="800" textAnchor="middle" letterSpacing="4">LUMINA</text></svg> },
  { name: 'Echo', svg: <svg viewBox="0 0 100 30" fill="currentColor" width="100"><text x="50" y="22" fontSize="20" fontFamily="serif" textAnchor="middle" letterSpacing="2">E C H O</text></svg> },
  { name: 'Nova', svg: <svg viewBox="0 0 100 30" fill="currentColor" width="100"><text x="50" y="22" fontSize="18" fontFamily="var(--font-body)" fontWeight="300" textAnchor="middle" letterSpacing="5">N O V A</text></svg> },
];

export default function SocialProof() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.social-proof-header', {
        opacity: 0, y: 30, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
      gsap.from('.logo-item', {
        opacity: 0, y: 15, duration: 0.4, stagger: 0.08,
        scrollTrigger: { trigger: '.logo-grid', start: 'top 85%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="social-proof" ref={sectionRef} aria-label="Trusted by clients">
      <div className="container">
        <div className="social-proof-header">
          <h2 className="social-proof-heading">Loved by Brands</h2>
          <p className="social-proof-sub">Serving 100+ Clients Globally</p>
        </div>

        <div className="logo-grid">
          {brands.map((brand, i) => (
            <div className="logo-item" key={i} aria-label={`${brand.name} logo`}>
              <div className="brand-logo">
                {brand.svg}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

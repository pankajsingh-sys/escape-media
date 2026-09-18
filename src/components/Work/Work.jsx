import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Work.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    category: 'Brand Identity',
    title: 'Apex Dynamics',
    year: '2025',
    images: ['https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80&auto=format&fit=crop'],
  },
  {
    category: 'Content Production',
    title: 'Lumina Studio',
    year: '2025',
    images: [
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    category: 'Digital Experience',
    title: 'Echo Systems',
    year: '2024',
    images: ['https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200&q=80&auto=format&fit=crop'],
  },
];

export default function Work() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-header .section-label', {
        opacity: 0, y: 20, duration: 0.6,
        scrollTrigger: { trigger: '.work-header', start: 'top 80%', once: true },
      });
      gsap.from('.work-heading', {
        opacity: 0, y: 30, duration: 0.7,
        scrollTrigger: { trigger: '.work-header', start: 'top 80%', once: true },
      });

      document.querySelectorAll('.work-item').forEach((item) => {
        gsap.from(item, {
          opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 80%', once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="work" ref={sectionRef} aria-label="Selected work">
      <div className="container">
        <div className="work-header">
          <p className="section-label"><span>03</span> — Selected Work</p>
          <h2 className="work-heading">Work worth remembering.</h2>
        </div>

        <div className="work-grid">
          {projects.map((project, i) => (
            <article className="work-item" key={i}>
              <div className="work-image-wrapper">
                {project.images.map((img, j) => (
                  <img
                    key={j}
                    src={img}
                    alt={`${project.category} project visual`}
                    loading="lazy"
                    width="1200"
                    height="600"
                  />
                ))}
              </div>
              <div className="work-meta">
                <div className="work-meta-left">
                  <h3 className="work-title">{project.title}</h3>
                  <div className="work-tags">
                    <span className="work-category">{project.category}</span>
                    <span className="work-tag-separator">•</span>
                    <span className="work-year">{project.year}</span>
                  </div>
                </div>
                <span className="work-link">
                  View Project <span className="btn-arrow">→</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Testimonials from '../../components/Testimonials/Testimonials';
import './AboutPage.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Personal Branding',
    description: 'Build a powerful personal brand that positions you as an authority and gets you noticed.',
  },
  {
    number: '02',
    title: 'Performance Marketing',
    description: 'Turn ad spends into measurable growth with data-driven campaigns built for results.',
  },
  {
    number: '03',
    title: 'TVC Ads',
    description: 'Create high-impact television commercials that capture attention and bring brands to life.',
  },
  {
    number: '04',
    title: 'Branding',
    description: 'Build distinctive brand identities that make your business memorable, recognizable, and relevant.',
  },
  {
    number: '05',
    title: 'Social Media Management',
    description: 'Grow your social presence with strategic content, consistent storytelling, and meaningful engagement.',
  },
];

const highlights = [
  { value: '120M+', label: 'Organic Views' },
  { value: '10,000+', label: 'Learners Mentored' },
  { value: '₹10Cr+', label: 'Generated in 18 Months' },
  { value: '100+', label: 'Clients Globally' },
];

const storyParagraphs = [
  "What started on 22 July 2024 has grown from a room into a company, from a small beginning into a growing team, and from building at home to serving 100+ clients globally.",
  "At Escape Media, we believe brand growth doesn't happen through one service alone. It happens when strategy, creativity, content, media, and performance work together as one ecosystem.",
  "That's why we bring every layer of brand growth under one roof — from Personal Branding, Branding and Content Creation to Social Media Management, TVC Ads and Performance Marketing.",
  "Our work is driven by one simple goal: make brands visible, memorable, and commercially successful.",
  "Today, Escape Media is a growing team of creative minds, production talent, designers, editors, and media specialists — united by one dream: to build brands that matter and deliver results that count.",
];

export default function AboutPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-page-hero-media', { opacity: 0, scale: 1.08, duration: 1.2, ease: 'power3.out' });
      gsap.from('.about-page-heading', { opacity: 0, y: 30, duration: 0.7, delay: 0.2 });
      gsap.from('.about-page-hero-sub', { opacity: 0, y: 20, duration: 0.6, delay: 0.4 });

      document.querySelectorAll('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      gsap.from('.about-page-highlight', {
        opacity: 0, y: 20, duration: 0.6, stagger: 0.12,
        scrollTrigger: { trigger: '.about-page-highlights', start: 'top 88%', once: true },
      });

      gsap.from('.about-page-service-row', {
        opacity: 0, y: 20, duration: 0.5, stagger: 0.08,
        scrollTrigger: { trigger: '.about-page-services-list', start: 'top 85%', once: true },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleContact = (e) => {
    e.preventDefault();
    window.location.href = '/#contact';
  };

  return (
    <main className="about-page" ref={pageRef}>
      {/* Hero */}
      <section className="about-page-hero">
        <div className="about-page-hero-media">
          <img
            src="/images/about-page-team.jpg"
            alt="Team Escape Media"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="about-page-hero-overlay" aria-hidden="true"></div>

        <div className="container about-page-hero-content">
          <h1 className="about-page-heading">
            We Don't Just Build Brands.<br />
            We Build <span className="accent">What Makes Them Grow.</span>
          </h1>
          <p className="about-page-hero-sub">
            A full-stack creative and growth company built to help ambitious businesses,
            founders, and brands become impossible to ignore.
          </p>
          <span className="about-page-hero-caption">Team Escape Media — Since 22 July 2024</span>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="about-page-highlights-section">
        <div className="container">
          <div className="about-page-highlights">
            {highlights.map((h) => (
              <div className="about-page-highlight" key={h.label}>
                <p className="about-page-highlight-value">{h.value}</p>
                <p className="about-page-highlight-label">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="about-page-story">
        <div className="container">
          <p className="section-label"><span>01</span> — Our Story</p>
          <p className="about-page-lead" data-reveal>
            Escape Media is a full-stack creative and growth company built to help ambitious
            businesses, founders, and brands become <span className="accent">impossible to ignore.</span>
          </p>

          <div className="about-page-story-grid">
            {storyParagraphs.map((p, i) => (
              <p className="about-page-story-p" key={i} data-reveal>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem statement */}
      <section className="about-page-ecosystem">
        <div className="container">
          <span className="about-page-ecosystem-line" aria-hidden="true"></span>
          <h2 className="about-page-ecosystem-heading" data-reveal>
            One Ecosystem.<br />Every Layer of <span className="accent">Brand Growth.</span>
          </h2>
          <p className="about-page-ecosystem-sub" data-reveal>
            From the first idea to the final conversion, we help brands build, communicate, and
            grow — with creativity at the front and results at the core.
          </p>
          <p className="about-page-ecosystem-tag" data-reveal>
            Escape Media — Delivering Results. Since Day 01.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="about-page-services" id="about-services">
        <div className="container">
          <p className="section-label"><span>02</span> — Our Services</p>
          <h2 className="section-heading about-page-services-heading">What We Do.</h2>

          <div className="about-page-services-list">
            {services.map((s) => (
              <div className="about-page-service-row" key={s.number}>
                <span className="about-page-service-number">{s.number}</span>
                <div className="about-page-service-content">
                  <h3 className="about-page-service-title">{s.title}</h3>
                  <p className="about-page-service-desc">{s.description}</p>
                </div>
                <span className="about-page-service-arrow" aria-hidden="true">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials number="03" />

      {/* CTA */}
      <section className="about-page-cta">
        <span className="about-page-cta-line" aria-hidden="true"></span>
        <div className="container about-page-cta-inner">
          <h2 className="about-page-cta-heading">
            Ready to make something <span className="accent">unforgettable?</span>
          </h2>
          <a href="#contact" className="btn btn-primary" onClick={handleContact}>
            Book a Call <span className="btn-arrow">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: ['Content', 'Creation'],
    description: 'We create high-quality content that captures attention, tells your story, and keeps your audience engaged.',
    list: [
      'Photography & Videography',
      'Social Media Content',
      'Reels & Short-Form Video',
      'Creative Campaigns',
    ],
    image: '/images/service-content.jpg',
    imageAlt: 'Professional photographer shooting with a camera in a dark studio',
  },
  {
    number: '02',
    title: ['Personal', 'Branding'],
    description: 'We turn your expertise, personality, and story into a powerful personal brand designed to build authority, trust, and influence.',
    list: [
      'Personal Brand Strategy',
      'Content & Storytelling',
      'Brand Identity & Positioning',
      'Social Media Presence',
      'Creator & Executive Branding',
    ],
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Creative director reviewing brand identity materials in a studio',
  },
  {
    number: '03',
    title: ['Performance', 'Marketing'],
    description: 'We combine creative campaigns with data-driven marketing to reach the right audience and turn clicks into meaningful results.',
    list: [
      'Meta & Google Ads',
      'Campaign Strategy',
      'Lead Generation',
      'Conversion Optimization',
      'Performance Analytics',
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Marketing analytics dashboards on screen in a modern office',
  },
  {
    number: '04',
    title: ['TVC', 'Ads'],
    description: 'Create high-impact television commercials that capture attention and bring brands to life.',
    list: [
      'TVC Scripting & Concept',
      'Studio & On-Location Shoots',
      'Post-Production & VFX',
      'Broadcast-Ready Delivery',
    ],
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Vintage film projector casting light through smoke on a film set',
  },
  {
    number: '05',
    title: ['Branding'],
    description: 'Build distinctive brand identities that make your business memorable, recognizable, and relevant.',
    list: [
      'Logo & Visual Identity',
      'Brand Guidelines',
      'Packaging & Collateral',
      'Brand Positioning',
    ],
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Designer\'s desk with graphic design software open on a tablet',
  },
  {
    number: '06',
    title: ['Social Media', 'Management'],
    description: 'Grow your social presence with strategic content, consistent storytelling, and meaningful engagement.',
    list: [
      'Content Calendars',
      'Community Management',
      'Platform Strategy',
      'Engagement & Growth',
    ],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Person managing social media content on a laptop and phone',
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.services-intro .section-label', {
        opacity: 0, y: 20, duration: 0.6,
        scrollTrigger: { trigger: '.services-intro', start: 'top 80%', once: true },
      });
      gsap.from('.services-heading', {
        opacity: 0, y: 30, duration: 0.7,
        scrollTrigger: { trigger: '.services-intro', start: 'top 80%', once: true },
      });

      // Accordion animation
      gsap.from('.service-accordion-item', {
        opacity: 0, 
        y: 30, 
        duration: 0.6, 
        stagger: 0.15,
        scrollTrigger: { trigger: '.services-accordion-wrapper', start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleContact = (e) => {
    e.preventDefault();
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="services" id="services" ref={sectionRef} aria-label="Our services">
      <div className="container services-grid">
        
        <div className="services-intro">
          <p className="section-label"><span>02</span> — What We Do</p>
          <h2 className="services-heading">Ideas into impact.</h2>
        </div>

        <div
          className="services-accordion-wrapper"
          onMouseLeave={() => setActiveIndex(0)}
        >
          {services.map((service, i) => (
            <div
              className={`service-accordion-item${i === activeIndex ? ' active' : ''}`}
              key={i}
              onMouseEnter={() => setActiveIndex(i)}
            >
              <div className="service-accordion-bg">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                />
                <div className="service-accordion-overlay"></div>
              </div>
              
              <div className="service-accordion-content">
                <p className="service-accordion-number">{service.number}</p>
                
                <h3 className="service-accordion-vertical-title">
                  {service.title.join(' ')}
                </h3>

                <div className="service-accordion-details">
                  <h3 className="service-accordion-title">
                    {service.title.map((line, j) => (
                      <span key={j}>{line} </span>
                    ))}
                  </h3>
                  <p className="service-accordion-desc">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

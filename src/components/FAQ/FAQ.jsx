import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FAQ.css';

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: 'What services does Escape Media offer?',
    answer: 'We cover every layer of brand growth under one roof — Personal Branding, Branding, Content Creation, Social Media Management, TVC Ads, and Performance Marketing. Instead of hiring separate vendors for each, you get one team that handles strategy, creative, and execution together.',
  },
  {
    question: 'How is Escape Media different from a typical agency?',
    answer: "Most agencies specialize in one thing and hand you off elsewhere for the rest. We're built as one ecosystem — strategy, creativity, content, media, and performance all work together, so your brand stays consistent from the first idea to the final conversion.",
  },
  {
    question: 'Do you work with clients outside India?',
    answer: "Yes. We've worked with founders and businesses across India, the UAE, the UK, Canada, Australia, Germany, and New Zealand — all managed remotely with the same hands-on process we use locally.",
  },
  {
    question: 'How long does a typical project take?',
    answer: "It depends on scope. A personal branding or content sprint can start showing results within a few weeks, while a full brand identity or ongoing performance marketing engagement is typically planned in 3-6 month cycles so we have room to test, learn, and scale what works.",
  },
  {
    question: 'How much does it cost to work with Escape Media?',
    answer: "Every brand's starting point is different, so we don't run one fixed package. On a quick call, we learn about your goals and current setup, then put together a scope and quote tailored to what you actually need — no generic bundles.",
  },
  {
    question: 'How do I get started?',
    answer: 'Book a call using the button below. We\'ll spend it understanding your brand, your goals, and where you want to be — then map out the right mix of services to get you there.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-heading', {
        opacity: 0, y: 30, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
      gsap.from('.faq-item', {
        opacity: 0, y: 15, duration: 0.4, stagger: 0.08,
        scrollTrigger: { trigger: '.faq-list', start: 'top 85%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="faq" id="faq" ref={sectionRef} aria-label="Frequently asked questions">
      <div className="container">
        <div className="faq-header">
          <h2 className="faq-heading">
            You Ask.<br />We Answer.
          </h2>
        </div>

        <div className="faq-list" role="list">
          {faqData.map((faq, i) => (
            <div
              className={`faq-item${openIndex === i ? ' open' : ''}`}
              key={i}
              role="listitem"
            >
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span className="faq-number">{String(i + 1).padStart(2, '0')}</span>
                <span className="faq-question-text">{faq.question}</span>
                <span className="faq-icon" aria-hidden="true"></span>
              </button>
              <div
                className="faq-answer"
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
              >
                <div className="faq-answer-inner">
                  <span className="faq-answer-line" aria-hidden="true"></span>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

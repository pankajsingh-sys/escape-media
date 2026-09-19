import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FAQ.css';

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  { question: 'Question here', answer: 'Answer will be added here.' },
  { question: 'Question here', answer: 'Answer will be added here.' },
  { question: 'Question here', answer: 'Answer will be added here.' },
  { question: 'Question here', answer: 'Answer will be added here.' },
  { question: 'Question here', answer: 'Answer will be added here.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-header .section-label', {
        opacity: 0, y: 20, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
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
          <p className="section-label"><span>06</span> — FAQ</p>
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

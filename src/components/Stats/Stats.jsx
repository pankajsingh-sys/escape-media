import { useEffect, useRef, useState } from 'react';
import './Stats.css';

function useCountUp(end, duration = 2000, startCounting) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration, startCounting]);

  return count;
}

const stats = [
  { value: 100, suffix: '+', label: 'Happy Clients' },
  { value: 100, suffix: ' Million', label: 'Organic Views Generated' },
  { value: 4.8, suffix: '/5.0', label: 'Web Rating', isDecimal: true },
];

export default function Stats() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" id="stats" ref={sectionRef} aria-label="Statistics">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} isVisible={isVisible} delay={i * 200} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, isVisible, delay }) {
  const [started, setStarted] = useState(false);
  const displayValue = stat.isDecimal ? stat.value : Math.floor(stat.value);
  const count = useCountUp(displayValue, 2000, started);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div className="stat-item">
      <div className="stat-number">
        {stat.isDecimal ? stat.value.toFixed(1) : count}
        <span className="accent">{stat.suffix}</span>
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    tl.to(logoRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    })
    .to(logoRef.current, {
      scale: 0.95,
      opacity: 0.8,
      duration: 0.4,
      delay: 0.3,
      ease: 'power2.in',
    })
    .to(preloaderRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.8,
      ease: 'power3.inOut',
    })
    .set(preloaderRef.current, { display: 'none' });
  }, [onComplete]);

  return (
    <div className="preloader" ref={preloaderRef} aria-hidden="true">
      <div className="preloader-logo" ref={logoRef}>
        <img src="/images/logo.png" alt="Escape Media" style={{ height: 'clamp(40px, 5vw, 60px)', width: 'auto' }} />
      </div>
    </div>
  );
}

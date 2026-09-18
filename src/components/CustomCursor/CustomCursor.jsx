import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [text, setText] = useState('');
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (!window.matchMedia('(hover: hover)').matches) return;

    const cursor = cursorRef.current;

    const moveCursor = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);

    const handleInteractiveEnter = (e) => {
      setActive(true);
      setText(e.target.dataset.cursorText || 'View');
    };

    const handleInteractiveLeave = () => {
      setActive(false);
      setText('');
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleEnter);
    document.addEventListener('mouseleave', handleLeave);

    // Observe interactive elements
    const observer = new MutationObserver(() => {
      const interactives = document.querySelectorAll('[data-cursor]');
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleInteractiveEnter);
        el.removeEventListener('mouseleave', handleInteractiveLeave);
        el.addEventListener('mouseenter', handleInteractiveEnter);
        el.addEventListener('mouseleave', handleInteractiveLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial pass
    const interactives = document.querySelectorAll('[data-cursor]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleInteractiveEnter);
      el.addEventListener('mouseleave', handleInteractiveLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mouseleave', handleLeave);
      observer.disconnect();
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor${active ? ' active' : ''}${visible ? ' visible' : ''}`}
      aria-hidden="true"
    >
      <span className="cursor-text">{text}</span>
    </div>
  );
}

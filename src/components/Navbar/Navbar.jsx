import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About Us', href: '/about', isRoute: true },
  { label: 'Contact Us', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/' + href);
    }
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" aria-label="Escape Media home">
          <img src="/images/logo.png" alt="Escape Media" className="navbar-logo-img" />
        </Link>

        <div className="navbar-links">
          {navLinks.map(link => (
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className="navbar-link"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="navbar-link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            )
          ))}
          <a
            href="#contact"
            className="navbar-cta"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Book a Call
          </a>
        </div>

        <button
          className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {createPortal(
        <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
          {navLinks.map(link => (
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className="mobile-menu-link"
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="mobile-menu-link"
                onClick={(e) => handleNavClick(e, link.href)}
                tabIndex={menuOpen ? 0 : -1}
              >
                {link.label}
              </a>
            )
          ))}
          <a
            href="#contact"
            className="mobile-menu-link"
            onClick={(e) => handleNavClick(e, '#contact')}
            tabIndex={menuOpen ? 0 : -1}
          >
            Book a Call
          </a>
        </div>,
        document.body
      )}
    </nav>
  );
}

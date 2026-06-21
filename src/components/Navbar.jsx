import { useState, useEffect } from 'react';
import './Navbar.css';

const TABS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'companies', label: 'Companies', icon: '🏢' },
  { id: 'cve', label: 'CVE / Bugs', icon: '🐛' },
];

export default function Navbar({ activeTab, onTabChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <div className="navbar__brand">
          <span className="navbar__brand-char">{'>'}</span>
          <span className="navbar__brand-text">root@portfolio</span>
          <span className="navbar__cursor">_</span>
        </div>

        {/* Desktop Tabs */}
        <div className="navbar__tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`navbar__tab ${activeTab === tab.id ? 'navbar__tab--active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              <span className="navbar__tab-icon">{tab.icon}</span>
              <span className="navbar__tab-label">{tab.label}</span>
              {activeTab === tab.id && <span className="navbar__tab-glow" />}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className={`navbar__burger ${mobileOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="navbar__mobile">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`navbar__mobile-tab ${activeTab === tab.id ? 'navbar__mobile-tab--active' : ''}`}
              onClick={() => {
                onTabChange(tab.id);
                setMobileOpen(false);
              }}
            >
              <span className="navbar__tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

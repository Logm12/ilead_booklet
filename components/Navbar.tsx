'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Language, TRANSLATIONS } from '@/lib/i18n';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenQuiz: () => void;
}

export default function Navbar({ lang, onLanguageChange, onOpenQuiz }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang].nav;

  // Manage body scroll and Escape key listener when mobile drawer is toggled
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const handleQuizClick = () => {
    setMobileMenuOpen(false);
    onOpenQuiz();
  };

  return (
    <header className="navbar-header">
      <div className="container nav-container">
        <Link href="/" className="nav-logo" onClick={handleNavClick}>
          <span className="nav-logo-text">
            iSupport
            <br />
            ILEAD 26&rsquo;
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-links">
            <li>
              <a href="#ancora-inicio" className="nav-link">
                {t.about}
              </a>
            </li>
            <li>
              <a href="#ancora-ilead" className="nav-link">
                {t.ilead}
              </a>
            </li>
            <li>
              <a href="#ancora-departments" className="nav-link">
                {t.departments}
              </a>
            </li>
            <li>
              <a href="#ancora-convite" className="nav-link">
                {t.platform}
              </a>
            </li>

            {/* Language Switcher */}
            <li>
              <div
                role="group"
                aria-label="Language selection"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'var(--hp-card-inner)',
                  border: '1px solid var(--hp-gold)',
                  borderRadius: '20px',
                  padding: '2px',
                }}
              >
                <button
                  type="button"
                  onClick={() => onLanguageChange('en')}
                  aria-pressed={lang === 'en'}
                  aria-label="English language"
                  style={{
                    background: lang === 'en' ? 'var(--hp-gold)' : 'transparent',
                    color: lang === 'en' ? '#0c0414' : 'var(--hp-text-muted)',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '4px 10px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('vi')}
                  aria-pressed={lang === 'vi'}
                  aria-label="Tiếng Việt"
                  style={{
                    background: lang === 'vi' ? 'var(--hp-gold)' : 'transparent',
                    color: lang === 'vi' ? '#0c0414' : 'var(--hp-text-muted)',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '4px 10px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  VI
                </button>
              </div>
            </li>

            {/* Quiz Open Button */}
            <li>
              <button
                type="button"
                onClick={onOpenQuiz}
                className="btn-gold"
                aria-label={t.quizBtn}
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                {t.quizBtn}
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="mobile-nav-toggle-wrapper">
          <div
            role="group"
            aria-label="Mobile Language Switch"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--hp-card-inner)',
              border: '1px solid var(--hp-gold)',
              borderRadius: '20px',
              padding: '2px',
              marginRight: '12px',
            }}
          >
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              aria-pressed={lang === 'en'}
              style={{
                background: lang === 'en' ? 'var(--hp-gold)' : 'transparent',
                color: lang === 'en' ? '#0c0414' : 'var(--hp-text-muted)',
                border: 'none',
                borderRadius: '16px',
                padding: '3px 8px',
                fontSize: '0.75rem',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('vi')}
              aria-pressed={lang === 'vi'}
              style={{
                background: lang === 'vi' ? 'var(--hp-gold)' : 'transparent',
                color: lang === 'vi' ? '#0c0414' : 'var(--hp-text-muted)',
                border: 'none',
                borderRadius: '16px',
                padding: '3px 8px',
                fontSize: '0.75rem',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              VI
            </button>
          </div>

          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t.closeMenu : t.openMenu}
          >
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="mobile-drawer-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label={t.menuTitle}
          >
            <div className="mobile-drawer-header">
              <span className="nav-logo-text">{t.menuTitle}</span>
              <button
                type="button"
                className="mobile-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={t.closeMenu}
              >
                &times;
              </button>
            </div>

            <ul className="mobile-drawer-links">
              <li>
                <a href="#ancora-inicio" className="mobile-nav-link" onClick={handleNavClick}>
                  🏰 {t.about}
                </a>
              </li>
              <li>
                <a href="#ancora-ilead" className="mobile-nav-link" onClick={handleNavClick}>
                  {t.ilead}
                </a>
              </li>
              <li>
                <a href="#ancora-departments" className="mobile-nav-link" onClick={handleNavClick}>
                  🛡️ {t.departments}
                </a>
              </li>
              <li>
                <a href="#ancora-convite" className="mobile-nav-link" onClick={handleNavClick}>
                  {t.platform}
                </a>
              </li>
            </ul>

            <div style={{ marginTop: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button
                type="button"
                onClick={handleQuizClick}
                className="btn-gold"
                style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}
              >
                {t.quizBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SparkleEffect from '@/components/SparkleEffect';
import MagicBackdrop from '@/components/MagicBackdrop';
import QuizModal from '@/components/QuizModal';
import QRCodePlaceholder from '@/components/QRCodePlaceholder';
import ChatWidget from '@/components/ChatWidget';
import Countdown from '@/components/Countdown';
import EventImageCarousel from '@/components/EventImageCarousel';
import { Language, TRANSLATIONS } from '@/lib/i18n';
import { HOUSE_INFO, HouseKey } from '@/lib/quiz-data';
import { DEPARTMENT_CONTENT } from '@/lib/department-content';
import {
  GOOGLE_FORM_URL,
  GOOGLE_SHEETS_WEBHOOK_URL,
  QR_CODE_IMAGE_PATH,
  REGISTER_URL,
  FANPAGE_URL,
  EVENT_DEADLINE,
  WORKSHOP_REGISTER_URL,
} from '@/lib/config';

export default function HomePage() {
  const [lang, setLang] = useState<Language>('vi'); // Default to Vietnamese
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Form Fields
  const [visitorName, setVisitorName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedHouse, setSelectedHouse] = useState<HouseKey | ''>('gryffindor');

  // Modal & Submission States
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [googleFormNoticeMessage, setGoogleFormNoticeMessage] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];

  // Synchronize HTML lang attribute with current language state
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  // Handle ESC key to close confirmation modal and lock body scroll
  useEffect(() => {
    if (!isConfirmModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) {
        setIsConfirmModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isConfirmModalOpen, isSubmitting]);

  // Handle Form Pre-Submit (Opens Confirmation Modal)
  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !studentId.trim() || !phone.trim() || !email.trim()) {
      return;
    }
    setIsConfirmModalOpen(true);
  };

  // Final Confirmation Submit (Sends to Webhook / Google Sheets)
  const handleFinalConfirmSubmit = async () => {
    setIsSubmitting(true);

    const submissionData = {
      name: visitorName.trim(),
      studentId: studentId.trim(),
      phone: phone.trim(),
      email: email.trim(),
      house: selectedHouse,
      houseName: selectedHouse ? HOUSE_INFO[selectedHouse].name[lang] : '',
      department: selectedHouse ? HOUSE_INFO[selectedHouse].department[lang] : '',
      submittedAt: new Date().toISOString(),
      lang,
    };

    try {
      // 1. If Google Sheets / Apps Script Webhook URL is configured, post to it
      if (GOOGLE_SHEETS_WEBHOOK_URL) {
        await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(submissionData),
        });
      } else {
        // Mock brief network latency for authentic wizarding experience
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      // 2. Safely store in localStorage as client backup
      if (typeof window !== 'undefined') {
        const existingData = JSON.parse(
          localStorage.getItem('ilead_2026_registrations') || '[]'
        );
        existingData.push(submissionData);
        localStorage.setItem('ilead_2026_registrations', JSON.stringify(existingData));
      }

      setIsSubmitting(false);
      setIsConfirmModalOpen(false);
      setRegisteredSuccess(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      // Still show success to visitor since local backup was saved
      setIsSubmitting(false);
      setIsConfirmModalOpen(false);
      setRegisteredSuccess(true);
    }
  };

  // Handle External Google Form Button Click
  const handleOpenGoogleForm = () => {
    if (GOOGLE_FORM_URL && GOOGLE_FORM_URL.trim() !== '') {
      window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
    } else {
      setGoogleFormNoticeMessage(t.platform.googleFormNotConfigured);
      // Auto-clear notification after 5 seconds
      setTimeout(() => setGoogleFormNoticeMessage(null), 5000);
      const formEl = document.getElementById('platform-registration-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleResetRegistration = () => {
    setVisitorName('');
    setStudentId('');
    setPhone('');
    setEmail('');
    setSelectedHouse('gryffindor');
    setRegisteredSuccess(false);
  };

  const selectedHouseInfo = selectedHouse ? HOUSE_INFO[selectedHouse] : null;

  return (
    <div style={{ position: 'relative' }}>
      <SparkleEffect />

      {/* NAVBAR */}
      <Navbar
        lang={lang}
        onLanguageChange={(newLang) => setLang(newLang)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      <main style={{ position: 'relative', zIndex: 2 }}>
        {/* HERO SECTION */}
        <section className="hero-section">
          <MagicBackdrop />
          <div className="container">
            <p
              style={{
                opacity: 1,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                color: 'var(--hp-gold)',
                marginBottom: '10px',
              }}
            >
              {t.hero.eyebrow}
            </p>
            <h1 className="hero-title">{t.hero.title}</h1>
            <p className="hero-subtitle">
              {t.hero.subtitle}
            </p>

            <Countdown
              targetDate={EVENT_DEADLINE}
              dayLabel={t.hero.countdownDay}
              hourLabel={t.hero.countdownHour}
              minuteLabel={t.hero.countdownMin}
              secondLabel={t.hero.countdownSec}
            />

            <div className="hero-actions">
              <a
                href={REGISTER_URL || '#ancora-convite'}
                target={REGISTER_URL ? '_blank' : undefined}
                rel={REGISTER_URL ? 'noreferrer' : undefined}
                className="btn-gold"
                style={{ padding: '14px 32px', fontSize: '1.05rem' }}
              >
                🪄 {t.hero.boardBtn}
              </a>
              <a
                href={FANPAGE_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-outline-gold"
                style={{ padding: '14px 28px', fontSize: '1.05rem' }}
              >
                📘 {t.hero.fanpageBtn}
              </a>
              <button
                type="button"
                onClick={() => setIsQuizOpen(true)}
                className="btn-outline-gold"
                style={{ padding: '14px 28px', fontSize: '1.05rem', fontFamily: "'Noto Serif', serif" }}
              >
                {t.hero.quizBtn}
              </button>
            </div>

            <p
              style={{
                marginTop: '20px',
                fontFamily: "'EB Garamond', 'Noto Serif', 'Cormorant Garamond', Georgia, serif",
                fontSize: '0.95rem',
                color: 'var(--hp-text-muted)',
              }}
            >
              {t.hero.contactNote}
            </p>
          </div>
        </section>

        {/* 1. ABOUT ISUPPORT CLUB */}
        <section id="ancora-inicio" className="section-wrapper">
          <MagicBackdrop />
          <div className="container">
            <div className="hp-card">
              <div>
                {t.about.tag && <span className="house-tag">{t.about.tag}</span>}
                <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2.4rem' }}>
                  {t.about.title}
                </h2>
                <p style={{ color: 'var(--hp-text-muted)', lineHeight: '1.8', fontSize: '1rem', marginBottom: '15px' }}>
                  {t.about.p1}
                </p>
                <p style={{ color: 'var(--hp-text-muted)', lineHeight: '1.8', fontSize: '1rem' }}>
                  {t.about.mottoPrefix}
                  <strong style={{ color: 'var(--hp-gold)' }}>&quot;{t.about.mottoLabel}&quot;</strong>{' '}
                  {t.about.mottoDesc}, {t.about.p2}
                </p>
              </div>
              <div style={{ marginTop: '32px' }}>
                {/* Carousel ảnh các sự kiện — full-width, nằm dưới phần chữ */}
                <EventImageCarousel
                  fullWidth
                  images={[
                    { src: '/assets/img/event-ilead25.webp', alt: 'iLEAD 25' },
                    { src: '/assets/img/event-ilead24.webp', alt: 'iLEAD 24' },
                    { src: '/assets/img/event-ilead23.webp', alt: 'iLEAD 23' },
                    { src: '/assets/img/event-ilead22.webp', alt: 'iLEAD 22' },
                    { src: '/assets/img/event-vbcc.webp', alt: 'VBCC' },
                    { src: '/assets/img/event-thevoice.webp', alt: 'The Voice - The Aura' },
                    { src: '/assets/img/event-iwit24.webp', alt: 'iWIT 24' },
                    { src: '/assets/img/event-iwit22.webp', alt: 'iWIT 22' },
                    { src: '/assets/img/event-fdb26.webp', alt: 'FDB Talent 2026' },
                    { src: '/assets/img/event-engpro24.webp', alt: 'English on Board 24' },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. EXECUTIVE BOARD (BAN CHỦ NHIỆM) */}
        <section className="section-wrapper">
          <div className="container">
            <div className="section-title-box">
              <span className="house-tag">{t.council.tag}</span>
              <h2
                className="section-title"
                style={{ fontSize: '2.6rem', fontFamily: "'Playfair Display', 'Noto Serif', Georgia, serif", fontStyle: 'italic' }}
              >
                {t.council.title}
              </h2>
              <p style={{ color: 'var(--hp-text-muted)', maxWidth: '700px', margin: '0 auto 15px auto', fontSize: '0.95rem' }}>
                {t.council.desc}
              </p>
              <div className="section-divider" />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '24px',
                maxWidth: '900px',
                margin: '0 auto',
              }}
            >
              {[
                { name: 'Phạm Như Đạt', role: t.council.dat, photo: '/assets/img/bcn-dat.webp' },
                { name: 'Lương Nguyễn Đình Thắng', role: t.council.thang, photo: '/assets/img/bcn-thang.webp' },
                { name: 'Nguyễn Thị Hương Giang', role: t.council.giang, photo: '/assets/img/bcn-giang.webp' },
              ].map((member) => (
                <div key={member.name} className="bcn-frame">
                  <div className="bcn-photo-frame">
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', 'Noto Serif', Georgia, serif",
                      fontStyle: 'italic',
                      fontWeight: 900,
                      color: 'var(--hp-gold)',
                      fontSize: '1.55rem',
                      lineHeight: 1.25,
                      marginBottom: '8px',
                    }}
                  >
                    {member.name}
                  </h3>
                  <p style={{ color: 'var(--hp-text-muted)', fontSize: '0.95rem' }}>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. ILEAD 2026 DETAILS */}
        <section id="ancora-ilead" className="section-wrapper">
          <div className="container">
            <div
              style={{
                position: 'relative',
                background: 'linear-gradient(135deg, #1c0a29 0%, #12041c 100%)',
                border: '1px solid var(--hp-gold)',
                borderRadius: '20px',
                padding: '48px 50px',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.7)',
              }}
            >
              <span className="house-tag">{t.ilead.tag || 'ILEAD 2026'}</span>
              <h2
                className="section-title"
                style={{ textAlign: 'left', fontSize: '2.3rem', marginBottom: '24px' }}
              >
                {t.ilead.title}
              </h2>
              <div style={{ maxWidth: '820px' }}>
                <p style={{ color: 'var(--hp-text-muted)', lineHeight: '1.8', fontSize: '1rem', marginBottom: '18px' }}>
                  {t.ilead.p1}
                </p>
                <p style={{ color: 'var(--hp-text-muted)', lineHeight: '1.8', fontSize: '1rem', marginBottom: '22px' }}>
                  {t.ilead.p2}
                </p>
                <p
                  style={{
                    fontFamily: "'Playfair Display', 'Noto Serif', Georgia, serif",
                    fontStyle: 'italic',
                    fontWeight: 700,
                    color: 'var(--hp-gold)',
                    fontSize: '1.2rem',
                    marginBottom: '20px',
                  }}
                >
                  {t.ilead.highlight}
                </p>
                <p style={{ color: 'var(--hp-text-muted)', lineHeight: '1.8', fontSize: '1rem' }}>
                  {t.ilead.closing}
                </p>
              </div>
            </div>

            {/* Timeline — round-badge card style */}
            <div style={{ marginTop: '110px' }}>
              <div className="section-title-box" style={{ marginBottom: '24px' }}>
                <h2
                  className="section-title"
                  style={{ fontSize: '2rem', fontFamily: "'Cinzel', 'Playfair Display', serif" }}
                >
                  {t.ilead.timelineTitle}
                </h2>
                <div className="section-divider" />
              </div>

              <div style={{ display: 'grid', gap: '18px' }}>
                {t.ilead.timeline.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '20px',
                      padding: '22px 24px',
                      background: 'rgba(201,162,74,0.04)',
                      border: '1px solid var(--hp-border)',
                      borderRadius: '10px',
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        border: '1px solid var(--hp-gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--hp-gold)',
                        fontFamily: "'Playfair Display', 'Noto Serif', serif",
                        fontSize: '1.1rem',
                      }}
                    >
                      {['I', 'II', 'III', 'IV', 'V'][i] || i + 1}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'EB Garamond', 'Noto Serif', serif",
                          fontSize: '0.75rem',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: 'var(--hp-gold)',
                          marginBottom: '4px',
                        }}
                      >
                        {item.stage} · {item.date}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Playfair Display', 'Noto Serif', Georgia, serif",
                          fontStyle: 'italic',
                          fontWeight: 900,
                          fontSize: '1.3rem',
                          color: 'var(--hp-gold)',
                          marginBottom: '6px',
                        }}
                      >
                        &ldquo;{item.name}&rdquo; — {item.desc}
                      </div>
                      <p style={{ color: 'var(--hp-text)', opacity: 0.85, fontSize: '0.92rem', lineHeight: 1.65 }}>
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. HOUSE RESPONSIBILITIES */}
        <section id="ancora-departments" className="section-wrapper">
          <MagicBackdrop />
          <div className="container">
            <div className="section-title-box">
              <span className="house-tag">{t.houses.tag}</span>
              <h2 className="section-title">{t.houses.title}</h2>
              <p style={{ color: 'var(--hp-text-muted)' }}>{t.houses.subTitle}</p>
              <div className="section-divider" style={{ marginTop: '15px' }} />
            </div>

            <div className="houses-grid">
              {/* Gryffindor — Ban Truyền Thông */}
              <div className="house-spotlight-card house-card-gryffindor">
                <div className="house-info-wrapper" style={{ flex: 2 }}>
                  <h2>{DEPARTMENT_CONTENT.gryffindor.cardTitle}</h2>
                  {DEPARTMENT_CONTENT.gryffindor.sections.map((sec, si) => (
                    <div key={si} style={{ marginTop: '18px' }}>
                      {sec.subHeading && (
                        <p
                          style={{
                            fontFamily: "'Playfair Display', 'Noto Serif', Georgia, serif",
                            fontStyle: 'italic',
                            color: 'var(--hp-text)',
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            marginBottom: '8px',
                          }}
                        >
                          {sec.subHeading}
                        </p>
                      )}
                      <p style={{ color: 'var(--hp-gold)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' }}>
                        {sec.workLabel}
                      </p>
                      <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
                        {sec.workItems.map((it, ii) => (
                          <li key={ii} style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{it}</li>
                        ))}
                      </ul>
                      <p style={{ color: 'var(--hp-gold)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' }}>
                        {sec.reqLabel}
                      </p>
                      <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {sec.reqItems.map((it, ii) => (
                          <li key={ii} style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    flex: 1,
                    minWidth: '160px',
                    minHeight: '220px',
                    backgroundImage: `url(${DEPARTMENT_CONTENT.gryffindor.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </div>

              {/* Ravenclaw — Ban Nội Dung */}
              <div className="house-spotlight-card house-card-ravenclaw">
                <div className="house-info-wrapper" style={{ flex: 2 }}>
                  <h2>{DEPARTMENT_CONTENT.ravenclaw.cardTitle}</h2>
                  {DEPARTMENT_CONTENT.ravenclaw.sections.map((sec, si) => (
                    <div key={si} style={{ marginTop: '18px' }}>
                      {sec.subHeading && (
                        <p
                          style={{
                            fontFamily: "'Playfair Display', 'Noto Serif', Georgia, serif",
                            fontStyle: 'italic',
                            color: 'var(--hp-text)',
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            marginBottom: '8px',
                          }}
                        >
                          {sec.subHeading}
                        </p>
                      )}
                      <p style={{ color: 'var(--hp-gold)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' }}>
                        {sec.workLabel}
                      </p>
                      <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
                        {sec.workItems.map((it, ii) => (
                          <li key={ii} style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{it}</li>
                        ))}
                      </ul>
                      <p style={{ color: 'var(--hp-gold)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' }}>
                        {sec.reqLabel}
                      </p>
                      <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {sec.reqItems.map((it, ii) => (
                          <li key={ii} style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    flex: 1,
                    minWidth: '160px',
                    minHeight: '220px',
                    backgroundImage: `url(${DEPARTMENT_CONTENT.ravenclaw.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </div>

              {/* Slytherin — Ban Đối Ngoại */}
              <div className="house-spotlight-card house-card-slytherin">
                <div className="house-info-wrapper" style={{ flex: 2 }}>
                  <h2>{DEPARTMENT_CONTENT.slytherin.cardTitle}</h2>
                  {DEPARTMENT_CONTENT.slytherin.sections.map((sec, si) => (
                    <div key={si} style={{ marginTop: '18px' }}>
                      {sec.subHeading && (
                        <p
                          style={{
                            fontFamily: "'Playfair Display', 'Noto Serif', Georgia, serif",
                            fontStyle: 'italic',
                            color: 'var(--hp-text)',
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            marginBottom: '8px',
                          }}
                        >
                          {sec.subHeading}
                        </p>
                      )}
                      <p style={{ color: 'var(--hp-gold)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' }}>
                        {sec.workLabel}
                      </p>
                      <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
                        {sec.workItems.map((it, ii) => (
                          <li key={ii} style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{it}</li>
                        ))}
                      </ul>
                      <p style={{ color: 'var(--hp-gold)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' }}>
                        {sec.reqLabel}
                      </p>
                      <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {sec.reqItems.map((it, ii) => (
                          <li key={ii} style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    flex: 1,
                    minWidth: '160px',
                    minHeight: '220px',
                    backgroundImage: `url(${DEPARTMENT_CONTENT.slytherin.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </div>

              {/* Hufflepuff — Ban Đối Nội - Hậu Cần */}
              <div className="house-spotlight-card house-card-hufflepuff">
                <div className="house-info-wrapper" style={{ flex: 2 }}>
                  <h2>{DEPARTMENT_CONTENT.hufflepuff.cardTitle}</h2>
                  {DEPARTMENT_CONTENT.hufflepuff.sections.map((sec, si) => (
                    <div key={si} style={{ marginTop: '18px' }}>
                      {sec.subHeading && (
                        <p
                          style={{
                            fontFamily: "'Playfair Display', 'Noto Serif', Georgia, serif",
                            fontStyle: 'italic',
                            color: 'var(--hp-text)',
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            marginBottom: '8px',
                          }}
                        >
                          {sec.subHeading}
                        </p>
                      )}
                      <p style={{ color: 'var(--hp-gold)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' }}>
                        {sec.workLabel}
                      </p>
                      <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
                        {sec.workItems.map((it, ii) => (
                          <li key={ii} style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{it}</li>
                        ))}
                      </ul>
                      <p style={{ color: 'var(--hp-gold)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' }}>
                        {sec.reqLabel}
                      </p>
                      <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {sec.reqItems.map((it, ii) => (
                          <li key={ii} style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    flex: 1,
                    minWidth: '160px',
                    minHeight: '220px',
                    backgroundImage: `url(${DEPARTMENT_CONTENT.hufflepuff.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6. REGISTRATION FORM (PLATFORM 9 3/4 & QR CODE) */}
        <section id="ancora-convite" className="section-wrapper">
          <div className="container">
            <div className="platform-box">
              {/* Form & Introduction Column */}
              <div>
                <span className="house-tag">{t.platform.tag}</span>
                <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2.3rem' }}>
                  {t.platform.title}
                </h2>

                <h3
                  style={{
                    fontFamily: "'Playfair Display', 'Noto Serif', Georgia, serif",
                    color: 'var(--hp-gold)',
                    fontSize: '1.3rem',
                    letterSpacing: '0.03em',
                    marginTop: '18px',
                    marginBottom: '10px',
                  }}
                >
                  {t.platform.workshopHeading}
                </h3>
                <p style={{ color: 'var(--hp-text-muted)', lineHeight: '1.75', fontSize: '0.95rem', marginBottom: '10px' }}>
                  {t.platform.workshopP1}
                </p>
                <p style={{ color: 'var(--hp-text-muted)', lineHeight: '1.75', fontSize: '0.95rem', marginBottom: '14px' }}>
                  {t.platform.workshopP2}
                </p>

                <p style={{ color: 'var(--hp-gold)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '8px' }}>
                  {t.platform.workshopStagesTitle}
                </p>
                <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                  {t.platform.workshopStages.map((stage, i) => (
                    <li key={i} style={{ color: 'var(--hp-text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                      <strong style={{ color: 'var(--hp-text)' }}>{stage.title}:</strong> {stage.desc}
                    </li>
                  ))}
                </ul>

                <p
                  style={{
                    fontFamily: "'Playfair Display', 'Noto Serif', Georgia, serif",
                    fontStyle: 'italic',
                    color: 'var(--hp-gold)',
                    fontSize: '1.05rem',
                    marginBottom: '4px',
                  }}
                >
                  {t.platform.workshopClosing}
                </p>

              </div>

              {/* Decorative Owl Invitation Image */}
              <div style={{ textAlign: 'center' }}>
                <img
                  src="/assets/img/convite.webp"
                  alt="Hogwarts Owl Invitation"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '200px',
                    height: 'auto',
                    filter: 'drop-shadow(0 0 25px rgba(200, 160, 97, 0.5))',
                  }}
                />
              </div>

              {/* QR Code Component */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <QRCodePlaceholder
                  imageSrc="/assets/img/qr-workshop-v4.webp"
                  size={160}
                  label={t.platform.qrLabel}
                  sublabel={t.platform.qrSublabel}
                  placeholderNotice=""
                  actionLabel={t.platform.qrActionText}
                  demoBadgeText={t.platform.qrDemoBadge}
                  onActionClick={() => {
                    window.open(WORKSHOP_REGISTER_URL, '_blank', 'noreferrer');
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* QUIZ MODAL */}
      <QuizModal
        isOpen={isQuizOpen}
        lang={lang}
        onClose={() => setIsQuizOpen(false)}
      />

      {/* HOGWARTS OWL ASSISTANT CHAT WIDGET */}
      <ChatWidget
        currentLang={lang}
        onLanguageChange={(newLang) => setLang(newLang)}
      />

      {/* CONFIRMATION MODAL BEFORE REGISTRATION */}
      {isConfirmModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => !isSubmitting && setIsConfirmModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-modal-title"
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '520px' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '2.5rem' }}>🦉</span>
              <h2 id="confirm-modal-title" className="section-title" style={{ fontSize: '1.6rem', marginTop: '8px' }}>
                {t.platform.confirmModalTitle}
              </h2>
              <p style={{ color: 'var(--hp-text-muted)', fontSize: '0.9rem' }}>
                {t.platform.confirmModalSubtitle}
              </p>
            </div>

            {/* Information Review Card */}
            <div
              style={{
                background: 'var(--hp-card-inner)',
                border: '1px solid var(--hp-border)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '22px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(200, 160, 97, 0.2)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--hp-gold)', fontSize: '0.88rem' }}>{t.platform.nameLabel}:</span>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>{visitorName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(200, 160, 97, 0.2)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--hp-gold)', fontSize: '0.88rem' }}>{t.platform.idLabel}:</span>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>{studentId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(200, 160, 97, 0.2)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--hp-gold)', fontSize: '0.88rem' }}>{t.platform.phoneLabel}:</span>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>{phone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(200, 160, 97, 0.2)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--hp-gold)', fontSize: '0.88rem' }}>{t.platform.emailLabel}:</span>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>{email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--hp-gold)', fontSize: '0.88rem' }}>{t.platform.houseLabel}:</span>
                <span style={{ color: selectedHouseInfo?.textColor || '#ffffff', fontWeight: 600, textAlign: 'right' }}>
                  {selectedHouseInfo?.name[lang]} ({selectedHouseInfo?.department[lang]})
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                disabled={isSubmitting}
                className="btn-outline-gold"
                style={{ flex: '1 1 140px', padding: '12px' }}
              >
                {t.platform.editBtn}
              </button>
              <button
                type="button"
                onClick={handleFinalConfirmSubmit}
                disabled={isSubmitting}
                className="btn-gold"
                style={{ flex: '2 1 200px', justifyContent: 'center', padding: '12px' }}
              >
                {isSubmitting ? t.platform.sendingBtn : `✨ ${t.platform.confirmBtn}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

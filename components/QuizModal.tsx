'use client';

import React, { useState, useEffect, useRef } from 'react';
import { QUIZ_QUESTIONS, HOUSE_INFO, HouseKey } from '@/lib/quiz-data';
import { Language, TRANSLATIONS } from '@/lib/i18n';

interface QuizModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export default function QuizModal({ isOpen, lang, onClose }: QuizModalProps) {
  const [answers, setAnswers] = useState<Record<string, HouseKey>>({});
  const [resultHouse, setResultHouse] = useState<HouseKey | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[lang].quizModal;

  // Reset quiz state when modal is opened fresh
  useEffect(() => {
    if (isOpen) {
      setValidationError(null);
    }
  }, [isOpen]);

  // Handle ESC key to close modal and lock background body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (questionId: string, house: HouseKey) => {
    setValidationError(null);
    setAnswers((prev) => ({ ...prev, [questionId]: house }));
  };

  const calculateResult = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure all 4 questions are answered
    if (Object.keys(answers).length < QUIZ_QUESTIONS.length) {
      setValidationError(t.answerAllWarning);
      return;
    }

    const counts: Record<HouseKey, number> = {
      gryffindor: 0,
      slytherin: 0,
      ravenclaw: 0,
      hufflepuff: 0,
    };

    Object.values(answers).forEach((house) => {
      if (counts[house] !== undefined) {
        counts[house]++;
      }
    });

    const maxCount = Math.max(...Object.values(counts));
    const tiedHouses = (Object.keys(counts) as HouseKey[]).filter(
      (h) => counts[h] === maxCount
    );

    let winningHouse: HouseKey;

    if (tiedHouses.length === 1) {
      winningHouse = tiedHouses[0];
    } else {
      // Sorting Hat tie-breaking:
      // Priority 1: User's chosen goal in iLEAD 2026 (Question 4)
      // Priority 2: User's personal core virtue (Question 1)
      // Priority 3: User's approach to challenges (Question 2)
      const q4Choice = answers['q4'];
      const q1Choice = answers['q1'];
      const q2Choice = answers['q2'];

      if (q4Choice && tiedHouses.includes(q4Choice)) {
        winningHouse = q4Choice;
      } else if (q1Choice && tiedHouses.includes(q1Choice)) {
        winningHouse = q1Choice;
      } else if (q2Choice && tiedHouses.includes(q2Choice)) {
        winningHouse = q2Choice;
      } else {
        winningHouse = tiedHouses[0];
      }
    }

    setResultHouse(winningHouse);

    // Scroll modal container to top so result is immediately visible
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTop = 0;
    }
  };

  const handleReset = () => {
    setAnswers({});
    setResultHouse(null);
    setValidationError(null);
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTop = 0;
    }
  };

  const handleModalClose = () => {
    onClose();
    // Clean up result if closed so next launch can be a fresh quiz
    if (resultHouse) {
      handleReset();
    }
  };

  const currentResultInfo = resultHouse ? HOUSE_INFO[resultHouse] : null;

  return (
    <div
      className="modal-overlay"
      onClick={handleModalClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-modal-title"
    >
      <div
        ref={modalScrollRef}
        className="modal-content hide-scroll"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: resultHouse && currentResultInfo
            ? `2px solid ${currentResultInfo.color}`
            : '1px solid var(--hp-gold)',
          boxShadow: resultHouse && currentResultInfo
            ? `0 0 35px ${currentResultInfo.color}`
            : '0 20px 50px rgba(0, 0, 0, 0.9)',
        }}
      >
        <button
          onClick={handleModalClose}
          aria-label={t.close}
          style={{
            position: 'absolute',
            top: '20px',
            right: '25px',
            background: 'none',
            border: 'none',
            color: 'var(--hp-gold)',
            fontSize: '2rem',
            lineHeight: 1,
            cursor: 'pointer',
            zIndex: 10,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--hp-gold)')}
        >
          &times;
        </button>

        {!resultHouse ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <img
                src="/assets/img/selector-hat.webp"
                alt="Sorting Hat"
                style={{ width: '95px', height: 'auto', margin: '0 auto 12px auto' }}
              />
              <h2 id="quiz-modal-title" className="section-title" style={{ fontSize: '1.85rem' }}>
                {t.title}
              </h2>
              <p style={{ color: 'var(--hp-text-muted)', fontSize: '0.92rem', maxWidth: '480px', margin: '0 auto' }}>
                {t.subtitle}
              </p>
            </div>

            {validationError && (
              <div
                style={{
                  background: 'rgba(235, 87, 87, 0.15)',
                  border: '1px solid #eb5757',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  marginBottom: '18px',
                  color: '#ff8a8a',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                }}
              >
                ⚠️ {validationError}
              </div>
            )}

            <form onSubmit={calculateResult} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {QUIZ_QUESTIONS.map((q, qIndex) => (
                <fieldset
                  key={q.id}
                  style={{
                    background: 'var(--hp-card-inner)',
                    padding: '20px',
                    borderRadius: '14px',
                    border: '1px solid var(--hp-border)',
                  }}
                >
                  <legend
                    style={{
                      color: 'var(--hp-gold)',
                      fontSize: '1.02rem',
                      fontWeight: 600,
                      padding: '0 8px',
                      marginBottom: '10px',
                    }}
                  >
                    {qIndex + 1}. {q.question[lang]}
                  </legend>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {q.options.map((opt, oIndex) => {
                      const isSelected = answers[q.id] === opt.house;
                      return (
                        <label
                          key={oIndex}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            background: isSelected ? 'rgba(200, 160, 97, 0.22)' : 'rgba(12, 4, 20, 0.65)',
                            border: isSelected ? '1px solid var(--hp-gold)' : '1px solid rgba(200, 160, 97, 0.15)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            color: isSelected ? '#ffffff' : 'var(--hp-text-muted)',
                            fontSize: '0.92rem',
                            lineHeight: 1.4,
                          }}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            value={opt.house}
                            checked={isSelected}
                            onChange={() => handleSelect(q.id, opt.house)}
                            style={{ accentColor: 'var(--hp-gold)', transform: 'scale(1.15)', cursor: 'pointer' }}
                          />
                          <span>{opt.text[lang]}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}

              <button
                type="submit"
                className="btn-gold"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '14px',
                  fontSize: '1.05rem',
                  marginTop: '10px',
                }}
              >
                {t.submitBtn}
              </button>
            </form>
          </div>
        ) : currentResultInfo ? (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <img
              src={currentResultInfo.badge}
              alt={currentResultInfo.name[lang]}
              style={{
                width: '160px',
                height: '160px',
                objectFit: 'contain',
                margin: '0 auto 18px auto',
                filter: `drop-shadow(0 0 25px ${currentResultInfo.color})`,
              }}
            />
            <span
              style={{
                color: currentResultInfo.color,
                fontSize: '0.9rem',
                fontWeight: '700',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {t.congrats}
            </span>
            <h2 style={{ fontSize: '2.3rem', color: '#ffffff', margin: '10px 0 15px 0' }}>
              {t.belongTo}{' '}
              <span style={{ color: currentResultInfo.textColor }}>{currentResultInfo.name[lang]}</span>!
            </h2>
            <div
              style={{
                background: 'var(--hp-card-inner)',
                padding: '22px',
                borderRadius: '14px',
                border: `1px solid ${currentResultInfo.color}`,
                marginBottom: '25px',
                textAlign: 'left',
              }}
            >
              <p style={{ color: 'var(--hp-gold)', fontWeight: '700', fontSize: '1.05rem', marginBottom: '8px' }}>
                {t.deptMatch} {currentResultInfo.department[lang]}
              </p>
              <p style={{ color: 'var(--hp-text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                {currentResultInfo.traits[lang]}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={handleReset} className="btn-outline-gold" style={{ padding: '12px 24px' }}>
                {t.tryAgain}
              </button>
              <button onClick={handleModalClose} className="btn-gold" style={{ padding: '12px 28px' }}>
                {t.close}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

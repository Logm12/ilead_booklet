'use client';

import React, { useState } from 'react';

interface EventImageCarouselProps {
  images: { src: string; alt: string }[];
  width?: number;
  fullWidth?: boolean;
}

export default function EventImageCarousel({ images, width = 440, fullWidth = false }: EventImageCarouselProps) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const goNext = () => setIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
  const current = images[index];

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          position: 'relative',
          width: fullWidth ? '100%' : `${width}px`,
          maxWidth: '100%',
          aspectRatio: fullWidth ? '16 / 9' : '16 / 9',
          margin: '0 auto',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--hp-border)',
          boxShadow: '0 0 20px rgba(201, 162, 74, 0.25)',
          background: '#0a0710',
        }}
      >
        <img
          src={current.src}
          alt={current.alt}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              style={{
                position: 'absolute',
                top: '50%',
                left: '8px',
                transform: 'translateY(-50%)',
                background: 'rgba(10, 7, 5, 0.55)',
                border: '1px solid var(--hp-border)',
                color: 'var(--hp-gold)',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1rem',
                lineHeight: 1,
              }}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              style={{
                position: 'absolute',
                top: '50%',
                right: '8px',
                transform: 'translateY(-50%)',
                background: 'rgba(10, 7, 5, 0.55)',
                border: '1px solid var(--hp-border)',
                color: 'var(--hp-gold)',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1rem',
                lineHeight: 1,
              }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '6px' }}>
          {images.map((_, i) => (
            <span
              key={i}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: i === index ? 'var(--hp-gold)' : 'var(--hp-border)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

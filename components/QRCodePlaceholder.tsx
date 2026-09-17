'use client';

import React, { useState } from 'react';

interface QRCodePlaceholderProps {
  imageSrc?: string;
  size?: number;
  label?: string;
  sublabel?: string;
  placeholderNotice?: string;
  actionLabel?: string;
  demoBadgeText?: string;
  onActionClick?: () => void;
}

export default function QRCodePlaceholder({
  imageSrc = '/assets/img/qr-code.png',
  size = 180,
  label = 'Scan QR for iLEAD 2026 Registration',
  sublabel = 'Scan code with your magic wand!',
  placeholderNotice = 'Official QR image will be added here soon.',
  actionLabel = '⚡ Register Online',
  demoBadgeText = 'DEMO QR',
  onActionClick,
}: QRCodePlaceholderProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const showFallback = imageError || !imageLoaded;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'var(--hp-card-inner)',
        border: '2px solid var(--hp-gold)',
        borderRadius: '16px',
        padding: '24px 20px',
        boxShadow: '0 0 25px rgba(200, 160, 97, 0.35)',
        textAlign: 'center',
        maxWidth: '280px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: '#ffffff',
          borderRadius: '12px',
          padding: '10px',
          boxShadow: '0 4px 18px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* If official image is available and hasn't errored */}
        {!imageError && (
          <img
            src={imageSrc}
            alt="Official iLEAD 2026 Registration QR Code"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: imageLoaded ? 'block' : 'none',
            }}
          />
        )}

        {/* Fallback Magical Harry Potter QR placeholder if image is missing or loading */}
        {showFallback && (
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* SVG QR CODE DEMO PLACEHOLDER */}
            <svg
              viewBox="0 0 100 100"
              width="100%"
              height="100%"
              style={{ display: 'block' }}
              aria-label="Demo QR Code Pattern"
            >
              {/* Background */}
              <rect x="0" y="0" width="100" height="100" fill="#ffffff" />

              {/* Top-Left Finder */}
              <rect x="5" y="5" width="26" height="26" fill="#0c0414" rx="2" />
              <rect x="9" y="9" width="18" height="18" fill="#ffffff" rx="1" />
              <rect x="13" y="13" width="10" height="10" fill="#c8a061" />

              {/* Top-Right Finder */}
              <rect x="69" y="5" width="26" height="26" fill="#0c0414" rx="2" />
              <rect x="73" y="9" width="18" height="18" fill="#ffffff" rx="1" />
              <rect x="77" y="13" width="10" height="10" fill="#c8a061" />

              {/* Bottom-Left Finder */}
              <rect x="5" y="69" width="26" height="26" fill="#0c0414" rx="2" />
              <rect x="9" y="73" width="18" height="18" fill="#ffffff" rx="1" />
              <rect x="13" y="77" width="10" height="10" fill="#c8a061" />

              {/* Timing Patterns & Data Modules */}
              <rect x="36" y="8" width="6" height="6" fill="#0c0414" />
              <rect x="48" y="8" width="6" height="6" fill="#0c0414" />
              <rect x="57" y="8" width="6" height="6" fill="#0c0414" />

              <rect x="36" y="20" width="6" height="6" fill="#c8a061" />
              <rect x="48" y="20" width="6" height="6" fill="#0c0414" />

              <rect x="8" y="36" width="6" height="6" fill="#0c0414" />
              <rect x="20" y="36" width="6" height="6" fill="#0c0414" />
              <rect x="36" y="36" width="6" height="6" fill="#0c0414" />
              <rect x="48" y="36" width="6" height="6" fill="#c8a061" />
              <rect x="60" y="36" width="6" height="6" fill="#0c0414" />
              <rect x="72" y="36" width="6" height="6" fill="#0c0414" />

              <rect x="8" y="48" width="6" height="6" fill="#0c0414" />
              <rect x="24" y="48" width="6" height="6" fill="#c8a061" />
              <rect x="36" y="48" width="6" height="6" fill="#0c0414" />
              <rect x="54" y="48" width="6" height="6" fill="#0c0414" />
              <rect x="66" y="48" width="6" height="6" fill="#c8a061" />
              <rect x="84" y="48" width="6" height="6" fill="#0c0414" />

              <rect x="36" y="60" width="6" height="6" fill="#c8a061" />
              <rect x="48" y="60" width="6" height="6" fill="#0c0414" />
              <rect x="60" y="60" width="6" height="6" fill="#0c0414" />
              <rect x="78" y="60" width="6" height="6" fill="#0c0414" />

              <rect x="36" y="72" width="6" height="6" fill="#0c0414" />
              <rect x="48" y="72" width="6" height="6" fill="#0c0414" />
              <rect x="66" y="72" width="6" height="6" fill="#c8a061" />
              <rect x="78" y="72" width="6" height="6" fill="#0c0414" />

              <rect x="36" y="84" width="6" height="6" fill="#0c0414" />
              <rect x="54" y="84" width="6" height="6" fill="#c8a061" />
              <rect x="72" y="84" width="6" height="6" fill="#0c0414" />
              <rect x="84" y="84" width="6" height="6" fill="#0c0414" />

              {/* Center Crest Icon */}
              <circle cx="50" cy="50" r="11" fill="#1c0a29" stroke="#c8a061" strokeWidth="2" />
              <text x="50" y="54" textAnchor="middle" fill="#f0c040" fontSize="10" fontWeight="bold">
                iS
              </text>
            </svg>

            <span
              style={{
                position: 'absolute',
                bottom: '4px',
                background: 'rgba(12, 4, 20, 0.85)',
                color: '#f0c040',
                fontSize: '0.62rem',
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: '4px',
                letterSpacing: '0.5px',
                border: '1px solid #c8a061',
              }}
            >
              {demoBadgeText}
            </span>
          </div>
        )}
      </div>

      <p
        style={{
          color: 'var(--hp-gold)',
          fontWeight: '700',
          fontSize: '0.95rem',
          marginTop: '14px',
          marginBottom: '4px',
        }}
      >
        {label}
      </p>
      <span style={{ color: 'var(--hp-text-muted)', fontSize: '0.82rem', marginBottom: '8px' }}>
        {sublabel}
      </span>

      {showFallback && (
        <div
          style={{
            marginTop: '8px',
            background: 'rgba(200, 160, 97, 0.12)',
            border: '1px dashed var(--hp-gold)',
            borderRadius: '8px',
            padding: '8px 10px',
            fontSize: '0.78rem',
            color: 'var(--hp-text-muted)',
            lineHeight: '1.4',
          }}
        >
          {placeholderNotice}
        </div>
      )}

      {onActionClick && (
        <button
          onClick={onActionClick}
          className="btn-outline-gold"
          style={{
            marginTop: '12px',
            padding: '6px 14px',
            fontSize: '0.8rem',
            width: '100%',
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

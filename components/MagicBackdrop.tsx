'use client';

import React from 'react';

/**
 * MagicBackdrop — a layer of soft-blurred original illustrations
 * (candle, quill, potion bottle, crescent moon, starburst) meant to be dropped
 * inside a `position: relative` section as its first child, so it reliably
 * paints above that section's own background and below the section's real
 * content (which should come after it in the JSX). Purely decorative.
 */
export default function MagicBackdrop() {
  const items: {
    top: string;
    left?: string;
    right?: string;
    size: number;
    opacity: number;
    blur: number;
    rotate?: number;
    node: React.ReactNode;
  }[] = [
    {
      top: '6%',
      left: '2%',
      size: 150,
      opacity: 0.28,
      blur: 0.5,
      rotate: -8,
      node: <CandleIcon />,
    },
    {
      top: '58%',
      right: '3%',
      size: 170,
      opacity: 0.26,
      blur: 0.5,
      rotate: 6,
      node: <QuillIcon />,
    },
    {
      top: '30%',
      right: '6%',
      size: 120,
      opacity: 0.25,
      blur: 0.5,
      rotate: -4,
      node: <PotionIcon />,
    },
    {
      top: '78%',
      left: '4%',
      size: 130,
      opacity: 0.25,
      blur: 0.5,
      rotate: 10,
      node: <MoonStarsIcon />,
    },
    {
      top: '4%',
      right: '16%',
      size: 100,
      opacity: 0.22,
      blur: 0.5,
      node: <StarburstIcon />,
    },
  ];

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: it.top,
            left: it.left,
            right: it.right,
            width: it.size,
            height: it.size,
            opacity: it.opacity,
            filter: `blur(${it.blur}px)`,
            transform: it.rotate ? `rotate(${it.rotate}deg)` : undefined,
            color: '#c9a24a',
          }}
        >
          {it.node}
        </div>
      ))}
    </div>
  );
}

function CandleIcon() {
  return (
    <svg viewBox="0 0 100 160" width="100%" height="100%" fill="none">
      <ellipse cx="50" cy="30" rx="9" ry="16" fill="#e8a33c" opacity="0.9" />
      <ellipse cx="50" cy="34" rx="5" ry="10" fill="#fff3d6" opacity="0.8" />
      <rect x="34" y="46" width="32" height="90" rx="4" fill="currentColor" opacity="0.85" />
      <rect x="28" y="132" width="44" height="14" rx="3" fill="currentColor" />
    </svg>
  );
}

function QuillIcon() {
  return (
    <svg viewBox="0 0 140 160" width="100%" height="100%" fill="none">
      <path
        d="M120 10 C90 20 40 50 20 110 C15 125 15 140 15 150"
        stroke="currentColor"
        strokeWidth="4"
        opacity="0.9"
      />
      <path
        d="M120 10 C100 30 60 40 35 90 C25 110 20 130 15 150"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.6"
      />
      <path
        d="M120 10 C95 12 55 20 30 70"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.5"
      />
    </svg>
  );
}

function PotionIcon() {
  return (
    <svg viewBox="0 0 100 140" width="100%" height="100%" fill="none">
      <rect x="42" y="10" width="16" height="24" rx="2" fill="currentColor" opacity="0.8" />
      <path
        d="M42 34 L34 60 C20 80 20 120 50 120 C80 120 80 80 66 60 L58 34 Z"
        fill="currentColor"
        opacity="0.35"
      />
      <path d="M30 85 C30 105 70 105 70 85" fill="currentColor" opacity="0.6" />
      <circle cx="45" cy="70" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="55" cy="60" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function MoonStarsIcon() {
  return (
    <svg viewBox="0 0 140 140" width="100%" height="100%" fill="none">
      <path
        d="M85 20 A45 45 0 1 0 85 120 A36 36 0 1 1 85 20 Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path d="M25 30 L28 38 L36 41 L28 44 L25 52 L22 44 L14 41 L22 38 Z" fill="currentColor" opacity="0.6" />
      <path d="M110 95 L112 101 L118 103 L112 105 L110 111 L108 105 L102 103 L108 101 Z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function StarburstIcon() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
      <path
        d="M50 5 C51 30 70 49 95 50 C70 51 51 70 50 95 C49 70 30 51 5 50 C30 49 49 30 50 5 Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}

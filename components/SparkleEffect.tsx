'use client';

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

export default function SparkleEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Respect user preference for reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const particleCount = 26;
    const generated: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 14 + 16,
        duration: Math.random() * 5 + 7,
        delay: Math.random() * 9,
        drift: Math.random() * 60 - 30,
      });
    }
    setParticles(generated);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {particles.map((p) => (
        <svg
          key={p.id}
          className="sparkle-particle"
          viewBox="0 0 24 24"
          width={p.size}
          height={p.size}
          style={
            {
              position: 'absolute',
              left: `${p.x}%`,
              top: '-30px',
              opacity: 0,
              filter: 'drop-shadow(0 0 3px #fff6dd) drop-shadow(0 0 6px #e8c168)',
              animation: `star-fall ${p.duration}s linear ${p.delay}s infinite`,
              '--drift': `${p.drift}px`,
            } as React.CSSProperties
          }
        >
          <path
            d="M12 0 C12.6 5.2 14.6 9.6 18.5 12 C14.6 14.4 12.6 18.8 12 24 C11.4 18.8 9.4 14.4 5.5 12 C9.4 9.6 11.4 5.2 12 0 Z"
            fill="#fff3d6"
          />
        </svg>
      ))}
      <style jsx global>{`
        @keyframes star-fall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(0.6);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          90% {
            opacity: 0.95;
          }
          100% {
            transform: translateY(100vh) translateX(var(--drift)) rotate(200deg) scale(1);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sparkle-particle {
            display: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

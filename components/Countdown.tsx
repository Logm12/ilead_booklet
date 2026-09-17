'use client';

import React, { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: string; // ISO date string
  dayLabel?: string;
  hourLabel?: string;
  minuteLabel?: string;
  secondLabel?: string;
}

function getTimeLeft(target: number) {
  const diff = Math.max(target - Date.now(), 0);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({
  targetDate,
  dayLabel = 'Ngày',
  hourLabel = 'Giờ',
  minuteLabel = 'Phút',
  secondLabel = 'Giây',
}: CountdownProps) {
  const target = new Date(targetDate).getTime();
  const [time, setTime] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { value: time.days, label: dayLabel },
    { value: time.hours, label: hourLabel },
    { value: time.minutes, label: minuteLabel },
    { value: time.seconds, label: secondLabel },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '14px',
        flexWrap: 'wrap',
        margin: '36px 0',
      }}
    >
      {units.map((u) => (
        <div
          key={u.label}
          style={{
            background: 'linear-gradient(180deg, #1a1a2c 0%, #0d0d18 100%)',
            border: '1px solid var(--hp-border)',
            borderRadius: '8px',
            padding: '16px 14px',
            minWidth: '76px',
            textAlign: 'center',
          }}
        >
          <div
            className="font-wizard"
            style={{
              fontSize: '2rem',
              color: 'var(--hp-text)',
              textShadow: '0 0 14px var(--hp-border-glow)',
              lineHeight: 1,
            }}
          >
            {String(u.value).padStart(2, '0')}
          </div>
          <div
            style={{
              marginTop: '6px',
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--hp-text-muted)',
            }}
          >
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}

'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p style={{ margin: '0 0 10px 0', fontSize: '0.95rem', color: 'var(--hp-gold)' }}>
          iSupport Club — VNU International School (VNU-IS)
        </p>
        <p style={{ margin: 0, fontSize: '0.85rem' }}>
          &copy; {new Date().getFullYear()} iSupport - We Support. Together We Create the Values. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';

export default function Credits() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/wallpapers');
      const data = await res.json();
      setAnimes(data.animes);
    };
    
    fetchData();
  }, []);

  return (
    <>
      <Header animes={animes} />

      <main style={styles.main}>
        <div style={styles.pageHeader}>
          <span style={styles.pageTag}>Legal</span>
          <h1 style={styles.pageTitle}>Credits & Disclaimer</h1>
        </div>
        <div style={styles.content}>
          <div style={styles.card}>
            <div style={styles.cardIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-warm)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <p style={styles.text}>
              This website curates anime wallpapers from publicly available sources.
              All rights belong to the respective artists and copyright holders.
            </p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-warm)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <p style={styles.text}>
              Images are not hosted on this website—they are linked from their original sources.
              If you are the creator and wish to have your work removed, please contact us.
            </p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-warm)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <p style={styles.text}>
              Built with appreciation for the anime art community. Every wallpaper
              is attributed to its original artist whenever possible.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

const styles = {
  main: {
    maxWidth: '700px',
    margin: '0 auto',
    animation: 'cardReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
  },
  pageHeader: {
    marginBottom: '2rem',
  },
  pageTag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.65rem',
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
    display: 'block',
    marginBottom: '0.5rem',
  },
  pageTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    color: 'var(--text-primary)',
    margin: 0,
    lineHeight: 1.1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  card: {
    display: 'flex',
    gap: '1rem',
    padding: '1.25rem',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    alignItems: 'flex-start',
  },
  cardIcon: {
    flexShrink: 0,
    marginTop: '2px',
  },
  text: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: 'var(--text-secondary)',
    margin: 0,
  },
};

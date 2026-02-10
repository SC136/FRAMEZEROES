'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';

export default function CategoriesPage() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/wallpapers');
      const data = await res.json();
      setAnimes(data.animes || []);
    };

    fetchData();
  }, []);

  return (
    <>
      <Header animes={animes} />

      <main style={styles.main}>
        <div style={styles.pageHeader}>
          <span style={styles.pageTag}>Browse</span>
          <h1 style={styles.pageTitle}>All Categories</h1>
          <p style={styles.pageSub}>{animes.length} series in the collection</p>
        </div>
        <div style={styles.grid}>
          {animes.map((anime, idx) => (
            <Link
              key={anime}
              href={`/anime/${anime.toLowerCase().replace(/\s+/g, '-')}`}
              style={{
                ...styles.card,
                animationDelay: `${Math.min(idx * 0.04, 0.5)}s`,
              }}
            >
              <span style={styles.cardIndex}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span style={styles.cardTitle}>{anime}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.cardArrow}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

const styles = {
  main: {
    maxWidth: '900px',
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
    margin: '0 0 0.35rem',
    lineHeight: 1.1,
  },
  pageSub: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    borderTop: '1px solid var(--border)',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 1.25rem',
    textDecoration: 'none',
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--border)',
    transition: 'background 0.2s ease, padding-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    animation: 'cardReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
  },
  cardIndex: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.7rem',
    fontWeight: 500,
    color: 'var(--text-muted)',
    minWidth: '24px',
    letterSpacing: '0.05em',
  },
  cardTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '1.05rem',
    fontWeight: 500,
    flex: 1,
  },
  cardArrow: {
    color: 'var(--text-muted)',
    opacity: 0.4,
    transition: 'opacity 0.2s ease, transform 0.2s ease',
  },
};

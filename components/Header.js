'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';

export default function Header({ animes = [] }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef(null);

  const visibleCount = 5;
  const visibleAnimes = animes.slice(0, visibleCount);
  const hasMore = animes.length > visibleCount;

  const handleMouseEnter = () => {
    clearTimeout(closeTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  return (
    <header>
      <Link href="/" style={styles.logoLink} aria-label="Home">
        <div style={styles.logoMark}>
          <div style={styles.logoFrame} />
          <span style={styles.logoZero}>0</span>
        </div>
        <span style={styles.logoText}>FZ</span>
      </Link>
      <nav>
        <div
          style={styles.categoryContainer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button style={styles.categoryButton} aria-expanded={dropdownOpen}>
            <span>Categories</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {dropdownOpen && (
            <div style={styles.dropdown}>
              <div style={styles.dropdownLabel}>Browse by series</div>
              <div style={styles.dropdownContent}>
                {visibleAnimes.map(anime => (
                  <Link
                    key={anime}
                    href={`/anime/${anime.toLowerCase().replace(/\s+/g, '-')}`}
                    style={styles.dropdownItem}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span style={styles.dropdownDot} />
                    {anime}
                  </Link>
                ))}
              </div>
              {hasMore && (
                <Link
                  href="/categories"
                  style={styles.viewAllButton}
                  onClick={() => setDropdownOpen(false)}
                >
                  View all categories →
                </Link>
              )}
            </div>
          )}
        </div>

        <Link href="/credits">Credits</Link>
      </nav>
    </header>
  );
}

const styles = {
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    textDecoration: 'none',
  },
  logoMark: {
    position: 'relative',
    width: '36px',
    height: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoFrame: {
    position: 'absolute',
    inset: 0,
    border: '2.5px solid #e8dcc8',
    borderRadius: '2px',
  },
  logoZero: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#ff2d55',
    position: 'relative',
    zIndex: 1,
  },
  logoText: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: '#e8dcc8',
  },
  categoryContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  categoryButton: {
    background: 'none',
    border: 'none',
    color: '#9a9488',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    padding: '0.35rem 0.6rem',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    transition: 'color 0.2s ease, background 0.2s ease',
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: 0,
    backgroundColor: '#141419',
    border: '1px solid #1e1e26',
    borderRadius: '12px',
    minWidth: '240px',
    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03)',
    zIndex: 999,
    overflow: 'hidden',
    animation: 'cardReveal 0.25s cubic-bezier(0.16, 1, 0.3, 1) both',
  },
  dropdownLabel: {
    padding: '0.75rem 1rem 0.35rem',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.65rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#5c584f',
  },
  dropdownContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  dropdownItem: {
    padding: '0.6rem 1rem',
    color: '#9a9488',
    textDecoration: 'none',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9rem',
    transition: 'background 0.15s ease, color 0.15s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    borderLeft: '2px solid transparent',
  },
  dropdownDot: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: '#2e2e38',
    flexShrink: 0,
  },
  viewAllButton: {
    display: 'block',
    padding: '0.65rem 1rem',
    color: '#ff6b8a',
    textDecoration: 'none',
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 500,
    fontSize: '0.8rem',
    letterSpacing: '0.02em',
    borderTop: '1px solid #1e1e26',
    transition: 'background 0.15s ease',
  },
};

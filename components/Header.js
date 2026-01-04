'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function Header({ animes = [] }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const visibleCount = 5;
  const visibleAnimes = animes.slice(0, visibleCount);
  const hasMore = animes.length > visibleCount;

  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const handleCategoryMouseEnter = (e) => {
    clearTimeout(closeTimeoutRef.current);
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + 8,
      left: rect.left,
    });
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  const handleMouseEnter = () => {
    clearTimeout(closeTimeoutRef.current);
    setDropdownOpen(true);
  };

  return (
    <header>
      <Link href="/" style={styles.logoFrame}>
        <div style={styles.frameBox} />
      </Link>
      <nav>
        <div
          style={styles.categoryContainer}
          ref={dropdownRef}
          onMouseEnter={handleCategoryMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button style={styles.categoryButton}>Categories</button>
        </div>

        {dropdownOpen && (
          <div
            style={{
              ...styles.dropdown,
              top: `${dropdownPos.top}px`,
              left: `${dropdownPos.left}px`,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={styles.dropdownContent}>
              {visibleAnimes.map(anime => (
                <Link
                  key={anime}
                  href={`/anime/${anime.toLowerCase().replace(/\s+/g, '-')}`}
                  style={styles.dropdownItem}
                  onClick={() => setDropdownOpen(false)}
                >
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
                View All Categories
              </Link>
            )}
          </div>
        )}

        <Link href="/credits">Credits</Link>
      </nav>
    </header>
  );
}

const styles = {
  logoFrame: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45px',
    height: '45px',
    minWidth: '45px',
  },
  frameBox: {
    width: '43px',
    height: '40px',
    border: '5px solid #ffffffff',
    borderRadius: '0px',
  },
  categoryContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  categoryButton: {
    background: 'none',
    border: 'none',
    color: '#a0a0a0',
    fontSize: '1rem',
    cursor: 'pointer',
    padding: 0,
    margin: 0,
    transition: 'color 0.2s ease',
    fontWeight: 500,
    letterSpacing: '0.5px',
  },
  dropdown: {
    position: 'fixed',
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '6px',
    minWidth: '220px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    overflow: 'hidden',
  },
  dropdownContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  dropdownItem: {
    padding: '0.75rem 1rem',
    color: '#a0a0a0',
    textDecoration: 'none',
    borderBottom: '1px solid #2a2a2a',
    transition: 'backgroundColor 0.15s ease, color 0.15s ease',
  },
  viewAllButton: {
    padding: '0.75rem 1rem',
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 500,
    textAlign: 'center',
    transition: 'backgroundColor 0.15s ease',
  },
};

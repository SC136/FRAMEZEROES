'use client';

import { useEffect, useMemo, useState } from 'react';
import WallpaperGrid from '@/components/WallpaperGrid';
import Header from '@/components/Header';
import { SkeletonGrid } from '@/components/Skeleton';
import RandomButton from '@/components/RandomButton';

export default function Home() {
  const [animes, setAnimes] = useState([]);
  const [allWallpapers, setAllWallpapers] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch('/api/wallpapers');
      const data = await res.json();
      setAnimes(data.animes);
      setAllWallpapers(data.wallpapers);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  const filteredItems = useMemo(() => {
    if (!allWallpapers || allWallpapers.length === 0) return [];

    const q = search.toLowerCase().trim();

    const filtered = allWallpapers.filter(w => {
      if (!q) return true;
      return (
        (w.anime && w.anime.toLowerCase().includes(q)) ||
        (w.artist && w.artist.toLowerCase().includes(q)) ||
        (w.source && w.source.toLowerCase().includes(q))
      );
    });

    const byDate = (val) => {
      const t = new Date(val || '').getTime();
      return Number.isFinite(t) ? t : 0;
    };

    if (sort === 'newest') {
      return [...filtered].sort((a, b) => byDate(b.addedOn) - byDate(a.addedOn));
    }
    if (sort === 'oldest') {
      return [...filtered].sort((a, b) => byDate(a.addedOn) - byDate(b.addedOn));
    }
    if (sort === 'popular') {
      return [...filtered].sort(() => Math.random() - 0.5);
    }
    return filtered;
  }, [allWallpapers, search, sort]);

  return (
    <>
      <Header animes={animes} />

      <main>
        {/* Hero section */}
        <div style={styles.hero}>
          <div style={styles.heroInner}>
            <div style={styles.heroTagline}>
              <span style={styles.heroDot} />
              <span style={styles.heroTagText}>Curated Collection</span>
            </div>
            <h1 style={styles.heroTitle}>
              FRAME<span style={styles.heroAccent}>ZEROES</span>
            </h1>
            <p style={styles.heroSub}>
              Hand-picked anime wallpapers from the finest artists across the web.
            </p>
          </div>
        </div>

        {/* Controls bar */}
        <div style={styles.controlsBar}>
          <div style={styles.controlsLeft}>
            <span style={styles.resultCount}>
              {isLoading ? '...' : filteredItems.length} wallpapers
            </span>
          </div>
          <div style={styles.controlsRight}>
            <div style={styles.searchWrapper}>
              <svg style={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                id="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search anime, artist..."
                style={styles.input}
              />
            </div>
            <div style={styles.sortWrapper}>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={styles.select}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="popular">Shuffle</option>
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <SkeletonGrid count={12} />
        ) : (
          <WallpaperGrid items={filteredItems} allWallpapers={allWallpapers} />
        )}
      </main>

      <RandomButton totalCount={allWallpapers.length} />
    </>
  );
}

const styles = {
  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 2rem 3rem',
    textAlign: 'center',
    animation: 'cardReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
  },
  heroInner: {
    maxWidth: '640px',
  },
  heroTagline: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1.25rem',
    padding: '0.35rem 0.9rem',
    background: 'rgba(255, 45, 85, 0.06)',
    border: '1px solid rgba(255, 45, 85, 0.12)',
    borderRadius: '100px',
  },
  heroDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#ff2d55',
    boxShadow: '0 0 8px rgba(255, 45, 85, 0.5)',
  },
  heroTagText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#ff6b8a',
  },
  heroTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    fontWeight: 700,
    letterSpacing: '-0.04em',
    lineHeight: 1,
    color: '#e8dcc8',
    margin: '0 0 1rem',
  },
  heroAccent: {
    color: '#ff2d55',
  },
  heroSub: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '1.05rem',
    color: '#9a9488',
    lineHeight: 1.6,
    maxWidth: '420px',
    margin: '0 auto',
  },

  /* Controls */
  controlsBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    padding: '0 0 1.75rem',
    borderBottom: '1px solid #1e1e26',
    marginBottom: '1.75rem',
    flexWrap: 'wrap',
    animation: 'cardReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both',
  },
  controlsLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  resultCount: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#5c584f',
  },
  controlsRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: '0.85rem',
    color: '#5c584f',
    pointerEvents: 'none',
  },
  input: {
    padding: '0.6rem 0.85rem 0.6rem 2.5rem',
    backgroundColor: '#0e0e12',
    border: '1px solid #1e1e26',
    borderRadius: '8px',
    color: '#e8dcc8',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9rem',
    width: '260px',
    transition: 'border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
    outline: 'none',
  },
  select: {
    padding: '0.6rem 0.85rem',
    backgroundColor: '#0e0e12',
    border: '1px solid #1e1e26',
    borderRadius: '8px',
    color: '#e8dcc8',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
    outline: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235c584f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.75rem center',
    paddingRight: '2rem',
  },
  sortWrapper: {
    position: 'relative',
  },
};

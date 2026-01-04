'use client';

import { useEffect, useMemo, useState } from 'react';
import WallpaperGrid from '@/components/WallpaperGrid';
import Header from '@/components/Header';

export default function Home() {
  const [animes, setAnimes] = useState([]);
  const [allWallpapers, setAllWallpapers] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/wallpapers');
      const data = await res.json();
      setAnimes(data.animes);
      setAllWallpapers(data.wallpapers);
    };
    
    fetchData();
  }, []);
  const filteredItems = useMemo(() => {
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
    // "Popular" fallback: keep original order but add a slight shuffle for variation
    if (sort === 'popular') {
      return [...filtered].sort(() => Math.random() - 0.5);
    }
    return filtered;
  }, [allWallpapers, search, sort]);

  return (
    <>
      <Header animes={animes} />

      <main>
        <div style={styles.heroSection}>
          <img src="/FRAMEZERO_only.png" alt="Anime Archive" style={styles.heroLogo} />
        </div>
        <h1>Browse Wallpapers</h1>
        <section style={styles.controls}>
          <div style={styles.fieldGroup}>
            <label htmlFor="search" style={styles.label}>Search</label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Anime, artist, source"
              style={styles.input}
            />
          </div>
          <div style={styles.fieldGroup}>
            <label htmlFor="sort" style={styles.label}>Sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={styles.select}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </section>
        <WallpaperGrid items={filteredItems} allWallpapers={allWallpapers} />
      </main>
    </>
  );
}

const styles = {
  controls: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1rem',
    padding: '0 2rem 1rem',
    alignItems: 'end',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    fontSize: '0.95rem',
    color: '#bbb',
  },
  input: {
    padding: '0.75rem 0.85rem',
    backgroundColor: '#111',
    border: '1px solid #333',
    borderRadius: '6px',
    color: '#eaeaea',
    fontSize: '1rem',
  },
  select: {
    padding: '0.75rem 0.85rem',
    backgroundColor: '#111',
    border: '1px solid #333',
    borderRadius: '6px',
    color: '#eaeaea',
    fontSize: '1rem',
  },
  heroSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem 2rem',
    marginBottom: '1rem',
  },
  heroLogo: {
    height: '120px',
    width: 'auto',
    objectFit: 'contain',
  },
};

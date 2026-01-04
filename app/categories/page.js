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

      <main style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h1>All Categories</h1>
        <div style={styles.grid}>
          {animes.map(anime => (
            <Link
              key={anime}
              href={`/anime/${anime.toLowerCase().replace(/\s+/g, '-')}`}
              style={styles.card}
            >
              <div style={styles.cardTitle}>{anime}</div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  card: {
    padding: '1.5rem',
    backgroundColor: '#111',
    border: '1px solid #333',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#eaeaea',
    textAlign: 'center',
    transition: 'border-color 0.2s ease, background-color 0.2s ease',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: 500,
  },
};

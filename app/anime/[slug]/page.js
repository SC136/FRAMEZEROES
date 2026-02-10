'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import WallpaperGrid from '@/components/WallpaperGrid';
import Header from '@/components/Header';

export default function AnimePage() {
  const params = useParams();
  const slug = params.slug;
  const [items, setItems] = useState([]);
  const [animes, setAnimes] = useState([]);
  const [allWallpapers, setAllWallpapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const animeTitle = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch('/api/wallpapers');
      const data = await res.json();
      setAnimes(data.animes);
      setAllWallpapers(data.wallpapers);
      setItems(data.wallpapers.filter(w => w.anime === animeTitle));
      setIsLoading(false);
    };
    
    fetchData();
  }, [animeTitle]);

  return (
    <>
      <Header animes={animes} />

      <main style={styles.main}>
        <div style={styles.breadcrumb}>
          <Link href="/" style={styles.breadcrumbLink}>Gallery</Link>
          <span style={styles.breadcrumbSep}>/</span>
          <Link href="/categories" style={styles.breadcrumbLink}>Categories</Link>
          <span style={styles.breadcrumbSep}>/</span>
          <span style={styles.breadcrumbCurrent}>{animeTitle}</span>
        </div>
        <div style={styles.pageHeader}>
          <span style={styles.pageTag}>Series</span>
          <h1 style={styles.pageTitle}>{animeTitle}</h1>
          {!isLoading && (
            <p style={styles.pageSub}>{items.length} wallpaper{items.length !== 1 ? 's' : ''}</p>
          )}
        </div>
        <WallpaperGrid items={items} allWallpapers={allWallpapers} />
      </main>
    </>
  );
}

const styles = {
  main: {
    animation: 'cardReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.7rem',
    letterSpacing: '0.04em',
  },
  breadcrumbLink: {
    color: 'var(--text-muted)',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  breadcrumbSep: {
    color: 'var(--border-hover)',
  },
  breadcrumbCurrent: {
    color: 'var(--text-secondary)',
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
};

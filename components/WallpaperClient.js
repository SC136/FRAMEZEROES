'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function WallpaperClient({
  initialWallpaper,
  allWallpapers,
  animes,
  wallpaperId,
}) {
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const id = params?.id;

  const wallpaper = initialWallpaper;
  const currentIndex = wallpaperId;
  const previousIndex = currentIndex > 0 ? currentIndex - 1 : null;
  const nextIndex = currentIndex < allWallpapers.length - 1 ? currentIndex + 1 : null;

  const handleCopyLink = () => {
    const url = `${window.location.origin}/wallpaper/${id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!wallpaper) {
    return (
      <>
        <Header animes={animes} />
        <main style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h1>Wallpaper Not Found</h1>
          <p>The wallpaper you're looking for doesn't exist.</p>
          <Link href="/">← Back to Home</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Header animes={animes} />

      <main style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={styles.container}>
          <div style={styles.previewSection}>
            <img
              src={wallpaper.image}
              alt={wallpaper.anime}
              style={styles.image}
            />
          </div>

          <div style={styles.detailsSection}>
            <div style={styles.header}>
              <h1 style={styles.title}>{wallpaper.anime}</h1>
              <button
                onClick={handleCopyLink}
                style={{
                  ...styles.shareButton,
                  backgroundColor: copied ? '#2d8659' : '#007bff',
                }}
              >
                {copied ? '✓ Copied!' : 'Share'}
              </button>
            </div>

            <div style={styles.metadata}>
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Artist:</span>
                {wallpaper.artistLink ? (
                  <a
                    href={wallpaper.artistLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.link}
                  >
                    {wallpaper.artist}
                  </a>
                ) : (
                  <span>{wallpaper.artist}</span>
                )}
              </div>

              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Source:</span>
                <span>{wallpaper.source}</span>
              </div>

              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Added:</span>
                <span>{wallpaper.addedOn || '—'}</span>
              </div>
            </div>

            <div style={styles.actions}>
              <a
                href={wallpaper.image}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.downloadButton}
              >
                View Full Size
              </a>
              <a
                href={`/anime/${wallpaper.anime.toLowerCase().replace(/\s+/g, '-')}`}
                style={styles.backButton}
              >
                See All {wallpaper.anime}
              </a>
            </div>

            <div style={styles.navigation}>
              {previousIndex !== null && (
                <Link href={`/wallpaper/${previousIndex}`} style={styles.navButton}>
                  ← Previous
                </Link>
              )}
              <span style={styles.navCounter}>
                {currentIndex + 1} / {allWallpapers.length}
              </span>
              {nextIndex !== null && (
                <Link href={`/wallpaper/${nextIndex}`} style={styles.navButton}>
                  Next →
                </Link>
              )}
            </div>
          </div>
        </div>

        <div style={styles.backLink}>
          <Link href="/">← Back to Home</Link>
        </div>
      </main>
    </>
  );
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    marginTop: '2rem',
    alignItems: 'start',
  },
  previewSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '600px',
    borderRadius: '10px',
    border: '1px solid #333',
  },
  detailsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  title: {
    margin: 0,
    fontSize: '2rem',
    color: '#eaeaea',
  },
  shareButton: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'background-color 0.2s ease',
    whiteSpace: 'nowrap',
  },
  metadata: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #333',
  },
  metaItem: {
    display: 'flex',
    gap: '0.5rem',
    fontSize: '1rem',
    color: '#ccc',
  },
  metaLabel: {
    fontWeight: 600,
    color: '#888',
    minWidth: '70px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  downloadButton: {
    flex: 1,
    minWidth: '150px',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '6px',
    textAlign: 'center',
    fontWeight: 500,
    transition: 'background-color 0.2s ease',
  },
  backButton: {
    flex: 1,
    minWidth: '150px',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#444',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '6px',
    textAlign: 'center',
    fontWeight: 500,
    transition: 'background-color 0.2s ease',
  },
  navigation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #333',
  },
  navButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#333',
    color: '#eaeaea',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '0.95rem',
    transition: 'background-color 0.2s ease',
  },
  navCounter: {
    fontSize: '0.9rem',
    color: '#999',
  },
  backLink: {
    marginTop: '2rem',
    paddingBottom: '2rem',
  },
};

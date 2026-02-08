'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { useFavorites } from '@/lib/useFavorites';

export default function WallpaperClient({
  initialWallpaper,
  allWallpapers,
  animes,
  wallpaperId,
}) {
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const id = params?.id;
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

  const wallpaper = initialWallpaper;
  const currentIndex = wallpaperId;
  const previousIndex = currentIndex > 0 ? currentIndex - 1 : null;
  const nextIndex = currentIndex < allWallpapers.length - 1 ? currentIndex + 1 : null;

  const favorited = isLoaded && isFavorite(wallpaperId);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/wallpaper/${id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/wallpaper/${id}`;
    }
    return '';
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=Check out this ${wallpaper?.anime} wallpaper!&url=${encodeURIComponent(getShareUrl())}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(getShareUrl())}&media=${encodeURIComponent(wallpaper?.image || '')}&description=${encodeURIComponent(`${wallpaper?.anime} wallpaper`)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(getShareUrl())}&title=${encodeURIComponent(`${wallpaper?.anime} wallpaper`)}`,
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
                onClick={() => toggleFavorite(wallpaperId)}
                style={{
                  ...styles.favoriteButton,
                  backgroundColor: favorited ? '#dc2626' : '#222',
                  borderColor: favorited ? '#dc2626' : '#333',
                  color: favorited ? '#fff' : '#666',
                }}
                title={favorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={favorited ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
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

            {/* Share Buttons */}
            <div style={styles.shareSection}>
              <span style={styles.shareLabel}>Share:</span>
              <div style={styles.shareButtons}>
                <button onClick={handleCopyLink} style={styles.shareBtn} title="Copy link">
                  {copied ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  )}
                </button>
                <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" style={styles.shareBtn} title="Share on X">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" style={styles.shareBtn} title="Share on Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href={shareLinks.pinterest} target="_blank" rel="noopener noreferrer" style={styles.shareBtn} title="Share on Pinterest">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href={shareLinks.reddit} target="_blank" rel="noopener noreferrer" style={styles.shareBtn} title="Share on Reddit">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                  </svg>
                </a>
              </div>
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
  favoriteButton: {
    width: '40px',
    height: '40px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222',
    color: '#666',
    border: '1px solid #333',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    flexShrink: 0,
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
  shareSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    paddingTop: '0.5rem',
  },
  shareLabel: {
    color: '#666',
    fontSize: '0.9rem',
    fontWeight: 500,
    flexShrink: 0,
  },
  shareButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  shareBtn: {
    width: '36px',
    height: '36px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222',
    color: '#999',
    border: '1px solid #333',
    borderRadius: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
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

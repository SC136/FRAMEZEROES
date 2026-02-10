'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';

const ITEMS_PER_PAGE = 12;

function LazyImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className="lazy-image-container">
      {inView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`lazy-image ${loaded ? 'loaded' : ''}`}
          onLoad={() => setLoaded(true)}
        />
      )}
      {(!inView || !loaded) && <div className="image-placeholder" />}
    </div>
  );
}

export default function WallpaperGrid({ items, allWallpapers = [] }) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loaderRef = useRef(null);

  const getWallpaperId = (item) => {
    return allWallpapers.findIndex(w => w.image === item.image && w.anime === item.anime);
  };

  const handleObserver = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && visibleCount < items.length) {
      setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, items.length));
    }
  }, [visibleCount, items.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '300px',
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [items]);

  const visibleItems = items.slice(0, visibleCount);

  return (
    <>
      <section className="masonry">
        {visibleItems.map((w, idx) => {
          const wallpaperId = allWallpapers.length > 0 ? getWallpaperId(w) : idx;
          return (
            <article className="wallpaper" key={`${wallpaperId}-${idx}`}>
              <Link
                className="wallpaper-link"
                href={`/wallpaper/${wallpaperId}`}
                aria-label={`${w.anime} wallpaper by ${w.artist}`}
              />
              <LazyImage src={w.image} alt={w.anime} />
              <div className="overlay">
                <span className="anime">{w.anime}</span>
                <span className="artist">
                  <a href={w.artistLink} target="_blank" rel="noopener noreferrer">{w.artist}</a>
                  {' · '}
                  <span style={{ color: 'var(--text-muted)' }}>{w.source}</span>
                </span>
              </div>
            </article>
          );
        })}
      </section>

      {visibleCount < items.length && (
        <div ref={loaderRef} className="infinite-scroll-loader">
          <div className="loader-spinner" />
          <span>Loading more...</span>
        </div>
      )}
    </>
  );
}

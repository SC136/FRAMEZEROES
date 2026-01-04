'use client';

import Link from 'next/link';

export default function WallpaperGrid({ items, allWallpapers = [] }) {
  // Helper to find the index of an item in the full wallpapers list
  const getWallpaperId = (item) => {
    return allWallpapers.findIndex(w => w.image === item.image && w.anime === item.anime);
  };

  return (
    <section className="masonry">
      {items.map((w, idx) => {
        const wallpaperId = allWallpapers.length > 0 ? getWallpaperId(w) : idx;
        return (
          <article className="wallpaper" key={idx}>
            <Link
              className="wallpaper-link"
              href={`/wallpaper/${wallpaperId}`}
              aria-label={`${w.anime} wallpaper by ${w.artist}`}
            />
            <img src={w.image} alt={w.anime} />
            <div className="overlay">
              <span className="anime">{w.anime}</span>
              <span className="artist">
                by <a href={w.artistLink} target="_blank" rel="noopener noreferrer">{w.artist}</a>
                · {w.source}
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}

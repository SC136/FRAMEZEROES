'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import WallpaperGrid from '@/components/WallpaperGrid';
import Header from '@/components/Header';

export default function AnimePage() {
  const params = useParams();
  const slug = params.slug;
  const [items, setItems] = useState([]);
  const [animes, setAnimes] = useState([]);
  const [allWallpapers, setAllWallpapers] = useState([]);
  
  // Convert slug back to anime name
  const animeTitle = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/wallpapers');
      const data = await res.json();
      setAnimes(data.animes);
      setAllWallpapers(data.wallpapers);
      setItems(data.wallpapers.filter(w => w.anime === animeTitle));
    };
    
    fetchData();
  }, [animeTitle]);

  return (
    <>
      <Header animes={animes} />

      <main>
        <h1>{animeTitle}</h1>
        <WallpaperGrid items={items} allWallpapers={allWallpapers} />
      </main>
    </>
  );
}

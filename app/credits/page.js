'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';

export default function Credits() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/wallpapers');
      const data = await res.json();
      setAnimes(data.animes);
    };
    
    fetchData();
  }, []);

  return (
    <>
      <Header animes={animes} />

      <main>
        <h1>Credits & Disclaimer</h1>
        <p>
          This website curates anime wallpapers from publicly available sources.
          All rights belong to the respective artists.
          Images are not hosted on this website.
        </p>
      </main>
    </>
  );
}

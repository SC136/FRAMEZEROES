import { notFound } from 'next/navigation';
import WallpaperClient from '@/components/WallpaperClient';

async function getWallpapers() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/wallpapers`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch (error) {
    console.error('Error fetching wallpapers:', error);
    return { wallpapers: [], animes: [] };
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = await getWallpapers();
  const wallpaperId = parseInt(id, 10);

  if (wallpaperId < 0 || wallpaperId >= data.wallpapers.length) {
    return {
      title: 'Wallpaper Not Found',
    };
  }

  const wallpaper = data.wallpapers[wallpaperId];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const pageUrl = `${baseUrl}/wallpaper/${id}`;

  return {
    title: `${wallpaper.anime} Wallpaper by ${wallpaper.artist}`,
    description: `Beautiful ${wallpaper.anime} wallpaper by ${wallpaper.artist}. Source: ${wallpaper.source}`,
    openGraph: {
      title: `${wallpaper.anime} Wallpaper`,
      description: `${wallpaper.anime} wallpaper by ${wallpaper.artist}`,
      images: [
        {
          url: wallpaper.image,
          width: 1920,
          height: 1080,
          alt: `${wallpaper.anime} wallpaper`,
        },
      ],
      url: pageUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${wallpaper.anime} Wallpaper`,
      description: `Beautiful wallpaper by ${wallpaper.artist}`,
      images: [wallpaper.image],
    },
  };
}

export default async function WallpaperPage({ params }) {
  const { id } = await params;
  const data = await getWallpapers();
  const wallpaperId = parseInt(id, 10);

  if (wallpaperId < 0 || wallpaperId >= data.wallpapers.length) {
    notFound();
  }

  return (
    <WallpaperClient
      initialWallpaper={data.wallpapers[wallpaperId]}
      allWallpapers={data.wallpapers}
      animes={data.animes}
      wallpaperId={wallpaperId}
    />
  );
}

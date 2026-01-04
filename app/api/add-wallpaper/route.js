import { addWallpaperToFile } from '@/lib/wallpapers-server';

export async function POST(request) {
  try {
    const password = request.headers.get('x-password');
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password !== adminPassword) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { anime, image, artist, artistLink, source } = body;

    if (!anime || !image || !artist || !artistLink || !source) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newWallpaper = {
      anime,
      image,
      artist,
      artistLink,
      source,
      addedOn: new Date().toISOString().split('T')[0],
    };

    addWallpaperToFile(newWallpaper);

    return new Response(JSON.stringify({ success: true, wallpaper: newWallpaper }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

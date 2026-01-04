import { getWallpapers, getUniqueAnimes, updateWallpaperToFile, deleteWallpaperFromFile } from '@/lib/wallpapers-server';

export async function GET() {
  try {
    const wallpapers = await getWallpapers();
    const animes = await getUniqueAnimes();
    
    return new Response(JSON.stringify({ wallpapers, animes }), {
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

export async function PUT(request) {
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
    const { index, wallpaper } = body || {};

    if (!wallpaper || typeof index !== 'number' || !Number.isInteger(index)) {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const required = ['anime', 'image', 'artist', 'artistLink', 'source'];
    const missing = required.filter(key => !wallpaper[key]);
    if (missing.length) {
      return new Response(JSON.stringify({ error: `Missing fields: ${missing.join(', ')}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updated = await updateWallpaperToFile(index, wallpaper);
    return new Response(JSON.stringify({ success: true, wallpaper: updated }), {
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

export async function DELETE(request) {
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
    const { index } = body || {};

    if (typeof index !== 'number' || !Number.isInteger(index)) {
      return new Response(JSON.stringify({ error: 'Invalid index' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const deleted = await deleteWallpaperFromFile(index);
    return new Response(JSON.stringify({ success: true, deleted }), {
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

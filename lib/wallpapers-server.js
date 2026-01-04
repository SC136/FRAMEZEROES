import { query } from './db.js';

export const getWallpapers = async () => {
  const result = await query('SELECT * FROM wallpapers ORDER BY id ASC');
  
  // Transform database rows to match frontend format
  return result.rows.map(row => ({
    id: row.id,
    anime: row.anime,
    image: row.image,
    artist: row.artist,
    artistLink: row.artist_link,
    source: row.source,
    addedOn: row.added_on ? new Date(row.added_on).toISOString().split('T')[0] : null,
  }));
};

export const getUniqueAnimes = async () => {
  const result = await query('SELECT DISTINCT anime FROM wallpapers ORDER BY anime');
  return result.rows.map(row => row.anime);
};

export const addWallpaperToFile = async (newWallpaper) => {
  const result = await query(
    `INSERT INTO wallpapers (anime, image, artist, artist_link, source, added_on)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      newWallpaper.anime,
      newWallpaper.image,
      newWallpaper.artist,
      newWallpaper.artistLink || null,
      newWallpaper.source || null,
      newWallpaper.addedOn || new Date().toISOString().split('T')[0],
    ]
  );
  
  const row = result.rows[0];
  return {
    id: row.id,
    anime: row.anime,
    image: row.image,
    artist: row.artist,
    artistLink: row.artist_link,
    source: row.source,
    addedOn: row.added_on ? new Date(row.added_on).toISOString().split('T')[0] : null,
  };
};

export const updateWallpaperToFile = async (index, updatedWallpaper) => {
  // Get all wallpapers to find the ID at this index
  const wallpapers = await getWallpapers();
  
  if (typeof index !== 'number' || index < 0 || index >= wallpapers.length) {
    throw new Error('Invalid wallpaper index');
  }
  
  const wallpaperId = wallpapers[index].id;
  
  const result = await query(
    `UPDATE wallpapers 
     SET anime = $1, image = $2, artist = $3, artist_link = $4, source = $5, added_on = $6
     WHERE id = $7
     RETURNING *`,
    [
      updatedWallpaper.anime,
      updatedWallpaper.image,
      updatedWallpaper.artist,
      updatedWallpaper.artistLink || null,
      updatedWallpaper.source || null,
      updatedWallpaper.addedOn || new Date().toISOString().split('T')[0],
      wallpaperId,
    ]
  );
  
  if (result.rows.length === 0) {
    throw new Error('Wallpaper not found');
  }
  
  const row = result.rows[0];
  return {
    id: row.id,
    anime: row.anime,
    image: row.image,
    artist: row.artist,
    artistLink: row.artist_link,
    source: row.source,
    addedOn: row.added_on ? new Date(row.added_on).toISOString().split('T')[0] : null,
  };
};

export const deleteWallpaperFromFile = async (index) => {
  // Get all wallpapers to find the ID at this index
  const wallpapers = await getWallpapers();
  
  if (typeof index !== 'number' || index < 0 || index >= wallpapers.length) {
    throw new Error('Invalid wallpaper index');
  }
  
  const wallpaperId = wallpapers[index].id;
  
  const result = await query(
    'DELETE FROM wallpapers WHERE id = $1 RETURNING *',
    [wallpaperId]
  );
  
  if (result.rows.length === 0) {
    throw new Error('Wallpaper not found');
  }
  
  const row = result.rows[0];
  return {
    id: row.id,
    anime: row.anime,
    image: row.image,
    artist: row.artist,
    artistLink: row.artist_link,
    source: row.source,
    addedOn: row.added_on ? new Date(row.added_on).toISOString().split('T')[0] : null,
  };
};

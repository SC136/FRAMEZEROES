import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'wallpapers.json');

export const getWallpapers = () => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

export const getUniqueAnimes = () => {
  const wallpapers = getWallpapers();
  return [...new Set(wallpapers.map(w => w.anime))];
};

export const addWallpaperToFile = (newWallpaper) => {
  const wallpapers = getWallpapers();
  wallpapers.push(newWallpaper);
  fs.writeFileSync(filePath, JSON.stringify(wallpapers, null, 2));
  return newWallpaper;
};

export const updateWallpaperToFile = (index, updatedWallpaper) => {
  const wallpapers = getWallpapers();
  if (typeof index !== 'number' || index < 0 || index >= wallpapers.length) {
    throw new Error('Invalid wallpaper index');
  }

  const existing = wallpapers[index] || {};
  const merged = {
    ...existing,
    ...updatedWallpaper,
    addedOn: updatedWallpaper.addedOn || existing.addedOn || new Date().toISOString().split('T')[0],
  };

  wallpapers[index] = merged;
  fs.writeFileSync(filePath, JSON.stringify(wallpapers, null, 2));
  return merged;
};

export const deleteWallpaperFromFile = (index) => {
  const wallpapers = getWallpapers();
  if (typeof index !== 'number' || index < 0 || index >= wallpapers.length) {
    throw new Error('Invalid wallpaper index');
  }

  const deleted = wallpapers[index];
  wallpapers.splice(index, 1);
  fs.writeFileSync(filePath, JSON.stringify(wallpapers, null, 2));
  return deleted;
};

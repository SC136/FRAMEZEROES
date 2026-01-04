// Client-side wallpapers utility
export const getUniqueAnimes = (wallpapers) => {
  return [...new Set(wallpapers.map(w => w.anime))];
};

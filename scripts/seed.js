import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { query } from '../lib/db.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function seed() {
  try {
    console.log('Seeding database with existing wallpapers...');
    
    // Read existing wallpapers from JSON
    const wallpapersData = JSON.parse(
      readFileSync('data/wallpapers.json', 'utf-8')
    );
    
    // Insert each wallpaper
    for (const wallpaper of wallpapersData) {
      await query(
        `INSERT INTO wallpapers (anime, image, artist, artist_link, source, added_on)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          wallpaper.anime,
          wallpaper.image,
          wallpaper.artist,
          wallpaper.artistLink || null,
          wallpaper.source || null,
          wallpaper.addedOn || new Date().toISOString().split('T')[0],
        ]
      );
    }
    
    console.log(`✓ Seeded ${wallpapersData.length} wallpapers`);
  } catch (error) {
    console.error('Seed failed:', error);
    throw error;
  }
}

seed();

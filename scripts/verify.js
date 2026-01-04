import dotenv from 'dotenv';
import { query } from '../lib/db.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function verify() {
  try {
    console.log('Verifying database connection...');
    
    // Test connection
    const result = await query('SELECT COUNT(*) as count FROM wallpapers');
    const count = result.rows[0].count;
    
    console.log(`✓ Database connected successfully`);
    console.log(`✓ Found ${count} wallpapers in database`);
    
    // Get sample wallpaper
    const sample = await query('SELECT anime, artist FROM wallpapers LIMIT 1');
    if (sample.rows.length > 0) {
      const first = sample.rows[0];
      console.log(`✓ Sample wallpaper: "${first.anime}" by ${first.artist}`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('✗ Database verification failed:', error.message);
    process.exit(1);
  }
}

verify();

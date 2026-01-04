import dotenv from 'dotenv';
import { query } from '../lib/db.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS wallpapers (
    id SERIAL PRIMARY KEY,
    anime TEXT NOT NULL,
    image TEXT NOT NULL,
    artist TEXT NOT NULL,
    artist_link TEXT,
    source TEXT,
    added_on DATE DEFAULT CURRENT_DATE
  );
`;

async function migrate() {
  try {
    console.log('Running database migration...');
    await query(CREATE_TABLE);
    console.log('✓ Migration complete: wallpapers table created');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

migrate();

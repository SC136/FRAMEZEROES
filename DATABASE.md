# Database Migration & Deployment Guide

## Overview
This project has been migrated from file-based JSON storage to PostgreSQL (NeonDB) for production deployment on Vercel.

## Database Schema

The wallpapers table structure:

```sql
CREATE TABLE wallpapers (
  id SERIAL PRIMARY KEY,
  anime TEXT NOT NULL,
  image TEXT NOT NULL,
  artist TEXT NOT NULL,
  artist_link TEXT,
  source TEXT,
  added_on DATE DEFAULT CURRENT_DATE
);
```

## Environment Variables

Required environment variables in `.env.local`:

```env
ADMIN_PASSWORD=your_admin_password
DATABASE_URL=postgresql://user:password@host:port/dbname?sslmode=require
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # Change to production URL for deployment
```

## Database Setup

### 1. Create NeonDB Account
- Sign up at https://neon.tech
- Create a new project
- Copy the connection string

### 2. Run Migration
```bash
node scripts/migrate.js
```

This creates the wallpapers table in your database.

### 3. Seed Initial Data
```bash
node scripts/seed.js
```

This imports existing wallpapers from `data/wallpapers.json` into the database.

## Deployment to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit with database migration"
git remote add origin your-repo-url
git push -u origin main
```

### 2. Create Vercel Project
1. Go to https://vercel.com
2. Import your GitHub repository
3. Configure environment variables:
   - `ADMIN_PASSWORD`: Your admin panel password
   - `DATABASE_URL`: Your NeonDB connection string
   - `NEXT_PUBLIC_BASE_URL`: Your production URL (e.g., `https://your-app.vercel.app`)

### 3. Deploy
Vercel will automatically deploy on push. For manual deployment:
```bash
vercel deploy --prod
```

## API Endpoints

### GET /api/wallpapers
Returns all wallpapers and unique anime titles.

**Response:**
```json
{
  "wallpapers": [
    {
      "id": 1,
      "anime": "Dragon Raja",
      "image": "https://...",
      "artist": "Artist Name",
      "artistLink": "https://...",
      "source": "Source",
      "addedOn": "2026-01-03"
    }
  ],
  "animes": ["Dragon Raja", "100 METERS"]
}
```

### POST /api/add-wallpaper
Add a new wallpaper (requires admin password).

**Headers:**
- `x-password`: Admin password

**Body:**
```json
{
  "anime": "Anime Title",
  "image": "https://image-url.jpg",
  "artist": "Artist Name",
  "artistLink": "https://artist-link.com",
  "source": "Source Name"
}
```

### PUT /api/wallpapers
Update a wallpaper (requires admin password).

**Headers:**
- `x-password`: Admin password

**Body:**
```json
{
  "index": 0,
  "wallpaper": {
    "anime": "Updated Anime Title",
    "image": "https://new-image-url.jpg",
    "artist": "Updated Artist",
    "artistLink": "https://artist-link.com",
    "source": "Updated Source"
  }
}
```

### DELETE /api/wallpapers
Delete a wallpaper (requires admin password).

**Headers:**
- `x-password`: Admin password

**Body:**
```json
{
  "index": 0
}
```

## Database Utilities

### lib/db.js
Connection pool and query utilities:

```javascript
import { getPool, query } from '@/lib/db';

// Execute a query
const result = await query('SELECT * FROM wallpapers WHERE anime = $1', ['Dragon Raja']);
```

### lib/wallpapers-server.js
Server-side data access layer:

```javascript
import { 
  getWallpapers,       // Get all wallpapers
  getUniqueAnimes,     // Get unique anime titles
  addWallpaperToFile,  // Add new wallpaper
  updateWallpaperToFile, // Update wallpaper by index
  deleteWallpaperFromFile  // Delete wallpaper by index
} from '@/lib/wallpapers-server';

// All functions are async
const wallpapers = await getWallpapers();
```

## Migration Notes

### Changes from JSON to Database:
1. **File System Removed**: No longer using `fs.readFileSync`/`writeFileSync`
2. **Async Functions**: All data access functions are now async
3. **ID-based Operations**: Database uses auto-incrementing IDs
4. **Index Compatibility**: Update/delete functions still accept index for backward compatibility

### Breaking Changes:
- All data access functions now return Promises
- Must use `await` when calling data functions
- API routes already use async/await, so no changes needed

## Troubleshooting

### Connection Issues
If you get `ECONNREFUSED` errors:
1. Check DATABASE_URL is correct in `.env.local`
2. Ensure scripts load environment variables with dotenv
3. Verify NeonDB is accessible

### Migration Errors
If migration fails:
1. Check database credentials
2. Ensure NeonDB project is active
3. Verify SSL configuration in `lib/db.js`

### Data Not Showing
1. Run seed script: `node scripts/seed.js`
2. Check API response: `curl http://localhost:3000/api/wallpapers`
3. Verify DATABASE_URL in production environment variables

## Performance Notes

- **Connection Pooling**: Uses pg Pool for efficient connections
- **SSL**: Configured for NeonDB with `rejectUnauthorized: false`
- **Caching**: API routes use `cache: 'no-store'` for fresh data
- **Indexes**: Consider adding indexes on `anime` column for faster filtering

## Future Enhancements

Potential improvements:
1. Add database indexes for better performance
2. Implement pagination for large datasets
3. Add full-text search on anime/artist fields
4. Create database backup scripts
5. Add migration versioning system

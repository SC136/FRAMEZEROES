# Quick Start Guide

This is a rapid setup guide for the Anime Wallpapers site.

## 🚀 Local Development (5 minutes)

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/anime-wallpapers.git
cd anime-wallpapers
npm install
```

### 2. Set Up Environment
Create `.env.local`:
```env
ADMIN_PASSWORD=admin123
DATABASE_URL=your_neondb_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Initialize Database
```bash
node scripts/migrate.js  # Create table
node scripts/seed.js     # Import data
node scripts/verify.js   # Verify setup
```

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` 🎉

## ☁️ Production Deploy (10 minutes)

### 1. Get NeonDB Connection String
- Go to [neon.tech](https://neon.tech)
- Create free account
- Create project → Copy connection string

### 2. Initialize Database (One Time)
```bash
# Add to .env.local:
DATABASE_URL=your_neondb_connection_string

# Run:
node scripts/migrate.js
node scripts/seed.js
```

### 3. Deploy to Vercel
- Push code to GitHub
- Import to [Vercel](https://vercel.com)
- Add environment variables:
  - `ADMIN_PASSWORD`
  - `DATABASE_URL`
  - `NEXT_PUBLIC_BASE_URL`
- Deploy ✅

## 🔑 Admin Panel

Access at `/admin`:
- **URL**: `http://localhost:3000/admin`
- **Password**: Value of `ADMIN_PASSWORD`
- **Features**: Add, edit, delete wallpapers

## 📝 Common Commands

```bash
# Development
npm run dev           # Start dev server
npm run build         # Build for production
npm run start         # Start production server

# Database
node scripts/migrate.js  # Create schema
node scripts/seed.js     # Import data
node scripts/verify.js   # Check connection

# Git
git add .
git commit -m "message"
git push origin main
```

## 📁 Key Files

```
├── app/
│   ├── page.js           # Home page
│   ├── admin/page.js     # Admin panel
│   └── api/              # API routes
├── lib/
│   ├── db.js             # Database connection
│   └── wallpapers-server.js  # Data access
├── scripts/
│   ├── migrate.js        # DB migration
│   ├── seed.js           # Data import
│   └── verify.js         # DB check
└── .env.local            # Environment variables
```

## 🌐 URLs

**Local Development**:
- Home: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`
- API: `http://localhost:3000/api/wallpapers`

**Production** (replace with your domain):
- Home: `https://your-app.vercel.app`
- Admin: `https://your-app.vercel.app/admin`
- API: `https://your-app.vercel.app/api/wallpapers`

## 🆘 Troubleshooting

**Database connection fails**:
```bash
# Verify DATABASE_URL is correct
node scripts/verify.js
```

**No wallpapers showing**:
```bash
# Re-seed database
node scripts/seed.js
```

**Build fails on Vercel**:
- Check environment variables are set
- Verify `DATABASE_URL` format
- Check deployment logs

## 📚 Documentation

- [DATABASE.md](DATABASE.md) - Database details
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [README.md](README.md) - Full documentation
- [MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md) - Migration details

---

**Need help?** Check the full documentation or create an issue!

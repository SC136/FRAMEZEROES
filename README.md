# Anime Wallpapers

A modern, curated collection of high-quality anime wallpapers built with Next.js. Browse, search, and download wallpapers from your favorite anime series.

> **Production Ready**: Now using PostgreSQL (NeonDB) for persistent storage, deployable to Vercel!

## ✨ Features

- 🎨 **Curated Collection** - Handpicked high-quality anime wallpapers
- 🔍 **Smart Search** - Search by anime title or artist name
- 🔄 **Sort Options** - Sort by newest, oldest, or popular
- 📱 **Responsive Design** - Optimized for desktop and mobile devices
- 🎯 **Category Browsing** - Browse wallpapers by anime series
- ⚡ **Fast Performance** - Built with Next.js 16 for optimal speed
- 📥 **Easy Downloads** - Download wallpapers in full resolution
- 🔐 **Admin Panel** - Password-protected CRUD operations for wallpapers
- 🔗 **Shareable URLs** - Each wallpaper has its own page with Open Graph metadata
- 💾 **Database Storage** - PostgreSQL via NeonDB for production persistence

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SC136/FRAMEZEROES.git
cd anime-wallpapers
```

2. Create a `.env.local` file:
```bash
ADMIN_PASSWORD=your_admin_password
DATABASE_URL=your_neondb_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Set up the database:
```bash
# Run database migration
node scripts/migrate.js

# Seed initial data (optional)
node scripts/seed.js
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📦 Building for Production

For detailed database setup and deployment instructions, see [DATABASE.md](DATABASE.md).

```bash
npm run build
npm run start
```

## � Deploy to Vercel

Deploy your own instance with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SC136/FRAMEZEROES)

Or follow the [detailed deployment guide](DEPLOYMENT.md) for step-by-step instructions.

**Quick deploy:**
1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Deploy automatically!

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete instructions.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/)
- **Frontend:** React 18
- **Styling:** CSS Modules
- **Database:** PostgreSQL (NeonDB)
- **ORM:** Native pg library
- **Deployment:** Vercel-ready

## 📂 Project Structure

```
anime-wallpapers/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── anime/             # Anime detail pages
│   ├── categories/        # Category browsing
│   ├── wallpaper/         # Wallpaper detail pages
│   └── admin/             # Admin panel
├── components/            # React components
├── data/                  # Legacy wallpaper data (JSON)
├── lib/                   # Database utilities & server functions
├── scripts/               # Database migration & seed scripts
└── public/                # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- Wallpapers are sourced from various artists
- Individual artist credits are available on each wallpaper's detail page
- Visit the [Credits](http://localhost:3000/credits) page for more information

## ⚠️ Disclaimer

This is a fan-made project. All anime content and artwork belong to their respective copyright holders. This project is for educational and personal use only.

## 🔗 Links

- [Live Demo](#) - Add your deployed URL here
- [Report Bug](https://github.com/SC136/FRAMEZEROES/issues)
- [Request Feature](https://github.com/SC136/FRAMEZEROES/issues)

---

Made with ❤️ for anime fans

### Admin Panel

Access the admin panel at `/admin` with your `ADMIN_PASSWORD` to:
- Add new wallpapers
- Edit existing wallpapers
- Delete wallpapers

All changes are persisted to the database.

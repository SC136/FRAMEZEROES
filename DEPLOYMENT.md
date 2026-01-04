# Deploying to Vercel

This guide will help you deploy your Anime Wallpapers site to Vercel.

> **⚠️ Important**: This project uses PostgreSQL (NeonDB) for storage. You must set up a database before deploying.

## Prerequisites

- GitHub account
- Vercel account (free tier is fine)
- NeonDB account (free tier available at [neon.tech](https://neon.tech))

## 🚀 Quick Deploy

### Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "chore: Prepare for Vercel deployment"
   git push origin main
   ```

2. **Go to [Vercel](https://vercel.com)**
   - Sign up or log in with your GitHub account

3. **Import your repository**
   - Click "Add New..." → "Project"
   - Select your `anime-wallpapers` repository
   - Click "Import"

4. **Configure the project**

      **BEFORE DEPLOYING**: Add environment variables!
   
      Click "Environment Variables" and add these **required** variables:
   
      | Variable Name | Value | Notes |
      |--------------|-------|-------|
      | `ADMIN_PASSWORD` | Your admin password | For admin panel access |
      | `DATABASE_URL` | Your NeonDB connection string | Get from NeonDB dashboard |
      | `NEXT_PUBLIC_BASE_URL` | Your Vercel URL | e.g., `https://your-app.vercel.app` |
   
      > **Getting DATABASE_URL**:
      > 1. Go to [neon.tech](https://neon.tech) and create a free account
      > 2. Create a new project (e.g., "anime-wallpapers")
      > 3. Copy the connection string from the dashboard
      > 4. Paste it as the value for `DATABASE_URL`

   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-configured)
   - Output Directory: `.next` (auto-configured)
   - Install Command: `npm install` (auto-configured)

5. **Deploy**
   - Click "Deploy" and wait 2-3 minutes

6. **Initialize the Database** (First deployment only)
   
   After deployment, run these commands locally:
   
   ```bash
   # Add your DATABASE_URL to .env.local
   echo "DATABASE_URL=your-neondb-connection-string" >> .env.local
   
   # Run database migration
   node scripts/migrate.js
   
   # Seed initial data
   node scripts/seed.js
   ```
   
   Your site is now live with persistent data! 🎉

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from your project directory
cd c:\code\wallpapers
vercel

# Follow the prompts
# For production deployment:
vercel --prod
```

## 🔧 Environment Variables

### Required Environment Variables

These **must** be set before deployment:

#### `ADMIN_PASSWORD`
- **Purpose**: Protects the admin panel at `/admin`
- **Example**: `mySecurePassword123`
- **Security**: Use a strong, unique password

#### `DATABASE_URL`
- **Purpose**: PostgreSQL connection string for NeonDB
- **Format**: `postgresql://user:password@host:port/dbname?sslmode=require`
- **Get from**: [NeonDB Dashboard](https://console.neon.tech)
- **Example**: `postgresql://neondb_owner:abc123@ep-cool-name.aws.neon.tech/neondb?sslmode=require`

#### `NEXT_PUBLIC_BASE_URL`
- **Purpose**: Base URL for Open Graph metadata and shareable links
- **Example**: `https://anime-wallpapers.vercel.app`
- **Note**: Update this after first deployment to your actual Vercel URL

### Setting Environment Variables

**In Vercel Dashboard**:
1. Project → Settings → Environment Variables
2. Add each variable
3. Choose "Production", "Preview", and "Development" for each
4. Redeploy if already deployed

## 📝 Automatic Deployments

Once connected to GitHub:
- ✅ **Every push to `main`** triggers a production deployment
- ✅ **Every pull request** gets a preview deployment
- ✅ **Every commit** gets a unique preview URL

## 🌐 Custom Domain (Optional)

1. Go to your project → Settings → Domains
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions
4. SSL certificate is automatically provisioned

## ⚡ Performance Features

Vercel automatically provides:
- ✅ Global CDN distribution
- ✅ Automatic HTTPS
- ✅ Edge caching
- ✅ Image optimization
- ✅ Automatic compression
- ✅ DDoS protection

## 🔍 Post-Deployment Checklist

After deployment:
- [ ] Test all pages work correctly
- [ ] Verify images load properly
- [ ] Check API routes function
- [ ] Test search functionality
- [ ] Verify mobile responsiveness
- [ ] Update README.md with live URL
- [ ] Update `NEXT_PUBLIC_APP_URL` if using environment variables

## 📊 Monitoring

Access analytics in Vercel Dashboard:
- Page views and visitors
- Performance metrics (Web Vitals)
- Error tracking
- Function logs

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Test `npm run build` locally first

### Images Not Loading
- Verify image paths are correct
- Check public folder structure
- Review Next.js Image component usage

### API Routes Not Working
- Ensure route files are in `app/api/` directory
- Check for syntax errors in route handlers
- Verify environment variables are set

### Clear Cache and Redeploy
```bash
vercel --force
```

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

## 🎉 Your Site is Live!

After deployment, you'll get a URL like:
`https://framezeroes-sc136.vercel.app`

Update your README.md with this URL to share with users!

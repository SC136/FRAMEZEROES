# 🚀 Vercel Deployment Checklist

Use this checklist before deploying to ensure everything is ready.

## ✅ Pre-Deployment Checklist

### 1. Code Quality
- [ ] All features are working locally (`npm run dev`)
- [ ] Production build succeeds (`npm run build`)
- [ ] No console errors or warnings
- [ ] All images load correctly
- [ ] API routes are functioning

### 2. Configuration Files
- [x] `vercel.json` - Vercel configuration
- [x] `next.config.js` - Next.js settings optimized
- [x] `.vercelignore` - Files to exclude from deployment
- [x] `.env.example` - Environment variables documented
- [x] `package.json` - All dependencies listed

### 3. Content & Assets
- [ ] All required images in `public/` folder
- [ ] `wallpapers.json` data is up-to-date
- [ ] No broken links in the app
- [ ] Credits page is complete

### 4. Documentation
- [x] README.md updated with live URL placeholder
- [x] DEPLOYMENT.md guide created
- [x] LICENSE file present
- [x] CONTRIBUTING.md for contributors

### 5. Repository
- [ ] All changes committed to Git
- [ ] Pushed to GitHub
- [ ] Repository is public (if intended)
- [ ] No sensitive data in commits

### 6. Environment Variables
- [ ] Review `.env.example`
- [ ] Plan which variables needed in Vercel
- [ ] No secrets in code or commits

## 🚀 Deployment Steps

1. **Commit final changes:**
   ```bash
   git add .
   git commit -m "chore: Vercel deployment ready"
   git push origin main
   ```

2. **Go to Vercel:**
   - Visit https://vercel.com
   - Click "Add New..." → "Project"
   - Import your GitHub repository

3. **Configure & Deploy:**
   - Verify auto-detected settings
   - Add environment variables (if any)
   - Click "Deploy"

4. **Post-Deployment:**
   - [ ] Test the live site
   - [ ] Update README.md with actual URL
   - [ ] Add custom domain (optional)
   - [ ] Enable Vercel Analytics (optional)

## 🎯 Quick Deploy Command

```bash
# Using Vercel CLI (install with: npm i -g vercel)
vercel --prod
```

## 📊 After Deployment

- [ ] Share your live URL!
- [ ] Monitor performance in Vercel dashboard
- [ ] Set up domain (if using custom domain)
- [ ] Enable preview deployments for PRs

## ✅ Ready to Deploy!

Once all boxes are checked, you're ready to deploy to Vercel! 🎉

Your site will be live at: `https://anime-wallpapers.vercel.app` (or your custom domain)

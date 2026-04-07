# 🚀 Cloudflare Pages Deployment Guide

## Prerequisites
✅ All configuration files are ready
✅ Project structure is correct
✅ GitHub repository (recommended) or local files

---

## 📋 Method 1: Deploy via Cloudflare Dashboard + GitHub (RECOMMENDED)

### Step 1: Push to GitHub
1. Initialize git repository (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Berkeley Lions Club website"
   ```

2. Create a new repository on GitHub (e.g., `berkeley-lions-club`)

3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/berkeley-lions-club.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Connect to Cloudflare Pages
1. Log into **Cloudflare Dashboard**: https://dash.cloudflare.com
2. Click **Workers & Pages** in the left sidebar
3. Click **Create application** → **Pages** → **Connect to Git**
4. Authorize GitHub and select your repository: `berkeley-lions-club`

### Step 3: Configure Build Settings
**IMPORTANT**: Use these EXACT settings:

```
Project name: berkeley-lions-club
Production branch: main

Build settings:
├── Framework preset: Vite
├── Build command: npm run build
├── Build output directory: build
└── Root directory: / (leave blank or default)
```

### Step 4: Environment Variables
Click **Add variable** and add:
```
NODE_VERSION = 18
```

### Step 5: Deploy
1. Click **Save and Deploy**
2. Wait 2-5 minutes for the build to complete
3. You'll get a URL like: `berkeley-lions-club.pages.dev`

### Step 6: Add Custom Domain
1. Go to your Pages project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `berkeleylionsclub.org`
4. Add another: `www.berkeleylionsclub.org`
5. Cloudflare will automatically:
   - Configure DNS
   - Issue SSL certificate (5-10 minutes)
   - Enable full protection (proxy ON ☁️)

---

## 📋 Method 2: Direct Upload (No GitHub)

### Step 1: Build Locally
On your local machine:
```bash
npm install
npm run build
```
This creates a `build/` folder with your built website.

### Step 2: Upload to Cloudflare
1. Go to **Cloudflare Dashboard** → **Workers & Pages**
2. Click **Create application** → **Pages** → **Upload assets**
3. Name your project: `berkeley-lions-club`
4. Drag and drop the entire `build` folder
5. Click **Deploy site**

### Step 3: Add Custom Domain
Same as Method 1, Step 6 above.

---

## ✅ Verification Checklist

After deployment, verify:
- [ ] Site loads at `berkeley-lions-club.pages.dev`
- [ ] Custom domain works: `berkeleylionsclub.org`
- [ ] SSL certificate is active (🔒 in browser)
- [ ] All 8 pages load correctly
- [ ] GHL forms are working
- [ ] Square donation widget loads
- [ ] Images display properly
- [ ] Responsive design works on mobile

---

## 🔧 Troubleshooting

### Build fails with "command not found"
- Make sure `NODE_VERSION = 18` is set in Environment Variables

### Build fails with missing dependencies
- Verify `package.json` includes all dependencies
- Check build logs for specific missing packages

### Site loads but forms don't work
- GHL forms are embedded iframes - they should work automatically
- Check browser console for any errors

### Images not loading
- Figma assets should work automatically
- If issues occur, check the browser console

### Custom domain shows "DNS error"
- Wait 10-15 minutes for DNS propagation
- Verify DNS records in Cloudflare DNS settings
- Make sure Cloudflare proxy is ON (orange cloud ☁️)

---

## 🎯 Expected Build Command Flow

When Cloudflare builds your site, it runs:
1. `npm install` - Installs all dependencies
2. `npm run build` - Runs `vite build`
3. Vite compiles React → Creates `dist/` folder
4. Cloudflare deploys `dist/` folder to CDN

---

## 📞 Support

If you encounter any errors:
1. Check the build logs in Cloudflare Pages
2. Copy the full error message
3. Share it for debugging

---

## ✨ Success!

Once deployed, you'll have:
✅ Professional domain: berkeleylionsclub.org
✅ Automatic SSL certificate
✅ Full Cloudflare protection (DDoS, WAF, CDN)
✅ Global edge caching
✅ 99.9% uptime
✅ No more figma.site redirect!

🦁 Go Berkeley Lions! 💙💛

# 🚀 Quick Start - Deploy to Cloudflare Pages

## Option A: GitHub + Cloudflare (Recommended)

### 1️⃣ Push to GitHub
```bash
git init
git add .
git commit -m "Berkeley Lions Club website ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/berkeley-lions-club.git
git push -u origin main
```

### 2️⃣ Deploy on Cloudflare
1. Go to: https://dash.cloudflare.com
2. Click: **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Select your GitHub repository
4. **Build settings**:
   - Framework: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
5. **Environment variables**: 
   - Add: `NODE_VERSION` = `18`
6. Click **Save and Deploy**

### 3️⃣ Add Your Domain
1. Go to your Pages project → **Custom domains**
2. Add `berkeleylionsclub.org` and `www.berkeleylionsclub.org`
3. Cloudflare handles DNS & SSL automatically!

---

## Option B: Direct Upload (No GitHub)

### 1️⃣ Build Locally
```bash
npm install
npm run build
```

### 2️⃣ Upload to Cloudflare
1. Go to: https://dash.cloudflare.com
2. Click: **Workers & Pages** → **Create** → **Pages** → **Upload assets**
3. Drag the `dist` folder
4. Click **Deploy**

### 3️⃣ Add Your Domain
Same as Option A, step 3 above.

---

## ⏱️ Timeline
- Build time: 2-4 minutes
- SSL certificate: 5-10 minutes
- Total: ~15 minutes to live site!

## ✅ Done!
Your site will be live at:
- `berkeley-lions-club.pages.dev` (Cloudflare URL)
- `berkeleylionsclub.org` (Your custom domain)

🦁 **Go Lions!** 💙💛

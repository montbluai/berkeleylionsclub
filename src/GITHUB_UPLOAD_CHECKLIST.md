# 📦 GitHub Upload Checklist for Berkeley Lions Club Website

## ⚠️ CRITICAL UPDATE - FIX APPLIED!

**The vite.config.ts has been updated to fix the build error.**
Make sure you upload the LATEST version of `vite.config.ts` and `tsconfig.json`!

## ✅ Critical Files Needed for Cloudflare Deployment

### **Root Directory Files (REQUIRED):**
- [ ] `package.json` ⭐ **CRITICAL**
- [ ] `tsconfig.json` ⭐ **CRITICAL**
- [ ] `tsconfig.node.json`
- [ ] `vite.config.ts` ⭐ **CRITICAL**
- [ ] `index.html` ⭐ **CRITICAL**
- [ ] `App.tsx` ⭐ **CRITICAL**
- [ ] `main.tsx` ⭐ **CRITICAL**
- [ ] `.gitignore` (create this - see below)

### **Folders (REQUIRED):**
- [ ] `components/` (entire folder with all subfolders)
- [ ] `styles/` (with `globals.css`)
- [ ] `public/` (with `_headers` and `_redirects` as plain text files)

### **Documentation (Optional but Recommended):**
- [ ] `README.md`
- [ ] `GHL_FORM_STYLING_GUIDE.md`
- [ ] `CLOUDFLARE_DEPLOYMENT_GUIDE.md`
- [ ] `DEPLOYMENT_READY.md`

---

## 🚫 Create `.gitignore` File

Create a new file called `.gitignore` in the root with this content:

```
node_modules/
dist/
.DS_Store
*.log
.env
.env.local
```

---

## 📋 Verify `/public/` Folder Structure

Your `/public/` folder should contain ONLY these two plain text files (NOT .tsx files):

```
public/
  ├── _headers
  └── _redirects
```

### **Content of `/public/_headers`:**
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### **Content of `/public/_redirects`:**
```
/* /index.html 200
```

---

## 🎯 Upload Steps for GitHub

### **Option A: GitHub Desktop (Easiest)**
1. Download GitHub Desktop: https://desktop.github.com/
2. Clone your repo: `montbluai/berkeleylionsclub`
3. Copy ALL files from Figma Make into the cloned folder
4. Commit and push

### **Option B: GitHub Web Interface**
1. Go to: https://github.com/montbluai/berkeleylionsclub
2. Click "Add file" → "Upload files"
3. Drag ALL files/folders from your local copy
4. Commit changes

### **Option C: Git Command Line**
```bash
git clone https://github.com/montbluai/berkeleylionsclub.git
cd berkeleylionsclub
# Copy all files here
git add .
git commit -m "Add complete Berkeley Lions Club website"
git push origin main
```

---

## ⚡ After Upload: Trigger Cloudflare Deployment

1. Go to: https://dash.cloudflare.com/
2. Navigate to Pages → berkeleylionsclub
3. Click "Retry deployment" or push will auto-trigger
4. Monitor build logs for success

---

## 🔍 Verify Build Configuration

In Cloudflare Pages, ensure:
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (leave blank)
- **Branch:** `main`

---

## 📞 Need Help?

If deployment fails after upload, check the Cloudflare build logs and look for:
- Missing dependencies
- Build errors
- File path issues

The website should be live at: **https://berkeleylionsclub.org**
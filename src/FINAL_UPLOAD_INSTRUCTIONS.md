# ✅ FINAL UPLOAD INSTRUCTIONS - CLEAN & VERIFIED

## 🎯 **Status: ALL FILES VERIFIED - NO DUPLICATES**

I've checked everything. The structure is clean and ready!

---

## 📥 **STEP 1: Download from Figma Make**

Download ALL files right now. You'll get:

### **Root Directory (`/`):**
- `App.tsx`
- `main.tsx`
- `index.html`
- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.node.json`
- `.gitignore` (if present)
- `wrangler.toml`

### **Folders:**
- `components/` (with all component files + `figma/` + `ui/` subfolders)
- `styles/` (with `globals.css`)
- `public/` (with `_headers` and `_redirects` files)
- `guidelines/` (optional - documentation)
- Various `.md` documentation files (optional)

---

## 📁 **STEP 2: Reorganize on Your Computer**

### **A) Create `/src/` folder in root**

### **B) Move these INTO `/src/`:**
1. ✅ `App.tsx` → `src/App.tsx`
2. ✅ `main.tsx` → `src/main.tsx`
3. ✅ **Entire `components/` folder** → `src/components/`
4. ✅ **Entire `styles/` folder** → `src/styles/`

### **C) Keep these in ROOT (don't move):**
- ✅ `index.html`
- ✅ `package.json`
- ✅ `vite.config.ts`
- ✅ `tsconfig.json`
- ✅ `tsconfig.node.json`
- ✅ `.gitignore`
- ✅ `wrangler.toml`
- ✅ `public/` folder (with `_headers` and `_redirects` inside)
- ✅ All `.md` files (documentation - optional to upload)

---

## 🎯 **STEP 3: Your Final Structure**

```
berkeleylionsclub/
├── src/                              ← YOU CREATED THIS
│   ├── App.tsx                      ← MOVED
│   ├── main.tsx                     ← MOVED
│   ├── components/                  ← MOVED
│   │   ├── About.tsx
│   │   ├── AdminGalleryUpload.tsx
│   │   ├── BecomeLionForm.tsx
│   │   ├── ContactUs.tsx
│   │   ├── Disclosures.tsx
│   │   ├── Donate.tsx
│   │   ├── EmailSignup.tsx
│   │   ├── EventsCalendar.tsx
│   │   ├── Footer.tsx
│   │   ├── Home.tsx
│   │   ├── Join.tsx
│   │   ├── Navigation.tsx
│   │   ├── PhotoGallery.tsx
│   │   ├── Privacy.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   ├── TermsOfUse.tsx
│   │   ├── Volunteer.tsx
│   │   ├── figma/
│   │   │   └── ImageWithFallback.tsx
│   │   └── ui/
│   │       └── (all UI components)
│   └── styles/                      ← MOVED
│       └── globals.css
├── public/                          ← STAYED IN ROOT
│   ├── _headers                     ✅ (file, not folder!)
│   └── _redirects                   ✅ (file, not folder!)
├── index.html                       ← STAYED IN ROOT
├── package.json                     ← STAYED IN ROOT
├── vite.config.ts                   ← STAYED IN ROOT
├── tsconfig.json                    ← STAYED IN ROOT
├── tsconfig.node.json               ← STAYED IN ROOT
└── wrangler.toml                    ← STAYED IN ROOT
```

---

## 📤 **STEP 4: Upload to GitHub**

1. **Go to:** https://github.com/montbluai/berkeleylionsclub
2. **Delete all old files** from the repo
3. **Upload the entire reorganized structure** (drag & drop the whole folder)
4. **Commit** with message: "Reorganize to /src/ structure for Cloudflare Pages"

---

## ✅ **Verification Checklist:**

Before uploading, verify:
- ✅ `/src/` folder exists
- ✅ `/src/` contains: `App.tsx`, `main.tsx`, `components/`, `styles/`
- ✅ Root contains: `index.html`, `package.json`, `vite.config.ts`, `tsconfig.json`, `public/`
- ✅ `/public/_headers` is a FILE (not folder)
- ✅ `/public/_redirects` is a FILE (not folder)
- ✅ NO `App.tsx` or `main.tsx` in root (only in `/src/`)

---

## 🚀 **After Upload:**

1. Cloudflare Pages will automatically start building
2. Watch the build logs
3. Build should succeed! ✨
4. Your site will be live at: **https://berkeleylionsclub.org**

---

## 📋 **Key Files Already Updated:**

These files have already been configured correctly:
- ✅ `/index.html` - points to `/src/main.tsx`
- ✅ `/vite.config.ts` - configured for `/src/` folder
- ✅ `/tsconfig.json` - configured for `/src/` folder
- ✅ `/public/_headers` - security headers for Cloudflare
- ✅ `/public/_redirects` - SPA routing for Cloudflare

**You're ready to go! 🎉**

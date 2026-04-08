# ✅ Pre-Deployment Checklist

Run through this checklist before deploying to Cloudflare Pages:

## 📋 Required Files
- [x] `package.json` - Dependencies and build scripts
- [x] `vite.config.ts` - Vite configuration
- [x] `index.html` - HTML entry point
- [x] `main.tsx` - React entry point
- [x] `App.tsx` - Main app component
- [x] `styles/globals.css` - Global styles
- [x] `_headers` - Security headers (plain file, not folder)
- [x] `_redirects` - SPA routing (plain file, not folder)
- [x] `.gitignore` - Git ignore rules
- [x] `README.md` - Documentation

## 🔧 Configuration Verification

### package.json
✅ Contains `"build": "vite build"` script
✅ All dependencies listed
✅ React 18.3.1+

### vite.config.ts
✅ React plugin configured
✅ Build output directory set to `dist`

### index.html
✅ Root div with id="root"
✅ Script points to /main.tsx
✅ Slick carousel CSS loaded

### main.tsx
✅ Imports App from './App'
✅ Imports styles from './styles/globals.css'
✅ Renders to #root

## 🌐 Cloudflare Pages Settings

When deploying, use these settings:

```
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: / (leave blank)
Node version: 18 (set as environment variable)
```

## 🎯 Environment Variables to Set

In Cloudflare Pages → Settings → Environment Variables:

```
NODE_VERSION = 18
```

## 📝 Custom Domain Setup

After deployment:
1. Go to Pages project → Custom domains
2. Add `berkeleylionsclub.org`
3. Add `www.berkeleylionsclub.org`
4. Wait 5-10 minutes for SSL certificate
5. Keep Cloudflare proxy ON (orange cloud ☁️)

## 🧪 Testing After Deployment

Test these items:
- [ ] Homepage loads with slideshow
- [ ] All 8 pages accessible via navigation
- [ ] GHL forms load properly (5 forms total)
- [ ] Square donation widget appears
- [ ] Images display correctly
- [ ] Responsive design works on mobile
- [ ] Social media links work
- [ ] Footer displays correctly
- [ ] SSL certificate active (🔒 in browser)
- [ ] Custom domain resolves properly

## 🚨 Common Issues & Solutions

### Issue: Build fails with "vite: command not found"
**Solution**: Add `NODE_VERSION = 18` environment variable

### Issue: Build succeeds but site shows blank page
**Solution**: Check browser console for errors. Verify `main.tsx` imports are correct.

### Issue: Images not loading
**Solution**: Figma assets should work. Check browser console for 404 errors.

### Issue: Forms not appearing
**Solution**: GHL iframes should load automatically. Check if iframe URLs are accessible.

### Issue: Custom domain shows SSL error
**Solution**: Wait 10-15 minutes for SSL certificate provisioning.

## ✨ Ready to Deploy!

If all items above are checked, you're ready to deploy to Cloudflare Pages!

Follow the instructions in `CLOUDFLARE_DEPLOYMENT_GUIDE.md`

🦁 Good luck! 💙💛

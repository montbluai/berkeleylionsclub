# Deployment Instructions for Berkeley Lions Club Website
## With Supabase Featured Events System

---

## 📋 Overview

Your website is deployed via:
- **GitHub Repository**: `montbluai/berkeleylionsclub`
- **Hosting**: Cloudflare Pages
- **Domain**: berkeleylionsclub.org
- **New Backend**: Supabase (for event management)

---

## 🎯 Your Current Workflow

1. **Edit in Figma Make** → Download code
2. **Push to GitHub** → `montbluai/berkeleylionsclub`
3. **Cloudflare auto-deploys** → Live at berkeleylionsclub.org

**Nothing changes!** Supabase works seamlessly with this workflow.

---

## 🆕 What's New

### Files Added:
- `/lib/supabase.ts` - Supabase configuration
- `/components/AdminEventUpload.tsx` - Event management admin page
- `/components/Volunteer.tsx` - Updated to fetch events from Supabase
- `/.env.example` - Environment variables template
- `/.gitignore` - Prevents committing sensitive data
- `/SUPABASE_SETUP_GUIDE.md` - Complete setup instructions
- `/QUICK_START_EVENTS.md` - Quick reference guide

### Files Modified:
- `/App.tsx` - Added route for admin events page
- `/package.json` - Added `@supabase/supabase-js` dependency

---

## 🚀 First-Time Deployment Steps

### Step 1: Complete Supabase Setup (One Time Only)

Follow **SUPABASE_SETUP_GUIDE.md** to:
1. Create Supabase account and project (5 min)
2. Create database table (3 min)
3. Create storage bucket (2 min)
4. Get credentials (1 min)

### Step 2: Add Credentials to Cloudflare Pages

**IMPORTANT**: For your GitHub → Cloudflare workflow, add environment variables in Cloudflare:

1. **Login to Cloudflare Dashboard**
   - Go to: https://dash.cloudflare.com
   - Select your account
   - Click "Workers & Pages"
   - Click on your "berkeleylionsclub" project

2. **Add Environment Variables**
   - Click "Settings" tab
   - Scroll to "Environment variables"
   - Click "Add variable" for each:

   **Variable 1:**
   - Name: `VITE_SUPABASE_URL`
   - Value: Your Supabase project URL (e.g., `https://abc123.supabase.co`)
   - Environment: Production ✓ (check this)

   **Variable 2:**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: Your Supabase anon/public key (long string)
   - Environment: Production ✓ (check this)

3. **Save** - Cloudflare will redeploy automatically

### Step 3: Download Files from Figma Make

1. Download all project files from Figma Make
2. Your downloaded folder will include all the new files created above

### Step 4: Local Setup (Optional but Recommended)

If you want to test locally before pushing to GitHub:

1. **Create `.env` file** in your project root:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

2. **Install dependencies**:
```bash
npm install
```

3. **Test locally**:
```bash
npm run dev
```

4. **Visit** `http://localhost:5173/#admin-events` to test upload

### Step 5: Push to GitHub

```bash
git add .
git commit -m "Add Supabase event management system"
git push origin main
```

### Step 6: Verify Deployment

1. **Wait for Cloudflare build** (~2-3 minutes)
   - Watch in Cloudflare Dashboard → Deployments tab

2. **Check website**: Visit berkeleylionsclub.org
   - Should load normally (no errors)

3. **Test admin panel**: Go to `berkeleylionsclub.org/#admin-events`
   - Login with password: `berkeley2025`
   - Upload a test event

4. **Verify Volunteer page**: Visit `berkeleylionsclub.org/#volunteer`
   - Your uploaded event should appear!

---

## 🔄 Regular Workflow (After Initial Setup)

### To Update the Website:

1. Make changes in Figma Make
2. Download updated files
3. Replace files in your local GitHub repo
4. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
5. Cloudflare auto-deploys (2-3 min)
6. Changes live at berkeleylionsclub.org

**No Supabase changes needed!** Your events are stored in the database.

### To Update Featured Event:

1. Go to `berkeleylionsclub.org/#admin-events`
2. Login (password: `berkeley2025`)
3. Upload new event via form
4. Old events auto-hide after their date passes
5. **No GitHub push needed** - changes are instant!

---

## 📝 Important Notes

### Environment Variables
- **Cloudflare**: Set environment variables in Cloudflare dashboard (Step 2 above)
- **Local Testing**: Use `.env` file (not committed to GitHub)
- **GitHub**: Never commit `.env` to GitHub (it's in `.gitignore`)

### Supabase Credentials
- **Safe to expose**: The anon/public key is designed to be public
- **Database security**: Protected by Row Level Security (RLS)
- **Admin security**: Protected by password in the code

### Build Process
- Cloudflare builds with Vite: `npm run build`
- Output goes to `/dist` folder
- Environment variables automatically injected during build

---

## 🐛 Troubleshooting Deployment

### Build Fails on Cloudflare

**Check build log** in Cloudflare Dashboard:

1. Common issue: Missing environment variables
   - Solution: Add both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

2. Common issue: Package installation fails
   - Solution: Delete `package-lock.json`, commit, push again

3. Common issue: Build command not found
   - Solution: In Cloudflare settings, ensure build command is `npm run build`

### Website Loads But Events Don't Show

1. **Check browser console** (F12 → Console tab)
   - Look for Supabase errors

2. **Common error**: "Invalid API key"
   - Check environment variables in Cloudflare are correct
   - Redeploy after fixing

3. **Common error**: "Failed to fetch"
   - Check Supabase database table exists
   - Check storage bucket exists and is public

### Admin Panel Won't Load

1. **Check URL**: Must be `/#admin-events` (with hash)
2. **Check App.tsx**: Ensure `admin-events` route exists
3. **Check password**: Default is `berkeley2025`

---

## 🔐 Security Checklist

- [x] `.env` file is in `.gitignore`
- [x] Only anon/public key used (not service_role key)
- [x] Database has Row Level Security (RLS) enabled
- [x] Admin page protected by password
- [x] Storage bucket allows public read (for images)
- [x] Environment variables stored in Cloudflare (not in code)

---

## 📞 Support Resources

- **Cloudflare Docs**: https://developers.cloudflare.com/pages/
- **Supabase Docs**: https://supabase.com/docs
- **Vite Docs**: https://vitejs.dev/guide/env-and-mode.html

---

## ✅ Pre-Deployment Checklist

Before pushing to GitHub for the first time:

- [ ] Completed Supabase setup (database + storage)
- [ ] Added environment variables to Cloudflare Pages
- [ ] Downloaded all files from Figma Make
- [ ] Reviewed changes in `/App.tsx` and `/package.json`
- [ ] (Optional) Tested locally with `npm run dev`
- [ ] `.gitignore` file exists (prevents committing `.env`)
- [ ] Ready to commit and push to GitHub

**After first deployment:**

- [ ] Website loads successfully at berkeleylionsclub.org
- [ ] No console errors (F12 → Console)
- [ ] Admin panel accessible at `/#admin-events`
- [ ] Can login to admin panel
- [ ] Can upload test event
- [ ] Test event appears on Volunteer page
- [ ] Old Crab Feed event still shows (until you upload new event)

---

## 🎉 You're All Set!

Your event management system is now live and board members can manage featured events without touching code. Simply share this URL with board members:

**Admin Panel**: `https://berkeleylionsclub.org/#admin-events`
**Password**: `berkeley2025`

---

**Questions?** Refer to:
- `SUPABASE_SETUP_GUIDE.md` - Complete Supabase setup
- `QUICK_START_EVENTS.md` - Quick reference for uploading events
- This file - Deployment and workflow guide

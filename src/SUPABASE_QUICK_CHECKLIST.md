# ⚡ Quick Setup Checklist

Use this as a quick reference while setting up Supabase.

---

## ✅ Step-by-Step Checklist

### 1. Create Supabase Project
- [ ] Go to https://supabase.com
- [ ] Sign up / Log in
- [ ] Click "New Project"
- [ ] Name: `berkeley-lions-club`
- [ ] Save your database password!
- [ ] Region: `West US (North California)`
- [ ] Click "Create new project"
- [ ] Wait 2-3 minutes

### 2. Get API Credentials
- [ ] Click **Settings** → **API**
- [ ] Copy **Project URL**: `https://________.supabase.co`
- [ ] Copy **anon public** key: `eyJ________`

### 3. Create Database Table
- [ ] Click **SQL Editor** → **New Query**
- [ ] Copy/paste the SQL from below
- [ ] Click **Run**
- [ ] See "Success" message

### 4. Create Storage Bucket
- [ ] Click **Storage** → **Create a new bucket**
- [ ] Name: `event-images`
- [ ] Check ✅ **Public bucket**
- [ ] Click **Create bucket**

### 5. Add to Cloudflare Pages
- [ ] Go to Cloudflare Dashboard
- [ ] **Pages** → **berkeley-lions-club** → **Settings** → **Environment variables**
- [ ] Add: `VITE_SUPABASE_URL` = your URL
- [ ] Add: `VITE_SUPABASE_ANON_KEY` = your key
- [ ] Save and re-deploy

### 6. Test
- [ ] Visit berkeleylionsclub.org
- [ ] Admin Login → Featured Events tab
- [ ] Yellow warning should be gone!
- [ ] Try uploading a test event

---

## 📋 SQL Code to Copy (Step 3)

```sql
-- Create the featured_events table
CREATE TABLE IF NOT EXISTS featured_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL,
  event_description TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TEXT NOT NULL,
  location_name TEXT NOT NULL,
  location_address TEXT NOT NULL,
  volunteers_needed TEXT NOT NULL,
  age_requirements TEXT DEFAULT 'All ages welcome!',
  volunteer_tasks TEXT[] NOT NULL,
  ticket_price TEXT NOT NULL,
  is_free BOOLEAN DEFAULT false,
  square_payment_link TEXT,
  additional_info TEXT,
  to_go_available BOOLEAN DEFAULT false,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE featured_events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public reads (so your website can display events)
CREATE POLICY "Allow public read access"
  ON featured_events
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow public inserts (for admin uploads)
CREATE POLICY "Allow public insert access"
  ON featured_events
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow public updates
CREATE POLICY "Allow public update access"
  ON featured_events
  FOR UPDATE
  TO public
  USING (true);

-- Create policy to allow public deletes
CREATE POLICY "Allow public delete access"
  ON featured_events
  FOR DELETE
  TO public
  USING (true);

-- Create index for faster date queries
CREATE INDEX idx_featured_events_date ON featured_events(event_date);
```

---

## 🔑 Environment Variables for Cloudflare Pages (Step 5)

Add these in **Cloudflare Pages** → **Settings** → **Environment variables**:

| Variable Name | Value | Example |
|---------------|-------|---------|
| `VITE_SUPABASE_URL` | Your Project URL | `https://abcdefg.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your anon public key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

**Important**: 
- Use "Production" environment
- After adding, click "Save"
- Then go to "Deployments" and trigger a new deployment

---

## 📝 Local Development (Optional)

If you want to test locally before deploying, create `.env` in your project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Then run:
```bash
npm run dev
```

---

## ⏱️ Time Estimates

- Create Supabase account: **2 minutes**
- Create project & wait: **3-5 minutes**
- Get credentials: **1 minute**
- Run SQL: **1 minute**
- Create storage bucket: **1 minute**
- Add to Cloudflare: **2 minutes**
- Re-deploy & test: **3 minutes**

**Total: ~15 minutes** ⏰

---

## 🎯 What You Get

After setup, you'll have:
- ✅ Secure cloud database for events
- ✅ Cloud storage for event images
- ✅ Automatic backups (Supabase handles this)
- ✅ Real-time updates
- ✅ Scalable infrastructure
- ✅ Free tier (500MB DB + 1GB storage)

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Yellow warning still shows | Clear cache, check env vars, re-deploy |
| "Failed to fetch" error | Check that SQL policies were created |
| Images won't upload | Make sure bucket is marked "Public" |
| Can't find anon key | Settings → API → look for "anon public" |
| Wrong key used | Use "anon public", NOT "service_role" |

---

## 📞 Support

**Stuck?** Check the full guide: `/SUPABASE_SETUP_GUIDE.md`

**Still stuck?** Contact: Ami Saunders at MontBlu AI

---

**Remember**: You only need to do this setup ONCE. After that, board members just use the Admin Dashboard to manage events! 🎉

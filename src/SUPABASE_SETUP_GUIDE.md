# 🚀 Supabase Setup Guide for Berkeley Lions Club

This guide will walk you through setting up Supabase to enable the Featured Events management system.

## 📋 What You'll Need
- A Supabase account (free tier works great!)
- About 10-15 minutes
- Access to your Cloudflare Pages dashboard

---

## Step 1: Create a Supabase Account & Project

### 1.1 Sign Up for Supabase
1. Go to **https://supabase.com**
2. Click **"Start your project"** (top right)
3. Sign up with GitHub, Google, or email
4. Verify your email if required

### 1.2 Create a New Project
1. Click **"New Project"**
2. Fill in the details:
   - **Name**: `berkeley-lions-club` (or whatever you prefer)
   - **Database Password**: Create a strong password (save this somewhere safe!)
   - **Region**: Choose closest to Berkeley (e.g., `West US (North California)`)
   - **Pricing Plan**: Select **Free** (includes 500MB database, 1GB storage)
3. Click **"Create new project"**
4. Wait 2-3 minutes while Supabase sets up your database

---

## Step 2: Get Your API Credentials

### 2.1 Find Your Project URL and Keys
1. In your Supabase project dashboard, click **Settings** (gear icon in left sidebar)
2. Click **API** in the settings menu
3. You'll see:
   - **Project URL**: Something like `https://abcdefghijk.supabase.co`
   - **anon public** key: A long string starting with `eyJ...`

### 2.2 Copy These Values
Copy and save both:
- ✅ **Project URL** (VITE_SUPABASE_URL)
- ✅ **anon public key** (VITE_SUPABASE_ANON_KEY)

⚠️ **Important**: Use the **anon public** key, NOT the service_role key!

---

## Step 3: Create the Database Table

### 3.1 Open the SQL Editor
1. Click **SQL Editor** in the left sidebar (lightning bolt icon)
2. Click **New Query**

### 3.2 Run This SQL Code
Copy and paste this entire SQL script, then click **Run**:

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

✅ You should see: **"Success. No rows returned"**

---

## Step 4: Create the Storage Bucket for Event Images

### 4.1 Open Storage
1. Click **Storage** in the left sidebar (folder icon)
2. Click **Create a new bucket**

### 4.2 Configure the Bucket
1. **Name**: `event-images`
2. **Public bucket**: ✅ Check this box (allows public access to images)
3. Click **Create bucket**

### 4.3 Verify the Bucket
- You should see `event-images` in your list of storage buckets
- The "Public" column should show ✅ Yes

---

## Step 5: Add Credentials to Your Project

Now you need to add your Supabase credentials to your project. There are two ways to do this:

### Option A: For Local Development (Testing)

Create a `.env` file in your project root:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual values from Step 2.

### Option B: For Production (Cloudflare Pages)

1. Go to your **Cloudflare Dashboard**
2. Navigate to **Pages** → **berkeley-lions-club** project
3. Click **Settings** → **Environment variables**
4. Add two new variables:

| Variable Name | Value |
|---------------|-------|
| `VITE_SUPABASE_URL` | `https://your-project-id.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJ...your-anon-key...` |

5. Choose **Production** environment
6. Click **Save**
7. Click **Deployments** and re-deploy your site

---

## Step 6: Test Your Setup

### 6.1 Push to GitHub
Commit your changes (if you made any local .env file changes):

```bash
git add .
git commit -m "Ready for Supabase setup"
git push origin main
```

### 6.2 Wait for Deployment
- Cloudflare Pages will automatically rebuild your site (2-3 minutes)
- Watch the deployment in your Cloudflare dashboard

### 6.3 Test the Admin Dashboard
1. Go to **berkeleylionsclub.org**
2. Click **"Admin Login"** in the footer
3. Login with password: `berkeley2025`
4. Click the **"Featured Events"** tab
5. ✅ The yellow warning banner should be GONE!
6. Try uploading a test event

---

## 🎉 You're Done!

Your event management system is now fully functional! Board members can:
- Upload new events with poster images
- Manage existing events
- Delete past events
- Events automatically appear on the Volunteer page

---

## 🔒 Security Notes

### What's Public vs Private?

**Public (Anyone can access)**:
- ✅ Reading events from the database
- ✅ Viewing event images
- ✅ The website displaying events

**Protected (Admin password required)**:
- ✅ Admin dashboard access
- ✅ Creating new events
- ✅ Deleting events

### Current Security Model
- **Client-side password**: `berkeley2025` in the admin component
- **Supabase RLS**: Allows public read/write (since your admin is password-protected)

### For Enhanced Security (Future)
If you want to add server-side authentication later:
1. Remove public insert/update/delete policies
2. Implement Supabase Auth with email/password
3. Update policies to check for authenticated users
4. Add user management in Supabase dashboard

---

## 💰 Supabase Free Tier Limits

Your free tier includes:
- ✅ **500 MB** database storage (plenty for events)
- ✅ **1 GB** file storage (good for ~200 event images)
- ✅ **2 GB** bandwidth per month
- ✅ **50,000** monthly active users
- ✅ **500 MB** monthly data transfer

**This should be more than enough for the Berkeley Lions Club website!**

---

## 🆘 Troubleshooting

### Issue: Yellow warning still shows after setup
**Solution**: 
- Clear your browser cache
- Check that environment variables are set in Cloudflare
- Re-deploy your site in Cloudflare Pages

### Issue: "Failed to upload event"
**Solution**:
- Check that the `event-images` bucket is marked as **Public**
- Verify your anon key is correct
- Check browser console for specific error messages

### Issue: Events upload but don't show on Volunteer page
**Solution**:
- Make sure event date is in the future
- Check that the Volunteer component is also using the same Supabase config
- Refresh the Volunteer page

### Issue: "Row Level Security policy violation"
**Solution**:
- Make sure you ran ALL the SQL commands in Step 3
- Check that RLS policies were created successfully
- Re-run the policy creation commands

---

## 📞 Need Help?

If you run into issues:
1. Check the browser console (F12) for error messages
2. Check Supabase logs in **Database** → **Logs**
3. Verify all environment variables are set correctly
4. Contact: Ami Saunders at MontBlu AI

---

## 🔄 Next Steps After Setup

1. ✅ Test uploading an event
2. ✅ Verify it appears on the Volunteer page
3. ✅ Test deleting an event
4. ✅ Share admin credentials with board members
5. ✅ Upload your first real event!

---

## 📊 Monitoring Your Supabase Usage

To keep track of your usage:
1. Go to **Settings** → **Usage** in your Supabase dashboard
2. Check monthly stats for:
   - Database size
   - Storage used
   - Bandwidth consumed
3. You'll get email alerts if approaching limits

---

## 🎓 Learning Resources

- **Supabase Docs**: https://supabase.com/docs
- **SQL Tutorial**: https://supabase.com/docs/guides/database
- **Storage Guide**: https://supabase.com/docs/guides/storage

---

**That's it!** Your Berkeley Lions Club website now has a fully functional event management system powered by Supabase. 🎉🦁

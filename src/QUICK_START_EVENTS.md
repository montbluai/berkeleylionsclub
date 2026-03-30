# Quick Start: Featured Events Management

## 🚀 Quick Access

**Admin Panel URL**: Add `#admin-events` to your website URL
- Example: `https://berkeleylionsclub.org/#admin-events`
- Password: `berkeley2025` (same as gallery upload)

---

## ⚡ First Time Setup (15 minutes)

Follow the complete guide: **SUPABASE_SETUP_GUIDE.md**

### Super Quick Summary:
1. Create free Supabase account: https://supabase.com
2. Create new project (takes 2 min)
3. Run SQL from setup guide to create database table
4. Create storage bucket named `event-images`
5. Copy your Supabase URL and anon key
6. Add to Cloudflare environment variables OR `.env` file
7. Push to GitHub → Auto-deploys!

---

## 📝 How to Upload an Event

1. Go to `berkeleylionsclub.org/#admin-events`
2. Login with password
3. Fill out the form:
   - **Upload poster image** (required)
   - **Event name** (e.g., "Spring BBQ Fundraiser 2026")
   - **Description** (short tagline)
   - **Date** (use date picker)
   - **Time** (e.g., "Doors at 5pm, Dinner at 6pm")
   - **Location name** (e.g., "Berkeley Community Center")
   - **Address** (full street address)
   - **Volunteers needed** (e.g., "15-20 people")
   - **Age requirements** (default: "All ages welcome!")
   - **Volunteer tasks** - one per line:
     ```
     Set up tables and chairs
     Grill burgers and hot dogs
     Serve food to guests
     Clean up after event
     ```
   - **Is it free?** Check box if yes
   - **Ticket price** (if not free, e.g., "$50")
   - **Square payment link** (optional, paste full URL)
   - **To-go orders?** Check if applicable
   - **Additional info** (e.g., "No experience needed!")
4. Click "Publish Featured Event"
5. Check your Volunteer page to see it live!

---

## 🎯 What Happens Automatically

✅ **Event badge auto-generates** from date
   - Event on Feb 7, 2026 → Badge says "Featured Event - February 2026"

✅ **Shows next upcoming event only**
   - Multiple events? Shows the soonest one

✅ **Auto-expires past events**
   - After event date passes, it disappears from Volunteer page
   - Next event automatically shows

✅ **Fallback when no events**
   - Shows message: "No Featured Events Right Now"
   - Links to calendar

---

## 🔧 Managing Events

### View All Events
Scroll down on admin page to see list of all events (upcoming and past)

### Delete an Event
Click trash icon next to any event

### Edit an Event
Currently: Delete old event, upload new one
(Future: We can add an edit feature if needed)

---

## 📂 Files You Created

1. `/lib/supabase.ts` - Supabase connection (add your credentials here)
2. `/components/AdminEventUpload.tsx` - Admin upload page
3. `/components/Volunteer.tsx` - Updated to fetch from Supabase
4. `/.env.example` - Template for environment variables
5. `/SUPABASE_SETUP_GUIDE.md` - Detailed setup instructions

---

## 🚨 Troubleshooting

### "Failed to upload event"
→ Check that you created the storage bucket and set policies (Part 3 of setup guide)

### Event not showing on Volunteer page
→ Make sure event date is in the future
→ Check browser console (F12) for errors

### Images not loading
→ Verify storage bucket is set to "Public"
→ Check storage SELECT policy is enabled

---

## 🔐 Security

- Admin page protected by password (`berkeley2025`)
- Database has Row Level Security enabled
- Public can view events (intended for website visitors)
- Only admin password holders can upload/delete

**To change password**: Edit line 40 in `/components/AdminEventUpload.tsx`

---

## 📞 Need Help?

See **SUPABASE_SETUP_GUIDE.md** for:
- Detailed setup instructions
- SQL commands
- Storage configuration
- Environment variables setup
- Full troubleshooting guide

---

## ✅ Deployment Checklist

Before pushing to GitHub:

- [ ] Created Supabase project
- [ ] Created database table (ran SQL)
- [ ] Created storage bucket `event-images`
- [ ] Set storage policies (SELECT, INSERT, DELETE)
- [ ] Added Supabase credentials to Cloudflare environment variables
- [ ] Added `@supabase/supabase-js` to package.json ✓ (already done)
- [ ] Tested locally (optional)
- [ ] Pushed to GitHub
- [ ] Verified deployment on Cloudflare
- [ ] Tested admin panel upload
- [ ] Verified event shows on Volunteer page

**Ready to deploy!** 🎉

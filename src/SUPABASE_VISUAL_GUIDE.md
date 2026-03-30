# 🗺️ Supabase Setup Visual Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Berkeley Lions Club Website               │
│                   (berkeleylionsclub.org)                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Admin uploads event
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                   Admin Dashboard                            │
│  Password: berkeley2025                                      │
│  ┌────────────┐  ┌────────────┐                            │
│  │  Gallery   │  │   Events   │ ← You're setting this up!  │
│  └────────────┘  └────────────┘                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Sends data via API
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                      SUPABASE                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  PostgreSQL Database                  │  │
│  │  Table: featured_events                              │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │ id, event_name, date, location, tasks...     │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Storage Buckets                      │  │
│  │  Bucket: event-images                                │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │ crab-feed-2026.jpg                           │   │  │
│  │  │ pancake-breakfast.png                        │   │  │
│  │  │ fundraiser-gala.jpg                          │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Fetches data via API
                       ↓
┌─────────────────────────────────────────────────────────────┐
│              Volunteer Page (Public View)                    │
│  Displays next upcoming event automatically                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
UPLOAD EVENT:
=============

1. Board Member                    2. Admin Dashboard              3. Supabase
┌──────────────┐                  ┌──────────────┐               ┌──────────────┐
│              │                  │              │               │              │
│ Enter event  │  Submit Form     │ Validate     │   Upload      │  Store in    │
│ details +    │ ────────────────→│ data         │──────────────→│  PostgreSQL  │
│ upload image │                  │              │   Image       │  database    │
│              │                  │ Upload to    │───────────────→│              │
│              │                  │ Supabase     │               │  Save image  │
│              │                  │              │               │  to bucket   │
└──────────────┘                  └──────────────┘               └──────────────┘


VIEW EVENT:
===========

1. Website Visitor                2. Volunteer Page               3. Supabase
┌──────────────┐                  ┌──────────────┐               ┌──────────────┐
│              │                  │              │   Query DB    │              │
│ Visit        │  Navigate        │ Fetch next   │──────────────→│  Return next │
│ Volunteer    │ ────────────────→│ upcoming     │               │  future      │
│ page         │                  │ event        │←──────────────│  event       │
│              │                  │              │   Event data  │              │
│ See featured │←─────────────────│ Display      │               │              │
│ event        │  Render HTML     │ event        │               │              │
└──────────────┘                  └──────────────┘               └──────────────┘
```

---

## Setup Flow

```
                START HERE
                    │
                    ↓
    ┌───────────────────────────────┐
    │  1. Create Supabase Account   │
    │     https://supabase.com      │
    └────────────┬──────────────────┘
                 │
                 ↓
    ┌───────────────────────────────┐
    │  2. Create New Project        │
    │     Name: berkeley-lions-club │
    │     Region: West US           │
    └────────────┬──────────────────┘
                 │
                 ↓
    ┌───────────────────────────────┐
    │  3. Get API Credentials       │
    │     Settings → API            │
    │     • Project URL             │
    │     • anon public key         │
    └────────────┬──────────────────┘
                 │
                 ├─────────────────────────────┐
                 ↓                             ↓
    ┌───────────────────────┐    ┌───────────────────────┐
    │  4a. Create Database  │    │  4b. Create Storage   │
    │      Table            │    │      Bucket           │
    │  SQL Editor → Run SQL │    │  Storage → New Bucket │
    │  featured_events      │    │  Name: event-images   │
    │  + RLS Policies       │    │  Public: ✅           │
    └───────────┬───────────┘    └───────────┬───────────┘
                 │                             │
                 └──────────┬──────────────────┘
                            ↓
            ┌───────────────────────────────┐
            │  5. Add to Cloudflare Pages  │
            │     Environment Variables:    │
            │     • VITE_SUPABASE_URL       │
            │     • VITE_SUPABASE_ANON_KEY  │
            └────────────┬──────────────────┘
                         │
                         ↓
            ┌───────────────────────────────┐
            │  6. Re-deploy Site            │
            │     Cloudflare auto-deploys   │
            └────────────┬──────────────────┘
                         │
                         ↓
            ┌───────────────────────────────┐
            │  7. Test!                     │
            │     • Admin Login             │
            │     • Featured Events tab     │
            │     • Upload test event       │
            └───────────────────────────────┘
                         │
                         ↓
                    ✅ DONE!
            Event management is live!
```

---

## File Structure After Setup

```
berkeleylionsclub/
│
├── src/
│   ├── components/
│   │   ├── AdminDashboard.tsx          ← Unified admin interface
│   │   ├── EventManagementContent.tsx  ← Uses Supabase ✅
│   │   ├── GalleryManagementContent.tsx
│   │   └── Volunteer.tsx               ← Displays events from Supabase
│   │
│   └── lib/
│       └── supabase.ts                 ← Supabase client config
│
├── .env (local development only)
│   VITE_SUPABASE_URL=https://xxx.supabase.co
│   VITE_SUPABASE_ANON_KEY=eyJ...
│
└── Cloudflare Pages (production)
    Environment Variables:
    • VITE_SUPABASE_URL
    • VITE_SUPABASE_ANON_KEY
```

---

## Supabase Dashboard Navigation

```
┌────────────────────────────────────────────────────┐
│  Supabase Dashboard                                │
├────────────────────────────────────────────────────┤
│                                                    │
│  📊 Home                  ← Project overview       │
│  🗄️  Table Editor         ← View/edit events data  │
│  🔍 SQL Editor           ← Run SQL commands HERE   │
│  📁 Storage              ← Manage event-images     │
│  🔐 Authentication       ← (not used yet)          │
│  ⚙️  Settings                                      │
│     ├─ API              ← Get credentials HERE     │
│     ├─ Database         ← Database settings        │
│     └─ Usage            ← Monitor free tier limits │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## Security Model

```
PUBLIC ACCESS (No auth required):
═══════════════════════════════════
┌─────────────────────────────────┐
│ ✅ Read events from database    │
│ ✅ View event images            │
│ ✅ Display on Volunteer page    │
└─────────────────────────────────┘
         │
         │ RLS Policy: Allow public SELECT
         ↓
    Supabase Database


ADMIN ACCESS (Password protected):
═══════════════════════════════════
┌─────────────────────────────────┐
│ Admin Dashboard                 │
│ Password: berkeley2025          │
└─────────────────────────────────┘
         │
         │ Client-side validation
         ↓
┌─────────────────────────────────┐
│ ✅ Upload new events            │
│ ✅ Delete events                │
│ ✅ Upload event images          │
└─────────────────────────────────┘
         │
         │ RLS Policy: Allow public INSERT/UPDATE/DELETE
         │ (Protected by admin password on frontend)
         ↓
    Supabase Database
```

---

## Database Schema

```sql
Table: featured_events
┌──────────────────────┬──────────────┬─────────────────────┐
│ Column               │ Type         │ Description         │
├──────────────────────┼──────────────┼─────────────────────┤
│ id                   │ UUID         │ Primary key         │
│ event_name           │ TEXT         │ "Crab Feed 2026"    │
│ event_description    │ TEXT         │ Event details       │
│ event_date           │ DATE         │ 2026-03-15          │
│ event_time           │ TEXT         │ "5pm-9pm"           │
│ location_name        │ TEXT         │ "City Hall"         │
│ location_address     │ TEXT         │ "123 Main St"       │
│ volunteers_needed    │ TEXT         │ "20-30 people"      │
│ age_requirements     │ TEXT         │ "All ages"          │
│ volunteer_tasks      │ TEXT[]       │ ["Cook", "Serve"]   │
│ ticket_price         │ TEXT         │ "$80" or "Free"     │
│ is_free              │ BOOLEAN      │ true/false          │
│ square_payment_link  │ TEXT         │ Square URL          │
│ additional_info      │ TEXT         │ Extra notes         │
│ to_go_available      │ BOOLEAN      │ true/false          │
│ image_url            │ TEXT         │ Supabase URL        │
│ created_at           │ TIMESTAMP    │ Auto-generated      │
│ updated_at           │ TIMESTAMP    │ Auto-generated      │
└──────────────────────┴──────────────┴─────────────────────┘
```

---

## Cloudflare Pages Configuration

```
Cloudflare Dashboard
    ↓
Pages → berkeley-lions-club
    ↓
Settings → Environment variables
    ↓
┌─────────────────────────────────────────────────────┐
│  Production Environment                             │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Variable Name: VITE_SUPABASE_URL                   │
│  Value: https://abcdefg.supabase.co                 │
│                                                     │
│  Variable Name: VITE_SUPABASE_ANON_KEY              │
│  Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...    │
│                                                     │
└─────────────────────────────────────────────────────┘
    ↓
Save → Deployments → Redeploy
    ↓
Wait 2-3 minutes
    ↓
✅ Live with Supabase!
```

---

## Testing Checklist

```
After Setup, Test These:
═══════════════════════

1. Admin Dashboard Access
   ☐ Go to berkeleylionsclub.org
   ☐ Click "Admin Login" in footer
   ☐ Enter password: berkeley2025
   ☐ Should see dashboard

2. Featured Events Tab
   ☐ Click "Featured Events" tab
   ☐ Yellow warning should be GONE
   ☐ Should see "Add New Featured Event" form

3. Upload Test Event
   ☐ Fill out all required fields
   ☐ Upload a test image
   ☐ Click "Publish Featured Event"
   ☐ Should see success message
   ☐ Event should appear in "Existing Events"

4. Public Display
   ☐ Go to Volunteer page (without being logged in)
   ☐ Should see the test event displayed
   ☐ Event image should load
   ☐ All details should be visible

5. Delete Test Event
   ☐ Back to Admin Dashboard
   ☐ Featured Events tab
   ☐ Click trash icon on test event
   ☐ Confirm deletion
   ☐ Event should disappear

✅ If all tests pass, you're good to go!
```

---

## Cost Breakdown (Free Tier)

```
What You Get Free:
═════════════════

Database:
• 500 MB storage
• = ~5,000 events (more than enough!)

File Storage:
• 1 GB storage
• = ~200 high-quality event images
• = ~500 compressed images

Bandwidth:
• 2 GB/month
• = ~20,000 page loads/month

Other:
• 50,000 monthly active users
• Automatic backups
• SSL certificates
• 99.9% uptime

Upgrade Only If:
• Need more than 200 event images
• Get more than 20,000 visitors/month
• Need advanced features

For Berkeley Lions Club: FREE TIER IS PERFECT! ✅
```

---

This visual guide should help you understand exactly what you're setting up and how it all connects! 🎉

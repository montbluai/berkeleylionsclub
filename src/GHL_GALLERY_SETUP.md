# GoHighLevel Photo Gallery Setup Guide

## Overview
This guide will help you set up your photo gallery to be managed through GoHighLevel, allowing non-technical club members to add/remove photos without touching code.

---

## Step 1: Create a Custom Pipeline in GHL

1. Log into your GoHighLevel account
2. Navigate to **Settings** → **Pipelines**
3. Click **Create Pipeline**
4. Name it: **"Photo Gallery"**
5. Create stages (optional, or just use one stage like "Published")

---

## Step 2: Create Custom Fields for Photo Data

1. Go to **Settings** → **Custom Fields**
2. Click **Add Custom Field**
3. Create these three fields:

   ### Field 1: Photo URL
   - **Field Name:** `photo_url`
   - **Field Type:** Text/URL
   - **Applies to:** Opportunities
   
   ### Field 2: Caption
   - **Field Name:** `caption`
   - **Field Type:** Text
   - **Applies to:** Opportunities
   
   ### Field 3: Category
   - **Field Name:** `category`
   - **Field Type:** Dropdown
   - **Applies to:** Opportunities
   - **Options:**
     - Service
     - Fellowship
     - Events
     - Fundraising

---

## Step 3: Get Your GHL API Credentials

1. Go to **Settings** → **API**
2. Click **Create API Key**
3. Name it: "Photo Gallery API"
4. **Copy the API Key** (you'll need this later)
5. Copy your **Location ID** (found in Settings → Business Info or in the URL)

---

## Step 4: Find Your Pipeline ID

1. Go to your **Photo Gallery** pipeline
2. Look at the URL in your browser
3. The Pipeline ID is in the URL: `https://app.gohighlevel.com/v2/location/LOCATION_ID/pipelines/PIPELINE_ID`
4. **Copy the Pipeline ID**

---

## Step 5: Upload Photos to a Hosting Service

Since GHL doesn't host images directly, you'll need to upload photos somewhere and paste the URLs. Options:

### Option A: Imgur (Easiest - Free)
1. Go to [imgur.com](https://imgur.com)
2. Upload photo
3. Right-click image → "Copy Image Address"
4. Use that URL in GHL

### Option B: Cloudflare R2 (Recommended - Free tier)
1. Create R2 bucket (see Cloudflare R2 setup)
2. Upload images
3. Get public URLs
4. Use those URLs in GHL

### Option C: Google Drive (Free but requires setup)
1. Upload to Google Drive
2. Make file public
3. Get direct link (requires special formatting)

---

## Step 6: Add Photos in GHL

1. Go to **Opportunities** tab
2. Click **Add Opportunity**
3. Fill in:
   - **Name/Title:** Not critical (used as fallback caption)
   - **Pipeline:** Photo Gallery
   - **Custom Field - photo_url:** Paste your image URL
   - **Custom Field - caption:** "Community Volunteer Day"
   - **Custom Field - category:** Service
4. Save
5. Repeat for each photo

---

## Step 7: Configure Your Website Code

Open `/components/PhotoGallery.tsx` and replace these values:

```typescript
const GHL_API_KEY = 'YOUR_GHL_API_KEY_HERE';  // From Step 3
const GHL_LOCATION_ID = 'YOUR_GHL_LOCATION_ID_HERE';  // From Step 3
```

And update the pipeline ID in the fetch URL:
```typescript
pipeline_id=GALLERY_PIPELINE_ID  // Replace with your Pipeline ID from Step 4
```

---

## Step 8: Deploy to Cloudflare Pages

1. Push your code changes to GitHub
2. Cloudflare Pages will auto-deploy
3. Visit your site's Photo Gallery page
4. Photos should load from GHL!

---

## Managing Photos (For Club Members)

### To Add a Photo:
1. Upload photo to your image hosting (Imgur/R2/etc.)
2. Copy the image URL
3. In GHL, create new Opportunity in Photo Gallery pipeline
4. Fill in URL, caption, and category
5. Website updates automatically!

### To Remove a Photo:
1. Find the Opportunity in GHL
2. Delete or archive it
3. Website updates automatically!

### To Edit a Photo:
1. Find the Opportunity in GHL
2. Edit the custom fields
3. Save
4. Website updates automatically!

---

## Troubleshooting

### Photos not showing?
- Check that API key is correct in code
- Check Location ID and Pipeline ID are correct
- Check that opportunities have all custom fields filled
- Open browser console (F12) to see error messages

### Using fallback images?
- This is normal until GHL is configured
- Check console message: "GHL API not configured yet"
- Follow Steps 7-8 to configure

### API Key not working?
- Make sure it's a "Private App" API key
- Check that it has permissions for Opportunities
- Regenerate key if needed

---

## Alternative: Simpler Approach with Custom Values

If the Opportunities approach is too complex, you can also use **Custom Values** in GHL:

1. Go to **Settings** → **Custom Values**
2. Create a custom value called `gallery_photos`
3. Store JSON data like:
```json
[
  {
    "url": "https://...",
    "caption": "Community Day",
    "category": "Service"
  }
]
```

This requires modifying the API fetch code but is simpler for updates.

---

## Need Help?

- GHL API Documentation: https://highlevel.stoplight.io/
- Contact your web developer if you need assistance with API configuration

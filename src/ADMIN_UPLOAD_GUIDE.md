# Admin Photo Upload - Setup & User Guide

## 🎯 Overview
You now have a simple, password-protected admin page where club members can easily upload AND delete photos from your gallery without touching any code!

---

## 🔐 Access the Upload Page

**URL:** `https://your-website.com/#admin-upload`

Or manually navigate by changing the URL hash to `#admin-upload`

**Default Password:** `berkeley2025`

⚠️ **IMPORTANT:** Change this password before going live!

---

## 🔧 Initial Setup

### Step 1: Change the Admin Password

1. Open `/components/AdminGalleryUpload.tsx`
2. Find line ~19:
   ```typescript
   const ADMIN_PASSWORD = 'berkeley2025';
   ```
3. Change to your desired password:
   ```typescript
   const ADMIN_PASSWORD = 'YourSecurePassword123';
   ```
4. Save and redeploy

### Step 2: Configure GoHighLevel API (Optional)

If you want photos to automatically create GHL opportunities:

1. Open `/components/AdminGalleryUpload.tsx`
2. Find lines ~138-140:
   ```typescript
   const GHL_API_KEY = 'YOUR_GHL_API_KEY_HERE';
   const GHL_LOCATION_ID = 'YOUR_GHL_LOCATION_ID_HERE';
   const PIPELINE_ID = 'YOUR_PIPELINE_ID_HERE';
   ```
3. Replace with your actual values from GHL
4. Follow the GHL setup guide in `/GHL_GALLERY_SETUP.md`

**Note:** If you skip this step, photos will still upload to Imgur and display on your gallery - they just won't be tracked in GHL.

### Step 3: (Optional) Get Your Own Imgur Client ID

The form uses a public Imgur Client ID by default, but you can get your own:

1. Go to [https://api.imgur.com/oauth2/addclient](https://api.imgur.com/oauth2/addclient)
2. Create account if needed
3. Register application:
   - **Application name:** Berkeley Lions Gallery
   - **Authorization type:** Anonymous usage without user authorization
4. Copy your **Client ID**
5. In `/components/AdminGalleryUpload.tsx`, find line ~94:
   ```typescript
   Authorization: 'Client-ID 4e7e6e7e0a8f7e7',
   ```
6. Replace with your Client ID:
   ```typescript
   Authorization: 'Client-ID YOUR_CLIENT_ID_HERE',
   ```

---

## 📖 User Guide (For Club Members)

### How to Upload a Photo

1. **Navigate to the admin page:**
   - Go to: `https://berkeleylions.org/#admin-upload`
   
2. **Login:**
   - Enter the admin password
   - Click "Login"

3. **Upload Photo (Left Side):**
   - **Option A:** Click the upload area and browse for a file
   - **Option B:** Drag and drop a photo directly onto the upload area
   
4. **Add Details:**
   - **Caption:** Brief description (e.g., "Food Bank Drive 2024")
   - **Category:** Select from:
     - Service
     - Fellowship
     - Events
     - Fundraising

5. **Submit:**
   - Click "Upload Photo"
   - Wait for success message
   - Photo appears in the "Manage Photos" section on the right!

### How to Delete a Photo

1. **Navigate to the admin page** and login
2. **Look at the "Manage Photos" section** on the right side
3. **Find the photo** you want to remove
4. **Click the red trash icon** on the photo
5. **Confirm the deletion** when prompted
6. Photo is immediately removed from the gallery!

### Tips for Best Results

✅ **DO:**
- Use high-quality photos (at least 1200px wide)
- Use descriptive captions
- Choose the correct category
- Keep file sizes under 10MB
- Review photos before uploading

❌ **DON'T:**
- Upload copyrighted images without permission
- Use blurry or low-quality photos
- Include sensitive personal information in captions

---

## 🔍 How It Works Behind the Scenes

1. **Club member uploads photo** via the admin form
2. **Image is uploaded to Imgur** (free, reliable hosting)
3. **Imgur returns a permanent URL** for the image
4. **(Optional) GoHighLevel opportunity is created** with:
   - Photo URL
   - Caption
   - Category
5. **Gallery page automatically shows the new photo** on next refresh

---

## 🚀 Alternative: Upgrade to Cloudflare R2

If you want to use professional Cloudflare R2 storage instead of Imgur:

### Option 1: Manual R2 Upload (Simpler)
Club members can:
1. Upload photos to Cloudflare R2 dashboard
2. Copy the public URL
3. Use the admin form but paste the R2 URL in a new "Image URL" field

### Option 2: Automatic R2 Upload (Requires Cloudflare Worker)
You'll need to:
1. Create a Cloudflare Worker (serverless function)
2. Configure R2 API credentials in the Worker
3. Update the upload form to send to Worker instead of Imgur

**Need help with this?** Let me know and I can provide the Worker code!

---

## 🛡️ Security Notes

### Password Security
- The current password protection is **basic** - suitable for internal club use
- For higher security, consider:
  - Changing password regularly
  - Not sharing password publicly
  - Using strong, unique password

### API Keys
- **Never commit API keys to public GitHub repos**
- Use environment variables for production
- Rotate keys if compromised

### Image Content
- Club members should only upload appropriate, club-related photos
- Review gallery periodically to ensure quality

---

## 📊 Managing Photos

### View All Photos
- Visit the public gallery page: `https://your-site.com/#gallery`
- OR view them in the admin page: `https://your-site.com/#admin-upload` (right side panel)

### Delete Photos
**Easy Method (Recommended):**
1. Go to the admin page: `https://your-site.com/#admin-upload`
2. Login with password
3. Look at the "Manage Photos" section on the right
4. Click the red trash icon on any photo
5. Confirm deletion
6. Done! Photo is removed from both the admin panel and public gallery

**Alternative Method (If using GHL):**
1. Log into GoHighLevel
2. Navigate to Opportunities
3. Find the "Photo Gallery" pipeline
4. Delete or archive the opportunity
5. Photo will be removed from gallery

**Note:** Photos are stored in your browser's localStorage (if GHL not configured) or in GoHighLevel opportunities. Deleting from the admin panel handles everything for you!

---

## ❓ Troubleshooting

### "Failed to upload photo"
- Check internet connection
- Try smaller file size (under 5MB)
- Verify file is an image (JPG, PNG, GIF)

### "Photo doesn't appear on gallery"
- Wait a few seconds and refresh the page
- Clear browser cache
- Check if GHL is configured correctly

### "Forgot password"
- Contact whoever manages the website code
- They can reset it in `/components/AdminGalleryUpload.tsx`

### "Can't access admin page"
- Make sure you're using the exact URL with `#admin-upload`
- Try clearing browser cache
- Contact website administrator

---

## 📞 Support

For technical issues or questions:
- Contact your web developer
- Reference this guide
- Check browser console for error messages (F12 key)

---

## 🎓 Training New Club Members

### 5-Minute Training Script:

1. "Here's how to add photos to our website"
2. Show them the URL: `your-site.com/#admin-upload`
3. Give them the password (write it down for them)
4. Demo: drag a photo, add caption, select category, click upload
5. Show them the result on the gallery page
6. Answer any questions

**That's it!** Most people can do this after one demonstration.

---

## 🔄 Future Enhancements (Optional)

If you want to add more features later:
- Bulk upload (multiple photos at once)
- Photo editing/cropping tool
- Ability to delete photos from admin panel
- Photo approval workflow
- Usage analytics
- Custom categories

Let your web developer know if you'd like any of these!
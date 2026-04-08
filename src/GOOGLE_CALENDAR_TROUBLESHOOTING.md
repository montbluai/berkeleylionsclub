# 📅 Google Calendar Troubleshooting Guide

**Issue:** Volunteer Opportunities calendar not displaying on website

---

## 🔍 Common Causes

### 1. **Calendar Not Set to Public** (Most Common)
The Google Calendar must be publicly accessible for embedding to work.

### 2. **Calendar Privacy Settings**
Calendar sharing permissions may be restricted.

### 3. **Incorrect Calendar ID**
The calendar ID might have changed or be incorrect.

### 4. **Google Account Permissions**
The calendar owner's Google account settings may restrict embedding.

---

## ✅ Step-by-Step Fix

### **Step 1: Verify Calendar is Public**

1. **Login to Google Calendar:**
   - Go to https://calendar.google.com
   - Sign in with the account that owns the "Volunteer Opportunities" calendar

2. **Find the Calendar:**
   - Look for "Volunteer Opportunities" in the left sidebar under "My calendars" or "Other calendars"

3. **Open Calendar Settings:**
   - Hover over the calendar name
   - Click the three dots (⋮) menu
   - Select "Settings and sharing"

4. **Make Calendar Public:**
   - Scroll down to "Access permissions for events"
   - Check the box: ✅ **"Make available to public"**
   - Click "OK" on the warning dialog

5. **Set Public Visibility:**
   - Under "Access permissions for events"
   - Make sure it shows: "See all event details"
   - NOT just "See only free/busy (hide details)"

### **Step 2: Verify Calendar ID**

1. **Still in Calendar Settings:**
   - Scroll down to "Integrate calendar"
   - Find "Calendar ID"
   - It should look like: `xxxxxxxxx@group.calendar.google.com`

2. **Current Calendar ID in Website:**
   ```
   4407935e25481954fdb2a82e75f3cb977cb897283481cd2c8c8c0b45882d2a8@group.calendar.google.com
   ```

3. **Compare:**
   - Does it match exactly?
   - If different, the calendar ID needs to be updated in the website

### **Step 3: Test Calendar Embed**

1. **Get Embed Code:**
   - In Calendar Settings → "Integrate calendar"
   - Find "Embed code"
   - Click "Customize" to open the customization page

2. **Test Embed URL:**
   - Copy the iframe URL
   - Open it in a new browser tab
   - If it shows "Calendar not found" or blank → calendar is not public
   - If it shows events → calendar is configured correctly

3. **Example Test URL:**
   ```
   https://calendar.google.com/calendar/embed?src=4407935e25481954fdb2a82e75f3cb977cb897283481cd2c8c8c0b45882d2a8@group.calendar.google.com
   ```

### **Step 4: Check Browser Console**

1. **Open Website:**
   - Go to berkeleylionsclub.org/volunteer

2. **Open Developer Tools:**
   - Press F12 (or Cmd+Option+I on Mac)
   - Click "Console" tab

3. **Look for Errors:**
   - Red error messages about iframe
   - CSP (Content Security Policy) errors
   - "Refused to display in a frame" errors
   - "X-Frame-Options" errors

4. **Common Error Messages:**

   **Error:** `Refused to display 'https://calendar.google.com' in a frame because it set 'X-Frame-Options' to 'deny'.`
   **Fix:** Calendar is not set to public

   **Error:** `The calendar cannot be shown because it is not public.`
   **Fix:** Make calendar public (Step 1)

   **Error:** `Calendar not found`
   **Fix:** Calendar ID is incorrect or calendar was deleted

---

## 🔧 Quick Fixes

### **Fix 1: Make Calendar Public (Most Common)**

**Via Google Calendar UI:**
```
1. Google Calendar → Settings → [Your Calendar] → Settings and sharing
2. Check: ✅ Make available to public
3. Set visibility: See all event details
4. Click Save
```

**Wait 5-10 minutes for changes to propagate, then refresh website**

### **Fix 2: Update Calendar ID**

If the calendar ID has changed:

1. **Get New Calendar ID:**
   - Google Calendar → Settings → Integrate calendar → Calendar ID
   - Copy the ID (looks like `xyz@group.calendar.google.com`)

2. **Update in Website Code:**
   - Files to update:
     - `/components/Volunteer.tsx` (line 287)
     - `/components/Home.tsx` (line 370)

3. **Find this code:**
   ```tsx
   id: '4407935e25481954fdb2a82e75f3cb977cb897283481cd2c8c8c0b45882d2a8@group.calendar.google.com',
   ```

4. **Replace with new ID:**
   ```tsx
   id: 'YOUR_NEW_CALENDAR_ID@group.calendar.google.com',
   ```

### **Fix 3: Create New Calendar (If Lost Access)**

If you can't find the original calendar:

1. **Create New Calendar:**
   - Google Calendar → Settings → Add calendar → Create new calendar
   - Name: "Volunteer Opportunities"
   - Time zone: Pacific Time (US & Canada)
   - Click "Create calendar"

2. **Make It Public:**
   - Follow Step 1 above

3. **Add Events:**
   - Add your volunteer opportunities as events

4. **Get Calendar ID:**
   - Settings → [New Calendar] → Integrate calendar
   - Copy Calendar ID

5. **Update Website:**
   - Follow "Fix 2" steps above

---

## 🧪 Testing Checklist

After making changes:

- [ ] Calendar shows "Public" in settings
- [ ] Calendar visibility is "See all event details"
- [ ] Embed URL works when opened directly in browser
- [ ] No errors in browser console
- [ ] Calendar loads on Volunteer page
- [ ] Events are visible
- [ ] Can toggle calendar on/off with button
- [ ] Calendar shows correct time zone (Pacific)

---

## 📋 Current Calendar Configuration

### **Volunteer Opportunities Calendar**

**Calendar ID:**
```
4407935e25481954fdb2a82e75f3cb977cb897283481cd2c8c8c0b45882d2a8@group.calendar.google.com
```

**Used On:**
- Home page (all events section)
- Volunteer page (primary calendar)

**Required Settings:**
- ✅ Public access enabled
- ✅ Visibility: "See all event details"
- ✅ Embedding: Allowed
- ✅ Time zone: America/Los_Angeles (Pacific)

**Color Code:**
- Home page: `#00338D` (Lions Blue)
- Volunteer page: `#1740a5` (Darker Blue)

---

## 🔒 Security Note

**CSP Headers:** The website's Content Security Policy allows Google Calendar embeds:
```
frame-src https://links.montbluai.com https://calendar.google.com;
```

This is correctly configured and should not block the calendar.

---

## 📞 Google Calendar Support

If none of the above fixes work:

### **Check Google Workspace Status:**
- https://www.google.com/appsstatus/dashboard/
- Check if Google Calendar is experiencing issues

### **Try Alternative Calendar Owner:**
If the current calendar owner has restrictions:
- Create calendar under different Google account
- Make it public
- Share with club administrators
- Update calendar ID in website

---

## 🎯 Alternative: Use Different Calendar Service

If Google Calendar continues to have issues:

### **Option 1: Create Public Google Calendar**
- Use personal Gmail account (not restricted)
- Make calendar public
- Share with club for editing

### **Option 2: Use Calendar Embed Widget**
- Services like Calendly or AddEvent
- May have better embedding reliability

### **Option 3: Custom Event List**
- Use the Featured Event system already in place
- Add events manually through admin dashboard
- More control, but requires manual updates

---

## 🛠️ For Developers: Update Calendar ID

If you need to change the calendar ID in the code:

### **File: `/components/Volunteer.tsx`**

**Find (around line 287):**
```tsx
calendars={[
  {
    id: '4407935e25481954fdb2a82e75f3cb977cb897283481cd2c8c8c0b45882d2a8@group.calendar.google.com',
    name: '🤝 Volunteer Opportunities',
    color: '#1740a5'
  },
  // ... other calendars
]}
```

**Replace with:**
```tsx
calendars={[
  {
    id: 'YOUR_NEW_CALENDAR_ID@group.calendar.google.com',
    name: '🤝 Volunteer Opportunities',
    color: '#1740a5'
  },
  // ... other calendars
]}
```

### **File: `/components/Home.tsx`**

**Find (around line 370):**
```tsx
calendars={[
  {
    id: '4407935e25481954fdb2a82e75f3cb977cb897283481cd2c8c8c0b45882d2a8@group.calendar.google.com',
    name: '🤝 Volunteer Opportunities',
    color: '#00338D'
  },
  // ... other calendars
]}
```

**Replace with:**
```tsx
calendars={[
  {
    id: 'YOUR_NEW_CALENDAR_ID@group.calendar.google.com',
    name: '🤝 Volunteer Opportunities',
    color: '#00338D'
  },
  // ... other calendars
]}
```

### **After Updating:**
```bash
npm run build
# Deploy to Cloudflare Pages
```

---

## 📊 Diagnostic Steps Summary

1. ✅ **Verify calendar is public** → Most common issue
2. ✅ **Check calendar ID matches** → Compare with settings
3. ✅ **Test embed URL directly** → Open in browser
4. ✅ **Check browser console** → Look for errors
5. ✅ **Wait for propagation** → Changes take 5-10 minutes
6. ✅ **Clear browser cache** → Hard refresh (Ctrl+Shift+R)
7. ✅ **Test in incognito** → Eliminates cache issues

---

## 🔑 Key Points

**Most Common Fix:** Make calendar public
**Second Most Common:** Wait 5-10 minutes after making changes
**Third Most Common:** Clear browser cache and hard refresh

**Time to Fix:** Usually 10-15 minutes
**Difficulty:** Easy (no coding required)

---

## 📝 Calendar Not Showing Checklist

When calendar doesn't display, check in this order:

1. [ ] Is calendar set to "Public" in Google Calendar settings?
2. [ ] Is visibility set to "See all event details" (not just free/busy)?
3. [ ] Does the calendar ID match in code and in Google Calendar?
4. [ ] Can you open the embed URL directly in a browser?
5. [ ] Have you waited 5-10 minutes for changes to propagate?
6. [ ] Have you cleared browser cache and hard refreshed?
7. [ ] Are there errors in the browser console?
8. [ ] Is Google Calendar having service issues? (Check status page)
9. [ ] Does the calendar owner's account allow public embedding?
10. [ ] Are there any events in the calendar to display?

---

## 📧 Still Having Issues?

**Contact for Help:**
- Email: lionsberkeley@gmail.com
- Subject: "Google Calendar Not Displaying"

**Include in Email:**
1. Screenshot of Google Calendar settings page
2. Screenshot of browser console errors (if any)
3. Calendar ID from Google Calendar settings
4. What page you're trying to view (e.g., /volunteer)
5. What you've already tried from this guide

---

**Last Updated:** April 8, 2026  
**Next Review:** When calendar issues are resolved

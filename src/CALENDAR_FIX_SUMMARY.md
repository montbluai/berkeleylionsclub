# 📅 Google Calendar Not Displaying - Quick Fix Guide

**Issue:** Volunteer Opportunities calendar not showing on website  
**Most Likely Cause:** Calendar not set to public in Google Calendar  
**Time to Fix:** 5-15 minutes

---

## 🚀 Quick Fix (90% Success Rate)

### **Step 1: Make Calendar Public**

1. Go to **https://calendar.google.com**
2. Sign in with the Google account that owns the "Volunteer Opportunities" calendar
3. In the left sidebar, find "Volunteer Opportunities" calendar
4. Click the **three dots (⋮)** next to it
5. Select **"Settings and sharing"**
6. Scroll down to **"Access permissions for events"**
7. Check the box: ✅ **"Make available to public"**
8. Make sure it shows: **"See all event details"** (NOT "See only free/busy")
9. **Wait 5-10 minutes** for changes to take effect
10. Go to your website and **hard refresh** (Ctrl+Shift+R or Cmd+Shift+R)

**That's it!** The calendar should now display.

---

## 🧪 Test If It's Working

### **Method 1: Direct URL Test**
Open this URL in your browser:
```
https://calendar.google.com/calendar/embed?src=4407935e25481954fdb2a82e75f3cb977cb897283481cd2c8c8c0b45882d2a8@group.calendar.google.com
```

**If you see:**
- ✅ Calendar with events → It's working!
- ❌ "Calendar not found" → Not public or wrong ID
- ❌ Blank page → Privacy settings issue

### **Method 2: Check Website**
1. Go to **berkeleylionsclub.org/volunteer**
2. Scroll to the calendar section
3. **If calendar loads** → Fixed! ✅
4. **If still blank** → Continue troubleshooting

---

## 🔍 If Quick Fix Didn't Work

### **Check 1: Verify Calendar ID**

The calendar ID in the website is:
```
4407935e25481954fdb2a82e75f3cb977cb897283481cd2c8c8c0b45882d2a8@group.calendar.google.com
```

**To verify it's correct:**
1. Google Calendar → Settings → [Your Calendar] → Settings and sharing
2. Scroll to "Integrate calendar"
3. Look for "Calendar ID"
4. **Does it match?**
   - ✅ Yes → Calendar ID is correct
   - ❌ No → Calendar ID needs to be updated (see below)

### **Check 2: Browser Console Errors**

1. Open your website
2. Press **F12** (or Cmd+Option+I on Mac)
3. Click **"Console"** tab
4. Scroll to calendar section
5. Look for **red error messages**

**Common errors:**
- "Refused to display in a frame" → Calendar not public
- "Calendar not found" → Wrong calendar ID or deleted
- "CSP violation" → Contact webmaster

---

## 🛠️ If Calendar ID Changed

If the calendar ID in Google Calendar doesn't match the website:

### **Option A: Quick - Recreate Calendar with Original ID**
The website expects the specific calendar ID. It's easier to work with the existing setup.

### **Option B: Update Website Code**

**Files to update:**
1. `/components/Volunteer.tsx` (line 287)
2. `/components/Home.tsx` (line 370)

**Find this code:**
```tsx
id: '4407935e25481954fdb2a82e75f3cb977cb897283481cd2c8c8c0b45882d2a8@group.calendar.google.com',
```

**Replace with your new calendar ID:**
```tsx
id: 'YOUR_NEW_CALENDAR_ID@group.calendar.google.com',
```

**Then rebuild and deploy:**
```bash
npm run build
# Deploy to Cloudflare Pages
```

---

## 📊 Diagnostic Tool

I've created a diagnostic page to help test the calendars:

### **How to Access:**
You can create a test page by adding this to your routes or accessing the CalendarDiagnostics component.

### **What it does:**
- Tests all 3 calendars (Volunteer, Fundraising, Meetings)
- Shows which calendars are loading correctly
- Displays calendar IDs and embed URLs
- Provides live embed tests
- Shows specific error messages

---

## 📝 All Three Calendars

Your website uses 3 Google Calendars:

### **1. Volunteer Opportunities** 🤝
- **ID:** `4407935e25481954fdb2a82e75f3cb977cb897283481cd2c8c8c0b45882d2a8@group.calendar.google.com`
- **Color:** Blue (#00338D)
- **Used on:** Home page, Volunteer page
- **Status:** ❓ Not displaying (needs fix)

### **2. Fundraising Events** 💰
- **ID:** `230dbe79b903ae2fa91d462591b91a12c751a69972ac68c0e6d612779836ea29@group.calendar.google.com`
- **Color:** Yellow (#EBB700)
- **Used on:** Home page, Volunteer page
- **Status:** ❓ Check if displaying

### **3. Member Meetings** 📋
- **ID:** `f3cdc1051ae2cf0820279bbb8d51621da9cc2266ba33405e132a9c7a600b2bec@group.calendar.google.com`
- **Color:** Purple (#7A2582)
- **Used on:** Home page
- **Status:** ❓ Check if displaying

**Action:** Make sure ALL three calendars are set to public using the steps above.

---

## ✅ Verification Checklist

After making changes, verify:

- [ ] Calendar is set to "Public" in Google Calendar settings
- [ ] Visibility is "See all event details" (not "Free/busy only")
- [ ] Waited 5-10 minutes for changes to propagate
- [ ] Cleared browser cache
- [ ] Hard refreshed website (Ctrl+Shift+R)
- [ ] Direct embed URL loads in browser
- [ ] No errors in browser console
- [ ] Calendar displays on /volunteer page
- [ ] Calendar displays on home page
- [ ] Events are visible in calendar
- [ ] Can toggle calendar visibility with buttons

---

## 🎯 Success Indicators

**You'll know it's working when:**
1. ✅ Calendar iframe loads on website
2. ✅ Events are visible in calendar
3. ✅ Can click "next/previous" to navigate months
4. ✅ Can click on events to see details
5. ✅ Toggle buttons show/hide the calendar
6. ✅ No error messages in console

---

## 📧 Still Not Working?

If you've tried everything and it's still not working:

### **Email Support:**
- **To:** lionsberkeley@gmail.com
- **Subject:** "Google Calendar Not Displaying"

### **Include:**
1. Screenshot of Google Calendar settings page showing "Public" is checked
2. Screenshot of Calendar ID from Google Calendar settings
3. Screenshot of browser console errors (if any)
4. What you've already tried from this guide
5. Which page you're checking (e.g., /volunteer)

### **Alternative Solution:**
If Google Calendar continues to have issues, you can use the Featured Event system already built into the admin dashboard to manually add events. This gives you more control but requires manual updates.

---

## 📚 Additional Resources

- **[GOOGLE_CALENDAR_TROUBLESHOOTING.md](./GOOGLE_CALENDAR_TROUBLESHOOTING.md)** - Comprehensive troubleshooting guide
- **[CalendarDiagnostics Component](./components/CalendarDiagnostics.tsx)** - Diagnostic tool
- **Google Calendar Help:** https://support.google.com/calendar/answer/37083

---

## 🔧 Technical Details

### **How the Calendar Embed Works:**

1. Website requests Google Calendar embed iframe
2. Google checks if calendar is public
3. If public → returns calendar HTML
4. If not public → returns error
5. Website displays iframe with calendar

### **Current Configuration:**

**CSP Headers:** ✅ Configured correctly
```
frame-src https://calendar.google.com
```

**Embed URL Format:**
```
https://calendar.google.com/calendar/embed?src=[CALENDAR_ID]&ctz=America/Los_Angeles&mode=AGENDA
```

**Component:** `/components/EventsCalendar.tsx`
- Lazy loads iframe (performance optimization)
- Supports multiple calendars
- Toggleable calendar visibility
- Error handling included

---

## ⏱️ Expected Timeline

| Step | Time Required |
|------|---------------|
| Make calendar public | 2 minutes |
| Wait for Google to propagate changes | 5-10 minutes |
| Clear cache and test | 1 minute |
| **Total** | **~15 minutes** |

---

## 💡 Pro Tips

1. **Always hard refresh** after making changes (Ctrl+Shift+R)
2. **Test in incognito mode** to eliminate cache issues
3. **Check all 3 calendars** - they all need to be public
4. **Wait the full 5-10 minutes** - Google takes time to propagate
5. **Test the direct embed URL first** - easier to diagnose

---

## 🎓 Prevention

To avoid this issue in the future:

1. ✅ Document which Google account owns the calendars
2. ✅ Set calendar sharing permissions properly
3. ✅ Don't change calendar IDs once set up
4. ✅ Keep calendars public if used for embedding
5. ✅ Test after any Google Calendar settings changes

---

**Created:** April 8, 2026  
**Issue:** Calendar not displaying  
**Status:** Awaiting fix (make calendar public)  
**Estimated Fix Time:** 15 minutes  
**Success Rate:** 90% (if calendar is made public)

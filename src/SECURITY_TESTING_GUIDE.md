# 🧪 Security Testing Guide

Quick guide to test the new security improvements on your Berkeley Lions Club website.

---

## ✅ Test 1: Email Addresses Work

**What to Test:** Email links are correct

**Steps:**
1. Visit each page with email contact info:
   - Contact Us page
   - Join page  
   - Volunteer page
2. Click on email links
3. Verify your email client opens with: `lionsberkeley@gmail.com`

**Expected Result:** ✅ All email links work correctly

---

## ✅ Test 2: Rate Limiting Works

**What to Test:** Login attempts are limited

**Steps:**
1. Go to Admin Dashboard (`/admin` or click "Admin Login" in footer)
2. Enter **wrong password** 5 times in a row
3. Observe the error messages

**Expected Results:**
- 1st attempt: "Incorrect password. 4 attempts remaining."
- 2nd attempt: "Incorrect password. 3 attempts remaining."
- 3rd attempt: "Incorrect password. 2 attempts remaining."
- 4th attempt: "Incorrect password. 1 attempt remaining."
- 5th attempt: "Too many failed attempts. Account locked for 15 minutes."
- 6th attempt (immediate): "Too many failed attempts. Please try again in 15 minutes."

**Expected Result:** ✅ Account locks after 5 failed attempts

---

## ✅ Test 3: Successful Login After Waiting

**What to Test:** Lockout expires after 15 minutes

**Steps:**
1. After getting locked out (Test 2), wait 15 minutes
2. Try logging in with correct password: `berkeley2025`
3. Should succeed

**Note:** For quick testing, you can:
- Open browser DevTools → Console
- Run: `sessionStorage.clear()`
- This clears the lockout immediately

**Expected Result:** ✅ Can login after lockout expires

---

## ✅ Test 4: Session Auto-Logout

**What to Test:** Session expires after 30 minutes of inactivity

**Steps:**
1. Login to Admin Dashboard
2. Leave the page open without clicking anything
3. Wait 30 minutes
4. Try to navigate between tabs or click something

**Expected Result:** ✅ Automatically logged out after 30 minutes

**Quick Test (DevTools):**
```javascript
// Check session expiration time
const session = JSON.parse(sessionStorage.getItem('admin_session'));
const expiresIn = Math.floor((session.expiresAt - Date.now()) / 1000);
console.log(`Session expires in ${expiresIn} seconds`);
```

---

## ✅ Test 5: Session Clears on Browser Close

**What to Test:** Login doesn't persist across browser sessions

**Steps:**
1. Login to Admin Dashboard
2. Close the browser tab (or entire browser)
3. Reopen the website
4. Navigate to Admin Dashboard

**Expected Result:** ✅ Must login again (session cleared)

---

## ✅ Test 6: Content Security Policy

**What to Test:** Security headers are active

**Steps:**
1. Visit the deployed website (berkeleylionsclub.org)
2. Open DevTools → Network tab
3. Refresh the page
4. Click on the main document request
5. Go to "Headers" tab
6. Scroll to "Response Headers"

**Expected Headers:**
- ✅ `Content-Security-Policy: default-src 'self'...`
- ✅ `X-Frame-Options: DENY`
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-XSS-Protection: 1; mode=block`
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`

**Expected Result:** ✅ All security headers present

---

## ✅ Test 7: Session Activity Extension

**What to Test:** Session extends when user is active

**Steps:**
1. Login to Admin Dashboard
2. Open DevTools → Console
3. Run this code to check expiration:
```javascript
setInterval(() => {
  const session = JSON.parse(sessionStorage.getItem('admin_session'));
  if (session) {
    const expiresIn = Math.floor((session.expiresAt - Date.now()) / 1000 / 60);
    console.log(`Session expires in ${expiresIn} minutes`);
  }
}, 5000); // Check every 5 seconds
```
4. Click around the dashboard (change tabs, etc.)
5. Watch the console - expiration time should stay around 30 minutes

**Expected Result:** ✅ Session auto-extends on activity

---

## ✅ Test 8: Logout Clears Session

**What to Test:** Logout button works properly

**Steps:**
1. Login to Admin Dashboard
2. Click "Logout" button (top right)
3. Try to go back (browser back button)

**Expected Result:** ✅ Redirected to login screen

---

## 🔧 DevTools Commands for Testing

### Check if session exists:
```javascript
sessionStorage.getItem('admin_session')
```

### Check lockout status:
```javascript
sessionStorage.getItem('admin_attempts')
```

### Clear lockout (for testing):
```javascript
sessionStorage.clear()
```

### Force logout:
```javascript
sessionStorage.removeItem('admin_session')
location.reload()
```

### Check session info:
```javascript
const session = JSON.parse(sessionStorage.getItem('admin_session'));
console.log('Authenticated:', session.authenticated);
console.log('Created:', new Date(session.timestamp));
console.log('Expires:', new Date(session.expiresAt));
console.log('Minutes remaining:', Math.floor((session.expiresAt - Date.now()) / 1000 / 60));
```

---

## 🚨 Common Issues & Solutions

### Issue: "Can't login even with correct password"
**Solution:** 
- Clear lockout: `sessionStorage.clear()`
- Wait 15 minutes
- Try again

### Issue: "Session expired too quickly"
**Solution:**
- Make sure you're clicking around (session extends on activity)
- Session timeout is 30 minutes of inactivity

### Issue: "Headers not showing in DevTools"
**Solution:**
- Make sure you're testing the DEPLOYED site (berkeleylionsclub.org)
- Headers are set by Cloudflare, not localhost
- Check in Network tab → Document → Response Headers

### Issue: "Email links don't work"
**Solution:**
- Make sure you have an email client configured
- Check browser console for errors
- Try copying the email address manually

---

## 📊 Security Checklist

Before deploying to production:

- [ ] Email addresses tested (all work)
- [ ] Rate limiting tested (lockout after 5 attempts)
- [ ] Lockout duration tested (15 minutes)
- [ ] Session timeout tested (30 minutes)
- [ ] Logout tested (session clears)
- [ ] Browser close tested (session doesn't persist)
- [ ] Security headers verified (CSP, X-Frame-Options, etc.)
- [ ] All admin functions work while logged in
- [ ] No console errors

---

## 🎯 Production Deployment

When deploying these changes to Cloudflare Pages:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Cloudflare Pages:**
   - Commit and push to GitHub
   - Cloudflare auto-deploys
   - OR use Cloudflare dashboard to deploy

3. **Verify headers:**
   - Visit berkeleylionsclub.org
   - Check Network tab → Response Headers
   - Confirm CSP and security headers present

4. **Test authentication:**
   - Try logging in with wrong password 5 times
   - Verify lockout works
   - Login with correct password
   - Test session timeout

5. **Clear caches:**
   - Clear Cloudflare cache
   - Clear browser cache
   - Test from incognito window

---

## 📞 Need Help?

If you encounter issues:

1. Check browser console for errors
2. Verify you're testing the deployed site
3. Try clearing all browser data
4. Test in incognito/private mode
5. Contact webmaster if issues persist

---

**Last Updated:** April 8, 2026  
**Website:** berkeleylionsclub.org

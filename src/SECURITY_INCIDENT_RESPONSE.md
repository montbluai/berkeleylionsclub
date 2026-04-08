# 🚨 Security Incident Response Plan

**Berkeley Lions Club Website**  
**Last Updated:** April 8, 2026

---

## 🆘 What is a Security Incident?

A security incident includes:

- ❌ Unauthorized access to admin dashboard
- ❌ Unexpected changes to website content
- ❌ Strange photos appearing in gallery
- ❌ Modified event information
- ❌ Unknown leadership names added
- ❌ Website defaced or displaying wrong content
- ❌ Admin password no longer works
- ❌ Suspicious login attempts
- ❌ Data breach or leak
- ❌ Website completely down or redirecting

---

## 🚨 IMMEDIATE ACTIONS (First 5 Minutes)

### Step 1: STOP & ASSESS
**DO NOT PANIC. Follow this checklist:**

- [ ] Is the website still accessible?
- [ ] Can you still access admin dashboard?
- [ ] What specifically looks wrong?
- [ ] When did you first notice the issue?
- [ ] Who else has admin access?

### Step 2: DOCUMENT EVERYTHING
**Take screenshots immediately:**

- [ ] Screenshot the suspicious content
- [ ] Screenshot any error messages
- [ ] Note the exact time you discovered it
- [ ] Write down what you were doing when you noticed

### Step 3: CONTACT WEBMASTER
**Email:** lionsberkeley@gmail.com  
**Subject:** `SECURITY INCIDENT - [Brief Description]`

**Include in email:**
```
URGENT: Security Incident Report

Date/Time Discovered: [e.g., April 8, 2026 at 2:30 PM]
Discovered By: [Your Name]

What Happened:
[Describe what you saw that was wrong]

Screenshots:
[Attach screenshots]

Recent Changes:
[List any admin changes you made in last 24 hours]

Who Has Access:
[List anyone you shared the password with]
```

---

## 🔒 CONTAINMENT (Next 15 Minutes)

### If You Can Still Access Admin:

**Option A: Change the Password**
1. Login to admin dashboard
2. Unfortunately, we don't have a "Change Password" feature yet
3. **Temporary fix:** Contact all board members to stop using admin
4. Schedule emergency meeting to implement password change

**Option B: Lock Down Content**
1. Login to admin dashboard
2. Review recent changes:
   - Check Gallery photos (delete suspicious ones)
   - Check Events calendar (verify all events are legitimate)
   - Check Leadership roster (remove unknown names)
3. Take screenshots of ALL current content
4. Document what you removed/changed

### If You CANNOT Access Admin:

**This means someone changed the password:**

1. 🚨 **CRITICAL:** Contact webmaster immediately
2. Do NOT attempt to login repeatedly (will trigger lockout)
3. Contact Cloudflare support if needed
4. Prepare to restore from backup

---

## 🔍 INVESTIGATION (Next Hour)

### Review Admin Access Logs

**Check Browser History:**
1. Who logged into admin recently?
2. What times?
3. What browsers/devices?

**Check Email:**
1. Any suspicious password reset emails?
2. Any emails claiming to be from "Berkeley Lions Admin"?
3. Any links you clicked recently?

### Common Attack Vectors:

**1. Password Sharing**
- Did you share password via email/text?
- Did you write it down somewhere?
- Did you use the password on other websites?

**2. Phishing**
- Did you receive any suspicious emails?
- Did you click any links asking for the password?
- Did you login from a suspicious website?

**3. Public WiFi**
- Did you use admin access on public WiFi?
- Coffee shop, library, airport?
- Someone may have intercepted your session

**4. Compromised Device**
- Is your computer showing strange behavior?
- Unexpected pop-ups or slowness?
- Antivirus warnings?

---

## 🛠️ REMEDIATION STEPS

### 1. Change Admin Password (When Feature Available)

**Choose a Strong Password:**
- ✅ At least 16 characters
- ✅ Mix of upper and lowercase
- ✅ Numbers and symbols
- ✅ Not related to "Berkeley" or "Lions"
- ✅ Not used anywhere else

**Example:** `7k#mP9$nX2!qL5@hR8`

### 2. Review All Content

**Check these areas:**
- [ ] Photo Gallery - remove any inappropriate/unknown photos
- [ ] Events Calendar - verify all events are legitimate
- [ ] Club Leadership - confirm all names are current members
- [ ] Contact information - verify phone/email correct
- [ ] Donation links - ensure they go to correct payment processor

### 3. Notify Affected Parties

**Who to notify:**
- [ ] All board members
- [ ] Club president
- [ ] Members if data was exposed
- [ ] Donors if payment info affected
- [ ] Webmaster/IT support

### 4. Run Security Scan

**On Your Computer:**
```
1. Run full antivirus scan
2. Check for malware/spyware
3. Update all software
4. Change passwords on other sites
5. Enable 2FA where possible
```

---

## 📋 RECOVERY CHECKLIST

### Immediate (Same Day):
- [ ] Document the incident completely
- [ ] Contact webmaster
- [ ] Change admin password (if possible)
- [ ] Review and fix any malicious changes
- [ ] Notify all admin users
- [ ] Run antivirus scan

### Short Term (This Week):
- [ ] Review all admin access in past 30 days
- [ ] Implement new password policy
- [ ] Security awareness training for board members
- [ ] Review and update this response plan
- [ ] Consider implementing 2FA

### Long Term (This Month):
- [ ] Migrate to proper backend authentication (Supabase)
- [ ] Implement audit logging
- [ ] Set up security monitoring
- [ ] Regular security audits
- [ ] Backup verification

---

## 🔐 PREVENTION (Going Forward)

### Password Security:

**DO:**
- ✅ Use a password manager (1Password, LastPass, Bitwarden)
- ✅ Change password every 90 days
- ✅ Use unique password (not used elsewhere)
- ✅ Share password securely (in person only)
- ✅ Use private/incognito mode for admin access

**DON'T:**
- ❌ Email or text the password
- ❌ Write password on paper
- ❌ Share with non-board members
- ❌ Use password on public WiFi
- ❌ Save password in browser

### Access Control:

**Best Practices:**
- ✅ Always logout after admin tasks
- ✅ Close browser when done
- ✅ Don't leave computer unattended while logged in
- ✅ Use admin access only when necessary
- ✅ Review changes made by others

### Device Security:

**Keep Secure:**
- ✅ Keep OS and browser updated
- ✅ Use antivirus software
- ✅ Enable firewall
- ✅ Don't click suspicious links
- ✅ Verify URLs before entering passwords

---

## 📞 EMERGENCY CONTACTS

### Website Issues:
**Email:** lionsberkeley@gmail.com  
**Subject:** `URGENT: Security Incident`

### Cloudflare Support:
**Login:** https://dash.cloudflare.com  
**Support:** https://support.cloudflare.com

### Domain Registrar:
**Check your domain settings for registrar contact**

### Payment Processor (Square):
**If donation links compromised:**
- Login to Square dashboard
- Contact Square support immediately
- Review recent transactions

---

## 📊 INCIDENT SEVERITY LEVELS

### 🟢 LOW SEVERITY
**Examples:**
- Typo in content
- Broken image link
- Minor formatting issue

**Response Time:** 24-48 hours  
**Action:** Fix during normal maintenance

### 🟡 MEDIUM SEVERITY
**Examples:**
- Unauthorized but harmless changes
- One suspicious photo
- Minor data exposure

**Response Time:** 4 hours  
**Action:** Investigate, fix, and change password

### 🔴 HIGH SEVERITY
**Examples:**
- Website defaced
- Multiple unauthorized changes
- Admin password changed by attacker
- Payment links redirected

**Response Time:** Immediate (within 1 hour)  
**Action:** Follow full incident response plan

### ⚫ CRITICAL SEVERITY
**Examples:**
- Data breach (member info exposed)
- Malware distributed
- Donation fraud
- Complete site takeover

**Response Time:** Immediate (within 15 minutes)  
**Action:** 
1. Take site offline if necessary
2. Contact all affected parties
3. Contact law enforcement if criminal
4. Engage cybersecurity professional

---

## 📝 INCIDENT REPORT TEMPLATE

**Copy this template for documenting incidents:**

```
BERKELEY LIONS CLUB - SECURITY INCIDENT REPORT
=============================================

Incident ID: BLC-2026-[Number]
Date Discovered: [Date and Time]
Discovered By: [Name]
Severity Level: [Low/Medium/High/Critical]

WHAT HAPPENED:
--------------
[Detailed description of what you observed]


WHEN IT HAPPENED:
-----------------
First Noticed: [Date/Time]
Estimated Start: [Date/Time if different]
Duration: [How long it lasted]


WHO WAS AFFECTED:
-----------------
[ ] Website visitors
[ ] Club members
[ ] Donors
[ ] Admin users
[ ] None


WHAT WAS COMPROMISED:
---------------------
[ ] Admin access
[ ] Gallery photos
[ ] Event information
[ ] Leadership roster
[ ] Contact information
[ ] Payment/donation links
[ ] Member data
[ ] Other: ___________


ACTIONS TAKEN:
--------------
1. [First action and time]
2. [Second action and time]
3. [etc.]


ROOT CAUSE (if known):
----------------------
[ ] Password compromise
[ ] Phishing attack
[ ] Public WiFi
[ ] Shared password
[ ] Software vulnerability
[ ] Unknown
[ ] Other: ___________


LESSONS LEARNED:
----------------
[What could prevent this in the future?]


FOLLOW-UP REQUIRED:
-------------------
[ ] Password change
[ ] Security training
[ ] Policy update
[ ] Technical changes
[ ] Other: ___________


REPORT COMPLETED BY:
--------------------
Name: ___________
Date: ___________
Signature: ___________
```

---

## 🎓 SECURITY AWARENESS TRAINING

### For All Board Members:

**Monthly Security Tips:**
1. Never share passwords via email or text
2. Always logout after admin tasks
3. Don't use public WiFi for admin access
4. Report suspicious activity immediately
5. Keep your devices secure and updated

**Quarterly Review:**
- Review this incident response plan
- Test the emergency contact list
- Practice incident reporting
- Update passwords
- Review recent security news

**Annual Training:**
- Comprehensive security workshop
- Password manager training
- Phishing awareness
- Device security
- Incident response drill

---

## 📚 ADDITIONAL RESOURCES

**Security Best Practices:**
- [OWASP Security Guidelines](https://owasp.org)
- [Google Security Checklist](https://www.google.com/safetycenter)
- [FTC Cybersecurity for Small Business](https://www.ftc.gov/tips-advice/business-center/small-businesses/cybersecurity)

**Password Managers:**
- [1Password](https://1password.com)
- [LastPass](https://www.lastpass.com)
- [Bitwarden](https://bitwarden.com) (Free & Open Source)

**Reporting Cybercrime:**
- FBI Internet Crime Complaint Center: https://www.ic3.gov
- Local law enforcement if financial loss

---

**This plan should be:**
- ✅ Printed and kept in emergency binder
- ✅ Reviewed quarterly by all board members
- ✅ Updated after each incident
- ✅ Tested annually with mock incident

**Last Updated:** April 8, 2026  
**Next Review Date:** July 8, 2026  
**Plan Owner:** Berkeley Lions Club Board

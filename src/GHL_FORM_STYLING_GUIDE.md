# GoHighLevel Form Styling Guide
## Berkeley Lions Club Brand Standards

This guide will help you style your GHL forms to match your beautiful Figma designs perfectly.

---

## 🎨 Brand Colors

Use these exact colors in GHL:

- **Lions Blue (Primary):** `#1740a5`
- **Lions Yellow/Gold (Accent):** `#f2ca47`
- **Purple (Tertiary):** `#7A2582`
- **White:** `#ffffff`
- **Gray Text:** `#4b5563` (for body text)
- **Light Gray:** `#e5e7eb` (for borders)

---

## 📋 Form 1: Newsletter Signup

### **GHL Form Setup:**

**Form Name:** Newsletter Signup  
**Fields:**
1. Name (Text field - Required)
2. Email (Email field - Required)

### **GHL Styling Settings:**

#### **Form Container:**
- Background: `#ffffff` (white)
- Border Radius: `8px`
- Padding: `32px`
- Max Width: `100%`
- Box Shadow: None (already handled by wrapper)

#### **Input Fields:**
- **Border:** `1px solid #e5e7eb`
- **Border Radius:** `6px`
- **Padding:** `12px 16px`
- **Font Size:** `18px`
- **Height:** `48px`
- **Background:** `#ffffff`
- **Text Color:** `#1f2937`
- **Placeholder Color:** `#9ca3af`

**Placeholder Text:**
- Name field: "Your Name"
- Email field: "Your Email Address"

#### **Submit Button:**
- **Background Color:** `#f2ca47` (Lions Yellow)
- **Text Color:** `#1740a5` (Lions Blue)
- **Font Size:** `18px`
- **Font Weight:** `600` (Semi-bold)
- **Padding:** `16px 24px`
- **Border Radius:** `6px`
- **Width:** `100%`
- **Height:** `56px`
- **Button Text:** "Subscribe to Monthly Updates"
- **Hover Effect:** Opacity 90%

#### **Labels:**
- **Display:** Hide labels (use placeholders instead)
- OR if showing labels:
  - Color: `#1740a5`
  - Font Size: `14px`
  - Font Weight: `600`

#### **Success Message:**
- Background: `#f0fdf4` (light green)
- Text Color: `#15803d`
- Border: `1px solid #86efac`
- Border Radius: `6px`
- Padding: `16px`
- Message: "Thank you for subscribing!"

#### **Error Message:**
- Text Color: `#dc2626` (red)
- Font Size: `14px`

---

## 📋 Form 2: Volunteer Signup

**Location:** `/components/Volunteer.tsx` (line ~70 inside the white card)

### **GHL Form Setup:**

**Form Name:** Volunteer Signup  
**Fields:**
1. Full Name (Text - Required)
2. Email Address (Email - Required)
3. Phone Number (Phone - Required)
4. Select Event (Dropdown - Required)
   - Options:
     - "Crab Feed 2026 - Feb 7"
     - "Future Events (I'll help when available)"
5. Additional Information (Textarea - Optional)

### **GHL Styling Settings:**

#### **Input Fields:**
- Same as Newsletter form above
- **Spacing between fields:** `24px`

#### **Dropdown:**
- Same styling as input fields
- **Arrow Color:** `#1740a5`

#### **Textarea:**
- **Height:** `120px`
- **Resize:** None
- **Border:** `1px solid #e5e7eb`
- **Border Radius:** `6px`
- **Padding:** `12px 16px`
- **Placeholder:** "Any special skills, time preferences, or questions?"

#### **Submit Button:**
- **Background:** `#1740a5` (Lions Blue)
- **Text Color:** `#ffffff` (White)
- **Button Text:** "Submit Volunteer Registration"
- All other settings same as Newsletter button

---

## 📋 Form 3: Membership Application (Join Us)

**Location:** `/components/Join.tsx` (line ~81 inside the white card)

### **GHL Form Setup:**

**Form Name:** Membership Application  
**Fields:**
1. First Name (Text - Required)
2. Last Name (Text - Required)
3. Email Address (Email - Required)
4. Phone Number (Phone - Optional)
5. Why do you want to join? (Textarea - Optional)

### **GHL Styling Settings:**

#### **Two-Column Layout:**
For First Name and Last Name:
- Display: Side by side on desktop
- Stack on mobile
- Gap: `16px`

#### **Input Fields:**
- Same styling as previous forms
- **Icon Color (if using):** `#9ca3af`

#### **Placeholders:**
- First Name: "John"
- Last Name: "Smith"
- Email: "john.smith@email.com"
- Phone: "(555) 123-4567"
- Textarea: "Tell us what inspired you to join the Lions..."

#### **Submit Button:**
- **Background:** `#1740a5`
- **Text Color:** `#ffffff`
- **Button Text:** "Submit My Interest"

---

## 📋 Form 4: Contact Form

**Location:** `/components/ContactUs.tsx` (line ~52 inside the white card)

### **GHL Form Setup:**

**Form Name:** Contact Form  
**Fields:**
1. Name (Text - Required)
2. Email (Email - Required)
3. Subject (Text - Required)
4. Message (Textarea - Required)

### **GHL Styling Settings:**

#### **Input Fields:**
- Same as previous forms

#### **Placeholders:**
- Name: "Your name"
- Email: "your.email@example.com"
- Subject: "What is this regarding?"
- Message: "Tell us how we can help..."

#### **Textarea:**
- **Height:** `150px`
- **Min Height:** `150px`

#### **Submit Button:**
- **Background:** `#1740a5`
- **Text Color:** `#ffffff`
- **Button Text:** "Send Message"
- **Icon (optional):** Send/paper plane icon

---

## 📋 Form 5: Donation Form

**Location:** `/components/Donate.tsx` (line ~158)

### **GHL Form Setup:**

**Form Name:** Donation Form  
**Fields:**
1. Donation Amount (Custom field or Radio buttons)
   - $25
   - $50
   - $100
   - $250
   - $500
   - Custom Amount
2. Full Name (Text - Required)
3. Email Address (Text - Required)
4. Mailing Address (Text - Optional)

### **GHL Styling Settings:**

#### **Amount Selection (Radio Buttons):**
- **Layout:** 3 columns grid
- **Button Style:** Outline on unselected, filled on selected
- **Unselected:**
  - Border: `2px solid #d1d5db`
  - Background: `#ffffff`
  - Text Color: `#1740a5`
- **Selected:**
  - Border: `2px solid #1740a5`
  - Background: `#1740a5`
  - Text Color: `#ffffff`
- **Height:** `48px`
- **Border Radius:** `8px`

#### **Custom Amount Input:**
- **Prefix:** $ symbol
- Same styling as other inputs

#### **Submit Button:**
- **Background:** `#f2ca47` (Lions Yellow)
- **Text Color:** `#1740a5` (Lions Blue)
- **Button Text:** "Complete Donation"
- **Icon:** Heart icon (optional)

---

## 🎯 Universal GHL Form Settings

Apply these to ALL forms:

### **Typography:**
- **Font Family:** System default (Arial, Helvetica, sans-serif)
- **Input Text Size:** `16px` - `18px`
- **Button Text Size:** `18px`
- **Label Text Size:** `14px`

### **Spacing:**
- **Between fields:** `24px`
- **Field padding:** `12px 16px`
- **Form padding:** `32px`

### **Focus States:**
- **Border Color:** `#1740a5`
- **Outline:** `2px solid #1740a5`
- **Outline Offset:** `2px`

### **Required Field Indicator:**
- **Color:** `#dc2626` (red)
- **Symbol:** *
- **Position:** After label text

### **Mobile Responsiveness:**
- **Breakpoint:** 768px
- **Mobile Padding:** `24px 16px`
- **Button:** Full width
- **Font sizes:** Slightly smaller on mobile (16px inputs, 16px buttons)

---

## 📝 Custom CSS Override (If Needed)

If GHL doesn't let you customize everything, you can add this custom CSS in GHL's form settings:

```css
/* Input Fields */
.ghl-input,
.ghl-textarea,
.ghl-select {
  border: 1px solid #e5e7eb !important;
  border-radius: 6px !important;
  padding: 12px 16px !important;
  font-size: 18px !important;
  color: #1f2937 !important;
  background: #ffffff !important;
}

.ghl-input:focus,
.ghl-textarea:focus,
.ghl-select:focus {
  border-color: #1740a5 !important;
  outline: 2px solid #1740a5 !important;
  outline-offset: 2px !important;
}

/* Placeholder */
.ghl-input::placeholder,
.ghl-textarea::placeholder {
  color: #9ca3af !important;
}

/* Labels */
.ghl-label {
  color: #1740a5 !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  margin-bottom: 8px !important;
}

/* Submit Button - Newsletter */
.ghl-submit-newsletter {
  background-color: #f2ca47 !important;
  color: #1740a5 !important;
  font-size: 18px !important;
  font-weight: 600 !important;
  padding: 16px 24px !important;
  border-radius: 6px !important;
  border: none !important;
  width: 100% !important;
  height: 56px !important;
  cursor: pointer !important;
}

.ghl-submit-newsletter:hover {
  opacity: 0.9 !important;
}

/* Submit Button - Other Forms */
.ghl-submit-primary {
  background-color: #1740a5 !important;
  color: #ffffff !important;
  font-size: 18px !important;
  font-weight: 600 !important;
  padding: 16px 24px !important;
  border-radius: 6px !important;
  border: none !important;
  width: 100% !important;
  cursor: pointer !important;
}

.ghl-submit-primary:hover {
  opacity: 0.9 !important;
}

/* Error Messages */
.ghl-error {
  color: #dc2626 !important;
  font-size: 14px !important;
  margin-top: 4px !important;
}

/* Success Messages */
.ghl-success {
  background-color: #f0fdf4 !important;
  color: #15803d !important;
  border: 1px solid #86efac !important;
  border-radius: 6px !important;
  padding: 16px !important;
}
```

---

## 🔧 How to Embed GHL Forms

### **Step 1: Create Form in GHL**
1. Go to Sites → Forms
2. Click "Create Form"
3. Add fields as specified above
4. Style using the settings in this guide

### **Step 2: Get Embed Code**
1. Click on your form
2. Go to Settings → Embed
3. Choose "Embed Code" (not iframe if possible)
4. Copy the code snippet

### **Step 3: Add to Your Website**

The embed code will look something like:
```html
<script src="https://app.gohighlevel.com/form/xxxxx.js"></script>
```

OR

```html
<iframe src="https://app.gohighlevel.com/form/xxxxx" width="100%" height="500px"></iframe>
```

### **Step 4: Paste into Component**

For Newsletter form (`/components/EmailSignup.tsx`):
- Find the comment that says `TODO: REPLACE THIS COMMENT WITH YOUR GHL FORM EMBED CODE`
- Delete the placeholder div
- Paste your GHL embed code
- Remove the temporary placeholder

**Example:**
```tsx
<div className="bg-white rounded-lg p-6 md:p-8">
  {/* Paste GHL form embed code here */}
  <script src="https://app.gohighlevel.com/form/YOUR_FORM_ID.js"></script>
  
  <p className="text-sm text-gray-600 mt-4">
    We respect your privacy. Unsubscribe at any time.
  </p>
</div>
```

---

## ✅ Testing Checklist

After embedding each form, test:

- [ ] Form displays correctly on desktop
- [ ] Form displays correctly on mobile
- [ ] All fields are properly styled
- [ ] Button colors match brand (Blue or Yellow)
- [ ] Placeholder text is correct
- [ ] Required field validation works
- [ ] Success message appears after submission
- [ ] Data appears in GHL contacts
- [ ] Email automations trigger (if configured)

---

## 🎨 Design Consistency Tips

1. **Keep the wrapper** - Don't remove the white rounded box from Figma components
2. **Minimal GHL branding** - Turn off "Powered by GHL" in form settings
3. **Match spacing** - Ensure GHL form padding matches your design
4. **Test thoroughly** - Check on different devices and browsers
5. **Use previews** - Preview in GHL before embedding

---

## 📞 Need Help?

- **GHL Form Builder:** Check GHL documentation or support
- **Custom CSS:** May require GHL's higher-tier plans
- **Advanced styling:** Contact GHL support for CSS customization options

---

## 🎉 Summary

You now have specifications for all 5 forms:
1. ✅ Newsletter Signup (updated in code)
2. ⏳ Volunteer Signup (ready to embed)
3. ⏳ Membership Application (ready to embed)
4. ⏳ Contact Form (ready to embed)
5. ⏳ Donation Form (ready to embed)

Start with the Newsletter form, get it looking perfect, then replicate the process for the other 4 forms!

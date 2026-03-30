# 🗂️ ADMIN DASHBOARD STRUCTURE

## Component Architecture

```
AdminDashboard.tsx (Main Component)
│
├── Login Screen (if not authenticated)
│   ├── Berkeley Lions Logo
│   ├── Password Input Field
│   └── Login Button
│
└── Dashboard Interface (after login)
    │
    ├── Header (sticky top)
    │   ├── Logo + "Admin Dashboard" title
    │   └── Logout Button
    │
    ├── Tab Navigation
    │   ├── 📸 Photo Gallery Tab
    │   └── 📅 Featured Events Tab
    │
    └── Tab Content Area
        │
        ├── When "Photo Gallery" active:
        │   └── <GalleryManagementContent />
        │       ├── Upload Status Messages
        │       ├── Upload New Photo Form
        │       │   ├── Drag & Drop Image Area
        │       │   ├── Caption Input
        │       │   └── Category Dropdown
        │       └── Existing Photos Grid
        │           └── Each photo has delete button
        │
        └── When "Featured Events" active:
            └── <EventManagementContent />
                ├── Upload Status Messages
                ├── Add New Event Form
                │   ├── Event Poster Upload
                │   ├── Event Name
                │   ├── Event Description
                │   ├── Date & Time
                │   ├── Location Details
                │   ├── Volunteer Requirements
                │   ├── Tasks List (multi-line)
                │   ├── Pricing Options
                │   ├── Square Payment Link
                │   ├── To-Go Checkbox
                │   └── Additional Info
                └── Existing Events List
                    └── Each event has delete button
```

## File Organization

```
/components/
├── AdminDashboard.tsx          ← Main unified dashboard (login + tabs)
├── GalleryManagementContent.tsx ← Photo management (content only)
├── EventManagementContent.tsx   ← Event management (content only)
├── AdminGalleryUpload.tsx      ← Legacy standalone (backup)
├── AdminEventUpload.tsx        ← Legacy standalone (backup)
└── ui/
    └── button.tsx              ← Reusable button component

/
├── App.tsx                      ← Routes 'admin-upload' to AdminDashboard
├── ADMIN_ACCESS_GUIDE.md       ← Board member instructions
└── UNIFIED_DASHBOARD_SUMMARY.md ← Technical documentation
```

## Access Flow

```
User Journey:
══════════════

1. berkeleylionsclub.org
   ↓
2. Scroll to footer
   ↓
3. Click "Admin Login"
   ↓
4. Hash changes to #admin-upload
   ↓
5. App.tsx routes to <AdminDashboard />
   ↓
6. See login screen (if not authenticated)
   ↓
7. Enter password: berkeley2025
   ↓
8. State changes: isAuthenticated = true
   ↓
9. Dashboard renders with 2 tabs
   ↓
10. Default: Photo Gallery tab active
    ↓
11. Click "Featured Events" to switch tabs
    ↓
12. Click "Logout" to return to login screen
```

## Data Flow

### Photo Gallery:
```
User uploads photo
    ↓
Upload to Imgur (public image host)
    ↓
Get image URL from Imgur
    ↓
Check if GHL is configured
    ├─ Yes → Create GHL Opportunity (save to CRM)
    └─ No → Save to localStorage (browser storage)
    ↓
Fetch all photos from GHL or localStorage
    ↓
Display in grid with delete buttons
    ↓
Changes appear on public Photo Gallery page
```

### Featured Events:
```
User creates event
    ↓
Upload poster image to Supabase Storage
    ↓
Get public URL for image
    ↓
Parse volunteer tasks (split by newlines)
    ↓
Insert event data into Supabase 'featured_events' table
    ↓
Fetch all events ordered by date
    ↓
Display with past events marked
    ↓
Volunteer page queries Supabase for next upcoming event
    ↓
Only future events shown on public site
```

## State Management

### AdminDashboard Component State:
```typescript
{
  isAuthenticated: boolean,    // Controls login vs dashboard view
  password: string,             // Password input value
  passwordError: string,        // Error message for wrong password
  activeTab: 'gallery' | 'events' // Which tab is currently active
}
```

### GalleryManagementContent State:
```typescript
{
  formData: {
    caption: string,
    category: string,
    imageFile: File | null
  },
  previewUrl: string,
  uploading: boolean,
  uploadStatus: { type, message },
  existingPhotos: GalleryPhoto[],
  loadingPhotos: boolean,
  deletingId: string | null
}
```

### EventManagementContent State:
```typescript
{
  formData: {
    event_name: string,
    event_description: string,
    event_date: string,
    event_time: string,
    location_name: string,
    location_address: string,
    volunteers_needed: string,
    age_requirements: string,
    volunteer_tasks: string,
    ticket_price: string,
    is_free: boolean,
    square_payment_link: string,
    additional_info: string,
    to_go_available: boolean,
    imageFile: File | null
  },
  previewUrl: string,
  uploading: boolean,
  uploadStatus: { type, message },
  existingEvents: FeaturedEvent[],
  loadingEvents: boolean,
  deletingId: string | null
}
```

## Security

```
Password Protection:
═══════════════════
- Hardcoded password in component (client-side only)
- Password: "berkeley2025"
- No server validation (front-end only security)
- Session persists until logout or browser close
- No password stored in browser storage
- Suitable for low-risk admin tasks

Note: For production with sensitive data, implement:
- Server-side authentication
- JWT tokens
- Role-based access control
- Password hashing
- Rate limiting
```

## Responsive Design

```
Desktop (>768px):
- Two-column forms where appropriate
- Larger images and previews
- Side-by-side event cards

Tablet (768px - 1024px):
- Stacked form fields
- Medium-sized images
- Single-column event cards

Mobile (<768px):
- Full-width forms
- Optimized touch targets
- Scrollable tabs
- Compressed event cards
- Smaller image previews
```

## Color Scheme

```
Lions Blue:   #00338D → #1740a5 (adjusted for better contrast)
Lions Yellow: #EBB700 → #f2ca47 (adjusted for better contrast)
Lions Purple: #7A2582

Usage:
- Primary CTA buttons: Lions Blue
- Highlights/accents: Lions Yellow
- Success messages: Green
- Error messages: Red
- Neutral UI: Gray scale
```

## Future Enhancement Ideas

```
Possible additions to dashboard:

1. 📰 Newsletter Management Tab
   - Create/send email newsletters
   - Manage subscriber list
   - Email templates

2. 👥 Member Directory Tab
   - View membership roster
   - Export contact lists
   - Member status tracking

3. 📊 Analytics Tab
   - Page view statistics
   - Form submission tracking
   - Event signup metrics

4. 💰 Donation Reports Tab
   - View donation history
   - Generate reports
   - Tax receipt generation

5. 📅 Calendar Management Tab
   - Full event calendar
   - Meeting schedules
   - Board meeting notes

To add any of these:
- Create new ContentComponent.tsx
- Add tab button in AdminDashboard
- Add routing logic
- Done!
```

## Testing Guide

```
Test Scenarios:
═══════════════

✅ Login Flow:
   - Try wrong password → should show error
   - Try correct password → should show dashboard
   - Refresh page → should stay logged in (until browser close)

✅ Photo Gallery Tab:
   - Upload new photo → should appear in grid
   - Delete photo → should show confirmation → should remove from grid
   - Switch to Events tab and back → photo grid should persist

✅ Featured Events Tab:
   - Create new event → should appear in list
   - Create past event → should show "(Past Event)" label
   - Delete event → should show confirmation → should remove from list
   - Switch to Gallery tab and back → event list should persist

✅ Navigation:
   - Tab switching should be instant
   - Logout should clear session and return to login
   - Footer link from any page should work

✅ Mobile:
   - Forms should be scrollable
   - Tabs should be tappable
   - Images should be responsive
```

This unified dashboard provides a professional, scalable admin interface for the Berkeley Lions Club website! 🎉

# Berkeley Lions Club Website 🦁

Official website for the Berkeley Lions Club - serving the Berkeley community with pride.

## 🌐 Live Site
- **Production**: [berkeleylionsclub.org](https://berkeleylionsclub.org)

## 🎨 Brand Colors
- **Lions Blue**: `#00338D` - Primary text and buttons
- **Lions Yellow**: `#EBB700` - Accents and highlights
- **Purple**: `#7A2582` - Lions Club International color

## ✨ Features
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ 8 complete pages (Home, About, Join, Volunteer, Donate, Contact, Privacy, Terms)
- ✅ Photo gallery with slideshow
- ✅ 5 integrated GoHighLevel (GHL) forms
- ✅ Square donation widget
- ✅ Email newsletter signup
- ✅ Social media links
- ✅ WCAG 2.1 Level AA accessibility compliant (100/100)
- ✅ ADA compliant

## 🛠️ Technology Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + Shadcn/ui
- **Icons**: Lucide React
- **Forms**: GoHighLevel (CRM)
- **Payments**: Square
- **Hosting**: Cloudflare Pages
- **CDN**: Cloudflare Global Network

## 📁 Project Structure
```
berkeley-lions-club/
├── components/          # React components
│   ├── Home.tsx        # Homepage with slideshow
│   ├── About.tsx       # About us page
│   ├── Join.tsx        # Membership application
│   ├── Volunteer.tsx   # Volunteer signup
│   ├── Donate.tsx      # Donation page
│   ├── ContactUs.tsx   # Contact form
│   ├── PhotoGallery.tsx # Photo gallery
│   ├── Navigation.tsx  # Header navigation
│   ├── Footer.tsx      # Footer component
│   └── ui/            # Reusable UI components
├── styles/
│   └── globals.css    # Global styles & brand tokens
├── App.tsx            # Main app component
├── main.tsx           # React entry point
├── index.html         # HTML template
├── package.json       # Dependencies
└── vite.config.ts     # Build configuration
```

## 🚀 Deployment
See [CLOUDFLARE_DEPLOYMENT_GUIDE.md](./CLOUDFLARE_DEPLOYMENT_GUIDE.md) for complete deployment instructions.

### Quick Deploy
```bash
npm install
npm run build
```

## 📋 Pages
1. **Home** - Hero section with photo slideshow, mission statement
2. **About Us** - Club history, leadership, meeting info
3. **Join** - Membership application form (GHL)
4. **Volunteer** - Volunteer signup form (GHL)
5. **Donate** - Square donation widget
6. **Contact** - Contact form (GHL) with location info
7. **Privacy Policy** - Privacy and data handling
8. **Terms of Use** - Website terms and conditions

## 📧 Forms & Integration
All forms integrate with GoHighLevel CRM:
- Membership Application
- Volunteer Signup
- Email Newsletter
- Contact Form
- Become a Lion Form

## ♿ Accessibility
This website is fully WCAG 2.1 Level AA compliant:
- Screen reader compatible
- Keyboard navigation
- Proper ARIA labels
- High contrast ratios
- Focus indicators
- Skip navigation links

See [ACCESSIBILITY_AUDIT_REPORT.md](./ACCESSIBILITY_AUDIT_REPORT.md) for details.

## 📱 Responsive Design
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## 🔒 Security
- HTTPS/SSL encryption
- Cloudflare DDoS protection
- Web Application Firewall (WAF)
- Content Security Policy headers
- XSS protection

## 📞 Support
For questions or issues, contact the Berkeley Lions Club through the website contact form.

## 📄 License
© 2026 Berkeley Lions Club. All rights reserved.

---

**Lions Club International** - "We Serve" 🦁💙💛

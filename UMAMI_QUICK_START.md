# 🚀 Umami Analytics - Quick Start

## ✅ What's Done

Analytics is now installed on all pages:
- ✅ `index.html` - Homepage
- ✅ `portfolio.html` - Portfolio gallery
- ✅ `Framsyningar.html` - Exhibitions
- ✅ `um_meg.html` - About page
- ✅ `samband.html` - Contact page

## 📝 Next Steps (3 Minutes)

### 1. Sign Up (1 minute)
Go to: **https://cloud.umami.is/signup**
- Enter your email
- Create password
- Verify email

### 2. Add Website (1 minute)
In Umami dashboard:
- Click **"Add website"**
- Name: `Mercedis Portfolio`
- Domain: Your GitHub Pages URL
- Timezone: `Atlantic/Faroe`
- Click **"Save"**

### 3. Get Website ID (30 seconds)
After saving, you'll see:
- **Website ID**: Copy this (looks like `abc123-def456`)

### 4. Update Config (30 seconds)
1. Open: `assets/js/analytics.js`
2. Line 19: Replace `'YOUR-WEBSITE-ID-HERE'` with your ID
3. Save

Example:
```javascript
const UMAMI_WEBSITE_ID = 'abc123-def456-ghi789';
```

### 5. Deploy (1 minute)
```bash
git add .
git commit -m "Add Umami analytics"
git push
```

Wait for GitHub Pages to deploy, then visit your live site!

## 📊 View Your Analytics

Dashboard: **https://cloud.umami.is/**

You'll see:
- **Visitors** - How many people visit
- **Page views** - Which pages are popular
- **Countries** - Where visitors are from
- **Devices** - Mobile vs Desktop
- **Referrers** - How people find you

## 🔒 Privacy Features

✅ No cookies  
✅ No personal data collected  
✅ GDPR compliant  
✅ No cookie banner needed  
✅ Won't track on localhost (only live site)  

## 📚 Full Guide

For detailed instructions, see: **UMAMI_SETUP_GUIDE.md**

---

**Total setup time: ~3 minutes** ⏱️
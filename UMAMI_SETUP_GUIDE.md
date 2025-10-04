# 📊 Umami Analytics Setup Guide

## Step 1: Create Umami Cloud Account (Free)

1. **Go to**: https://cloud.umami.is/signup
2. **Sign up** with your email
3. **Verify** your email address
4. **Log in** to your dashboard

## Step 2: Add Your Website

1. In the Umami dashboard, click **"Add website"**
2. Fill in the details:
   - **Name**: `Mercedis Portfolio` (or your preferred name)
   - **Domain**: Your GitHub Pages URL (e.g., `b0ggi.github.io` or your custom domain)
   - **Timezone**: Select your timezone (e.g., `Atlantic/Faroe`)
3. Click **"Save"**

## Step 3: Get Your Tracking Code

After adding your website, you'll see:
- **Website ID**: A unique ID (looks like: `abc123-def456-ghi789`)
- **Tracking Code**: A script tag

The tracking code looks like this:
```html
<script async src="https://cloud.umami.is/script.js" data-website-id="YOUR-WEBSITE-ID"></script>
```

**Copy your Website ID** - you'll need it in the next step!

## Step 4: Add Your Website ID

1. Open the file: `assets/js/analytics.js`
2. Find line 19: `const UMAMI_WEBSITE_ID = 'YOUR-WEBSITE-ID-HERE';`
3. Replace `'YOUR-WEBSITE-ID-HERE'` with your actual Website ID
4. Save the file

Example:
```javascript
const UMAMI_WEBSITE_ID = 'abc123-def456-ghi789';
```

## Step 5: Deploy to GitHub

1. **Commit and push changes**:
   ```bash
   git add .
   git commit -m "Add Umami analytics"
   git push
   ```

2. **Wait** for GitHub Pages to deploy (1-2 minutes)
   - Check the "Actions" tab in your GitHub repository
   - Wait for the green checkmark

3. **Visit your live site** (not localhost!)

4. **Check Umami dashboard** - You should see your visit appear within seconds!

## What You'll See in Umami Dashboard

### **Overview Tab**
- **Visitors**: Total unique visitors
- **Page views**: Total page views
- **Bounce rate**: % of single-page visits
- **Average visit time**: How long people stay

### **Realtime Tab**
- See visitors on your site RIGHT NOW
- What pages they're viewing
- Live updates every few seconds

### **Pages Tab**
- Most popular pages
- Which artworks get the most views
- Entry and exit pages
- See which portfolio pieces attract most attention

### **Referrers Tab**
- Where visitors come from
- Social media, search engines, direct visits
- External links to your site

### **Countries Tab**
- Geographic distribution
- Which countries visit most
- Map visualization

### **Devices Tab**
- Desktop vs Mobile vs Tablet
- Browser types (Chrome, Safari, Firefox, etc.)
- Operating systems

### **Events Tab** (Optional)
- Track custom actions
- Button clicks, form submissions, etc.

## Privacy Features ✅

✅ **No cookies** - Doesn't use cookies at all  
✅ **No personal data** - Doesn't collect personal information  
✅ **GDPR compliant** - Respects EU privacy laws  
✅ **No cookie banner needed** - Legally compliant without banners  
✅ **Visitor anonymity** - IP addresses are anonymized  
✅ **No cross-site tracking** - Only tracks your site  
✅ **Respects Do Not Track** - Honors browser privacy settings  

## Advanced: Custom Events (Optional)

Want to track specific actions? You can add custom event tracking.

### Track Artwork Views
Add this to your artwork display code:
```javascript
if (window.umami) {
  umami.track('artwork-view', { artwork: 'Portfolio10' });
}
```

### Track Contact Form Submissions
Add this to your form submission handler:
```javascript
if (window.umami) {
  umami.track('contact-form-submit');
}
```

### Track Gallery Filter Usage
Add this when filters are used:
```javascript
if (window.umami) {
  umami.track('filter-used', { filter: 'y2024' });
}
```

Let me know if you want help implementing these!

## Troubleshooting

### Not seeing any data?

**Check:**
1. ✅ Website ID is correct in `analytics.js` (line 19)
2. ✅ Changes are pushed to GitHub
3. ✅ GitHub Pages has deployed successfully
4. ✅ You're visiting the LIVE site (not localhost)
5. ✅ Ad blockers are disabled (for testing)
6. ✅ Browser console shows no errors (press F12)

### Data delayed?

- Umami updates every few seconds
- Refresh the dashboard
- Check "Realtime" tab for instant updates

### Script not loading?

- Open browser console (F12)
- Look for `[Analytics] Umami loaded successfully` message
- Check Network tab for blocked requests
- Verify the script URL is correct

### Analytics not loading on localhost?

- This is **intentional** - analytics only work on your live site
- Prevents test visits from polluting your data
- You'll see: `[Analytics] Skipping Umami on localhost` in console

## Dashboard Access

- **URL**: https://cloud.umami.is/
- **Login**: Your email and password
- **Mobile**: Available for iOS and Android

## Free Tier Limits

Umami Cloud free tier includes:
- ✅ **Unlimited websites**
- ✅ **Unlimited page views**
- ✅ **3 team members**
- ✅ **Data retention**: 1 year
- ✅ **All features included**
- ✅ **No credit card required**

## Tips for Your Portfolio

### Track Popular Artworks
Check the "Pages" tab to see:
- Which portfolio pieces get the most views
- Which pages visitors spend the most time on
- Entry points (how people discover your site)

### Monitor Traffic Sources
Use the "Referrers" tab to:
- See which social media drives traffic
- Track effectiveness of promotions
- Identify where to focus marketing efforts

### Understand Your Audience
Use "Countries" and "Devices" tabs to:
- Know where your audience is located
- Optimize for mobile if that's your main traffic
- Plan exhibition locations based on visitor geography

### Track Conversions
Set up custom events to track:
- Contact form submissions
- Clicks on social media links
- Downloads (if you offer any)
- Exhibition page visits

## Next Steps

After setup, you can:

1. **Share dashboard**: Invite others to view analytics
2. **Set up reports**: Schedule weekly/monthly email reports
3. **Export data**: Download reports as CSV
4. **Custom events**: Track specific user actions
5. **API access**: Build custom integrations

## Support

- **Umami Docs**: https://umami.is/docs
- **Community**: https://github.com/umami-software/umami/discussions
- **Support**: support@umami.is

---

**Ready to set up?** Follow Step 1 above to create your account!
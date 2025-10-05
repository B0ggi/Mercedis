# Image Optimization Guide

## 🎯 Overview

This guide will help you optimize your portfolio images safely and reversibly. The process keeps your original images intact and creates optimized versions that are 70-90% smaller.

## 📋 Prerequisites

Make sure you have Node.js and npm installed. The required packages are already in `package.json`.

## 🚀 Step-by-Step Process

### Step 1: Optimize Images

Run this command to create optimized versions of all your portfolio images:

```bash
npm run images:optimize
```

**What this does:**
- Scans `images/portfolio/` for all images
- Creates WebP versions (75% quality, max 1200px wide)
- Saves optimized images to `images/portfolio/optimized/`
- Creates thumbnails (400x400px) in `images/portfolio/thumbs/`
- **Your original images remain untouched!**

**Expected results:**
- 3.5 MB images → 300-500 KB (90% reduction)
- Total portfolio: ~150 MB → ~20 MB
- Processing time: 2-5 minutes for 80 images

### Step 2: Switch to Optimized Images

After optimization completes, update your JSON files to use the optimized images:

```bash
npm run images:switch
```

**What this does:**
- Creates backup of all JSON files in `data/collections/backup-originals/`
- Updates image paths from `images/portfolio/xxx.jpg` to `images/portfolio/optimized/xxx.webp`
- Your original JSON files are backed up automatically

### Step 3: Test Your Website

1. Open your website locally or on your server
2. Check that all images load correctly
3. Verify image quality is acceptable
4. Test on both desktop and mobile

### Step 4a: If Everything Works ✅

Congratulations! Your website is now 70-90% faster. You can:
- Commit the changes to Git
- Deploy to your server
- Keep the original images as backup (optional)

### Step 4b: If Something Breaks ❌

No problem! Revert back to original images instantly:

```bash
npm run images:revert
```

**What this does:**
- Restores all JSON files from backup
- Your website goes back to using original images
- Nothing is lost!

## 📁 File Structure

```
images/portfolio/
├── [original images]           ← Your originals (untouched)
├── optimized/                  ← Optimized WebP versions
│   ├── Portfolio1.webp
│   ├── Portfolio2.webp
│   └── Nytt/
│       └── IMG_1234.webp
└── thumbs/                     ← Small thumbnails (400x400)
    ├── Portfolio1.webp
    └── Portfolio2.webp

data/collections/
├── 2024.json                   ← Updated to use optimized images
├── 2025.json
├── eldri.json
└── backup-originals/           ← Backup of original JSON files
    ├── 2024.json
    ├── 2025.json
    └── eldri.json
```

## 🔧 Available Commands

| Command | Description |
|---------|-------------|
| `npm run images:optimize` | Create optimized versions of all images |
| `npm run images:switch` | Update JSON files to use optimized images |
| `npm run images:revert` | Restore original image paths from backup |

## 💡 Tips

1. **Test locally first** - Run the optimization on your local machine before deploying
2. **Check image quality** - If images look too compressed, you can adjust quality in the script
3. **Keep originals** - Never delete your original images, they're your backup
4. **Git commit** - Commit changes after confirming everything works

## 🐛 Troubleshooting

### Images not loading after switch?

1. Make sure optimization completed successfully
2. Check that `images/portfolio/optimized/` folder exists
3. Verify WebP files were created
4. If issues persist, run `npm run images:revert`

### Want to adjust quality?

Edit `scripts/optimize-portfolio-images.mjs`:
- Change `FULL_SIZE_QUALITY` (default: 75) - Higher = better quality, larger files
- Change `FULL_SIZE_MAX_WIDTH` (default: 1200) - Adjust maximum width

### Need to re-optimize?

You can run `npm run images:optimize` again anytime. It will overwrite the optimized folder.

## 📊 Expected Performance Gains

- **Load time:** 30s → 3-5s (80-90% faster)
- **Data usage:** 150 MB → 20 MB (87% reduction)
- **Mobile experience:** Much faster on 3G/4G
- **Server bandwidth:** 87% reduction

## ✅ Safety Features

- ✅ Original images never modified
- ✅ Automatic JSON backup before changes
- ✅ One-command revert if needed
- ✅ Can re-run optimization anytime
- ✅ No data loss risk

## 🎨 Next Steps After Optimization

Once images are optimized and working:

1. Consider implementing pagination (20 artworks per page)
2. Add thumbnail loading for even faster initial load
3. Implement lazy loading for below-fold images
4. Remove cache busting from `artwork.js` for better caching

---

**Questions?** Check the main `PERFORMANCE_OPTIMIZATIONS.md` for more details.

import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * Safe Image Optimization Script for Mercedis Portfolio
 * 
 * This script:
 * 1. Keeps original images untouched in images/portfolio/
 * 2. Creates optimized WebP versions in images/portfolio/optimized/
 * 3. Creates thumbnails in images/portfolio/thumbs/
 * 4. Easy to reverse - just don't use the optimized folder
 */

const PORTFOLIO_DIR = 'images/portfolio';
const OPTIMIZED_DIR = 'images/portfolio/optimized';
const THUMBS_DIR = 'images/portfolio/thumbs';

// Optimization settings
const FULL_SIZE_MAX_WIDTH = 1200;
const FULL_SIZE_QUALITY = 75;
const THUMB_SIZE = 400;
const THUMB_QUALITY = 70;

async function getImageFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip optimized and thumbs directories
      if (entry.name === 'optimized' || entry.name === 'thumbs') {
        continue;
      }
      // Recursively get files from subdirectories
      const subFiles = await getImageFiles(fullPath);
      files.push(...subFiles);
    } else if (/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

async function optimizeImage(inputPath, outputPath, maxWidth, quality) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  await image
    .resize(maxWidth, null, { 
      withoutEnlargement: true,
      fit: 'inside'
    })
    .webp({ quality, effort: 4 })
    .toFile(outputPath);
  
  const inputStats = await fs.stat(inputPath);
  const outputStats = await fs.stat(outputPath);
  const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
  
  return {
    originalSize: inputStats.size,
    optimizedSize: outputStats.size,
    savings: savings,
    originalDimensions: `${metadata.width}x${metadata.height}`
  };
}

async function createThumbnail(inputPath, outputPath, size, quality) {
  await sharp(inputPath)
    .resize(size, size, { 
      fit: 'cover',
      position: 'center'
    })
    .webp({ quality, effort: 4 })
    .toFile(outputPath);
}

async function optimizePortfolioImages() {
  console.log('🎨 Mercedis Portfolio Image Optimizer\n');
  console.log('═══════════════════════════════════════════════════\n');
  
  // Create output directories
  await fs.mkdir(OPTIMIZED_DIR, { recursive: true });
  await fs.mkdir(THUMBS_DIR, { recursive: true });
  
  // Get all image files
  console.log('📁 Scanning for images...');
  const imageFiles = await getImageFiles(PORTFOLIO_DIR);
  console.log(`   Found ${imageFiles.length} images to optimize\n`);
  
  if (imageFiles.length === 0) {
    console.log('❌ No images found to optimize.');
    return;
  }
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let processedCount = 0;
  let errorCount = 0;
  
  for (const inputPath of imageFiles) {
    try {
      // Get relative path from portfolio directory
      const relativePath = path.relative(PORTFOLIO_DIR, inputPath);
      const fileName = path.basename(inputPath, path.extname(inputPath));
      const subDir = path.dirname(relativePath);
      
      // Create subdirectory structure in output folders
      const optimizedSubDir = path.join(OPTIMIZED_DIR, subDir);
      const thumbsSubDir = path.join(THUMBS_DIR, subDir);
      await fs.mkdir(optimizedSubDir, { recursive: true });
      await fs.mkdir(thumbsSubDir, { recursive: true });
      
      // Output paths
      const optimizedPath = path.join(optimizedSubDir, `${fileName}.webp`);
      const thumbPath = path.join(thumbsSubDir, `${fileName}.webp`);
      
      console.log(`⚙️  Processing: ${relativePath}`);
      
      // Create optimized full-size image
      const stats = await optimizeImage(
        inputPath, 
        optimizedPath, 
        FULL_SIZE_MAX_WIDTH, 
        FULL_SIZE_QUALITY
      );
      
      // Create thumbnail
      await createThumbnail(inputPath, thumbPath, THUMB_SIZE, THUMB_QUALITY);
      
      totalOriginalSize += stats.originalSize;
      totalOptimizedSize += stats.optimizedSize;
      processedCount++;
      
      const originalMB = (stats.originalSize / 1024 / 1024).toFixed(2);
      const optimizedKB = (stats.optimizedSize / 1024).toFixed(0);
      
      console.log(`   ✅ Original: ${originalMB} MB (${stats.originalDimensions})`);
      console.log(`   ✅ Optimized: ${optimizedKB} KB (saved ${stats.savings}%)`);
      console.log(`   ✅ Thumbnail: ${THUMB_SIZE}x${THUMB_SIZE}px\n`);
      
    } catch (error) {
      console.error(`   ❌ Error processing ${inputPath}:`, error.message);
      errorCount++;
    }
  }
  
  // Summary
  console.log('\n═══════════════════════════════════════════════════');
  console.log('📊 OPTIMIZATION SUMMARY\n');
  console.log(`✅ Successfully processed: ${processedCount} images`);
  if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount} images`);
  }
  console.log(`\n📦 Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📦 Total optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  
  const savingsMB = ((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2);
  const savingsPercent = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);
  console.log(`💾 Total savings: ${savingsMB} MB (${savingsPercent}%)`);
  
  console.log('\n═══════════════════════════════════════════════════');
  console.log('📝 NEXT STEPS:\n');
  console.log('1. Test the optimized images on your website');
  console.log('2. If everything looks good, update your JSON files');
  console.log('3. To revert: just keep using original image paths\n');
  console.log('Original images are safe in: images/portfolio/');
  console.log('Optimized images are in: images/portfolio/optimized/');
  console.log('Thumbnails are in: images/portfolio/thumbs/');
  console.log('═══════════════════════════════════════════════════\n');
}

// Run the optimization
optimizePortfolioImages().catch(err => {
  console.error('\n❌ Fatal error during optimization:');
  console.error(err);
  process.exit(1);
});

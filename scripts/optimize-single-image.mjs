import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Configuration
const INPUT_IMAGE = 'images/portfolio/Nytt/IMG_4392.jpeg';
const OUTPUT_DIR = 'images/portfolio/optimized/nytt';
const THUMB_DIR = 'images/portfolio/thumbs';
const MAX_WIDTH = 1200;
const QUALITY = 85;
const THUMB_SIZE = 400;

async function optimizeSingleImage() {
  console.log('\n🎨 Single Image Optimizer\n');
  console.log('═══════════════════════════════════════════════════\n');

  const inputPath = join(projectRoot, INPUT_IMAGE);
  
  // Check if file exists
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Error: Image not found at ${inputPath}`);
    process.exit(1);
  }

  // Create output directories
  const outputDirPath = join(projectRoot, OUTPUT_DIR);
  const thumbDirPath = join(projectRoot, THUMB_DIR);
  
  if (!fs.existsSync(outputDirPath)) {
    fs.mkdirSync(outputDirPath, { recursive: true });
  }
  if (!fs.existsSync(thumbDirPath)) {
    fs.mkdirSync(thumbDirPath, { recursive: true });
  }

  try {
    console.log(`📸 Processing: ${INPUT_IMAGE}\n`);

    // Get original file stats
    const originalStats = fs.statSync(inputPath);
    const originalSize = originalStats.size;
    
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    const originalDimensions = `${metadata.width}x${metadata.height}`;

    // Optimize main image (WebP format)
    const outputFilename = 'IMG_4392.webp';
    const outputPath = join(outputDirPath, outputFilename);
    
    await sharp(inputPath)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    // Create thumbnail
    const thumbPath = join(thumbDirPath, outputFilename);
    await sharp(inputPath)
      .resize(THUMB_SIZE, THUMB_SIZE, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 80 })
      .toFile(thumbPath);

    // Get optimized file stats
    const optimizedStats = fs.statSync(outputPath);
    const optimizedSize = optimizedStats.size;
    const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

    // Display results
    console.log(`✅ Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB (${originalDimensions})`);
    console.log(`✅ Optimized: ${(optimizedSize / 1024).toFixed(0)} KB (saved ${savings}%)`);
    console.log(`✅ Thumbnail: ${THUMB_SIZE}x${THUMB_SIZE}px\n`);
    
    console.log('═══════════════════════════════════════════════════');
    console.log('📝 OUTPUT PATHS:\n');
    console.log(`Main image: ${OUTPUT_DIR}/${outputFilename}`);
    console.log(`Thumbnail: ${THUMB_DIR}/${outputFilename}`);
    console.log('\n📋 Use this path in your JSON:');
    console.log(`   "image": "${OUTPUT_DIR}/${outputFilename}"`);
    console.log('═══════════════════════════════════════════════════\n');

  } catch (error) {
    console.error(`❌ Error processing image:`, error.message);
    process.exit(1);
  }
}

// Run the optimization
optimizeSingleImage().catch(err => {
  console.error('\n❌ Fatal error:', err);
  process.exit(1);
});

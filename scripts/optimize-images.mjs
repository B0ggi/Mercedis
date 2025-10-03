import { promises as fs } from 'fs';
import path from 'path';
import { globby } from 'globby';
import sharp from 'sharp';

const SOURCE_DIR = 'images'; // The folder with your original images
const OUTPUT_DIR = 'public/images'; // The folder where optimized images will be saved
const SIZES = [
  { width: 400, suffix: 'sm' },
  { width: 800, suffix: 'md' },
  { width: 1200, suffix: 'lg' },
];

async function optimizeImages() {
  console.log('Starting image optimization process...');

  // Find all image files in the source directory
  const imagePaths = await globby(`${SOURCE_DIR}/**/*.{jpg,jpeg,png,gif}`);

  if (imagePaths.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  console.log(`Found ${imagePaths.length} images to optimize.`);

  // Ensure the output directory exists
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  let optimizedCount = 0;

  for (const imagePath of imagePaths) {
    const fileDir = path.dirname(imagePath).replace(SOURCE_DIR, '');
    const fileName = path.basename(imagePath, path.extname(imagePath));
    const outputSubDir = path.join(OUTPUT_DIR, fileDir);

    // Create subdirectory in output folder if it doesn't exist
    await fs.mkdir(outputSubDir, { recursive: true });

    console.log(`Processing ${imagePath}...`);

    const image = sharp(imagePath);

    for (const { width, suffix } of SIZES) {
      const outputFileName = `${fileName}-${suffix}.webp`;
      const outputPath = path.join(outputSubDir, outputFileName);

      try {
        await image
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 80, effort: 5 })
          .toFile(outputPath);
        
        optimizedCount++;
        console.log(`  -> Saved ${outputFileName} (${width}px)`);

      } catch (err) {
        console.error(`Failed to process ${imagePath} for width ${width}px:`, err);
      }
    }

    // Also save the original as a fallback jpeg
    const fallbackPath = path.join(outputSubDir, `${fileName}-original.jpg`);
    await image
        .jpeg({ quality: 85 })
        .toFile(fallbackPath);
    console.log(`  -> Saved ${fileName}-original.jpg (fallback)`);

  }

  console.log(`\nImage optimization complete. Processed ${optimizedCount} files.`);
}

optimizeImages().catch(err => {
  console.error('\nAn error occurred during image optimization:');
  console.error(err);
  process.exit(1);
});

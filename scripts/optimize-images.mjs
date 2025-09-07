import { promises as fs } from 'fs';
import path from 'path';
import { globby } from 'globby';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminSvgo from 'imagemin-svgo';

const roots = [
  'images',
  'assets/images'
];

const exts = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function fileSize(p) {
  try {
    const st = await fs.stat(p);
    return st.size;
  } catch {
    return 0;
  }
}

async function optimizeFile(file) {
  const dir = path.dirname(file);
  const base = path.basename(file);
  const before = await fileSize(file);

  const plugins = [];
  const ext = path.extname(file).toLowerCase();

  if (ext === '.jpg' || ext === '.jpeg') {
    plugins.push(imageminMozjpeg({ quality: 78, progressive: true, trellis: true, dcScanOpt: 2 }));
  } else if (ext === '.png') {
    plugins.push(imageminPngquant({ quality: [0.65, 0.85], speed: 2 }));
  } else if (ext === '.gif') {
    plugins.push(imageminGifsicle({ optimizationLevel: 3 }));
  } else if (ext === '.svg') {
    plugins.push(imageminSvgo({
      multipass: true,
      plugins: [
        { name: 'removeViewBox', active: false },
        { name: 'cleanupIDs', active: true }
      ]
    }));
  } else {
    // For webp or others, skip for now (or could add imagemin-webp)
  }

  try {
    const data = await fs.readFile(file);
    const out = await imagemin.buffer(data, { plugins });

    // Only write if smaller
    if (out.length > 0 && out.length < before) {
      await fs.writeFile(file, out);
      const after = out.length;
      const saved = before - after;
      console.log(`Optimized: ${file}  ${formatBytes(before)} -> ${formatBytes(after)}  (-${formatBytes(saved)})`);
      return { before, after };
    } else {
      console.log(`Skipped (no gain): ${file}  ${formatBytes(before)}`);
      return { before, after: before };
    }
  } catch (e) {
    console.warn(`Failed: ${file}  ${e.message}`);
    return { before, after: before };
  }
}

async function main() {
  const patterns = roots.flatMap((r) => exts.map((e) => `${r}/**/*.${e}`));
  const files = await globby(patterns, { gitignore: true, caseSensitiveMatch: false });

  if (files.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  console.log(`Found ${files.length} image(s). Starting optimization without resizing...`);

  let totalBefore = 0;
  let totalAfter = 0;

  // Process sequentially to avoid high memory spikes on large images
  for (const f of files) {
    const { before, after } = await optimizeFile(f);
    totalBefore += before;
    totalAfter += after;
  }

  const saved = totalBefore - totalAfter;
  console.log('----------------------------------------------');
  console.log(`Total: ${formatBytes(totalBefore)} -> ${formatBytes(totalAfter)}  (Saved ${formatBytes(saved)})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

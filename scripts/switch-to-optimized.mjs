import { promises as fs } from 'fs';
import path from 'path';

/**
 * Switch JSON files to use optimized images
 * Creates backup of original JSON files first
 */

const COLLECTIONS_DIR = 'data/collections';
const BACKUP_DIR = 'data/collections/backup-originals';

async function switchToOptimized() {
  console.log('🔄 Switching to optimized images...\n');
  
  // Create backup directory
  await fs.mkdir(BACKUP_DIR, { recursive: true });
  
  // Get all JSON files
  const files = await fs.readdir(COLLECTIONS_DIR);
  const jsonFiles = files.filter(f => f.endsWith('.json') && f !== 'backup-originals');
  
  for (const file of jsonFiles) {
    const filePath = path.join(COLLECTIONS_DIR, file);
    const backupPath = path.join(BACKUP_DIR, file);
    
    console.log(`📝 Processing: ${file}`);
    
    // Read the file
    const content = await fs.readFile(filePath, 'utf-8');
    
    // Backup original
    await fs.writeFile(backupPath, content, 'utf-8');
    console.log(`   ✅ Backed up to: ${backupPath}`);
    
    // Replace image paths
    // Change: images/portfolio/xxx.jpg -> images/portfolio/optimized/xxx.webp
    const updated = content.replace(
      /"image":\s*"images\/portfolio\/([^"]+)\.(jpg|jpeg|png|JPG|JPEG|PNG)"/gi,
      '"image": "images/portfolio/optimized/$1.webp"'
    );
    
    // Write updated content
    await fs.writeFile(filePath, updated, 'utf-8');
    console.log(`   ✅ Updated to use optimized images\n`);
  }
  
  console.log('═══════════════════════════════════════════════════');
  console.log('✅ Successfully switched to optimized images!\n');
  console.log('Backups saved in: data/collections/backup-originals/');
  console.log('To revert, run: npm run images:revert');
  console.log('═══════════════════════════════════════════════════\n');
}

switchToOptimized().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});

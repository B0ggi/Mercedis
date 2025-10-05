import { promises as fs } from 'fs';
import path from 'path';

/**
 * Revert JSON files back to original images
 * Restores from backup
 */

const COLLECTIONS_DIR = 'data/collections';
const BACKUP_DIR = 'data/collections/backup-originals';

async function revertToOriginal() {
  console.log('↩️  Reverting to original images...\n');
  
  try {
    // Check if backup exists
    const backupExists = await fs.access(BACKUP_DIR).then(() => true).catch(() => false);
    
    if (!backupExists) {
      console.log('❌ No backup found. Nothing to revert.');
      console.log('   Backup should be in: data/collections/backup-originals/\n');
      return;
    }
    
    // Get all backup files
    const files = await fs.readdir(BACKUP_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    
    if (jsonFiles.length === 0) {
      console.log('❌ No backup files found.\n');
      return;
    }
    
    for (const file of jsonFiles) {
      const backupPath = path.join(BACKUP_DIR, file);
      const targetPath = path.join(COLLECTIONS_DIR, file);
      
      console.log(`📝 Restoring: ${file}`);
      
      // Read backup
      const content = await fs.readFile(backupPath, 'utf-8');
      
      // Write back to original location
      await fs.writeFile(targetPath, content, 'utf-8');
      console.log(`   ✅ Restored from backup\n`);
    }
    
    console.log('═══════════════════════════════════════════════════');
    console.log('✅ Successfully reverted to original images!\n');
    console.log('Your website is now using the original image files.');
    console.log('Backup files are still safe in: data/collections/backup-originals/');
    console.log('═══════════════════════════════════════════════════\n');
    
  } catch (error) {
    console.error('❌ Error during revert:', error.message);
    process.exit(1);
  }
}

revertToOriginal().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});

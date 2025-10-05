# Artwork Data Management

This directory contains the artwork data for the Ellinor Mercedis portfolio website, organized into a modular collection system.

## Structure

```
data/
├── config.json              # Central configuration file
├── collections/             # Individual artwork collections
│   ├── featured.json       # Curated artworks for homepage (4 items)
│   ├── 2024.json          # 2024 collection (60+ artworks)
│   └── 2025.json          # 2025 collection (6 artworks)
└── artworks.json           # Legacy file (kept for backward compatibility)
```

## How It Works

### 1. Configuration File (`config.json`)
The central configuration file defines all available collections:
- Collection ID and name
- File path to collection data
- Priority order for loading
- Metadata about the collection

### 2. Collection Files
Each collection file contains an array of artwork objects with the following structure:

```json
{
  "artworks": [
    {
      "id": "unique_artwork_id",
      "title": "Artwork Title",
      "year": "2024",
      "technique": "Akryl á lørift",
      "size": "70 x 50 cm",
      "available": true,
      "image": "images/portfolio/filename.jpg",
      "categories": ["available", "y2024"]
    }
  ]
}
```

### 3. Loading System
The `artwork.js` loader supports:
- **Specific collection loading**: `loadArtworks('featured')` - loads only featured collection
- **All collections**: `loadArtworks()` - loads all collections from config
- **Automatic deduplication**: Removes duplicate artworks by ID
- **Fallback support**: Falls back to legacy `artworks.json` if config fails

## Adding New Artworks

### Option 1: Add to Existing Collection
1. Open the appropriate collection file (e.g., `collections/2024.json`)
2. Add your artwork object to the `artworks` array
3. Ensure the `id` is unique
4. Save the file

### Option 2: Create New Collection
1. Create a new JSON file in `collections/` directory
2. Follow the structure shown above
3. Add the collection to `config.json`:
```json
{
  "id": "new_collection",
  "name": "New Collection Name",
  "description": "Description here",
  "file": "data/collections/new_collection.json",
  "priority": 4
}
```

## Benefits of This Structure

✅ **Performance**: Homepage loads only 4 featured artworks instead of 70+  
✅ **Maintainability**: Easy to find and edit specific artworks  
✅ **Scalability**: Add new collections without touching existing ones  
✅ **Organization**: Logical grouping by year/category  
✅ **No Duplicates**: Automatic deduplication by ID  
✅ **Backward Compatible**: Legacy `artworks.json` still works as fallback  

## Migration Notes

- All duplicate IDs have been fixed (previously many shared `mercedis_sluppurnar_29`)
- IDs now follow pattern: `mercedis_sluppurnar_30`, `mercedis_sluppurnar_31`, etc.
- Featured collection contains the 4 best artworks for homepage display
- Year collections (2024, 2025) contain all artworks from those periods

## Usage Examples

### Homepage (loads only featured)
```javascript
import { loadArtworks } from './assets/js/artwork.js';
const artworks = await loadArtworks('featured'); // Only 4 artworks
```

### Portfolio Page (loads all)
```javascript
import { loadArtworks } from './assets/js/artwork.js';
const artworks = await loadArtworks(); // All artworks from all collections
```

### Specific Year
```javascript
const artworks2024 = await loadArtworks('2024');
```

## Maintenance

- Update `config.json` metadata when adding collections
- Keep featured collection to 4-6 artworks for optimal homepage performance
- Use consistent ID naming patterns within collections
- Test after adding new collections to ensure proper loading

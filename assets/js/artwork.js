// Enhanced artwork data loader with multi-source support

/**
 * Load artworks from config-based collection system
 * @param {string|null} collectionId - Optional specific collection to load (e.g., 'featured', '2024')
 * @returns {Promise<Array>} Array of artwork objects
 */
export async function loadArtworks(collectionId = null) {
  try {
    console.log('[Artwork Loader] Starting to load artworks...', collectionId ? `Collection: ${collectionId}` : 'All collections');
    
    // Load the config file (browser will cache this)
    const configUrl = 'data/config.json';
    const configResponse = await fetch(configUrl);
    if (!configResponse.ok) {
      throw new Error(`Config load error! status: ${configResponse.status}`);
    }
    const config = await configResponse.json();
    console.log('[Artwork Loader] Config loaded successfully:', config);
    
    // Determine which collections to load
    let collectionsToLoad = config.collections;
    if (collectionId) {
      collectionsToLoad = config.collections.filter(c => c.id === collectionId);
      if (collectionsToLoad.length === 0) {
        console.warn(`Collection '${collectionId}' not found in config`);
        return [];
      }
    }
    
    console.log('[Artwork Loader] Loading collections:', collectionsToLoad.map(c => c.id));
    
    // Load all specified collections in parallel
    const collectionPromises = collectionsToLoad.map(async (collection) => {
      try {
        // Load collection file (browser will cache this)
        const collectionUrl = collection.file;
        const response = await fetch(collectionUrl);
        if (!response.ok) {
          console.warn(`Failed to load ${collection.file}: ${response.status}`);
          return [];
        }
        const data = await response.json();
        console.log(`[Artwork Loader] Loaded ${collection.id}:`, data.artworks?.length || 0, 'artworks');
        // Log first artwork for debugging
        if (data.artworks && data.artworks.length > 0) {
          console.log(`[Artwork Loader] First artwork from ${collection.id}:`, data.artworks[0]);
        }
        return data.artworks || [];
      } catch (error) {
        console.error(`Error loading collection ${collection.id}:`, error);
        return [];
      }
    });
    
    // Wait for all collections to load
    const collectionResults = await Promise.all(collectionPromises);
    
    // Flatten and deduplicate artworks by ID
    const allArtworks = collectionResults.flat();
    const uniqueArtworks = deduplicateArtworks(allArtworks);
    
    console.log('[Artwork Loader] Total artworks loaded:', uniqueArtworks.length);
    return uniqueArtworks;
  } catch (error) {
    console.error('[Artwork Loader] Error loading from config system:', error);
    console.warn('[Artwork Loader] Falling back to legacy artworks.json');
    // Fallback: try loading legacy artworks.json if it exists
    return loadLegacyArtworks();
  }
}

/**
 * Deduplicate artworks by ID, keeping the first occurrence
 * @param {Array} artworks - Array of artwork objects
 * @returns {Array} Deduplicated array
 */
function deduplicateArtworks(artworks) {
  const seen = new Set();
  return artworks.filter(artwork => {
    if (seen.has(artwork.id)) {
      return false;
    }
    seen.add(artwork.id);
    return true;
  });
}

/**
 * Fallback loader for legacy artworks.json format
 * @returns {Promise<Array>} Array of artwork objects
 */
async function loadLegacyArtworks() {
  try {
    console.log('[Artwork Loader] Attempting legacy fallback...');
    const legacyUrl = 'data/artworks.json';
    const response = await fetch(legacyUrl);
    if (!response.ok) {
      console.error('[Artwork Loader] Legacy file not found');
      return [];
    }
    const data = await response.json();
    console.log('[Artwork Loader] Legacy file loaded:', data.artworks?.length || 0, 'artworks');
    return data.artworks || [];
  } catch (error) {
    console.error('[Artwork Loader] Legacy fallback also failed:', error);
    return [];
  }
}
// Artwork data loader with error handling
let artworks = [];

async function loadArtworks() {
  try {
    const response = await fetch('data/artworks.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    artworks = data.artworks;
    return artworks;
  } catch (error) {
    console.error('Error loading artworks:', error);
    // Fallback to empty array if JSON fails to load
    artworks = [];
    return artworks;
  }
}

// Initialize artworks on module load
loadArtworks();

export { artworks, loadArtworks };
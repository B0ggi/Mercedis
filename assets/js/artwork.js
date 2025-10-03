// Simplified artwork data loader

export async function loadArtworks() {
  try {
    const response = await fetch('data/artworks.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.artworks;
  } catch (error) {
    console.error('Error loading artworks:', error);
    // Return an empty array on failure to prevent breaking the calling script
    return [];
  }
}
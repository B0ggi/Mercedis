// Import the data loader
import { loadArtworks } from './artwork.js';

document.addEventListener('DOMContentLoaded', async function() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Load artworks data first
    const artworks = await loadArtworks();

    // Function to get category label
    function getCategoryLabel(category) {
        switch(category) {
            case 'available': return 'Tøk listaverk';
            case 'y2025': return '2025';
            case 'y2024': return '2024';
            case 'y2022': return '2022';
            default: return category;
        }
    }

    // Function to render artworks
    function renderArtworks(filter = 'all') {
        // Clear the grid
        portfolioGrid.innerHTML = '';

        // Check if artworks loaded successfully
        if (!artworks || artworks.length === 0) {
            portfolioGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #666;">Ongar listaverk tøk í løtuni.</p>';
            return;
        }

        // Filter artworks based on the selected filter
        const filteredArtworks = filter === 'all' 
            ? [...artworks] // Create a copy of the array
            : filter === 'available'
                ? artworks.filter(art => art.available)
                : filter === 'notavailable'
                    ? artworks.filter(art => !art.available)
                    : artworks.filter(art => art.categories.includes(filter));

        // If no filter is selected (initial load), show all categories except 'notavailable'
        if (filter === 'all') {
            // Show available items
            renderCategory('available', 'Tøk listaverk');
            
            // Show items by year, excluding 'notavailable' category
            const years = [...new Set(artworks.flatMap(art => 
                art.categories.filter(cat => cat.startsWith('y'))
            ))].sort().reverse();
            
            years.forEach(year => {
                const yearLabel = year.replace('y', '');
                renderCategory(year, yearLabel);
            });
        } else if (filter === 'notavailable') {
            // Special handling for notavailable filter - show all non-available items without category header
            const notAvailableItems = filteredArtworks.filter(art => !art.available);
            notAvailableItems.forEach(art => {
                const item = createArtworkElement(art);
                portfolioGrid.appendChild(item);
            });
        } else {
            // For other filters, show matching items
            const category = filter;
            const items = filteredArtworks.filter(art => art.categories.includes(category));
            if (items.length > 0) {
                const label = getCategoryLabel(category);
                renderCategory(category, label);
            }
        }

        // Helper function to render a single category
        function renderCategory(category, label) {
            const items = filteredArtworks.filter(art => art.categories.includes(category));
            if (items.length === 0) return;

            // Add category title (except for 'notavailable' category)
            if (category !== 'notavailable') {
                const categoryTitle = document.createElement('h2');
                categoryTitle.className = 'category-title';
                categoryTitle.textContent = label;
                portfolioGrid.appendChild(categoryTitle);
            }

            // Add artworks for this category
            items.forEach(art => {
                const item = createArtworkElement(art);
                portfolioGrid.appendChild(item);
            });
        }

        // Helper function to create artwork element
        function createArtworkElement(art) {
            const item = document.createElement('div');
            item.className = `portfolio-item ${art.categories.join(' ')}`;
            item.innerHTML = `
                <a href="${art.image}" data-gallery="portfolio-gallery">
                    <img src="${art.image}" alt="${art.title}" loading="lazy" decoding="async" onerror="this.src='images/placeholder.jpg'; this.alt='Mynd ikki tøk';">
                    <div class="artwork-overlay">
                        <div class="artwork-info">
                            <h3>${art.title}</h3>
                            <div class="artwork-meta">
                                <span>${art.year}</span>
                                ${art.technique ? `<span>${art.technique}</span>` : ''}
                                ${art.size ? `<span>${art.size}</span>` : ''}
                                <span class="availability ${art.available ? 'available' : 'not-available'}">
                                    ${art.available ? 'Tøkt' : 'Ikki Tøkt'}
                                </span>
                            </div>
                        </div>
                    </div>
                </a>
            `;
            return item;
        }

        // Reinitialize Magnific Popup for the newly added items
        $('.portfolio-grid').magnificPopup({
            delegate: 'a[data-gallery="portfolio-gallery"]',
            type: 'image',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
            image: {
                titleSrc: function(item) {
                    const $el = $(item.el);
                    const title = $el.find('h3').text();
                    const meta = $el.find('.artwork-meta').html();
                    return `<div style="text-align:left;"><strong>${title}</strong><br>${meta}</div>`;
                }
            }
        });
    }

    // Initialize filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Get filter value and render
            const filter = this.getAttribute('data-filter');
            renderArtworks(filter);
        });
    });

    // Initial render with all artworks
    renderArtworks('all');
});

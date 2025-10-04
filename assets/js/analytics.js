/**
 * Umami Analytics Integration for Mercedis Portfolio
 * Privacy-focused, cookie-free analytics
 * 
 * Setup Instructions:
 * 1. Sign up at https://cloud.umami.is/signup
 * 2. Add your website in the dashboard
 * 3. Copy your Website ID
 * 4. Replace 'YOUR-WEBSITE-ID-HERE' below with your actual ID
 * 5. Push to GitHub and deploy
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION - UPDATE THIS!
  // ============================================
  const UMAMI_WEBSITE_ID = 'e8e69d95-1597-4279-915a-a669097e9841';
  const UMAMI_SCRIPT_URL = 'https://cloud.umami.is/script.js';
  
  // ============================================
  // DO NOT EDIT BELOW THIS LINE
  // ============================================

  // Only load analytics on production (not localhost)
  const isProduction = window.location.hostname !== 'localhost' && 
                       window.location.hostname !== '127.0.0.1';

  if (!isProduction) {
    console.log('[Analytics] Skipping Umami on localhost');
    return;
  }

  // Check if Website ID is configured
  if (UMAMI_WEBSITE_ID === 'YOUR-WEBSITE-ID-HERE') {
    console.warn('[Analytics] Umami Website ID not configured. Please update analytics.js');
    return;
  }

  // Load Umami script
  const script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.src = UMAMI_SCRIPT_URL;
  script.setAttribute('data-website-id', UMAMI_WEBSITE_ID);
  
  // Optional: Respect Do Not Track browser setting
  script.setAttribute('data-do-not-track', 'true');
  
  // Optional: Enable automatic event tracking (clicks, form submissions)
  script.setAttribute('data-auto-track', 'true');
  
  // Add script to page
  document.head.appendChild(script);

  // Log successful load
  script.onload = function() {
    console.log('[Analytics] Umami loaded successfully');
  };

  script.onerror = function() {
    console.error('[Analytics] Failed to load Umami script');
  };

})();

/**
 * Custom Event Tracking (Optional)
 * 
 * Use these functions to track specific user actions:
 * 
 * Example usage:
 * 
 * // Track artwork view
 * if (window.umami) {
 *   umami.track('artwork-view', { artwork: 'Portfolio10' });
 * }
 * 
 * // Track contact form submission
 * if (window.umami) {
 *   umami.track('contact-form-submit');
 * }
 * 
 * // Track gallery filter usage
 * if (window.umami) {
 *   umami.track('filter-used', { filter: 'y2024' });
 * }
 */
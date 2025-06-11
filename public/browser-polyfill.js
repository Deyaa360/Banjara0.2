// This script provides a browser polyfill to prevent "browser is not defined" errors
(function() {
  if (typeof window !== 'undefined') {
    // Define browser if it doesn't exist
    if (typeof window.browser === 'undefined') {
      window.browser = window.chrome || {};
    }
    
    // Ensure browser.runtime exists
    if (window.browser && typeof window.browser.runtime === 'undefined') {
      window.browser.runtime = {};
    }
    
    // Add any other browser APIs that might be needed
    if (window.browser && typeof window.browser.i18n === 'undefined') {
      window.browser.i18n = {};
    }
    
    console.log('Browser polyfill loaded successfully');
  }
})();
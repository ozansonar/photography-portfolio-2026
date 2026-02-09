/*
==============================================
PAGE LOADER SCRIPT
==============================================
*/

// Show loader immediately
const pageLoader = document.getElementById('pageLoader');

// Hide loader when page is fully loaded
window.addEventListener('load', () => {
  // Wait a minimum of 800ms for smooth experience
  setTimeout(() => {
    if (pageLoader) {
      pageLoader.classList.add('hidden');
      
      // Remove from DOM after animation completes
      setTimeout(() => {
        pageLoader.style.display = 'none';
      }, 500);
    }
  }, 800);
});

// Fallback: Hide after 5 seconds if load event doesn't fire
setTimeout(() => {
  if (pageLoader && !pageLoader.classList.contains('hidden')) {
    pageLoader.classList.add('hidden');
    setTimeout(() => {
      pageLoader.style.display = 'none';
    }, 500);
  }
}, 5000);

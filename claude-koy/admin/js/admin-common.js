/*
==============================================
ADMIN COMMON JAVASCRIPT
==============================================
*/

// Check authentication
function checkAuth() {
  if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'index.html';
  }
}

// Logout function
function logout() {
  if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
  }
}

// Check auth on page load
if (!window.location.pathname.includes('index.html')) {
  checkAuth();
}

// Counter animation for stats
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Run counter animation on stat numbers
window.addEventListener('DOMContentLoaded', () => {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (statNumbers.length > 0) {
    setTimeout(() => {
      statNumbers.forEach(num => animateCounter(num));
    }, 300);
  }
});

// Mobile sidebar toggle
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.modern-sidebar');

if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Add active class to current page in sidebar
const currentPage = window.location.pathname.split('/').pop();
const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
  const href = item.getAttribute('href');
  if (href === currentPage) {
    item.classList.add('active');
  }
});

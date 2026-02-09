// ==============================================
// PALABIYIK KÖYÜ - JAVASCRIPT
// Enhanced with Swiper.js and Vanilla JS Counters
// ==============================================

// Update year in footer
const yearSpans = document.querySelectorAll('[data-year]');
yearSpans.forEach(span => {
  span.textContent = new Date().getFullYear();
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar-corporate');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Animate on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => observer.observe(el));

// ==========================================
// VANILLA JS COUNTER ANIMATION (No Library)
// ==========================================
function animateCounter(element, target, duration, suffix = '') {
  const start = 0;
  const increment = target / (duration * 60); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + suffix;
  }, 1000 / 60);
}

// Observe counters and animate when visible
const counters = document.querySelectorAll('[data-counter]');
if (counters.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        const target = entry.target;
        const endValue = parseInt(target.getAttribute('data-counter'));
        const duration = parseFloat(target.getAttribute('data-duration')) || 2;
        const suffix = target.getAttribute('data-suffix') || '';
        
        // Use vanilla JS animation
        animateCounter(target, endValue, duration, suffix);
      }
    });
  }, { threshold: 0.3 });
  
  counters.forEach(counter => counterObserver.observe(counter));
}

// Initialize Swiper sliders
if (typeof Swiper !== 'undefined') {
  
  // Management slider (NEW!)
  const managementSwiperEl = document.querySelector('.management-swiper');
  if (managementSwiperEl) {
    const managementSwiper = new Swiper('.management-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.management-swiper .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.management-swiper .swiper-button-next',
        prevEl: '.management-swiper .swiper-button-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  }
  
  // Business slider
  const businessSwiperEl = document.querySelector('.business-swiper');
  if (businessSwiperEl) {
    const businessSwiper = new Swiper('.business-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.business-swiper .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.business-swiper .swiper-button-next',
        prevEl: '.business-swiper .swiper-button-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }
  
  // News slider
  const newsSwiperEl = document.querySelector('.news-swiper');
  if (newsSwiperEl) {
    const newsSwiper = new Swiper('.news-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.news-swiper .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.news-swiper .swiper-button-next',
        prevEl: '.news-swiper .swiper-button-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }
  
  // Hero slider (if exists)
  const heroSwiperEl = document.querySelector('.hero-swiper');
  if (heroSwiperEl) {
    const heroSwiper = new Swiper('.hero-swiper', {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      speed: 1000,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      pagination: {
        el: '.hero-swiper .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.hero-swiper .swiper-button-next',
        prevEl: '.hero-swiper .swiper-button-prev',
      },
    });
  }
}


// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });
  
  // Scroll to top on click
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


// ==========================================
// COOKIE CONSENT BANNER
// ==========================================
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');
const cookieDecline = document.getElementById('cookieDecline');

if (cookieBanner) {
  // Check if user already made a choice
  const cookieConsent = localStorage.getItem('cookieConsent');
  
  if (!cookieConsent) {
    // Show banner after 1 second
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 1000);
  }
  
  // Accept cookies
  if (cookieAccept) {
    cookieAccept.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.classList.remove('show');
      // Here you can enable analytics, ads, etc.
      console.log('Cookies accepted');
    });
  }
  
  // Decline cookies
  if (cookieDecline) {
    cookieDecline.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      cookieBanner.classList.remove('show');
      console.log('Cookies declined');
    });
  }
}


// ==========================================
// SITE SEARCH FUNCTIONALITY
// ==========================================
const searchToggle = document.getElementById('searchToggle');
const searchModal = document.getElementById('searchModal');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchToggle && searchModal) {
  // Open search modal
  searchToggle.addEventListener('click', (e) => {
    e.preventDefault();
    searchModal.classList.add('active');
    setTimeout(() => {
      searchInput.focus();
    }, 300);
  });
  
  // Close search modal
  if (searchClose) {
    searchClose.addEventListener('click', () => {
      searchModal.classList.remove('active');
      searchInput.value = '';
      searchResults.innerHTML = '';
    });
  }
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
      searchModal.classList.remove('active');
      searchInput.value = '';
      searchResults.innerHTML = '';
    }
  });
  
  // Close on backdrop click
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      searchModal.classList.remove('active');
      searchInput.value = '';
      searchResults.innerHTML = '';
    }
  });
}

// Search functionality
if (searchInput && searchResults) {
  // Sample search data - Replace with your actual content
  const searchData = [
    { title: 'Hakkımızda', url: 'hakkimizda.html', type: 'sayfa', excerpt: 'Palabıyık Köyü hakkında detaylı bilgi' },
    { title: 'Köy Yönetimi', url: 'yonetim.html', type: 'sayfa', excerpt: 'Muhtar ve köy yönetim kurulu üyeleri' },
    { title: 'Dernek Başkanı', url: 'dernek-baskani.html', type: 'sayfa', excerpt: 'Dernek başkanımız hakkında bilgi' },
    { title: 'Esnaflarımız', url: 'esnaflarimiz.html', type: 'sayfa', excerpt: 'Köyümüzdeki esnaf ve işletmeler' },
    { title: 'Haberler', url: 'haberler.html', type: 'sayfa', excerpt: 'Köyümüzden son haberler' },
    { title: 'Etkinlikler', url: 'etkinlikler.html', type: 'sayfa', excerpt: 'Köyümüzdeki etkinlikler ve organizasyonlar' },
    { title: 'Galeri', url: 'galeri.html', type: 'sayfa', excerpt: 'Fotoğraf galerisi' },
    { title: 'İletişim', url: 'iletisim.html', type: 'sayfa', excerpt: 'Bizimle iletişime geçin' },
    { title: 'Bahar Şenliği 2026', url: 'etkinlik-detay.html', type: 'etkinlik', excerpt: 'Baharın gelimi ile düzenlenen geleneksel şenlik' },
    { title: 'Yeni Yol Çalışması Başladı', url: 'haber-detay.html', type: 'haber', excerpt: 'Köyümüze yeni asfalt yol yapılıyor' },
  ];
  
  // Debounce function for search
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }
    
    searchTimeout = setTimeout(() => {
      performSearch(query);
    }, 300);
  });
  
  function performSearch(query) {
    const results = searchData.filter(item => {
      return item.title.toLowerCase().includes(query) ||
             item.excerpt.toLowerCase().includes(query);
    });
    
    displayResults(results, query);
  }
  
  function displayResults(results, query) {
    if (results.length === 0) {
      searchResults.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: var(--gri);">
          <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
          <p style="font-size: 1.125rem; margin: 0;">"<strong>${query}</strong>" için sonuç bulunamadı</p>
        </div>
      `;
      return;
    }
    
    const resultHTML = results.map(item => {
      const typeIcon = {
        'sayfa': 'fa-file-alt',
        'haber': 'fa-newspaper',
        'etkinlik': 'fa-calendar-alt'
      }[item.type] || 'fa-file';
      
      const typeColor = {
        'sayfa': 'var(--gok)',
        'haber': 'var(--toprak)',
        'etkinlik': 'var(--bugday)'
      }[item.type] || 'var(--gri)';
      
      return `
        <a href="${item.url}" class="search-result-item">
          <div class="result-icon" style="color: ${typeColor};">
            <i class="fas ${typeIcon}"></i>
          </div>
          <div class="result-content">
            <div class="result-title">${highlightMatch(item.title, query)}</div>
            <div class="result-excerpt">${highlightMatch(item.excerpt, query)}</div>
            <div class="result-type">${item.type}</div>
          </div>
          <div class="result-arrow">
            <i class="fas fa-arrow-right"></i>
          </div>
        </a>
      `;
    }).join('');
    
    searchResults.innerHTML = `
      <div style="padding: 1rem 1.5rem; border-bottom: 2px solid var(--krem); color: var(--gri); font-size: 0.875rem;">
        <strong>${results.length}</strong> sonuç bulundu
      </div>
      ${resultHTML}
    `;
  }
  
  function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
}

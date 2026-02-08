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

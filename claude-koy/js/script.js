// ==============================================
// PALABIYIK KÖYÜ - JAVASCRIPT
// Enhanced with Swiper.js and CountUp.js
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

// Counter animation
const counters = document.querySelectorAll('[data-counter]');
if (counters.length > 0 && typeof CountUp !== 'undefined') {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        const target = entry.target;
        const endValue = parseInt(target.getAttribute('data-counter'));
        const duration = parseFloat(target.getAttribute('data-duration')) || 2;
        const suffix = target.getAttribute('data-suffix') || '';
        
        const countUp = new CountUp(target, endValue, {
          duration: duration,
          suffix: suffix,
          useEasing: true,
          useGrouping: true,
          separator: '.',
          decimal: ','
        });
        
        if (!countUp.error) {
          countUp.start();
        } else {
          target.textContent = endValue + suffix;
        }
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => counterObserver.observe(counter));
}

// Initialize Swiper sliders
if (typeof Swiper !== 'undefined') {
  // Business slider
  const businessSwiper = new Swiper('.business-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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
  
  // News slider
  const newsSwiper = new Swiper('.news-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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

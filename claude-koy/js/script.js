// PALABIYIK 2026 ULTRA - Advanced Interactive Experience

(function() {
  'use strict';

  // ============================================
  // NAVBAR ULTRA SCROLL EFFECT
  // ============================================
  const navbar = document.querySelector('.navbar-ultra');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide navbar on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });

  // ============================================
  // ACTIVE NAV LINK DETECTION
  // ============================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ============================================
  // SCROLL REVEAL ANIMATION
  // ============================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================
  // DYNAMIC EVENTS RENDERING
  // ============================================
  const eventContainer = document.getElementById('events-container');
  
  if (eventContainer) {
    const events = [
      {
        date: '16 Şubat 2026',
        title: 'Kış Buluşması',
        location: 'Köy Meydanı',
        description: 'Köy halkı dayanışma toplantısı. Sıcak çay ve simit ikramı yapılacaktır. Tüm köylülerimiz davetlidir.',
        icon: 'fa-mug-hot',
        color: 'linear-gradient(135deg, #00ff88, #00ffcc)'
      },
      {
        date: '10 Mart 2026',
        title: 'Fidan Dikim Günü',
        location: 'Köy Girişi',
        description: 'Çevre bilinci kapsamında toplu fidan dikimi. Herkes davetlidir. Alet temin edilecektir.',
        icon: 'fa-seedling',
        color: 'linear-gradient(135deg, #00ffcc, #0099ff)'
      },
      {
        date: '23 Nisan 2026',
        title: 'Çocuk Şenliği',
        location: 'İlkokul Bahçesi',
        description: '23 Nisan Ulusal Egemenlik ve Çocuk Bayramı kutlamaları ve etkinlikler. Oyunlar, yarışmalar ve hediyeler.',
        icon: 'fa-children',
        color: 'linear-gradient(135deg, #0099ff, #6366f1)'
      },
      {
        date: '15 Ağustos 2026',
        title: 'Yaz Şenliği',
        location: 'Harman Yeri',
        description: 'Yöresel yemekler, müzik ve halk oyunları gösterileri. Geleneksel köy şenliği.',
        icon: 'fa-music',
        color: 'linear-gradient(135deg, #6366f1, #00ff88)'
      }
    ];

    eventContainer.innerHTML = events.map(event => `
      <div class="col-md-6 mb-4 reveal">
        <div class="neuro-card">
          <div class="d-flex align-items-start justify-content-between mb-3">
            <div class="card-icon" style="background: ${event.color};">
              <i class="fas ${event.icon}"></i>
            </div>
            <span class="hero-badge" style="animation: none; margin: 0;">${event.date}</span>
          </div>
          <h3 class="card-title">${event.title}</h3>
          <p class="mb-2" style="color: #00ffcc;">
            <i class="fas fa-location-dot me-2"></i>${event.location}
          </p>
          <p class="card-text">${event.description}</p>
        </div>
      </div>
    `).join('');

    // Re-observe newly added elements
    document.querySelectorAll('#events-container .reveal').forEach(el => {
      revealObserver.observe(el);
    });
  }

  // ============================================
  // GALLERY LIGHTBOX WITH ANIMATION
  // ============================================
  const galleryModal = document.getElementById('galleryModal');
  
  if (galleryModal) {
    const modalImage = galleryModal.querySelector('img');
    const modalCaption = galleryModal.querySelector('.modal-title');

    document.querySelectorAll('[data-bs-toggle="modal"]').forEach(img => {
      img.addEventListener('click', function() {
        modalImage.style.opacity = '0';
        modalImage.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
          modalImage.src = this.src;
          modalCaption.textContent = this.alt;
          
          modalImage.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
          modalImage.style.opacity = '1';
          modalImage.style.transform = 'scale(1)';
        }, 100);
      });
    });
  }

  // ============================================
  // CONTACT FORM WITH ADVANCED UX
  // ============================================
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    
    // Add floating label effect
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        if (!this.value) {
          this.parentElement.classList.remove('focused');
        }
      });
    });

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Create success notification
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: linear-gradient(135deg, #00ff88, #00ffcc);
        color: #0a0e1a;
        padding: 1.5rem 2rem;
        border-radius: 16px;
        font-weight: 700;
        box-shadow: 0 0 40px rgba(0, 255, 136, 0.5);
        z-index: 9999;
        animation: slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      `;
      notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
          <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
          <div>
            <div style="font-weight: 800; margin-bottom: 0.25rem;">Başarılı!</div>
            <div style="font-size: 0.875rem; opacity: 0.8;">Mesajınız alındı. En kısa sürede dönüş yapacağız.</div>
          </div>
        </div>
      `;
      
      document.body.appendChild(notification);
      
      // Add slide in animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
      
      contactForm.reset();
      
      // Remove notification after 5 seconds
      setTimeout(() => {
        notification.style.animation = 'slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) reverse';
        setTimeout(() => notification.remove(), 500);
      }, 5000);
    });
  }

  // ============================================
  // PARALLAX EFFECT FOR HERO
  // ============================================
  const heroSection = document.querySelector('.hero-ultra');
  
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      
      if (scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    });
  }

  // ============================================
  // CURSOR TRAIL EFFECT (Desktop Only)
  // ============================================
  if (window.innerWidth > 768) {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.cursor-trail');
    
    // Create cursor trail elements if they don't exist
    if (circles.length === 0) {
      for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.className = 'cursor-trail';
        circle.style.cssText = `
          position: fixed;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--quantum-green), transparent);
          pointer-events: none;
          z-index: 9999;
          opacity: 0;
          transition: opacity 0.3s;
        `;
        document.body.appendChild(circle);
      }
    }

    const allCircles = document.querySelectorAll('.cursor-trail');

    window.addEventListener('mousemove', (e) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    });

    function animateCircles() {
      let x = coords.x;
      let y = coords.y;
      
      allCircles.forEach((circle, index) => {
        circle.style.left = x - 5 + 'px';
        circle.style.top = y - 5 + 'px';
        circle.style.opacity = (20 - index) / 40;
        circle.style.transform = `scale(${(20 - index) / 20})`;

        const nextCircle = allCircles[index + 1] || allCircles[0];
        x += (parseInt(nextCircle.style.left) || coords.x) / 20;
        y += (parseInt(nextCircle.style.top) || coords.y) / 20;
      });
      
      requestAnimationFrame(animateCircles);
    }

    animateCircles();
  }

  // ============================================
  // DYNAMIC YEAR IN FOOTER
  // ============================================
  const yearSpan = document.querySelector('[data-year]');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ============================================
  // LOADING ANIMATION COMPLETE
  // ============================================
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  });

})();

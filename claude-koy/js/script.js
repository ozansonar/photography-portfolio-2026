// Claude Köy - Interactive Experience Layer

(function() {
  'use strict';

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar-premium');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Dynamic Events Rendering
  const eventContainer = document.getElementById('events-container');
  if (eventContainer) {
    const events = [
      {
        date: '16 Şubat 2026',
        title: 'Kış Buluşması',
        location: 'Köy Meydanı',
        description: 'Köy halkı dayanışma toplantısı. Sıcak çay ve simit ikramı yapılacaktır.',
        icon: 'fa-mug-hot'
      },
      {
        date: '10 Mart 2026',
        title: 'Fidan Dikim Günü',
        location: 'Köy Girişi',
        description: 'Çevre bilinci kapsamında toplu fidan dikimi. Herkes davetlidir.',
        icon: 'fa-seedling'
      },
      {
        date: '23 Nisan 2026',
        title: 'Çocuk Şenliği',
        location: 'İlkokul Bahçesi',
        description: '23 Nisan Ulusal Egemenlik ve Çocuk Bayramı kutlamaları ve etkinlikler.',
        icon: 'fa-children'
      },
      {
        date: '15 Ağustos 2026',
        title: 'Yaz Şenliği',
        location: 'Harman Yeri',
        description: 'Yöresel yemekler, müzik ve halk oyunları gösterileri.',
        icon: 'fa-music'
      }
    ];

    const renderEvents = () => {
      eventContainer.innerHTML = events.map(event => `
        <div class="col-md-6 mb-4">
          <div class="info-card">
            <div class="d-flex align-items-start justify-content-between mb-3">
              <div class="info-card-icon" style="width: 56px; height: 56px; font-size: 1.5rem;">
                <i class="fas ${event.icon}"></i>
              </div>
              <span class="badge bg-success">${event.date}</span>
            </div>
            <h4>${event.title}</h4>
            <p class="mb-2"><i class="fas fa-location-dot me-2"></i>${event.location}</p>
            <p class="mb-0">${event.description}</p>
          </div>
        </div>
      `).join('');
    };

    renderEvents();
  }

  // Gallery Lightbox
  const galleryModal = document.getElementById('galleryModal');
  if (galleryModal) {
    const modalImage = galleryModal.querySelector('img');
    const modalCaption = galleryModal.querySelector('.modal-title');

    document.querySelectorAll('[data-bs-toggle="modal"]').forEach(img => {
      img.addEventListener('click', function() {
        modalImage.src = this.src;
        modalCaption.textContent = this.alt;
      });
    });
  }

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show success message
      const alert = document.createElement('div');
      alert.className = 'alert alert-success alert-dismissible fade show mt-3';
      alert.innerHTML = `
        <strong>Başarılı!</strong> Mesajınız alındı. En kısa sürede size dönüş yapacağız.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      contactForm.appendChild(alert);
      contactForm.reset();

      // Auto dismiss after 5 seconds
      setTimeout(() => {
        alert.remove();
      }, 5000);
    });
  }

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.info-card, .news-card').forEach(el => {
    observer.observe(el);
  });

  // Current year in footer
  const yearSpan = document.querySelector('[data-year]');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

})();

// =================================
// ADMIN PANEL JAVASCRIPT
// =================================

(function() {
    'use strict';

    // =================================
    // NAVIGATION
    // =================================

    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    const pages = document.querySelectorAll('.page-content');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Hide all pages
            pages.forEach(p => p.classList.remove('active'));
            
            // Show selected page
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
                // Add animation
                targetPage.querySelectorAll('.animate__animated').forEach((el, i) => {
                    el.style.animationDelay = `${i * 0.1}s`;
                });
            }
        });
    });

    // =================================
    // SIDEBAR TOGGLE
    // =================================

    const sidebar = document.getElementById('sidebar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebarToggle = document.getElementById('sidebarToggle');

    function toggleSidebar() {
        sidebar.classList.toggle('active');
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleSidebar);
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    // =================================
    // THEME TOGGLE
    // =================================

    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem('adminTheme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('adminTheme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'bi bi-sun-fill';
        } else {
            icon.className = 'bi bi-moon-fill';
        }
    }

    // =================================
    // COUNTER ANIMATION
    // =================================

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    // Animate counters when dashboard is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    if (counter.textContent === '0') {
                        animateCounter(counter);
                    }
                });
            }
        });
    });

    const dashboard = document.getElementById('dashboard');
    if (dashboard) {
        observer.observe(dashboard);
    }

    // =================================
    // CHARTS
    // =================================

    // Visitors Chart
    const visitorsCtx = document.getElementById('visitorsChart');
    if (visitorsCtx) {
        new Chart(visitorsCtx, {
            type: 'line',
            data: {
                labels: ['Pzt', 'Çrş', 'Per', 'Cm', 'Cmt', 'Cts', 'Pzr'],
                datasets: [{
                    label: 'Ziyaretçi',
                    data: [1200, 1900, 1500, 2100, 1800, 2400, 2200],
                    borderColor: '#6366F1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#6366F1',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255,255,255,0.05)'
                        },
                        ticks: {
                            color: '#64748B'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#64748B'
                        }
                    }
                }
            }
        });
    }

    // Traffic Chart
    const trafficCtx = document.getElementById('trafficChart');
    if (trafficCtx) {
        new Chart(trafficCtx, {
            type: 'doughnut',
            data: {
                labels: ['Direkt', 'Sosyal Medya', 'Arama', 'Diğer'],
                datasets: [{
                    data: [35, 28, 25, 12],
                    backgroundColor: [
                        '#6366F1',
                        '#10B981',
                        '#F59E0B',
                        '#EF4444'
                    ],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#64748B',
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }

    // =================================
    // GALLERY FILTERS
    // =================================

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Add filter logic here
        });
    });

    // =================================
    // VIEW OPTIONS
    // =================================

    const viewBtns = document.querySelectorAll('.view-btn');
    const galleryGrid = document.querySelector('.gallery-grid');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const icon = btn.querySelector('i');
            if (icon.classList.contains('bi-list')) {
                galleryGrid.style.gridTemplateColumns = '1fr';
            } else {
                galleryGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
            }
        });
    });

    // =================================
    // FULLSCREEN
    // =================================

    const fullscreenBtn = document.querySelector('.topbar-btn[title="Tam Ekran"]');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });
    }

    // =================================
    // CONSOLE MESSAGE
    // =================================

    console.log('%c🚀 Admin Panel Loaded!', 'color: #6366F1; font-size: 20px; font-weight: bold;');
    console.log('%cWelcome to Ultra Modern Admin Panel 2026', 'color: #10B981; font-size: 14px;');

})();
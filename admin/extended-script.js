// =================================
// EXTENDED ADMIN PANEL JAVASCRIPT
// =================================

(function() {
    'use strict';

    // Wait for DOM to load
    document.addEventListener('DOMContentLoaded', () => {

        // =================================
        // PERFORMANCE CHART (Analytics)
        // =================================

        const performanceCtx = document.getElementById('performanceChart');
        if (performanceCtx) {
            new Chart(performanceCtx, {
                type: 'line',
                data: {
                    labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
                    datasets: [{
                        label: 'Görüntüleme',
                        data: [12000, 19000, 15000, 21000, 18000, 24000, 22000, 27000, 25000, 30000, 28000, 33000],
                        borderColor: '#6366F1',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointBackgroundColor: '#6366F1',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
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

        // =================================
        // DEVICE CHART (Analytics)
        // =================================

        const deviceCtx = document.getElementById('deviceChart');
        if (deviceCtx) {
            new Chart(deviceCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Desktop', 'Mobile', 'Tablet'],
                    datasets: [{
                        data: [52, 35, 13],
                        backgroundColor: [
                            '#6366F1',
                            '#10B981',
                            '#F59E0B'
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
        // PROGRESS BAR ANIMATION
        // =================================

        const animateProgressBars = () => {
            const progressBars = document.querySelectorAll('.progress');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const width = entry.target.style.width;
                        entry.target.style.width = '0';
                        setTimeout(() => {
                            entry.target.style.width = width;
                        }, 100);
                        observer.unobserve(entry.target);
                    }
                });
            });

            progressBars.forEach(bar => observer.observe(bar));
        };

        animateProgressBars();

        // =================================
        // SETTINGS NAV
        // =================================

        const settingsNavItems = document.querySelectorAll('.settings-nav-item');
        settingsNavItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                settingsNavItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // =================================
        // FILE UPLOAD PREVIEW
        // =================================

        const profileUploadBtn = document.querySelector('.profile-upload button');
        if (profileUploadBtn) {
            profileUploadBtn.addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            const img = document.getElementById('profileImage');
                            if (img) {
                                img.src = event.target.result;
                            }
                        };
                        reader.readAsDataURL(file);
                    }
                };
                input.click();
            });
        }

        // =================================
        // SELECT ALL MESSAGES
        // =================================

        const messageCheckboxes = document.querySelectorAll('.message-item input[type="checkbox"]');
        messageCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const item = checkbox.closest('.message-item');
                if (checkbox.checked) {
                    item.style.background = 'rgba(99, 102, 241, 0.1)';
                } else {
                    item.style.background = '';
                }
            });
        });

        // =================================
        // CONSOLE MESSAGE
        // =================================

        console.log('%c✨ Extended Features Loaded!', 'color: #10B981; font-size: 16px; font-weight: bold;');

    });

})();
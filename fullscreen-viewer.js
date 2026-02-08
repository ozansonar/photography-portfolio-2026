// ================================================
// FULLSCREEN PORTFOLIO VIEWER
// Immersive Photography Experience
// ================================================

(function() {
    'use strict';

    // Portfolio data
    const portfolioData = [
        {
            src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1920&h=1280&fit=crop',
            thumb: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=150&fit=crop',
            title: 'Doğal Işık Portre',
            category: 'Portre',
            story: 'Sabahın erken saatlerinde, doğal gün ışığının penceremden içeri süzüldüğü an yakalanmış bir kare. Modelin doğal güzelliği ve ışığın yumuşak geçişleri ile duygusal bir atmosfer yaratıldı.',
            exif: {
                camera: 'Canon EOS R5',
                lens: 'RF 50mm f/1.2',
                iso: '400',
                aperture: 'f/2.8',
                shutter: '1/250s',
                focal: '50mm'
            }
        },
        {
            src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1280&fit=crop',
            thumb: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=200&h=150&fit=crop',
            title: 'Özel Anlar',
            category: 'Düğün',
            story: 'Bir çiftin en mutlu günü... Gelin ve damadın birbirlerine baktıkları o özel an, zamansız bir aşk hikayesi anlatıyor. Her detay mükemmel bir şekilde yakalanmış.',
            exif: {
                camera: 'Sony A7 IV',
                lens: '85mm f/1.4',
                iso: '800',
                aperture: 'f/1.8',
                shutter: '1/160s',
                focal: '85mm'
            }
        },
        {
            src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1280&fit=crop',
            thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop',
            title: 'Dağ Manzarası',
            category: 'Doğa',
            story: 'Alpler\'de gün batımı... Doğanın ihtişamı karşısında kelimeler yetersiz kalıyor. Bulutların arasından süzülen ışık huzmesi, dağların zirvesine dokunuyor.',
            exif: {
                camera: 'Nikon Z9',
                lens: '24-70mm f/2.8',
                iso: '100',
                aperture: 'f/8',
                shutter: '1/500s',
                focal: '35mm'
            }
        },
        {
            src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&h=1280&fit=crop',
            thumb: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=200&h=150&fit=crop',
            title: 'Şehir Işıkları',
            category: 'Sokak',
            story: 'Gece yarısı şehrin nabzını tutmak... Neon ışıkları, yağmurlu sokaklar ve şehrin bitmeyen enerjisi. Her kare modern yaşamın bir parçasını yansıtıyor.',
            exif: {
                camera: 'Fujifilm X-T5',
                lens: '23mm f/1.4',
                iso: '3200',
                aperture: 'f/2',
                shutter: '1/60s',
                focal: '23mm'
            }
        },
        {
            src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920&h=1280&fit=crop',
            thumb: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=200&h=150&fit=crop',
            title: 'Konseptüel Sanat',
            category: 'Sanat',
            story: 'Hayal gücü ve gerçekliğin buluştuğu nokta... Bu konsept çekim için haftalarca hazırlık yapıldı. Işık, renk ve kompozisyon mükemmel bir uyum içinde.',
            exif: {
                camera: 'Canon EOS R6',
                lens: 'RF 35mm f/1.8',
                iso: '640',
                aperture: 'f/2.2',
                shutter: '1/125s',
                focal: '35mm'
            }
        },
        {
            src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1280&fit=crop',
            thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop',
            title: 'Stüdyo Çekimi',
            category: 'Portre',
            story: 'Kontrollü ışıklandırma ve profesyonel stüdyo ortamında gerçekleştirilen bu çekim, modelin karakterini mükemmel bir şekilde yansıtıyor. Her detay özenle planlandı.',
            exif: {
                camera: 'Sony A7R V',
                lens: '70-200mm f/2.8',
                iso: '200',
                aperture: 'f/4',
                shutter: '1/200s',
                focal: '135mm'
            }
        }
    ];

    let currentIndex = 0;
    let isZoomed = false;

    // DOM Elements
    const viewer = document.getElementById('fullscreenViewer');
    const mainImage = document.getElementById('fsMainImage');
    const fsTitle = document.getElementById('fsTitle');
    const currentIndexEl = document.getElementById('currentIndex');
    const totalImagesEl = document.getElementById('totalImages');
    const infoPanel = document.getElementById('fsInfoPanel');
    const thumbnailStrip = document.getElementById('fsThumbnailStrip');

    // Initialize
    function init() {
        totalImagesEl.textContent = portfolioData.length;
        generateThumbnails();
        setupEventListeners();
    }

    // Generate thumbnails
    function generateThumbnails() {
        thumbnailStrip.innerHTML = '';
        portfolioData.forEach((item, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'fs-thumbnail';
            if (index === 0) thumb.classList.add('active');
            thumb.innerHTML = `<img src="${item.thumb}" alt="${item.title}">`;
            thumb.addEventListener('click', () => showImage(index));
            thumbnailStrip.appendChild(thumb);
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Close button
        document.getElementById('fsClose').addEventListener('click', closeViewer);

        // Navigation
        document.getElementById('fsPrev').addEventListener('click', () => navigate(-1));
        document.getElementById('fsNext').addEventListener('click', () => navigate(1));

        // Info toggle
        document.getElementById('infoToggle').addEventListener('click', toggleInfo);

        // Zoom
        document.getElementById('zoomIn').addEventListener('click', () => zoom(true));
        document.getElementById('zoomOut').addEventListener('click', () => zoom(false));

        // Download
        document.getElementById('downloadBtn').addEventListener('click', downloadImage);

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);

        // Close on background click
        viewer.addEventListener('click', (e) => {
            if (e.target === viewer) closeViewer();
        });
    }

    // Open viewer
    window.openFullscreenViewer = function(index) {
        currentIndex = index;
        showImage(index);
        viewer.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Close viewer
    function closeViewer() {
        viewer.classList.remove('active');
        document.body.style.overflow = '';
        infoPanel.classList.remove('active');
        if (isZoomed) zoom(false);
    }

    // Show image
    function showImage(index) {
        currentIndex = index;
        const item = portfolioData[index];

        // Update main image
        mainImage.src = item.src;
        mainImage.alt = item.title;

        // Update info
        fsTitle.textContent = item.title;
        currentIndexEl.textContent = index + 1;

        document.getElementById('fsInfoTitle').textContent = item.title;
        document.getElementById('fsInfoCategory').textContent = item.category;
        document.getElementById('fsInfoStory').textContent = item.story;

        // Update EXIF
        document.getElementById('exifCamera').textContent = item.exif.camera;
        document.getElementById('exifLens').textContent = item.exif.lens;
        document.getElementById('exifISO').textContent = item.exif.iso;
        document.getElementById('exifAperture').textContent = item.exif.aperture;
        document.getElementById('exifShutter').textContent = item.exif.shutter;
        document.getElementById('exifFocal').textContent = item.exif.focal;

        // Update active thumbnail
        document.querySelectorAll('.fs-thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });

        // Scroll thumbnail into view
        const activeThumb = thumbnailStrip.children[index];
        if (activeThumb) {
            activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }

    // Navigate
    function navigate(direction) {
        currentIndex = (currentIndex + direction + portfolioData.length) % portfolioData.length;
        showImage(currentIndex);
    }

    // Toggle info panel
    function toggleInfo() {
        infoPanel.classList.toggle('active');
    }

    // Zoom
    function zoom(zoomIn) {
        if (zoomIn) {
            mainImage.classList.add('zoomed');
            isZoomed = true;
        } else {
            mainImage.classList.remove('zoomed');
            isZoomed = false;
        }
    }

    // Download image
    function downloadImage() {
        const link = document.createElement('a');
        link.href = portfolioData[currentIndex].src;
        link.download = `${portfolioData[currentIndex].title}.jpg`;
        link.click();
    }

    // Keyboard navigation
    function handleKeyboard(e) {
        if (!viewer.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeViewer();
                break;
            case 'ArrowLeft':
                navigate(-1);
                break;
            case 'ArrowRight':
                navigate(1);
                break;
            case 'i':
            case 'I':
                toggleInfo();
                break;
            case '+':
            case '=':
                zoom(true);
                break;
            case '-':
            case '_':
                zoom(false);
                break;
        }
    }

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

console.log('%c🎬 Fullscreen Viewer Loaded', 'color: #4ECDC4; font-size: 16px; font-weight: bold;');
console.log('%cKeyboard Shortcuts:', 'color: #FFE66D; font-weight: bold;');
console.log('← → : Navigate');
console.log('ESC : Close');
console.log('I : Toggle Info');
console.log('+ - : Zoom');
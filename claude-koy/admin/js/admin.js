/*
==============================================
ADMIN PANEL JAVASCRIPT
==============================================
*/

// Authentication
const loginForm = document.getElementById('loginForm');
const loginScreen = document.getElementById('loginScreen');
const adminPanel = document.getElementById('adminPanel');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Demo authentication
    if (username === 'admin' && password === 'admin123') {
      loginScreen.style.display = 'none';
      adminPanel.style.display = 'flex';
      loadPage('dashboard');
    } else {
      alert('Hatalı kullanıcı adı veya şifre!');
    }
  });
}

// Logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
      adminPanel.style.display = 'none';
      loginScreen.style.display = 'flex';
      document.getElementById('loginForm').reset();
    }
  });
}

// Navigation
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const page = item.getAttribute('data-page');
    
    // Update active state
    navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
    
    // Load page
    loadPage(page);
  });
});

// Page Loader
function loadPage(page) {
  const contentArea = document.getElementById('contentArea');
  const pageTitle = document.getElementById('pageTitle');
  const pageSubtitle = document.getElementById('pageSubtitle');

  switch(page) {
    case 'dashboard':
      pageTitle.textContent = 'Dashboard';
      pageSubtitle.textContent = 'Hoş geldiniz, Admin';
      loadDashboard();
      break;
    case 'news':
      pageTitle.textContent = 'Haberler';
      pageSubtitle.textContent = 'Tüm haberlerinizi yönetin';
      loadNews();
      break;
    case 'events':
      pageTitle.textContent = 'Etkinlikler';
      pageSubtitle.textContent = 'Etkinliklerinizi yönetin';
      loadEvents();
      break;
    case 'businesses':
      pageTitle.textContent = 'Esnaflar';
      pageSubtitle.textContent = 'İşletmeleri yönetin';
      loadBusinesses();
      break;
    case 'gallery':
      pageTitle.textContent = 'Galeri';
      pageSubtitle.textContent = 'Fotoğrafları yönetin';
      loadGallery();
      break;
    case 'members':
      pageTitle.textContent = 'Üyeler';
      pageSubtitle.textContent = 'Dernek üyelerini yönetin';
      loadMembers();
      break;
    case 'settings':
      pageTitle.textContent = 'Ayarlar';
      pageSubtitle.textContent = 'Site ayarlarını düzenleyin';
      loadSettings();
      break;
  }
}

// Dashboard
function loadDashboard() {
  const contentArea = document.getElementById('contentArea');
  contentArea.innerHTML = `
    <!-- Stats Cards -->
    <div class="row g-4 mb-4">
      <div class="col-xl-3 col-md-6">
        <div class="stat-card fade-in">
          <div class="stat-card-header">
            <div class="stat-icon" style="background: linear-gradient(135deg, #654321, #8b6f47);">
              <i class="fas fa-newspaper"></i>
            </div>
          </div>
          <h3>127</h3>
          <p>Toplam Haber</p>
          <div class="stat-trend up">
            <i class="fas fa-arrow-up"></i>
            <span>+12% bu ay</span>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="stat-card fade-in" style="animation-delay: 0.1s;">
          <div class="stat-card-header">
            <div class="stat-icon" style="background: linear-gradient(135deg, #2e7d32, #4caf50);">
              <i class="fas fa-calendar-alt"></i>
            </div>
          </div>
          <h3>48</h3>
          <p>Etkinlikler</p>
          <div class="stat-trend up">
            <i class="fas fa-arrow-up"></i>
            <span>+8 yeni</span>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="stat-card fade-in" style="animation-delay: 0.2s;">
          <div class="stat-card-header">
            <div class="stat-icon" style="background: linear-gradient(135deg, #d4af37, #f4c430);">
              <i class="fas fa-store"></i>
            </div>
          </div>
          <h3>24</h3>
          <p>Esnaf & İşletme</p>
          <div class="stat-trend up">
            <i class="fas fa-arrow-up"></i>
            <span>+2 yeni</span>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="stat-card fade-in" style="animation-delay: 0.3s;">
          <div class="stat-card-header">
            <div class="stat-icon" style="background: linear-gradient(135deg, #5D7092, #7C93B4);">
              <i class="fas fa-users"></i>
            </div>
          </div>
          <h3>450</h3>
          <p>Kayıtlı Üye</p>
          <div class="stat-trend up">
            <i class="fas fa-arrow-up"></i>
            <span>+15 bu ay</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="row g-4 mb-4">
      <div class="col-xl-8">
        <div class="chart-card fade-in">
          <h4><i class="fas fa-chart-line me-2"></i>Ziyaretçi İstatistikleri</h4>
          <canvas id="visitorsChart" height="80"></canvas>
        </div>
      </div>
      <div class="col-xl-4">
        <div class="chart-card fade-in">
          <h4><i class="fas fa-chart-pie me-2"></i>İçerik Dağılımı</h4>
          <canvas id="contentChart" height="200"></canvas>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="row g-4">
      <div class="col-12">
        <div class="data-table fade-in">
          <div class="table-header">
            <h4><i class="fas fa-history me-2"></i>Son Aktiviteler</h4>
          </div>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Kullanıcı</th>
                  <th>İşlem</th>
                  <th>Tarih</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Ahmet Yılmaz</strong></td>
                  <td>Yeni haber ekledi: "Yol Çalışmaları Başladı"</td>
                  <td>5 dakika önce</td>
                  <td><span class="status-badge published">Yayınlandı</span></td>
                </tr>
                <tr>
                  <td><strong>Hasan Koç</strong></td>
                  <td>Etkinlik güncelledi: "Bahar Şenliği"</td>
                  <td>23 dakika önce</td>
                  <td><span class="status-badge published">Yayınlandı</span></td>
                </tr>
                <tr>
                  <td><strong>Admin</strong></td>
                  <td>Yeni esnaf ekledi: "Köy Marketim"</td>
                  <td>1 saat önce</td>
                  <td><span class="status-badge draft">Taslak</span></td>
                </tr>
                <tr>
                  <td><strong>Mehmet Kaya</strong></td>
                  <td>Galeri resmi yükledi</td>
                  <td>2 saat önce</td>
                  <td><span class="status-badge published">Yayınlandı</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize Charts
  initializeCharts();
}

// Initialize Charts
function initializeCharts() {
  // Visitors Chart
  const visitorsCtx = document.getElementById('visitorsChart');
  if (visitorsCtx) {
    new Chart(visitorsCtx, {
      type: 'line',
      data: {
        labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
        datasets: [{
          label: 'Ziyaretçi Sayısı',
          data: [1200, 1900, 1500, 2400, 2100, 2800],
          borderColor: '#654321',
          backgroundColor: 'rgba(101, 67, 33, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Content Chart
  const contentCtx = document.getElementById('contentChart');
  if (contentCtx) {
    new Chart(contentCtx, {
      type: 'doughnut',
      data: {
        labels: ['Haberler', 'Etkinlikler', 'Esnaflar', 'Galeri'],
        datasets: [{
          data: [127, 48, 24, 156],
          backgroundColor: [
            '#654321',
            '#2e7d32',
            '#d4af37',
            '#5D7092'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
}

// Load News Page
function loadNews() {
  const contentArea = document.getElementById('contentArea');
  contentArea.innerHTML = `
    <div class="data-table fade-in">
      <div class="table-header">
        <h4><i class="fas fa-newspaper me-2"></i>Tüm Haberler</h4>
        <button class="btn btn-primary">
          <i class="fas fa-plus me-2"></i>Yeni Haber Ekle
        </button>
      </div>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Başlık</th>
              <th>Kategori</th>
              <th>Yazar</th>
              <th>Tarih</th>
              <th>Durum</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Yeni Yol Çalışmaları Başladı</strong></td>
              <td>Altyapı</td>
              <td>Ahmet Yılmaz</td>
              <td>05.02.2026</td>
              <td><span class="status-badge published">Yayınlandı</span></td>
              <td>
                <button class="action-btn"><i class="fas fa-edit"></i></button>
                <button class="action-btn"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
            <tr>
              <td><strong>Burs Başvuruları Başladı</strong></td>
              <td>Eğitim</td>
              <td>Hasan Koç</td>
              <td>03.02.2026</td>
              <td><span class="status-badge published">Yayınlandı</span></td>
              <td>
                <button class="action-btn"><i class="fas fa-edit"></i></button>
                <button class="action-btn"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
            <tr>
              <td><strong>Bahar Şenliği Duyurusu</strong></td>
              <td>Etkinlik</td>
              <td>Admin</td>
              <td>01.02.2026</td>
              <td><span class="status-badge draft">Taslak</span></td>
              <td>
                <button class="action-btn"><i class="fas fa-edit"></i></button>
                <button class="action-btn"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Load Events Page
function loadEvents() {
  const contentArea = document.getElementById('contentArea');
  contentArea.innerHTML = `
    <div class="data-table fade-in">
      <div class="table-header">
        <h4><i class="fas fa-calendar-alt me-2"></i>Tüm Etkinlikler</h4>
        <button class="btn btn-primary">
          <i class="fas fa-plus me-2"></i>Yeni Etkinlik Ekle
        </button>
      </div>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Etkinlik Adı</th>
              <th>Tarih</th>
              <th>Konum</th>
              <th>Katılımcı</th>
              <th>Durum</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Bahar Şenliği</strong></td>
              <td>21 Mart 2026</td>
              <td>Köy Meydanı</td>
              <td>250 kişi</td>
              <td><span class="status-badge published">Aktif</span></td>
              <td>
                <button class="action-btn"><i class="fas fa-edit"></i></button>
                <button class="action-btn"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
            <tr>
              <td><strong>Geleneksel Panayır</strong></td>
              <td>15 Nisan 2026</td>
              <td>Çarşı Merkezi</td>
              <td>180 kişi</td>
              <td><span class="status-badge published">Aktif</span></td>
              <td>
                <button class="action-btn"><i class="fas fa-edit"></i></button>
                <button class="action-btn"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Load Businesses Page
function loadBusinesses() {
  const contentArea = document.getElementById('contentArea');
  contentArea.innerHTML = `
    <div class="data-table fade-in">
      <div class="table-header">
        <h4><i class="fas fa-store me-2"></i>Tüm Esnaflar</h4>
        <button class="btn btn-primary">
          <i class="fas fa-plus me-2"></i>Yeni Esnaf Ekle
        </button>
      </div>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>İşletme Adı</th>
              <th>Kategori</th>
              <th>Sahibi</th>
              <th>Telefon</th>
              <th>Durum</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Köy Marketim</strong></td>
              <td>Gıda & Market</td>
              <td>Ali Demir</td>
              <td>+90 555 123 4567</td>
              <td><span class="status-badge published">Aktif</span></td>
              <td>
                <button class="action-btn"><i class="fas fa-edit"></i></button>
                <button class="action-btn"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
            <tr>
              <td><strong>Köy Fırını</strong></td>
              <td>Gıda</td>
              <td>Mehmet Öztürk</td>
              <td>+90 555 234 5678</td>
              <td><span class="status-badge published">Aktif</span></td>
              <td>
                <button class="action-btn"><i class="fas fa-edit"></i></button>
                <button class="action-btn"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Load Gallery Page
function loadGallery() {
  const contentArea = document.getElementById('contentArea');
  contentArea.innerHTML = `
    <div class="form-card fade-in">
      <h4><i class="fas fa-images me-2"></i>Galeri Yönetimi</h4>
      <p class="text-muted">Galeri sayfası yakında eklenecektir...</p>
    </div>
  `;
}

// Load Members Page
function loadMembers() {
  const contentArea = document.getElementById('contentArea');
  contentArea.innerHTML = `
    <div class="data-table fade-in">
      <div class="table-header">
        <h4><i class="fas fa-users me-2"></i>Dernek Üyeleri</h4>
        <button class="btn btn-primary">
          <i class="fas fa-plus me-2"></i>Yeni Üye Ekle
        </button>
      </div>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Ad Soyad</th>
              <th>E-posta</th>
              <th>Telefon</th>
              <th>Üyelik Tarihi</th>
              <th>Durum</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Ahmet Yılmaz</strong></td>
              <td>ahmet@example.com</td>
              <td>+90 555 111 2233</td>
              <td>15.01.2020</td>
              <td><span class="status-badge published">Aktif</span></td>
              <td>
                <button class="action-btn"><i class="fas fa-edit"></i></button>
                <button class="action-btn"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Load Settings Page
function loadSettings() {
  const contentArea = document.getElementById('contentArea');
  contentArea.innerHTML = `
    <div class="form-card fade-in">
      <h4><i class="fas fa-cog me-2"></i>Site Ayarları</h4>
      <form>
        <div class="mb-3">
          <label class="form-label">Site Başlığı</label>
          <input type="text" class="form-control" value="Palabıyık Köyü">
        </div>
        <div class="mb-3">
          <label class="form-label">Site Açıklaması</label>
          <textarea class="form-control" rows="3">Çorum'un doğal güzellikleri ve zengin kültürüyle öne çıkan köyümüz.</textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">İletişim E-postası</label>
          <input type="email" class="form-control" value="info@palabiyik.com">
        </div>
        <div class="mb-3">
          <label class="form-label">Telefon</label>
          <input type="tel" class="form-control" value="+90 555 123 4567">
        </div>
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-save me-2"></i>Kaydet
        </button>
      </form>
    </div>
  `;
}

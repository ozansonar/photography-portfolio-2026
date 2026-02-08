// =================================
// EXTENDED ADMIN PAGES CONTENT
// =================================

// Bu dosyayı admin/index.html'in sonuna ekleyin: <script src="admin-extended.js"></script>

(function() {
    'use strict';

    // =================================
    // BLOG PAGE CONTENT
    // =================================
    
    const blogContent = `
        <div class="page-header animate__animated animate__fadeInDown">
            <div>
                <h1>Blog Yönetimi</h1>
                <p>Blog yazılarınızı oluşturun ve yönetin</p>
            </div>
            <button class="btn-primary" data-bs-toggle="modal" data-bs-target="#newBlogModal">
                <i class="bi bi-plus-lg"></i> Yeni Blog Yazısı
            </button>
        </div>

        <div class="row g-4 mb-4">
            <div class="col-md-3">
                <div class="stat-card animate__animated animate__fadeInUp">
                    <div class="stat-icon bg-primary"><i class="bi bi-file-text"></i></div>
                    <div class="stat-info">
                        <h3>24</h3>
                        <p>Toplam Yazı</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card animate__animated animate__fadeInUp" style="animation-delay:0.1s">
                    <div class="stat-icon bg-success"><i class="bi bi-check-circle"></i></div>
                    <div class="stat-info">
                        <h3>18</h3>
                        <p>Yayında</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card animate__animated animate__fadeInUp" style="animation-delay:0.2s">
                    <div class="stat-icon bg-warning"><i class="bi bi-clock"></i></div>
                    <div class="stat-info">
                        <h3>4</h3>
                        <p>Taslak</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card animate__animated animate__fadeInUp" style="animation-delay:0.3s">
                    <div class="stat-icon bg-info"><i class="bi bi-eye"></i></div>
                    <div class="stat-info">
                        <h3>12.5K</h3>
                        <p>Toplam Görüntüleme</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="card animate__animated animate__fadeInUp" style="animation-delay:0.4s">
            <div class="card-header">
                <h3>Tüm Blog Yazıları</h3>
                <div class="card-actions">
                    <input type="text" class="form-control" placeholder="Ara..." style="width:200px;padding:0.5rem;">
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0" style="color:var(--light);">
                        <thead style="border-bottom:1px solid rgba(255,255,255,0.1);">
                            <tr>
                                <th style="padding:1rem;">Başlık</th>
                                <th>Kategori</th>
                                <th>Tarih</th>
                                <th>Görüntülenme</th>
                                <th>Durum</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                <td style="padding:1rem;">
                                    <div class="d-flex align-items-center gap-3">
                                        <img src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=60&h=45&fit=crop" style="width:60px;height:45px;border-radius:0.5rem;object-fit:cover;">
                                        <div>
                                            <strong>Doğal Işıkta Portre Çekimi</strong>
                                            <small class="text-muted d-block">10 dk okuma</small>
                                        </div>
                                    </div>
                                </td>
                                <td><span class="badge" style="background:rgba(99,102,241,0.2);color:#6366F1;">Portre</span></td>
                                <td>5 Şub 2026</td>
                                <td>1,245</td>
                                <td><span class="badge" style="background:rgba(16,185,129,0.2);color:#10B981;">Yayında</span></td>
                                <td>
                                    <button class="btn-icon" style="width:35px;height:35px;"><i class="bi bi-pencil"></i></button>
                                    <button class="btn-icon" style="width:35px;height:35px;border-color:#EF4444;"><i class="bi bi-trash"></i></button>
                                </td>
                            </tr>
                            <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                <td style="padding:1rem;">
                                    <div class="d-flex align-items-center gap-3">
                                        <img src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=60&h=45&fit=crop" style="width:60px;height:45px;border-radius:0.5rem;object-fit:cover;">
                                        <div>
                                            <strong>Düğün Fotoğrafçılığı Sırları</strong>
                                            <small class="text-muted d-block">8 dk okuma</small>
                                        </div>
                                    </div>
                                </td>
                                <td><span class="badge" style="background:rgba(239,68,68,0.2);color:#EF4444;">Düğün</span></td>
                                <td>2 Şub 2026</td>
                                <td>2,540</td>
                                <td><span class="badge" style="background:rgba(16,185,129,0.2);color:#10B981;">Yayında</span></td>
                                <td>
                                    <button class="btn-icon" style="width:35px;height:35px;"><i class="bi bi-pencil"></i></button>
                                    <button class="btn-icon" style="width:35px;height:35px;border-color:#EF4444;"><i class="bi bi-trash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="newBlogModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" style="background:rgba(15,23,42,0.98);border:1px solid rgba(255,255,255,0.1);border-radius:1rem;color:var(--light);">
                    <div class="modal-header" style="border-bottom:1px solid rgba(255,255,255,0.1);">
                        <h5 class="modal-title">Yeni Blog Yazısı</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" style="filter:invert(1);"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Başlık</label>
                                <input type="text" class="form-control" placeholder="Blog yazısı başlığı" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:var(--light);">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Kategori</label>
                                <select class="form-select" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:var(--light);">
                                    <option>Portre</option>
                                    <option>Düğün</option>
                                    <option>Doğa</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">İçerik</label>
                                <textarea class="form-control" rows="6" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:var(--light);"></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Kapak Görseli</label>
                                <input type="file" class="form-control" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:var(--light);">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer" style="border-top:1px solid rgba(255,255,255,0.1);">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
                        <button type="button" class="btn-primary">Yayınla</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // =================================
    // USERS PAGE CONTENT
    // =================================

    const usersContent = `
        <div class="page-header animate__animated animate__fadeInDown">
            <div>
                <h1>Kullanıcı Yönetimi</h1>
                <p>Kullanıcıları görüntüleyin ve yönetin</p>
            </div>
            <button class="btn-primary" data-bs-toggle="modal" data-bs-target="#newUserModal">
                <i class="bi bi-person-plus"></i> Yeni Kullanıcı Ekle
            </button>
        </div>

        <div class="row g-4 mb-4">
            <div class="col-md-4">
                <div class="stat-card animate__animated animate__fadeInUp">
                    <div class="stat-icon bg-primary"><i class="bi bi-people"></i></div>
                    <div class="stat-info">
                        <h3>156</h3>
                        <p>Toplam Kullanıcı</p>
                        <span class="stat-change positive"><i class="bi bi-arrow-up"></i> 12 yeni</span>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="stat-card animate__animated animate__fadeInUp" style="animation-delay:0.1s">
                    <div class="stat-icon bg-success"><i class="bi bi-check-circle"></i></div>
                    <div class="stat-info">
                        <h3>142</h3>
                        <p>Aktif Kullanıcı</p>
                        <span class="stat-change positive"><i class="bi bi-arrow-up"></i> 8.5%</span>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="stat-card animate__animated animate__fadeInUp" style="animation-delay:0.2s">
                    <div class="stat-icon bg-warning"><i class="bi bi-shield-check"></i></div>
                    <div class="stat-info">
                        <h3>5</h3>
                        <p>Admin Kullanıcı</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="card animate__animated animate__fadeInUp" style="animation-delay:0.3s">
            <div class="card-header">
                <h3>Tüm Kullanıcılar</h3>
                <div class="card-actions">
                    <input type="text" class="form-control" placeholder="Kullanıcı ara..." style="width:200px;padding:0.5rem;">
                    <select class="form-select" style="width:150px;padding:0.5rem;">
                        <option>Tüm Roller</option>
                        <option>Admin</option>
                        <option>Editor</option>
                        <option>User</option>
                    </select>
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0" style="color:var(--light);">
                        <thead style="border-bottom:1px solid rgba(255,255,255,0.1);">
                            <tr>
                                <th style="padding:1rem;">Kullanıcı</th>
                                <th>E-posta</th>
                                <th>Rol</th>
                                <th>Kayıt Tarihi</th>
                                <th>Durum</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                <td style="padding:1rem;">
                                    <div class="d-flex align-items-center gap-3">
                                        <img src="https://i.pravatar.cc/50?img=12" style="width:40px;height:40px;border-radius:50%;border:2px solid #6366F1;">
                                        <div>
                                            <strong>Ozan SONAR</strong>
                                            <small class="text-muted d-block">Founder</small>
                                        </div>
                                    </div>
                                </td>
                                <td>ozan@photo.com</td>
                                <td><span class="badge" style="background:rgba(239,68,68,0.2);color:#EF4444;">Super Admin</span></td>
                                <td>1 Oca 2020</td>
                                <td><span class="badge" style="background:rgba(16,185,129,0.2);color:#10B981;"><i class="bi bi-circle-fill" style="font-size:0.5rem;"></i> Online</span></td>
                                <td>
                                    <button class="btn-icon" style="width:35px;height:35px;" title="Düzenle"><i class="bi bi-pencil"></i></button>
                                    <button class="btn-icon" style="width:35px;height:35px;" title="Yetkiler"><i class="bi bi-shield"></i></button>
                                </td>
                            </tr>
                            <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                <td style="padding:1rem;">
                                    <div class="d-flex align-items-center gap-3">
                                        <img src="https://i.pravatar.cc/50?img=5" style="width:40px;height:40px;border-radius:50%;">
                                        <div>
                                            <strong>Ayşe Yılmaz</strong>
                                            <small class="text-muted d-block">Editor</small>
                                        </div>
                                    </div>
                                </td>
                                <td>ayse@photo.com</td>
                                <td><span class="badge" style="background:rgba(99,102,241,0.2);color:#6366F1;">Admin</span></td>
                                <td>15 Mar 2023</td>
                                <td><span class="badge" style="background:rgba(100,116,139,0.2);color:var(--gray);"><i class="bi bi-circle-fill" style="font-size:0.5rem;"></i> Offline</span></td>
                                <td>
                                    <button class="btn-icon" style="width:35px;height:35px;"><i class="bi bi-pencil"></i></button>
                                    <button class="btn-icon" style="width:35px;height:35px;"><i class="bi bi-shield"></i></button>
                                </td>
                            </tr>
                            <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                <td style="padding:1rem;">
                                    <div class="d-flex align-items-center gap-3">
                                        <img src="https://i.pravatar.cc/50?img=33" style="width:40px;height:40px;border-radius:50%;">
                                        <div>
                                            <strong>Mehmet Demir</strong>
                                            <small class="text-muted d-block">Content Creator</small>
                                        </div>
                                    </div>
                                </td>
                                <td>mehmet@photo.com</td>
                                <td><span class="badge" style="background:rgba(245,158,11,0.2);color:#F59E0B;">Editor</span></td>
                                <td>8 Haz 2024</td>
                                <td><span class="badge" style="background:rgba(16,185,129,0.2);color:#10B981;"><i class="bi bi-circle-fill" style="font-size:0.5rem;"></i> Online</span></td>
                                <td>
                                    <button class="btn-icon" style="width:35px;height:35px;"><i class="bi bi-pencil"></i></button>
                                    <button class="btn-icon" style="width:35px;height:35px;"><i class="bi bi-shield"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- New User Modal -->
        <div class="modal fade" id="newUserModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content" style="background:rgba(15,23,42,0.98);border:1px solid rgba(255,255,255,0.1);border-radius:1rem;color:var(--light);">
                    <div class="modal-header" style="border-bottom:1px solid rgba(255,255,255,0.1);">
                        <h5 class="modal-title">Yeni Kullanıcı Ekle</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" style="filter:invert(1);"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Ad Soyad</label>
                                <input type="text" class="form-control" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:var(--light);">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">E-posta</label>
                                <input type="email" class="form-control" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:var(--light);">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Rol</label>
                                <select class="form-select" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:var(--light);">
                                    <option>User</option>
                                    <option>Editor</option>
                                    <option>Admin</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Şifre</label>
                                <input type="password" class="form-control" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:var(--light);">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer" style="border-top:1px solid rgba(255,255,255,0.1);">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
                        <button type="button" class="btn-primary">Kullanıcı Ekle</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // =================================
    // LOAD CONTENT WHEN PAGE CHANGES
    // =================================

    document.addEventListener('DOMContentLoaded', () => {
        const blogPage = document.getElementById('blog');
        const usersPage = document.getElementById('users');

        // Navigation observer
        const navLinks = document.querySelectorAll('.nav-link[data-page]');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const pageId = link.getAttribute('data-page');
                
                if (pageId === 'blog' && blogPage && !blogPage.hasChildNodes()) {
                    blogPage.innerHTML = blogContent;
                }
                if (pageId === 'users' && usersPage && !usersPage.hasChildNodes()) {
                    usersPage.innerHTML = usersContent;
                }
            });
        });
    });

    console.log('%c✨ Extended Pages Loaded', 'color: #10B981; font-size: 16px; font-weight: bold;');

})();
/*
==============================================
NEWS DATATABLE - SERVER SIDE PROCESSING
==============================================
*/

// Mock Server Data (Bu kısım gerçek backend'e bağlandığında kaldırılacak)
function getMockNewsData(start, length, search, orderColumn, orderDir, filters) {
  // Demo veri seti
  const allData = [
    {
      id: 1,
      title: 'Yeni Yol Çalışmaları Başladı',
      excerpt: 'Köy ana caddesinde asfalt yenileme...',
      category: 'Altyapı',
      author: 'Ahmet Yılmaz',
      author_id: 1,
      date: '2026-02-05',
      views: 1234,
      status: 'published',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 2,
      title: 'Burs Başvuruları Başladı',
      excerpt: 'Üniversite öğrencilerine burs...',
      category: 'Eğitim',
      author: 'Hasan Koç',
      author_id: 2,
      date: '2026-02-03',
      views: 856,
      status: 'published',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 3,
      title: 'Bahar Şenliği Duyurusu',
      excerpt: '21 Mart\'ta düzenlenen bahar şenliği...',
      category: 'Etkinlik',
      author: 'Mehmet Kaya',
      author_id: 3,
      date: '2026-02-01',
      views: 542,
      status: 'draft',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 4,
      title: 'Kültür Merkezi Açılıyor',
      excerpt: 'Yeni kültür merkezimiz hizmete giriyor...',
      category: 'Kültür',
      author: 'Ahmet Yılmaz',
      author_id: 1,
      date: '2026-01-28',
      views: 2103,
      status: 'published',
      image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 5,
      title: 'İnternet Altyapısı Yenilendi',
      excerpt: 'Fiber internet altyapısı tamamlandı...',
      category: 'Altyapı',
      author: 'Hasan Koç',
      author_id: 2,
      date: '2026-01-25',
      views: 1876,
      status: 'published',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=100&q=80'
    }
  ];

  // Filtreleme
  let filteredData = allData;
  
  if (search) {
    filteredData = filteredData.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filters.category) {
    filteredData = filteredData.filter(item => 
      item.category.toLowerCase() === filters.category.toLowerCase()
    );
  }

  if (filters.status) {
    filteredData = filteredData.filter(item => item.status === filters.status);
  }

  if (filters.author) {
    filteredData = filteredData.filter(item => item.author_id == filters.author);
  }

  const totalRecords = allData.length;
  const filteredRecords = filteredData.length;

  // Sıralama
  const columns = ['', 'title', 'category', 'author', 'date', 'views', 'status'];
  const sortColumn = columns[orderColumn] || 'date';
  
  filteredData.sort((a, b) => {
    let aVal = a[sortColumn];
    let bVal = b[sortColumn];
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (orderDir === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  // Sayfalama
  const pageData = filteredData.slice(start, start + length);

  return {
    draw: 1,
    recordsTotal: totalRecords,
    recordsFiltered: filteredRecords,
    data: pageData
  };
}

// DataTable Initialization
$(document).ready(function() {
  
  let filters = {
    category: '',
    status: '',
    author: ''
  };

  const table = $('#newsTable').DataTable({
    processing: true,
    serverSide: true,
    responsive: true,
    language: {
      processing: 'Yükleniyor...',
      search: '',
      searchPlaceholder: 'Haber ara...',
      lengthMenu: '_MENU_ kayıt göster',
      info: '_START_-_END_ / _TOTAL_ sonuç',
      infoEmpty: 'Kayıt yok',
      infoFiltered: '(_MAX_ kayıttan filtrelendi)',
      loadingRecords: 'Yükleniyor...',
      zeroRecords: 'Hiç kayıt bulunamadı',
      emptyTable: 'Tabloda veri yok',
      paginate: {
        first: 'İlk',
        previous: 'Önceki',
        next: 'Sonraki',
        last: 'Son'
      }
    },
    ajax: function(data, callback, settings) {
      // Simulated server-side processing
      // Gerçek uygulamada bu kısım AJAX call olacak:
      // $.ajax({
      //   url: '/api/news',
      //   data: {
      //     start: data.start,
      //     length: data.length,
      //     search: data.search.value,
      //     orderColumn: data.order[0].column,
      //     orderDir: data.order[0].dir,
      //     ...filters
      //   },
      //   success: function(response) {
      //     callback(response);
      //   }
      // });

      setTimeout(() => {
        const response = getMockNewsData(
          data.start,
          data.length,
          data.search.value,
          data.order[0].column,
          data.order[0].dir,
          filters
        );
        callback(response);
      }, 500);
    },
    columns: [
      {
        data: null,
        orderable: false,
        render: function(data, type, row) {
          return `<input type="checkbox" class="form-check-input" data-id="${row.id}">`;
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return `
            <div class="news-cell">
              <img src="${row.image}" alt="" style="width: 60px; height: 60px; border-radius: 12px; object-fit: cover;">
              <div style="margin-left: 1rem;">
                <strong>${row.title}</strong>
                <small class="text-muted d-block">${row.excerpt}</small>
              </div>
            </div>
          `;
        }
      },
      {
        data: 'category',
        render: function(data) {
          const badges = {
            'Altyapı': 'success',
            'Eğitim': 'primary',
            'Etkinlik': 'warning',
            'Duyuru': 'info',
            'Kültür': 'secondary'
          };
          const badgeClass = badges[data] || 'secondary';
          return `<span class="badge badge-${badgeClass}">${data}</span>`;
        }
      },
      {
        data: 'author',
        render: function(data) {
          const avatars = {
            'Ahmet Yılmaz': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
            'Hasan Koç': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80',
            'Mehmet Kaya': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
          };
          return `
            <div class="user-cell">
              <img src="${avatars[data]}" alt="" style="width: 36px; height: 36px; border-radius: 10px; object-fit: cover;">
              <span style="margin-left: 0.75rem;">${data}</span>
            </div>
          `;
        }
      },
      {
        data: 'date',
        render: function(data) {
          const date = new Date(data);
          return `<span class="text-muted">${date.toLocaleDateString('tr-TR')}</span>`;
        }
      },
      {
        data: 'views',
        render: function(data) {
          return `
            <div class="d-flex align-items-center">
              <i class="fas fa-eye me-2 text-muted"></i>
              <span>${data.toLocaleString('tr-TR')}</span>
            </div>
          `;
        }
      },
      {
        data: 'status',
        render: function(data) {
          const statuses = {
            'published': { text: 'Yayınlandı', class: 'success' },
            'draft': { text: 'Taslak', class: 'warning' },
            'archived': { text: 'Arşiv', class: 'secondary' }
          };
          const status = statuses[data] || statuses['draft'];
          return `<span class="badge-status badge-${status.class}">${status.text}</span>`;
        }
      },
      {
        data: null,
        orderable: false,
        render: function(data, type, row) {
          return `
            <div class="btn-group-actions">
              <a href="haber-duzenle.html?id=${row.id}" class="btn-icon-sm" title="Düzenle">
                <i class="fas fa-edit"></i>
              </a>
              <button class="btn-icon-sm btn-delete" data-id="${row.id}" title="Sil">
                <i class="fas fa-trash"></i>
              </button>
              <button class="btn-icon-sm" title="Daha Fazla">
                <i class="fas fa-ellipsis-v"></i>
              </button>
            </div>
          `;
        }
      }
    ],
    order: [[4, 'desc']], // Tarihe göre sırala
    pageLength: 10,
    lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]]
  });

  // Filter button click
  $('#btnFilter').on('click', function() {
    filters.category = $('#filterCategory').val();
    filters.status = $('#filterStatus').val();
    filters.author = $('#filterAuthor').val();
    table.ajax.reload();
  });

  // Refresh button
  $('#btnRefresh').on('click', function() {
    table.ajax.reload();
  });

  // Select All
  $('#selectAll').on('click', function() {
    $('.form-check-input[data-id]').prop('checked', this.checked);
  });

  // Delete button
  $('#newsTable').on('click', '.btn-delete', function() {
    const id = $(this).data('id');
    if (confirm('Bu haberi silmek istediğinize emin misiniz?')) {
      // AJAX delete request
      // $.ajax({ url: '/api/news/' + id, method: 'DELETE' });
      console.log('Deleting news ID:', id);
      table.ajax.reload();
    }
  });

  // Export button
  $('#btnExport').on('click', function() {
    alert('Dışa aktarma özelliği yakında eklenecek!');
  });

});

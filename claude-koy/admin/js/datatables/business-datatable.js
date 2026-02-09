/*
==============================================
BUSINESS DATATABLE - SERVER SIDE PROCESSING
==============================================
*/

function getMockBusinessData(start, length, search) {
  const allData = [
    { id: 1, name: 'Köy Marketim', category: 'Gıda & Market', owner: 'Ali Demir', phone: '+90 555 123 4567', status: 'active' },
    { id: 2, name: 'Köy Fırını', category: 'Gıda', owner: 'Mehmet Öztürk', phone: '+90 555 234 5678', status: 'active' },
    { id: 3, name: 'Köy Kafe', category: 'Kafe & Çay Evi', owner: 'Hasan Yıldız', phone: '+90 555 345 6789', status: 'active' },
    { id: 4, name: 'Berber Salonu', category: 'Hizmet', owner: 'Ahmet Kaya', phone: '+90 555 456 7890', status: 'active' },
    { id: 5, name: 'Manav', category: 'Gıda', owner: 'Fatma Aksoy', phone: '+90 555 567 8901', status: 'inactive' }
  ];

  let filteredData = allData;
  if (search) {
    filteredData = filteredData.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.owner.toLowerCase().includes(search.toLowerCase())
    );
  }

  const pageData = filteredData.slice(start, start + length);
  return { draw: 1, recordsTotal: allData.length, recordsFiltered: filteredData.length, data: pageData };
}

$(document).ready(function() {
  $('#businessTable').DataTable({
    processing: true,
    serverSide: true,
    responsive: true,
    language: {
      processing: 'Yükleniyor...',
      search: '',
      searchPlaceholder: 'Esnaf ara...',
      lengthMenu: '_MENU_ kayıt',
      info: '_START_-_END_ / _TOTAL_',
      paginate: { previous: 'Önceki', next: 'Sonraki' }
    },
    ajax: function(data, callback) {
      setTimeout(() => {
        callback(getMockBusinessData(data.start, data.length, data.search.value));
      }, 500);
    },
    columns: [
      { data: 'name', render: (data) => `<strong>${data}</strong>` },
      { 
        data: 'category',
        render: (data) => `<span class="badge badge-warning">${data}</span>`
      },
      { data: 'owner' },
      { data: 'phone' },
      { 
        data: 'status',
        render: (data) => `<span class="badge-status badge-${data === 'active' ? 'success' : 'secondary'}">${data === 'active' ? 'Aktif' : 'Pasif'}</span>`
      },
      {
        data: null,
        orderable: false,
        render: (data, type, row) => `
          <div class="btn-group-actions">
            <a href="esnaf-duzenle.html?id=${row.id}" class="btn-icon-sm"><i class="fas fa-edit"></i></a>
            <button class="btn-icon-sm"><i class="fas fa-trash"></i></button>
          </div>
        `
      }
    ]
  });
});

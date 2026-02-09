/*
==============================================
EVENTS DATATABLE - SERVER SIDE PROCESSING
==============================================
*/

function getMockEventsData(start, length, search, orderColumn, orderDir) {
  const allData = [
    { id: 1, name: 'Bahar Şenliği', date: '2026-03-21', location: 'Köy Meydanı', participants: 250, status: 'upcoming' },
    { id: 2, name: 'Geleneksel Panayır', date: '2026-04-15', location: 'Çarşı Merkezi', participants: 180, status: 'planned' },
    { id: 3, name: 'Kültür Gecesi', date: '2026-05-05', location: 'Kültür Merkezi', participants: 120, status: 'planned' },
    { id: 4, name: 'Hasat Şenliği', date: '2026-06-20', location: 'Köy Meydanı', participants: 300, status: 'planned' },
    { id: 5, name: 'Yılbaşı Etkinliği', date: '2025-12-31', location: 'Kültür Merkezi', participants: 200, status: 'completed' }
  ];

  let filteredData = allData;
  if (search) {
    filteredData = filteredData.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const pageData = filteredData.slice(start, start + length);
  return { draw: 1, recordsTotal: allData.length, recordsFiltered: filteredData.length, data: pageData };
}

$(document).ready(function() {
  $('#eventsTable').DataTable({
    processing: true,
    serverSide: true,
    responsive: true,
    language: {
      processing: 'Yükleniyor...',
      search: '',
      searchPlaceholder: 'Etkinlik ara...',
      lengthMenu: '_MENU_ kayıt',
      info: '_START_-_END_ / _TOTAL_',
      paginate: { previous: 'Önceki', next: 'Sonraki' }
    },
    ajax: function(data, callback) {
      setTimeout(() => {
        callback(getMockEventsData(data.start, data.length, data.search.value, data.order[0].column, data.order[0].dir));
      }, 500);
    },
    columns: [
      { data: 'name', render: (data) => `<strong>${data}</strong>` },
      { data: 'date', render: (data) => new Date(data).toLocaleDateString('tr-TR') },
      { data: 'location' },
      { data: 'participants', render: (data) => `${data} kişi` },
      { 
        data: 'status', 
        render: (data) => {
          const statuses = {
            'upcoming': { text: 'Yaklaşıyor', class: 'success' },
            'planned': { text: 'Planlanıyor', class: 'warning' },
            'completed': { text: 'Tamamlandı', class: 'info' }
          };
          const s = statuses[data];
          return `<span class="badge-status badge-${s.class}">${s.text}</span>`;
        }
      },
      {
        data: null,
        orderable: false,
        render: (data, type, row) => `
          <div class="btn-group-actions">
            <a href="etkinlik-duzenle.html?id=${row.id}" class="btn-icon-sm"><i class="fas fa-edit"></i></a>
            <button class="btn-icon-sm"><i class="fas fa-trash"></i></button>
          </div>
        `
      }
    ]
  });
});

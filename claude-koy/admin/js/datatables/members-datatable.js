/*
==============================================
MEMBERS DATATABLE - SERVER SIDE PROCESSING
==============================================
*/

function getMockMembersData(start, length, search) {
  const allData = [
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', phone: '+90 555 111 2233', joinDate: '2020-01-15', type: 'regular', status: 'active' },
    { id: 2, name: 'Hasan Koç', email: 'hasan@example.com', phone: '+90 555 222 3344', joinDate: '2021-03-22', type: 'honorary', status: 'active' },
    { id: 3, name: 'Mehmet Kaya', email: 'mehmet@example.com', phone: '+90 555 333 4455', joinDate: '2019-05-10', type: 'regular', status: 'active' },
    { id: 4, name: 'Fatma Demir', email: 'fatma@example.com', phone: '+90 555 444 5566', joinDate: '2022-07-18', type: 'regular', status: 'active' },
    { id: 5, name: 'Ali Öztürk', email: 'ali@example.com', phone: '+90 555 555 6677', joinDate: '2023-09-05', type: 'student', status: 'inactive' }
  ];

  let filteredData = allData;
  if (search) {
    filteredData = filteredData.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  const pageData = filteredData.slice(start, start + length);
  return { draw: 1, recordsTotal: allData.length, recordsFiltered: filteredData.length, data: pageData };
}

$(document).ready(function() {
  $('#membersTable').DataTable({
    processing: true,
    serverSide: true,
    responsive: true,
    language: {
      processing: 'Yükleniyor...',
      search: '',
      searchPlaceholder: 'Üye ara...',
      lengthMenu: '_MENU_ kayıt',
      info: '_START_-_END_ / _TOTAL_',
      paginate: { previous: 'Önceki', next: 'Sonraki' }
    },
    ajax: function(data, callback) {
      setTimeout(() => {
        callback(getMockMembersData(data.start, data.length, data.search.value));
      }, 500);
    },
    columns: [
      { 
        data: 'name',
        render: (data, type, row) => {
          const avatars = {
            'Ahmet Yılmaz': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
            'Hasan Koç': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80',
            'Mehmet Kaya': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
            'Fatma Demir': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
            'Ali Öztürk': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
          };
          return `
            <div class="user-cell">
              <img src="${avatars[data] || avatars['Ahmet Yılmaz']}" alt="" style="width: 36px; height: 36px; border-radius: 10px;">
              <span style="margin-left: 0.75rem;">${data}</span>
            </div>
          `;
        }
      },
      { data: 'email' },
      { data: 'phone' },
      { data: 'joinDate', render: (data) => new Date(data).toLocaleDateString('tr-TR') },
      { 
        data: 'type',
        render: (data) => {
          const types = {
            'regular': { text: 'Asıl Üye', class: 'primary' },
            'honorary': { text: 'Onursal Üye', class: 'info' },
            'student': { text: 'Öğrenci Üye', class: 'warning' }
          };
          const t = types[data] || types['regular'];
          return `<span class="badge badge-${t.class}">${t.text}</span>`;
        }
      },
      { 
        data: 'status',
        render: (data) => `<span class="badge-status badge-${data === 'active' ? 'success' : 'secondary'}">${data === 'active' ? 'Aktif' : 'Pasif'}</span>`
      },
      {
        data: null,
        orderable: false,
        render: (data, type, row) => `
          <div class="btn-group-actions">
            <button class="btn-icon-sm"><i class="fas fa-eye"></i></button>
            <button class="btn-icon-sm"><i class="fas fa-edit"></i></button>
            <button class="btn-icon-sm"><i class="fas fa-trash"></i></button>
          </div>
        `
      }
    ]
  });
});

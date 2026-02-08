/* Sonar Köy - Vanilla JS (Bootstrap 5.3) */

(function(){
  const yearEl = document.querySelector('[data-year]');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Mark active nav link by pathname
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.navbar .nav-link').forEach(a=>{
    const href = (a.getAttribute('href')||'').toLowerCase();
    if(href === path) a.classList.add('active');
  });

  // Events (dynamic)
  const eventRoot = document.getElementById('event-list');
  if(eventRoot){
    const events = [
      {date:'16 Şubat 2026', place:'Köy Meydanı', title:'Kış Buluşması', desc:'Köy halkı dayanışma buluşması ve sıcak çay ikramı.'},
      {date:'10 Mart 2026', place:'Okul Bahçesi', title:'Fidan Dikim Günü', desc:'Köy çevresinde fidan dikimi ve çevre temizliği etkinliği.'},
      {date:'23 Nisan 2026', place:'Köy Konağı', title:'Çocuk Şenliği', desc:'23 Nisan etkinlikleri, oyunlar ve sürpriz hediyeler.'},
      {date:'15 Ağustos 2026', place:'Harman Yeri', title:'Yaz Şenliği', desc:'Yöresel ikramlar, müzik ve halk oyunları.'}
    ];

    const render = (items)=>{
      eventRoot.innerHTML = items.map(ev=>`
        <div class="col-md-6">
          <div class="info-card p-4">
            <div class="d-flex align-items-start justify-content-between gap-3">
              <div>
                <div class="text-muted small"><i class="fa-solid fa-calendar-days me-2"></i>${ev.date}</div>
                <h5 class="mt-2 mb-1" style="font-weight:800;">${ev.title}</h5>
                <div class="text-muted small"><i class="fa-solid fa-location-dot me-2"></i>${ev.place}</div>
              </div>
              <div class="info-icon" style="background: rgba(37,99,235,.10); color: var(--sky);">
                <i class="fa-solid fa-bullhorn"></i>
              </div>
            </div>
            <p class="mt-3 mb-0 text-secondary">${ev.desc}</p>
          </div>
        </div>
      `).join('');
    };

    render(events);

    // Simple filter
    const input = document.getElementById('event-search');
    if(input){
      input.addEventListener('input', ()=>{
        const q = input.value.trim().toLowerCase();
        const filtered = events.filter(e=>
          (e.title+e.desc+e.place+e.date).toLowerCase().includes(q)
        );
        render(filtered);
      });
    }
  }

  // Gallery lightbox using Bootstrap modal
  const modalEl = document.getElementById('imgModal');
  if(modalEl){
    const modalImg = modalEl.querySelector('img');
    const modalTitle = modalEl.querySelector('[data-modal-title]');

    document.querySelectorAll('[data-lightbox]').forEach(img=>{
      img.addEventListener('click', ()=>{
        modalImg.src = img.getAttribute('data-full') || img.src;
        modalImg.alt = img.alt || 'Galeri Görseli';
        if(modalTitle) modalTitle.textContent = img.getAttribute('data-title') || 'Palabıyık Köyü';
      });
    });
  }

  // Contact form UX (no backend)
  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const toastEl = document.getElementById('msgToast');
      if(toastEl && window.bootstrap){
        const t = bootstrap.Toast.getOrCreateInstance(toastEl);
        t.show();
      } else {
        alert('Mesajınız alındı. Teşekkürler!');
      }
      contactForm.reset();
    });
  }
})();

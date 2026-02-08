document.addEventListener('DOMContentLoaded', () => {
    console.log('Palabıyık Köyü Sitesi Hazır!');
    
    // Smooth scroll if needed
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if(link.hash !== "") {
                // e.preventDefault();
            }
        });
    });
});

// Dynamic event rendering simulation for events page
function renderEvents(events) {
    const container = document.getElementById('event-container');
    if(!container) return;
    
    container.innerHTML = events.map(ev => `
        <div class="col-md-6">
            <div class="card shadow-sm p-4 mb-3 border-start border-success border-4">
                <h5>${ev.title}</h5>
                <p class="text-muted mb-1"><i class="fa fa-calendar me-2"></i>${ev.date}</p>
                <p>${ev.desc}</p>
            </div>
        </div>
    `).join('');
}
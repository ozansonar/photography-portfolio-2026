// =================================
// WHATSAPP FLOATING WIDGET
// =================================

(function() {
    'use strict';

    // WhatsApp numarası (+90 555 123 4567 formatında)
    const WHATSAPP_NUMBER = '905551234567';

    // Widget HTML'ini oluştur
    const widgetHTML = `
        <div id="whatsappWidget" class="whatsapp-widget">
            <button class="whatsapp-button" id="whatsappBtn" title="WhatsApp ile iletişime geç">
                <i class="bi bi-whatsapp"></i>
                <span class="whatsapp-pulse"></span>
            </button>
            <div class="whatsapp-popup" id="whatsappPopup">
                <div class="whatsapp-header">
                    <div class="whatsapp-avatar">📸</div>
                    <div class="whatsapp-info">
                        <h4>Premium Photography</h4>
                        <p>Online - Genellikle 5 dk'da yanıt verir</p>
                    </div>
                    <button class="whatsapp-close" id="whatsappClose">&times;</button>
                </div>
                <div class="whatsapp-body">
                    <div class="whatsapp-message">
                        <p>Merhaba! 👋</p>
                        <p>Nasıl yardımcı olabilirim?</p>
                    </div>
                </div>
                <div class="whatsapp-footer">
                    <input type="text" id="whatsappInput" placeholder="Mesajınızı yazın..." />
                    <button id="whatsappSend"><i class="bi bi-send-fill"></i></button>
                </div>
            </div>
        </div>
    `;

    // Widget CSS'ini ekle
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-widget { position: fixed; bottom: 2rem; right: 2rem; z-index: 99999; }
        .whatsapp-button { width: 60px; height: 60px; border-radius: 50%; background: #25D366; border: none; color: white; font-size: 2rem; cursor: pointer; box-shadow: 0 4px 12px rgba(37,211,102,0.4); transition: all 0.3s; position: relative; }
        .whatsapp-button:hover { transform: scale(1.1); box-shadow: 0 6px 20px rgba(37,211,102,0.6); }
        .whatsapp-pulse { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; background: #25D366; opacity: 0.7; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.2); opacity: 0; } }
        .whatsapp-popup { position: absolute; bottom: 80px; right: 0; width: 320px; background: white; border-radius: 1rem; box-shadow: 0 10px 40px rgba(0,0,0,0.3); display: none; flex-direction: column; overflow: hidden; }
        .whatsapp-popup.active { display: flex; animation: slideUp 0.3s ease; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .whatsapp-header { background: #25D366; color: white; padding: 1rem; display: flex; align-items: center; gap: 0.75rem; }
        .whatsapp-avatar { width: 45px; height: 45px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
        .whatsapp-info h4 { margin: 0; font-size: 1rem; font-weight: 600; }
        .whatsapp-info p { margin: 0; font-size: 0.75rem; opacity: 0.9; }
        .whatsapp-close { margin-left: auto; background: transparent; border: none; color: white; font-size: 1.5rem; cursor: pointer; width: 30px; height: 30px; }
        .whatsapp-body { padding: 1.5rem; background: #ECE5DD; min-height: 150px; }
        .whatsapp-message { background: white; padding: 1rem; border-radius: 0.5rem; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .whatsapp-message p { margin: 0.5rem 0; color: #333; font-size: 0.9rem; }
        .whatsapp-footer { display: flex; padding: 1rem; background: white; border-top: 1px solid #eee; }
        .whatsapp-footer input { flex: 1; padding: 0.75rem; border: 1px solid #ddd; border-radius: 50px; margin-right: 0.5rem; font-size: 0.9rem; }
        .whatsapp-footer input:focus { outline: none; border-color: #25D366; }
        .whatsapp-footer button { width: 45px; height: 45px; border-radius: 50%; background: #25D366; border: none; color: white; cursor: pointer; font-size: 1.2rem; transition: all 0.3s; }
        .whatsapp-footer button:hover { background: #20BA5A; transform: scale(1.1); }
        @media (max-width: 768px) { .whatsapp-widget { bottom: 1rem; right: 1rem; } .whatsapp-button { width: 50px; height: 50px; font-size: 1.5rem; } .whatsapp-popup { width: 280px; } }
    `;
    document.head.appendChild(style);

    // DOM'a widget'i ekle
    document.addEventListener('DOMContentLoaded', () => {
        document.body.insertAdjacentHTML('beforeend', widgetHTML);

        const btn = document.getElementById('whatsappBtn');
        const popup = document.getElementById('whatsappPopup');
        const closeBtn = document.getElementById('whatsappClose');
        const sendBtn = document.getElementById('whatsappSend');
        const input = document.getElementById('whatsappInput');

        // Popup aç/kapat
        btn.addEventListener('click', () => {
            popup.classList.toggle('active');
        });

        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
        });

        // Mesaj gönder
        function sendMessage() {
            const message = input.value.trim();
            if (message) {
                const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
                input.value = '';
                popup.classList.remove('active');
            }
        }

        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        // Dışarı tıklayınca kapat
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#whatsappWidget')) {
                popup.classList.remove('active');
            }
        });
    });

    console.log('%c💬 WhatsApp Widget Loaded', 'color: #25D366; font-size: 16px; font-weight: bold;');
})();
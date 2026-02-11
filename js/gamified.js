/* ===================================
   ANTA - Gamified Dashboard JS
   Adventure Map Interactivity
   =================================== */

document.addEventListener('DOMContentLoaded', function () {

    // Animate progress bars on load
    animateProgressBars();

    // Add entrance animations to islands
    animateIslands();

});

/* ===================================
   Progress Bar Animation
   =================================== */

function animateProgressBars() {
    const fills = document.querySelectorAll('.progress-fill[data-width]');

    setTimeout(() => {
        fills.forEach(fill => {
            const targetWidth = fill.getAttribute('data-width');
            fill.style.width = targetWidth + '%';
        });
    }, 600);
}

/* ===================================
   Island Entrance Animation
   =================================== */

function animateIslands() {
    const islands = document.querySelectorAll('.island');

    islands.forEach((island, index) => {
        island.style.opacity = '0';
        island.style.transform = 'translateY(30px)';
        island.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            island.style.opacity = island.classList.contains('locked') ? '0.55' : '1';
            island.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
}

/* ===================================
   Island Navigation
   =================================== */

function navigateIsland(islandName) {
    switch (islandName) {
        case 'programmation':
            // Already completed — go to review
            showToast('Île Programmation terminée ! Revoyez vos acquis.', 'success');
            break;
        case 'robotique':
            // Active quest — could navigate to formation
            window.location.href = 'formations.html';
            break;
        case 'design':
            showToast('Cette île sera débloquée au Niveau 15 !', 'info');
            break;
        default:
            break;
    }
}

/* ===================================
   Achievement Popup
   =================================== */

function closeAchievement() {
    const popup = document.getElementById('achievementPopup');
    if (popup) {
        popup.style.transform = 'translateX(40px)';
        popup.style.opacity = '0';
        popup.style.transition = 'all 0.3s ease';

        setTimeout(() => {
            popup.classList.add('hidden');
        }, 300);
    }
}

function claimReward() {
    showToast('🎁 Récompense réclamée ! +100 XP', 'success');
    closeAchievement();
}

/* ===================================
   Toast Notification
   =================================== */

function showToast(message, type) {
    // Remove existing toast if any
    const existing = document.querySelector('.gamified-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'gamified-toast';

    // Style based on type
    const bgColor = type === 'success' ? '#22c55e' : type === 'info' ? '#1a6abb' : '#ee9935';

    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: ${bgColor};
        color: white;
        padding: 0.85rem 1.8rem;
        border-radius: 14px;
        font-weight: 600;
        font-size: 0.9rem;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        z-index: 9999;
        opacity: 0;
        transition: all 0.35s ease;
        font-family: 'Poppins', sans-serif;
    `;

    toast.textContent = message;
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Auto dismiss
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 350);
    }, 3000);
}

/* ===================================
   Mobile Sidebar Toggle (override)
   =================================== */

function toggleMobileSidebar() {
    const sidebar = document.getElementById('dashboardSidebar');
    if (sidebar) {
        sidebar.classList.toggle('show');
    }
}

/* ===================================
   Mock Downloads
   =================================== */

function downloadCert(type) {
    showToast('🎓 Téléchargement du certificat en cours...', 'success');
    setTimeout(() => {
        showToast('✅ Certificat téléchargé avec succès !', 'success');
    }, 2000);
}


function downloadInvoice(ref) {
    showToast(`📄 Téléchargement de la facture ${ref}...`, 'info');
    setTimeout(() => {
        showToast('✅ Facture téléchargée !', 'success');
    }, 1500);
}

/* ===================================
   Map Navigation
   =================================== */

/* ===================================
   Map Navigation (Drag & Drop)
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
    initDraggableMap();
});

function initDraggableMap() {
    const slider = document.getElementById('dragWrapper');
    const container = document.getElementById('dragContainer');

    if (!slider || !container) return; // Guard clause

    let isDown = false;
    let startX;
    let startY;
    let translateX = 0;
    let translateY = 0;

    // Center map initially (Start at Programmation: 100, 600)
    // Viewport center approx: Width/2, Height/2. 
    // Target 100, 600.
    // Center it roughly: translateX = (WrapperWidth/2) - 100.
    const initialCenterX = (slider.offsetWidth / 2) - 100;
    const initialCenterY = (slider.offsetHeight / 2) - 600;

    // Clamp initial
    const minX = slider.offsetWidth - container.offsetWidth;
    const minY = slider.offsetHeight - container.offsetHeight;

    translateX = Math.max(minX, Math.min(0, initialCenterX));
    translateY = Math.max(minY, Math.min(0, initialCenterY));

    updateTransform();

    // Mouse Events
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - translateX;
        startY = e.pageY - translateY;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - startX;
        const y = e.pageY - startY;

        // Boundaries
        const minX = slider.offsetWidth - container.offsetWidth;
        const minY = slider.offsetHeight - container.offsetHeight;

        translateX = Math.max(minX, Math.min(0, x));
        translateY = Math.max(minY, Math.min(0, y));

        updateTransform();
    });

    // Touch Events
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - translateX;
        startY = e.touches[0].pageY - translateY;
    });

    slider.addEventListener('touchend', () => {
        isDown = false;
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - startX;
        const y = e.touches[0].pageY - startY;

        // Boundaries
        const minX = slider.offsetWidth - container.offsetWidth;
        const minY = slider.offsetHeight - container.offsetHeight;

        translateX = Math.max(minX, Math.min(0, x));
        translateY = Math.max(minY, Math.min(0, y));

        updateTransform();
    });

    function updateTransform() {
        container.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
}

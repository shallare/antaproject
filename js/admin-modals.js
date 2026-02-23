// admin-modals.js
// Handles the global "Nouveau" button and specific page modals for the Admin Dashboard

document.addEventListener('DOMContentLoaded', () => {
    initGlobalNewModal();
    initLocalModals();
    checkUrlForActions();
});

function initGlobalNewModal() {
    const globalBtnNew = document.getElementById('global-btn-new');
    if (!globalBtnNew) return;

    // Inject the global modal HTML into the body if it doesn't exist
    if (!document.getElementById('global-new-modal')) {
        const modalHtml = `
            <div id="global-new-modal" class="fixed inset-0 z-[100] hidden items-center justify-center p-4">
                <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm modal-backdrop cursor-pointer"></div>
                
                <div class="relative bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-md overflow-hidden transform transition-all scale-95 opacity-0 duration-300 ease-out" id="global-new-modal-content">
                    <div class="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 class="text-xl font-extrabold text-slate-800">Que voulez-vous créer ?</h3>
                        <button class="text-slate-400 hover:text-red-500 transition-colors modal-close-btn p-1.5 rounded-full hover:bg-red-50 flex items-center justify-center outline-none">
                            <span class="material-icons-round">close</span>
                        </button>
                    </div>
                    
                    <div class="p-6 space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar">
                        <a href="learners.html?action=new" class="flex items-center gap-4 p-4 rounded-2xl hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all group">
                            <div class="w-12 h-12 rounded-xl bg-blue-100 text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                <span class="material-icons-round">school</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-800 group-hover:text-primary transition-colors">Nouvel Apprenant</h4>
                                <p class="text-xs text-slate-500 font-medium">Inscrire un élève aux programmes</p>
                            </div>
                            <span class="material-icons-round text-slate-300 ml-auto group-hover:text-primary transition-colors">chevron_right</span>
                        </a>
                        
                        <a href="groups.html?action=new" class="flex items-center gap-4 p-4 rounded-2xl hover:bg-orange-50 border border-transparent hover:border-orange-100 transition-all group">
                            <div class="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                <span class="material-icons-round">category</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-800 group-hover:text-orange-600 transition-colors">Nouveau Groupe</h4>
                                <p class="text-xs text-slate-500 font-medium">Créer une nouvelle classe/projet</p>
                            </div>
                            <span class="material-icons-round text-slate-300 ml-auto group-hover:text-orange-500 transition-colors">chevron_right</span>
                        </a>
                        
                        <a href="users.html?action=new" class="flex items-center gap-4 p-4 rounded-2xl hover:bg-green-50 border border-transparent hover:border-green-100 transition-all group">
                            <div class="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                <span class="material-icons-round">person_add</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-800 group-hover:text-green-600 transition-colors">Nouvel Utilisateur</h4>
                                <p class="text-xs text-slate-500 font-medium">Ajouter un admin, parent, formateur</p>
                            </div>
                            <span class="material-icons-round text-slate-300 ml-auto group-hover:text-green-500 transition-colors">chevron_right</span>
                        </a>
                        
                        <a href="formations.html?action=new" class="flex items-center gap-4 p-4 rounded-2xl hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all group">
                            <div class="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                <span class="material-icons-round">menu_book</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Nouvelle Formation</h4>
                                <p class="text-xs text-slate-500 font-medium">Créer un nouveau programme ou cours</p>
                            </div>
                            <span class="material-icons-round text-slate-300 ml-auto group-hover:text-indigo-500 transition-colors">chevron_right</span>
                        </a>
                        
                        <a href="volunteers.html?action=new" class="flex items-center gap-4 p-4 rounded-2xl hover:bg-purple-50 border border-transparent hover:border-purple-100 transition-all group">
                            <div class="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                <span class="material-icons-round">volunteer_activism</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-800 group-hover:text-purple-600 transition-colors">Ajouter Volontaire</h4>
                                <p class="text-xs text-slate-500 font-medium">Recruter et encadrer des bénévoles</p>
                            </div>
                            <span class="material-icons-round text-slate-300 ml-auto group-hover:text-purple-500 transition-colors">chevron_right</span>
                        </a>
                        
                        <a href="annonces.html?action=new" class="flex items-center gap-4 p-4 rounded-2xl hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all group">
                            <div class="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                <span class="material-icons-round">campaign</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-800 group-hover:text-rose-600 transition-colors">Nouvelle Annonce</h4>
                                <p class="text-xs text-slate-500 font-medium">Créer un pop-up ou une alerte publique</p>
                            </div>
                            <span class="material-icons-round text-slate-300 ml-auto group-hover:text-rose-500 transition-colors">chevron_right</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    const modal = document.getElementById('global-new-modal');
    const modalContent = document.getElementById('global-new-modal-content');

    // Open modal
    globalBtnNew.addEventListener('click', () => {
        openModal(modal, modalContent);
    });

    // Close modal events
    const closeBtns = modal.querySelectorAll('.modal-close-btn, .modal-backdrop');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(modal, modalContent);
        });
    });
}

function openModal(modal, modalContent) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    // small delay to allow display block to process before opacity CSS transition
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeModal(modal, modalContent) {
    if (!modalContent) return;
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }, 300);
}

function initLocalModals() {
    const specificBtns = document.querySelectorAll('[id^="btn-new-"]');
    specificBtns.forEach(btn => {
        const modalId = btn.id.replace('btn-', 'modal-');
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const modalContent = modal.querySelector('.modal-content-local');

        btn.addEventListener('click', () => {
            openModal(modal, modalContent);
        });

        const closeBtns = modal.querySelectorAll('.modal-close-btn, .modal-backdrop');
        closeBtns.forEach(cbtn => {
            cbtn.addEventListener('click', () => {
                closeModal(modal, modalContent);
            });
        });
    });
}

function checkUrlForActions() {
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');

    if (action === 'new') {
        // Try to find the page specific "New" button (like btn-new-learner or btn-new-group)
        const specificBtn = document.querySelector('[id^="btn-new-"]');
        if (specificBtn) {
            // small timeout to let everything render
            setTimeout(() => {
                specificBtn.click();
                // clean URL
                window.history.replaceState({}, document.title, window.location.pathname);
            }, 300);
        }
    }
}

// ===================================
// ANTA - Dashboard JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Check if user is authenticated
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = '../../pages/auth/login.html';
        return;
    }
    
    // Display user information
    displayUserInfo(currentUser);
    
    // Initialize dashboard based on user type
    if (currentUser.type === 'admin') {
        // Admin specific initialization
        initAdminDashboard();
    } else {
        // User specific initialization
        initUserDashboard();
    }
});

// ===================================
// Display User Information
// ===================================

function displayUserInfo(user) {
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userNameTop = document.getElementById('userNameTop');
    
    if (userName) {
        userName.textContent = `${user.firstName} ${user.lastName}`;
    }
    
    if (userEmail) {
        userEmail.textContent = user.email;
    }
    
    if (userNameTop) {
        userNameTop.textContent = user.firstName;
    }
}

// ===================================
// Toggle Sidebar
// ===================================

function toggleSidebar() {
    const sidebar = document.getElementById('dashboardSidebar');
    if (sidebar) {
        sidebar.classList.toggle('collapsed');
    }
}

function toggleMobileSidebar() {
    const sidebar = document.getElementById('dashboardSidebar');
    if (sidebar) {
        sidebar.classList.toggle('mobile-active');
    }
}

// Close mobile sidebar when clicking outside
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('dashboardSidebar');
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    
    if (sidebar && toggleBtn) {
        if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
            sidebar.classList.remove('mobile-active');
        }
    }
});

// ===================================
// Initialize User Dashboard
// ===================================

function initUserDashboard() {
    const user = getCurrentUser();
    
    // Load user's formations
    loadUserFormations(user.id);
    
    // Load upcoming sessions
    loadUpcomingSessions(user.id);
    
    // Update stats
    updateUserStats(user.id);
}

function loadUserFormations(userId) {
    // Simulated data - in production, this would be an API call
    const formations = [
        {
            id: 1,
            title: 'Introduction à la Programmation',
            description: 'Apprends les bases du codage avec Scratch et Python',
            icon: 'code',
            sessions: 12,
            duration: '3h',
            progress: 75,
            completed: 9
        },
        {
            id: 2,
            title: 'Robotique pour Débutants',
            description: 'Construis et programme ton premier robot',
            icon: 'robot',
            sessions: 10,
            duration: '2h',
            progress: 50,
            completed: 5
        }
    ];
    
    // Display formations (would be implemented in actual HTML)
    console.log('Formations loaded:', formations);
}

function loadUpcomingSessions(userId) {
    // Simulated data
    const sessions = [
        {
            date: '2024-02-15',
            time: '14:00 - 17:00',
            formation: 'Introduction à la Programmation',
            location: 'Salle A - ANTA Campus'
        },
        {
            date: '2024-02-17',
            time: '10:00 - 12:00',
            formation: 'Robotique pour Débutants',
            location: 'Lab Robotique - ANTA Campus'
        }
    ];
    
    console.log('Sessions loaded:', sessions);
}

function updateUserStats(userId) {
    // Simulated stats
    const stats = {
        formations: 2,
        progress: 65,
        certificates: 1,
        hours: 24
    };
    
    console.log('Stats updated:', stats);
}

// ===================================
// Initialize Admin Dashboard
// ===================================

function initAdminDashboard() {
    // Load admin statistics
    loadAdminStats();
    
    // Load recent users
    loadRecentUsers();
    
    // Load recent payments
    loadRecentPayments();
}

function loadAdminStats() {
    const stats = {
        totalUsers: 156,
        activeFormations: 8,
        totalRevenue: 2450000,
        pendingApplications: 12
    };
    
    console.log('Admin stats loaded:', stats);
}

function loadRecentUsers() {
    const users = storage.get('users') || [];
    const recentUsers = users.slice(-5).reverse();
    
    console.log('Recent users:', recentUsers);
}

function loadRecentPayments() {
    // Simulated payments data
    const payments = [
        {
            id: 'PAY001',
            user: 'Jean Dupont',
            amount: 35000,
            date: '2024-02-10',
            status: 'completed'
        }
    ];
    
    console.log('Recent payments:', payments);
}

// ===================================
// User Management (Admin)
// ===================================

function deleteUser(userId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        const users = storage.get('users') || [];
        const filteredUsers = users.filter(u => u.id !== userId);
        storage.set('users', filteredUsers);
        
        hideLoading();
        showSuccessMessage('Utilisateur supprimé avec succès');
        
        // Reload page
        setTimeout(() => {
            location.reload();
        }, 1000);
    }, 500);
}

function editUser(userId) {
    const users = storage.get('users') || [];
    const user = users.find(u => u.id === userId);
    
    if (user) {
        // Open edit modal or redirect to edit page
        console.log('Edit user:', user);
    }
}

function viewUser(userId) {
    const users = storage.get('users') || [];
    const user = users.find(u => u.id === userId);
    
    if (user) {
        // Open view modal or redirect to details page
        console.log('View user:', user);
    }
}

// ===================================
// Formations Management
// ===================================

function createFormation() {
    // Open modal or redirect to creation page
    console.log('Create new formation');
}

function editFormation(formationId) {
    console.log('Edit formation:', formationId);
}

function deleteFormation(formationId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showSuccessMessage('Formation supprimée avec succès');
    }, 500);
}

// ===================================
// Certificate Generation
// ===================================

function generateCertificate(userId, formationId) {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showSuccessMessage('Certificat généré avec succès !');
        
        // In production, this would trigger a PDF download
        console.log('Certificate generated for user:', userId, 'formation:', formationId);
    }, 1500);
}

function downloadCertificate(certificateId) {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showSuccessMessage('Téléchargement du certificat...');
        
        // In production, this would trigger actual download
        console.log('Download certificate:', certificateId);
    }, 1000);
}

// ===================================
// Payment Processing
// ===================================

function processPayment(amount, formationId) {
    // Open payment modal
    console.log('Process payment:', amount, formationId);
}

function viewInvoice(invoiceId) {
    // Open invoice view/download
    console.log('View invoice:', invoiceId);
}

// ===================================
// Announcements Management (Admin)
// ===================================

function createAnnouncement() {
    const title = prompt('Titre de l\'annonce:');
    const message = prompt('Message de l\'annonce:');
    
    if (title && message) {
        const announcements = storage.get('announcements') || [];
        
        const announcement = {
            id: 'ANN' + Date.now(),
            title: title,
            message: message,
            date: new Date().toISOString(),
            active: true
        };
        
        announcements.push(announcement);
        storage.set('announcements', announcements);
        
        showSuccessMessage('Annonce créée avec succès !');
    }
}

function deleteAnnouncement(announcementId) {
    if (!confirm('Supprimer cette annonce ?')) {
        return;
    }
    
    const announcements = storage.get('announcements') || [];
    const filtered = announcements.filter(a => a.id !== announcementId);
    storage.set('announcements', filtered);
    
    showSuccessMessage('Annonce supprimée');
    location.reload();
}

// ===================================
// Search Functionality
// ===================================

const searchInput = document.querySelector('.topbar-search input');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        // Implement search logic here
        console.log('Searching for:', searchTerm);
    });
}

// ===================================
// Notifications
// ===================================

function loadNotifications() {
    // Simulated notifications
    const notifications = [
        {
            id: 1,
            title: 'Nouvelle session disponible',
            message: 'Une nouvelle session de Programmation commence la semaine prochaine',
            date: new Date(),
            read: false
        }
    ];
    
    return notifications;
}

// Update notification count
function updateNotificationCount() {
    const notifications = loadNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;
    
    const badge = document.querySelector('.notification-badge');
    if (badge && unreadCount > 0) {
        badge.textContent = unreadCount;
    }
}

updateNotificationCount();

// ===================================
// Real-time Updates
// ===================================

// Simulate real-time updates every 30 seconds
setInterval(function() {
    updateNotificationCount();
}, 30000);

console.log('Dashboard loaded successfully! 🎓');

// ===================================
// ANTA - Main JavaScript
// Animations and Interactions
// ===================================

document.addEventListener('DOMContentLoaded', function () {

    // ===================================
    // Navigation Scroll Effect
    // ===================================

    const navbar = document.getElementById('mainNav');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===================================
    // Pop-up Annonce
    // ===================================

    const announcementPopup = document.getElementById('announcementPopup');
    const closePopup = document.getElementById('closePopup');

    // Show popup after 1 second on page load
    setTimeout(function () {
        if (announcementPopup) {
            announcementPopup.classList.add('active');
        }
    }, 1000);

    // Close popup
    if (closePopup) {
        closePopup.addEventListener('click', function () {
            announcementPopup.classList.remove('active');
        });
    }

    // Close popup when clicking outside
    if (announcementPopup) {
        announcementPopup.addEventListener('click', function (e) {
            if (e.target === announcementPopup) {
                announcementPopup.classList.remove('active');
            }
        });
    }

    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===================================
    // Animated Counter for Stats
    // ===================================

    function animateCounter(element, target, duration = 2000) {
        let current = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }

    // Intersection Observer for counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItems = entry.target.querySelectorAll('.stat-item h3');
                statItems.forEach((item, index) => {
                    const values = [500, 15, 3];
                    setTimeout(() => {
                        const value = values[index];
                        item.textContent = '0+';
                        animateCounter(item, value);
                    }, index * 200);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // ===================================
    // Fade In Animation on Scroll
    // ===================================

    function fadeInOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .programme-card, .testimonial-card');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    fadeInOnScroll();

    // ===================================
    // Mobile Menu Close on Link Click
    // ===================================

    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    // ===================================
    // Parallax Effect for Hero Shapes
    // ===================================

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ===================================
    // Form Validation Helper
    // ===================================

    window.validateForm = function (formId) {
        const form = document.getElementById(formId);
        if (!form) return false;

        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            }

            // Email validation
            if (field.type === 'email' && field.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    field.classList.add('is-invalid');
                    isValid = false;
                }
            }

            // Phone validation (Benin format)
            if (field.type === 'tel' && field.value) {
                const phoneRegex = /^(\+229)?[0-9]{8,}$/;
                if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
                    field.classList.add('is-invalid');
                    isValid = false;
                }
            }
        });

        return isValid;
    };

    // ===================================
    // Show Success Message
    // ===================================

    window.showSuccessMessage = function (message, duration = 3000) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
        alertDiv.style.zIndex = '9999';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.remove();
        }, duration);
    };

    // ===================================
    // Show Error Message
    // ===================================

    window.showErrorMessage = function (message, duration = 3000) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
        alertDiv.style.zIndex = '9999';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.remove();
        }, duration);
    };

    // ===================================
    // Loading Spinner
    // ===================================

    window.showLoading = function () {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'globalLoading';
        loadingDiv.className = 'position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center';
        loadingDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        loadingDiv.style.zIndex = '10001';
        loadingDiv.innerHTML = `
            <div class="spinner-border text-light" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Chargement...</span>
            </div>
        `;

        document.body.appendChild(loadingDiv);
    };

    window.hideLoading = function () {
        const loadingDiv = document.getElementById('globalLoading');
        if (loadingDiv) {
            loadingDiv.remove();
        }
    };

    // ===================================
    // Local Storage Helper
    // ===================================

    window.storage = {
        set: function (key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('Storage error:', e);
                return false;
            }
        },

        get: function (key) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (e) {
                console.error('Storage error:', e);
                return null;
            }
        },

        remove: function (key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.error('Storage error:', e);
                return false;
            }
        },

        clear: function () {
            try {
                localStorage.clear();
                return true;
            } catch (e) {
                console.error('Storage error:', e);
                return false;
            }
        }
    };

    // ===================================
    // Check Authentication Status
    // ===================================

    window.isAuthenticated = function () {
        const user = storage.get('currentUser');
        return user !== null;
    };

    window.getCurrentUser = function () {
        return storage.get('currentUser');
    };

    window.logout = function () {
        storage.remove('currentUser');
        window.location.href = '/index.html';
    };

    // ===================================
    // Format Currency (FCFA)
    // ===================================

    window.formatCurrency = function (amount) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // ===================================
    // Format Date
    // ===================================

    window.formatDate = function (date) {
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    };

    // ===================================
    // Active Page Highlight
    // ===================================

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav-link');

    navLinksAll.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.includes(currentPage) || (currentPage === '' && href === 'index.html'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });



    console.log('ANTA - Website loaded successfully! 🚀');
});

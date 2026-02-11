// ===================================
// ANTA - Authentication JavaScript
// ===================================

let selectedType = null;

// ===================================
// Type Selection
// ===================================

function selectType(type) {
    selectedType = type;
    
    // Update UI
    const studentCard = document.getElementById('studentCard');
    const volunteerCard = document.getElementById('volunteerCard');
    const registrationForm = document.getElementById('registrationForm');
    const formTitle = document.getElementById('formTitle');
    const studentForm = document.getElementById('studentForm');
    const volunteerForm = document.getElementById('volunteerForm');
    
    // Remove active class from both cards
    if (studentCard) studentCard.classList.remove('active');
    if (volunteerCard) volunteerCard.classList.remove('active');
    
    // Add active class to selected card
    if (type === 'student' && studentCard) {
        studentCard.classList.add('active');
        if (formTitle) formTitle.textContent = 'Inscription Étudiant';
        if (studentForm) studentForm.style.display = 'block';
        if (volunteerForm) volunteerForm.style.display = 'none';
    } else if (type === 'volunteer' && volunteerCard) {
        volunteerCard.classList.add('active');
        if (formTitle) formTitle.textContent = 'Inscription Volontaire';
        if (studentForm) studentForm.style.display = 'none';
        if (volunteerForm) volunteerForm.style.display = 'block';
    }
    
    // Show registration form after a short delay
    setTimeout(() => {
        if (registrationForm) {
            registrationForm.style.display = 'block';
            registrationForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 300);
}

// ===================================
// Back to Selection
// ===================================

function backToSelection() {
    const registrationForm = document.getElementById('registrationForm');
    const studentCard = document.getElementById('studentCard');
    const volunteerCard = document.getElementById('volunteerCard');
    
    if (registrationForm) registrationForm.style.display = 'none';
    if (studentCard) studentCard.classList.remove('active');
    if (volunteerCard) volunteerCard.classList.remove('active');
    
    selectedType = null;
    
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================================
// Check URL Parameters
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    
    if (type === 'volontaire' || type === 'volunteer') {
        selectType('volunteer');
    } else if (type === 'etudiant' || type === 'student') {
        selectType('student');
    }
    
    // ===================================
    // Student Form Submission
    // ===================================
    
    const studentForm = document.getElementById('studentForm');
    if (studentForm) {
        studentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm('studentForm')) {
                showErrorMessage('Veuillez remplir tous les champs obligatoires correctement.');
                return;
            }
            
            // Get form data
            const formData = new FormData(studentForm);
            const data = {
                type: 'student',
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                birthDate: formData.get('birthDate'),
                gender: formData.get('gender'),
                address: formData.get('address'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                parentName: formData.get('parentName'),
                parentPhone: formData.get('parentPhone'),
                parentEmail: formData.get('parentEmail'),
                programme: formData.get('programme'),
                password: formData.get('password'),
                registrationDate: new Date().toISOString()
            };
            
            // Check password match
            if (formData.get('password') !== formData.get('confirmPassword')) {
                showErrorMessage('Les mots de passe ne correspondent pas.');
                return;
            }
            
            // Validate age (8-17 years)
            const age = calculateAge(data.birthDate);
            if (age < 8 || age > 17) {
                showErrorMessage('L\'âge doit être entre 8 et 17 ans.');
                return;
            }
            
            // Show loading
            showLoading();
            
            // Simulate API call
            setTimeout(() => {
                // Save to localStorage (in production, this would be an API call)
                const users = storage.get('users') || [];
                
                // Check if email already exists
                if (users.find(u => u.email === data.email)) {
                    hideLoading();
                    showErrorMessage('Cet email est déjà enregistré.');
                    return;
                }
                
                // Add user ID
                data.id = 'STU' + Date.now();
                data.status = 'pending'; // pending, active, inactive
                
                users.push(data);
                storage.set('users', users);
                
                hideLoading();
                showSuccessMessage('Inscription réussie ! Vous allez recevoir un email de confirmation.');
                
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    window.location.href = 'login.html?registered=true';
                }, 2000);
            }, 1500);
        });
    }
    
    // ===================================
    // Volunteer Form Submission
    // ===================================
    
    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm('volunteerForm')) {
                showErrorMessage('Veuillez remplir tous les champs obligatoires correctement.');
                return;
            }
            
            // Get form data
            const formData = new FormData(volunteerForm);
            const data = {
                type: 'volunteer',
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                birthDate: formData.get('birthDate'),
                gender: formData.get('gender'),
                address: formData.get('address'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                education: formData.get('education'),
                expertise: formData.get('expertise'),
                experience: formData.get('experience'),
                availability: formData.get('availability'),
                motivation: formData.get('motivation'),
                password: formData.get('password'),
                registrationDate: new Date().toISOString()
            };
            
            // Check password match
            if (formData.get('password') !== formData.get('confirmPassword')) {
                showErrorMessage('Les mots de passe ne correspondent pas.');
                return;
            }
            
            // Validate age (must be 18+)
            const age = calculateAge(data.birthDate);
            if (age < 18) {
                showErrorMessage('Vous devez avoir au moins 18 ans pour devenir volontaire.');
                return;
            }
            
            // Show loading
            showLoading();
            
            // Simulate API call
            setTimeout(() => {
                // Save to localStorage
                const users = storage.get('users') || [];
                
                // Check if email already exists
                if (users.find(u => u.email === data.email)) {
                    hideLoading();
                    showErrorMessage('Cet email est déjà enregistré.');
                    return;
                }
                
                // Add user ID
                data.id = 'VOL' + Date.now();
                data.status = 'pending'; // pending, approved, rejected
                
                users.push(data);
                storage.set('users', users);
                
                hideLoading();
                showSuccessMessage('Votre demande a été envoyée ! Nous examinerons votre candidature et vous contacterons bientôt.');
                
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    window.location.href = 'login.html?registered=true';
                }, 2000);
            }, 1500);
        });
    }
    
    // ===================================
    // Login Form
    // ===================================
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.querySelector('input[name="email"]').value;
            const password = document.querySelector('input[name="password"]').value;
            
            if (!email || !password) {
                showErrorMessage('Veuillez remplir tous les champs.');
                return;
            }
            
            showLoading();
            
            // Simulate API call
            setTimeout(() => {
                const users = storage.get('users') || [];
                const user = users.find(u => u.email === email && u.password === password);
                
                if (user) {
                    // Save current user
                    storage.set('currentUser', user);
                    
                    hideLoading();
                    showSuccessMessage('Connexion réussie ! Redirection...');
                    
                    // Redirect based on user type
                    setTimeout(() => {
                        if (user.type === 'admin') {
                            window.location.href = '../admin/dashboard.html';
                        } else {
                            window.location.href = '../user/dashboard.html';
                        }
                    }, 1000);
                } else {
                    hideLoading();
                    showErrorMessage('Email ou mot de passe incorrect.');
                }
            }, 1000);
        });
    }
    
    // ===================================
    // Password Toggle
    // ===================================
    
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // ===================================
    // Show Registration Success Message
    // ===================================
    
    const urlParamsLogin = new URLSearchParams(window.location.search);
    if (urlParamsLogin.get('registered') === 'true') {
        showSuccessMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');
    }
});

// ===================================
// Helper Functions
// ===================================

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        // Remove previous validation classes
        field.classList.remove('is-invalid', 'is-valid');
        
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            // Specific validations
            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.add('is-valid');
                }
            } else if (field.type === 'tel') {
                const phoneRegex = /^(\+229)?[0-9]{8,}$/;
                if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.add('is-valid');
                }
            } else {
                field.classList.add('is-valid');
            }
        }
    });
    
    return isValid;
}

// Real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const allInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    
    allInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    initFormValidation();
    initSmoothScrolling();
    initDynamicEffects();
    initImageMapLabels();
    initProgrammingLanguages();
    initPhoneMask();
});

function initFormValidation() {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                showNotification('Форма успешно отправлена!', 'success');
            } else {
                showNotification('Пожалуйста, заполните все обязательные поля правильно.', 'error');
            }
        });
    }
}

function validateForm() {
    let isValid = true;
    
    const fullName = document.getElementById('fullName');
    if (!fullName.value.trim()) {
        markInvalid(fullName);
        isValid = false;
    } else {
        markValid(fullName);
    }
    
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value || !emailRegex.test(email.value)) {
        markInvalid(email);
        isValid = false;
    } else {
        markValid(email);
    }
    
    const phone = document.getElementById('phone');
    const phoneRegex = /^\+7\(\d{3}\)\d{3}-\d{4}$/;
    if (phone.value && !phoneRegex.test(phone.value)) {
        markInvalid(phone);
        isValid = false;
    } else {
        markValid(phone);
    }
    
    return isValid;
}

function markInvalid(field) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
}

function markValid(field) {
    field.classList.add('is-valid');
    field.classList.remove('is-invalid');
}

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initDynamicEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const cards = document.querySelectorAll('.section-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

function initImageMapLabels() {
    function updateMapLabels() {
        const imageMapContainer = document.querySelector('.image-map-container');
        if (!imageMapContainer) return;
        
        const img = imageMapContainer.querySelector('img');
        const labels = imageMapContainer.querySelectorAll('.map-label');
        
        if (img && labels.length > 0) {
            const containerWidth = imageMapContainer.offsetWidth;
            const imgWidth = img.naturalWidth || 400;
            const scale = containerWidth / imgWidth;
            
            labels.forEach(label => {
                const top = parseFloat(label.style.top) * scale;
                const left = parseFloat(label.style.left) * scale;
                
                label.style.top = top + 'px';
                label.style.left = left + 'px';
                label.style.fontSize = (16 * scale) + 'px';
            });
        }
    }
    
    window.addEventListener('load', updateMapLabels);
    window.addEventListener('resize', updateMapLabels);
}

function showNotification(message, type = 'info') {
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = `custom-alert alert alert-${type === 'success' ? 'success' : 'error'} position-fixed`;
    alert.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 1050;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    alert.textContent = message;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.opacity = '0';
            alert.style.transition = 'opacity 0.5s ease';
            setTimeout(() => alert.remove(), 500);
        }
    }, 5000);
}

function initProgrammingLanguages() {
    const select = document.getElementById('programmingLang');
    if (select) {
        select.addEventListener('change', function() {
            const selectedCount = Array.from(this.selectedOptions).length;
            if (selectedCount > 5) {
                showNotification('Выбрано более 5 языков программирования!', 'error');
            }
        });
    }
}

function initPhoneMask() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = '+7(' + value.substring(1, 4) + ')' + value.substring(4, 7) + '-' + value.substring(7, 11);
            }
            
            e.target.value = value;
        });
    }
}
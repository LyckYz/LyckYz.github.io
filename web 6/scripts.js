document.addEventListener('DOMContentLoaded', function() {
    initFormValidation();
    initSmoothScrolling();
    initImageMapLabels();
    initProgrammingLanguages();
    initPhoneMask();
    initServiceCalculator();
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
            alert.remove();
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

function initServiceCalculator() {
    const quantityInput = document.getElementById('quantity');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const optionsSection = document.getElementById('optionsSection');
    const propertySection = document.getElementById('propertySection');
    const serviceOptionSelect = document.getElementById('serviceOption');
    const servicePropertyCheckbox = document.getElementById('serviceProperty');
    const totalPriceElement = document.getElementById('totalPrice');

    const prices = {
        1: { base: 1000 },
        2: { 
            base: 2000,
            options: {
                basic: 1,
                advanced: 1.5,
                premium: 2
            }
        },
        3: { 
            base: 3000,
            property: 1.3
        }
    };

    function calculatePrice() {
        const quantity = parseInt(quantityInput.value) || 1;
        const selectedType = document.querySelector('input[name="serviceType"]:checked').value;
        let total = 0;

        if (selectedType === '1') {
            total = prices[1].base * quantity;
        } else if (selectedType === '2') {
            const option = serviceOptionSelect.value;
            const multiplier = prices[2].options[option];
            total = prices[2].base * multiplier * quantity;
        } else if (selectedType === '3') {
            const multiplier = servicePropertyCheckbox.checked ? prices[3].property : 1;
            total = prices[3].base * multiplier * quantity;
        }

        totalPriceElement.textContent = total.toLocaleString('ru-RU') + ' руб.';
    }

    function updateFormVisibility() {
        const selectedType = document.querySelector('input[name="serviceType"]:checked').value;
        
        if (selectedType === '1') {
            optionsSection.style.display = 'none';
            propertySection.style.display = 'none';
        } else if (selectedType === '2') {
            optionsSection.style.display = 'block';
            propertySection.style.display = 'none';
        } else if (selectedType === '3') {
            optionsSection.style.display = 'none';
            propertySection.style.display = 'block';
        }
    }

    quantityInput.addEventListener('input', calculatePrice);
    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateFormVisibility();
            calculatePrice();
        });
    });
    serviceOptionSelect.addEventListener('change', calculatePrice);
    servicePropertyCheckbox.addEventListener('change', calculatePrice);

    updateFormVisibility();
    calculatePrice();
}
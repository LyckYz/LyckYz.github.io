function initGallery() {
    const galleryTrack = document.querySelector('.gallery-track');
    const slides = document.querySelectorAll('.gallery-slide');
    const prevButton = document.querySelector('.gallery-arrow.prev');
    const nextButton = document.querySelector('.gallery-arrow.next');
    const currentPageElement = document.querySelector('.current-page');
    const totalPagesElement = document.querySelector('.total-pages');
    
    if (!galleryTrack || !slides.length) return;
    
    let currentIndex = 0;
    const slidesPerView = window.innerWidth <= 768 ? 1 : 3;
    const totalSlides = slides.length;
    const totalPages = Math.ceil(totalSlides / slidesPerView);
    
    totalPagesElement.textContent = totalPages;
    
    function updateGallery() {
        const slideWidth = 100 / slidesPerView;
        const translateX = -currentIndex * slideWidth;
        galleryTrack.style.transform = `translateX(${translateX}%)`;
        
        currentPageElement.textContent = currentIndex + 1;
    }
    
    function nextSlide() {
        if (currentIndex < totalPages - 1) {
            currentIndex++;
            updateGallery();
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateGallery();
        }
    }
    
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    
    function handleResize() {
        const newSlidesPerView = window.innerWidth <= 768 ? 1 : 3;
        const newTotalPages = Math.ceil(totalSlides / newSlidesPerView);
        
        if (newSlidesPerView !== slidesPerView) {
            currentIndex = Math.min(currentIndex, newTotalPages - 1);
            totalPagesElement.textContent = newTotalPages;
            updateGallery();
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    updateGallery();
}

document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    initFormValidation();
    initSmoothScrolling();
    initImageMapLabels();
    initProgrammingLanguages();
    initPhoneMask();
    initServiceCalculator();
});
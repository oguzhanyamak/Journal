let currentSlide = 0;
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    if (index < 0) {
        currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }
    
    const offset = -currentSlide * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Auto-advance slides every 10 seconds
setInterval(nextSlide, 10000);

// İlk slaytı göster ve butonlara event ekle
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);

    document.querySelector('.prev').addEventListener('click', prevSlide);
    document.querySelector('.next').addEventListener('click', nextSlide);
});

document.querySelectorAll('.news-image').forEach(img => {
    img.onerror = function() {
        const category = this.getAttribute('data-category'); // 'data-category' değerini alıyoruz
        this.src = '/images/' + category + '.png';
    };
});
const carousel = document.getElementById('carousel');
const buttons = document.querySelectorAll('.carousel-button');
let currentIndex = 0;

function updateCarousel(index) {
    carousel.style.transform = `translateX(-${index * 14.285}% )`; // Ajusté pour 6 items
    buttons.forEach((button, i) => {
        button.classList.toggle('active', i === index);
    });
}

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : buttons.length - 1;
    updateCarousel(currentIndex);
});

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex < buttons.length - 1) ? currentIndex + 1 : 0;
    updateCarousel(currentIndex);
});

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel(currentIndex);
    });
});

// Initialiser le carousel avec le premier élément actif
updateCarousel(0);



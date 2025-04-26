let slideIndex = 1;
let touchStartX = 0;
let touchEndX = 0;
const slideshowContainer = document.querySelector('.slideshow-container');

// Initialize the slider
showSlides(slideIndex);

// Next/previous controls
function changeSlide(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Main slideshow function
function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    // Reset all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        slides[i].style.opacity = "0";
    }

    // Reset all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    // Show current slide
    slides[slideIndex - 1].classList.add("active");
    slides[slideIndex - 1].style.opacity = "1";

    // Activate current dot
    dots[slideIndex - 1].classList.add("active");

    // Add animation class
    slides[slideIndex - 1].classList.add("tilt-in-top-1");

    // Remove animation after it completes
    setTimeout(() => {
        slides[slideIndex - 1].classList.remove("tilt-in-top-1");
    }, 800);
}

// Auto-advance slides (optional)
// setInterval(() => {
//   changeSlide(1);
// }, 5000);

// Touch event handlers for mobile swipe
slideshowContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

slideshowContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next slide
        changeSlide(1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous slide
        changeSlide(-1);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// 3D tilt effect on mouse move
slideshowContainer.addEventListener('mousemove', (e) => {
    const rect = slideshowContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = (x - centerX) / 50;
    const rotateX = (centerY - y) / 50;

    slideshowContainer.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
  `;
});

// Reset tilt when mouse leaves
slideshowContainer.addEventListener('mouseleave', () => {
    slideshowContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
});
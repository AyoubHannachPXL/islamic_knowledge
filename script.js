document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Video slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 5000);
});

// Mobile menu toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown') && window.innerWidth <= 768) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('is-active');
});

// Dropdown functionality
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdown = this.closest('.dropdown');
            const isActive = dropdown.classList.contains('active');

            // Close all dropdowns
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));

            // Toggle current dropdown if not active
            if (!isActive) {
                dropdown.classList.add('active');
            }
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 &&
        !e.target.closest('.nav-links') &&
        !e.target.closest('.hamburger')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('is-active');
    }
});

// Prevent dropdown closing when clicking inside
document.querySelectorAll('.dropdown-menu').forEach(menu => {
    menu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// Close menu when resizing to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('is-active');
    }
});


const container = document.querySelector('.slides-container');
const slides = document.querySelectorAll('.video-slide');
const contents = document.querySelectorAll('.slide-content');
let currentSlide = 0;
let isTransitioning = false;

function updateSlide(direction) {
    if (isTransitioning) return;
    isTransitioning = true;

    // Remove active classes
    slides[currentSlide].classList.remove('active');
    contents[currentSlide].classList.remove('active');

    // Update current slide
    if (direction === 'next') {
        currentSlide = (currentSlide + 1) % slides.length;
    } else {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    }

    // Update container transform
    container.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Add active classes after transition
    setTimeout(() => {
        slides[currentSlide].classList.add('active');
        contents[currentSlide].classList.add('active');
        isTransitioning = false;
    }, 800);

    // Handle video playback
    slides.forEach((slide, index) => {
        const video = slide.querySelector('.slide-video');
        const image = slide.querySelector('.slide-image');

        if (index === currentSlide) {
            if (video) video.play();
            if (image) image.style.opacity = 1;
        } else {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
            if (image) image.style.opacity = 0;
        }
    });
}

// Navigation Functions
function previousSlide() {
    updateSlide('prev');
    resetInterval();
}

function nextSlide() {
    updateSlide('next');
    resetInterval();
}

// Event Listeners
document.querySelector('.prev-btn').addEventListener('click', previousSlide);
document.querySelector('.next-btn').addEventListener('click', nextSlide);

// Handle window resize
window.addEventListener('resize', () => {
    container.style.transition = 'none';
    container.style.transform = `translateX(-${currentSlide * 100}%)`;
    setTimeout(() => {
        container.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    }, 10);
});

// Initialize
slides[0].querySelector('.slide-video').play();
let slideInterval = setInterval(nextSlide, 5000);

// Pause on hover
container.addEventListener('mouseenter', () => clearInterval(slideInterval));
container.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}
    // Handle window resize
    window.addEventListener('resize', () => {
        container.scrollTo({
            left: window.innerWidth * currentSlide,
            behavior: 'auto'
        });
    });

// Pause on hover
container.addEventListener('mouseenter', () => clearInterval(slideInterval));
container.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, slideDuration);
});

// Handle window resize
window.addEventListener('resize', () => {
    container.scrollTo({
        left: window.innerWidth * currentSlide,
        behavior: 'auto'
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Video Carousel Logic
    const container = document.querySelector('.slides-container');
    const slides = document.querySelectorAll('.video-slide');
    const contents = document.querySelectorAll('.slide-content');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let isTransitioning = false;
    let slideInterval;
    const slideDuration = 5000;

    function updateSlide(direction) {
        if (isTransitioning) return;
        isTransitioning = true;

        slides[currentSlide].classList.remove('active');
        contents[currentSlide].classList.remove('active');

        direction === 'next'
            ? currentSlide = (currentSlide + 1) % slides.length
            : currentSlide = (currentSlide - 1 + slides.length) % slides.length;

        container.style.transform = `translateX(-${currentSlide * 100}%)`;

        setTimeout(() => {
            slides[currentSlide].classList.add('active');
            contents[currentSlide].classList.add('active');
            isTransitioning = false;
        }, 800);

        // Handle media playback
        slides.forEach((slide, index) => {
            const video = slide.querySelector('.slide-video');
            const image = slide.querySelector('.slide-image');
            if (index === currentSlide) {
                if (video) {
                    video.play().catch(e => {
                        video.muted = true;
                        video.play();
                    });
                }
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

    // Navigation controls
    const previousSlide = () => { updateSlide('prev'); resetInterval(); }
    const nextSlide = () => { updateSlide('next'); resetInterval(); }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', previousSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // Initialize carousel
    function initCarousel() {
        slides[0].querySelector('.slide-video')?.play();
        resetInterval();
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Close all dropdowns when menu closes
            if (!navMenu.classList.contains('active')) {
                document.querySelectorAll('.dropdown').forEach(d => {
                    d.classList.remove('active');
                });
            }
        });
    }

    // Dropdown functionality
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.closest('.dropdown');
                const wasActive = dropdown.classList.contains('active');

                // Toggle current dropdown
                dropdown.classList.toggle('active', !wasActive);

                // Close other dropdowns
                document.querySelectorAll('.dropdown').forEach(d => {
                    if (d !== dropdown) d.classList.remove('active');
                });
            }
        });
    });

    // Event handlers
    document.addEventListener('click', function(e) {
        // Mobile menu handling
        if (window.innerWidth <= 768) {
            const isMenuClick = e.target.closest('.nav-links') ||
                e.target.closest('.hamburger') ||
                e.target.closest('.dropdown');

            if (!isMenuClick) {
                navMenu?.classList.remove('active');
                hamburger?.classList.remove('active');
                document.querySelectorAll('.dropdown').forEach(d => {
                    d.classList.remove('active');
                });
            }
        }

        // Close dropdowns when clicking outside
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(d => {
                d.classList.remove('active');
            });
        }
    });

    window.addEventListener('resize', () => {
        // Carousel resize handling
        if (container) {
            container.style.transition = 'none';
            container.style.transform = `translateX(-${currentSlide * 100}%)`;
            setTimeout(() => {
                container.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 10);
        }

        // Reset mobile menu on desktop
        window.addEventListener('resize', () => {
            // Handle carousel positioning
            if (container) {
                container.style.transition = 'none';
                container.style.transform = `translateX(-${currentSlide * 100}%)`;
                setTimeout(() => {
                    container.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                }, 10);
            }

            // Handle responsive menu behavior
            if (window.innerWidth > 768) { // Desktop
                // Reset mobile menu state
                navMenu?.classList.remove('active');
                hamburger?.classList.remove('active');

                // Reset dropdowns
                document.querySelectorAll('.dropdown').forEach(d => {
                    d.classList.remove('active');
                });
            } else { // Mobile
                // Reset desktop hover behaviors
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.style.display = '';
                });
            }
        });
    });

    // Initialize components
    initCarousel();
    if (container) {
        container.addEventListener('mouseenter', () => clearInterval(slideInterval));
        container.addEventListener('mouseleave', resetInterval);
    }
});
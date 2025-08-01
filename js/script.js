// Hero Slideshow
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slideshow img');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);

    // Smooth scrolling for navigation links
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

    // Book Now buttons scroll to reservation
    document.querySelectorAll('.btn-book').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelector('#reservation').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Form submission
    const reservationForm = document.querySelector('.reservation-form');
    const confirmationMessage = document.querySelector('#confirmation-message');

    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide form and show confirmation
        reservationForm.style.display = 'none';
        confirmationMessage.style.display = 'block';
        
        // Scroll to confirmation message
        confirmationMessage.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Reset form after 5 seconds and show it again
        setTimeout(() => {
            reservationForm.reset();
            reservationForm.style.display = 'block';
            confirmationMessage.style.display = 'none';
        }, 5000);
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Gallery image click to enlarge (simple implementation)
    document.querySelectorAll('.gallery-grid img').forEach(img => {
        img.addEventListener('click', function() {
            // Create modal overlay
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                cursor: pointer;
            `;

            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 15px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            `;

            modal.appendChild(modalImg);
            document.body.appendChild(modal);

            // Close modal on click
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
    });

    // Set minimum date for reservation to today
    const dateInput = document.querySelector('#date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Add animation on scroll
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

    // Observe elements for animation
    document.querySelectorAll('.card, .team-member, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});


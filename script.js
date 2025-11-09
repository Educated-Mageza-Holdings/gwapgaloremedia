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

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Form submission handler
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Video play tracking
const video = document.querySelector('.main-video');
if (video) {
    video.addEventListener('play', () => {
        console.log('Video started playing');
    });

    video.addEventListener('pause', () => {
        console.log('Video paused');
    });
}

// Add loading class removal
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter animation for community stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat h3');

    counters.forEach(counter => {
        const target = counter.innerText;
        const isNumber = /^\d+/.test(target);

        if (isNumber) {
            const number = parseInt(target.replace(/[^0-9]/g, ''));
            const suffix = target.replace(/[0-9,]/g, '');
            const duration = 2000;
            const increment = number / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < number) {
                    counter.innerText = Math.floor(current).toLocaleString() + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = number.toLocaleString() + suffix;
                }
            };

            // Start animation when element is in view
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counterObserver.observe(counter);
        }
    });
};

// Initialize counter animation
animateCounters();

// Add hover effect to cards
document.querySelectorAll('.about-card, .benefit-item, .training-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Mobile menu toggle (if needed in future)
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar .container');
    const navLinks = document.querySelector('.nav-links');

    // This is a placeholder for mobile menu functionality
    // Can be extended based on requirements
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Runners website loaded successfully!');

    // Add smooth reveal to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
        }, 100);
    }
});

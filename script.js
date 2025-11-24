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

// Navbar scroll effect with class toggle
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Add parallax effect to hero
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        if (scrolled < hero.offsetHeight) {
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight);
            }
        }
    });
}

// Enhanced Intersection Observer for staggered animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            // Optionally unobserve after animation
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections with staggered animation
document.querySelectorAll('section').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    fadeInObserver.observe(section);
});

// Add class when element becomes visible
const style = document.createElement('style');
style.textContent = `
    .fade-in-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Observe cards for entrance animations
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Apply to cards
document.querySelectorAll('.about-card, .training-card, .stat-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.9)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    cardObserver.observe(card);
});

// Form submission handler
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Create WhatsApp message
        const whatsappMessage = `Hello, my name is ${name}.\n\nEmail: ${email}\n\nMessage: ${message}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappNumber = '27764657806'; // 076 465 7806
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Show notification
        alert('We have received your message and we will contact you with further details. You will now be redirected to WhatsApp.');

        // Reset form
        contactForm.reset();

        // Redirect to WhatsApp
        window.open(whatsappURL, '_blank');
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

// Add active states to CTA buttons
document.querySelectorAll('.cta-button, .submit-button, .ticket-btn, .whatsapp-btn').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });

    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .cta-button, .submit-button, .ticket-btn, .whatsapp-btn {
        position: relative;
        overflow: hidden;
    }

    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

document.querySelectorAll('.cta-button, .submit-button, .ticket-btn, .whatsapp-btn').forEach(button => {
    button.addEventListener('click', createRipple);
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

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// Highlight active navigation link on scroll
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Add active link styling
const navLinkStyle = document.createElement('style');
navLinkStyle.textContent = `
    .nav-links a.active {
        color: var(--primary-color);
        font-weight: 700;
    }

    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(navLinkStyle);

// Smooth scroll with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Gwap Galore Media - Runners website loaded successfully! 🏃‍♂️⚡');

    // Add smooth reveal to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }

    // Initialize active nav link highlighting
    highlightActiveNavLink();

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Animate stat numbers on scroll
    const statNumbers = document.querySelectorAll('.stat-item .value, .stat-value-large');

    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent.trim();
                const hasNumber = /\d/.test(text);

                if (hasNumber) {
                    target.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        target.style.transform = 'scale(1)';
                    }, 300);
                }

                numberObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => {
        num.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        numberObserver.observe(num);
    });
});

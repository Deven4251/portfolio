document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            contact: document.getElementById('contact').value,
            message: document.getElementById('message').value
        };

        // You can implement your form submission logic here
        console.log('Form submitted:', formData);

        // Show success message
        alert('Thank you for your message! I will get back to you soon.');

        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('opacity-0');
    observer.observe(section);
});

// Navbar scroll behavior
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }

    lastScroll = currentScroll;
});

function changeTheme(theme) {
    document.body.classList.remove("black", "white", "darkblue", "yellow");
    document.body.classList.add(theme);
}

// Intersection Observer for project cards
const projectCards = document.querySelectorAll('.project-card');

// Track which cards have been animated
const animatedCards = new Set();

const projectObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        const card = entry.target;

        if (entry.isIntersecting && !animatedCards.has(card)) {
            // Card is coming into view for the first time
            card.classList.add('visible');
            animatedCards.add(card);

            // Only apply the animation once
            card.style.animation = 'cardBuildUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';

            // After animation completes, remove the animation property
            card.addEventListener('animationend', () => {
                card.style.animation = '';
            }, { once: true });
        }
    });
}, observerOptions);

// Observe all project cards
projectCards.forEach(card => {
    projectObserver.observe(card);
});

// Add hover effect for project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (card.classList.contains('visible')) {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        }
    });

    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('visible')) {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });
});

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial theme to dark
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', function(e) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Business card flip functionality
    const flipButtons = document.querySelectorAll('.flip-card-btn');
    const businessCard = document.querySelector('.business-card');

    if (flipButtons.length > 0 && businessCard) {
        flipButtons.forEach(button => {
            button.addEventListener('click', () => {
                businessCard.classList.toggle('flipped');
            });
        });
    }
});
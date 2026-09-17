/* -------------------------------------------------------------
   HAMONA SWEETWHISK — CINEMATIC SCROLL & ANIMATION CONTROLLER
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Controller (Light Mode Default + Dark Mode Toggle)
    initThemeController();

    // 2. Particle Canvas Background Effect
    initParticleCanvas();

    // 3. Navigation Scroll & Mobile Toggle
    initNavbar();

    // 4. Scroll Reveal Animations (IntersectionObserver)
    initScrollReveals();
});

// Theme Controller: Light Mode (Default) & Dark Mode with LocalStorage persistence
function initThemeController() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Set initial theme attribute on <html> element
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Particle Canvas Implementation
function initParticleCanvas() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 0.5,
            speedY: Math.random() * 0.35 + 0.1,
            speedX: (Math.random() - 0.5) * 0.2,
            opacity: Math.random() * 0.4 + 0.15,
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const particleColor = currentTheme === 'light' ? '184, 91, 108' : '212, 175, 55';

        particles.forEach((p) => {
            p.y -= p.speedY;
            p.x += p.speedX;

            if (p.y < 0) {
                p.y = height;
                p.x = Math.random() * width;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${particleColor}, ${p.opacity})`;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Navbar Scroll Effect and Mobile Toggle
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// Configurable Business Contact Information
const BUSINESS_CONFIG = {
    whatsappNumber: "251942362738",
    phoneNumber: "+251942362738"
};

// Intersection Observer for Smooth Scroll Reveal Animations
function initScrollReveals() {
    const revealElements = document.querySelectorAll(
        '.reveal-line, .compact-category-block, .compact-card, .occasion-card, .step-card, .order-form-container'
    );

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => observer.observe(el));
}

// Handle Order Request Form Submission -> Generate Formatted WhatsApp Message
function handleOrderSubmit(event) {
    event.preventDefault();

    const fullName = document.getElementById('full-name').value.trim();
    const phoneNumber = document.getElementById('phone-number').value.trim();
    const cakeSelect = document.getElementById('cake-select').value;
    const rawDate = document.getElementById('order-date').value;
    const quantitySize = document.getElementById('quantity-size').value.trim();
    const specialRequest = document.getElementById('special-request').value.trim();

    // Format date nicely if provided
    let formattedDate = 'Not specified';
    if (rawDate) {
        const dateObj = new Date(rawDate);
        if (!isNaN(dateObj.getTime())) {
            formattedDate = dateObj.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }

    // Build formatted message text
    let message = `Hi! I'd like to order a cake.\n\n`;
    message += `Name: ${fullName}\n`;
    message += `Phone: ${phoneNumber}\n`;
    message += `Cake: ${cakeSelect}\n`;
    message += `Order Date: ${formattedDate}\n`;
    message += `Quantity/Size: ${quantitySize || 'Not specified'}\n`;
    message += `Special Request: ${specialRequest || 'None'}\n\n`;
    message += `Could you please confirm the price and availability?`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodedMessage}`;

    // Update Option A confirmation UI card
    const orderForm = document.getElementById('cake-order-form');
    const orderStatusCard = document.getElementById('order-status-card');
    const whatsappDirectLink = document.getElementById('whatsapp-direct-link');

    if (whatsappDirectLink) {
        whatsappDirectLink.href = waUrl;
    }

    if (orderForm && orderStatusCard) {
        orderForm.style.display = 'none';
        orderStatusCard.classList.remove('hidden');
    }

    // Immediately open WhatsApp link
    window.open(waUrl, '_blank');
}

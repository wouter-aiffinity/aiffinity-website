/**
 * AIffinity Website - Main JavaScript
 * Handles animations, interactions, and neural network visualization
 */

// ===================================
// Neural Network Background Generator
// ===================================
class NeuralNetworkBackground {
    constructor(svgElement, nodeCount = 40) {
        this.svg = svgElement;
        this.nodes = [];
        this.nodeCount = nodeCount;
        this.connections = [];
        this.init();
    }

    init() {
        const width = this.svg.clientWidth || window.innerWidth;
        const height = this.svg.clientHeight || window.innerHeight;
        
        this.svg.setAttribute('width', width);
        this.svg.setAttribute('height', height);
        
        // Generate random nodes
        for (let i = 0; i < this.nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
        
        this.animate();
    }

    drawConnections() {
        // Clear previous connections
        const connections = this.svg.querySelectorAll('.connection');
        connections.forEach(conn => conn.remove());
        
        // Draw connections between nearby nodes
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', this.nodes[i].x);
                    line.setAttribute('y1', this.nodes[i].y);
                    line.setAttribute('x2', this.nodes[j].x);
                    line.setAttribute('y2', this.nodes[j].y);
                    line.setAttribute('stroke', '#00B4D8');
                    line.setAttribute('stroke-width', '1');
                    line.setAttribute('opacity', (1 - distance / 150) * 0.3);
                    line.classList.add('connection');
                    this.svg.appendChild(line);
                }
            }
        }
    }

    drawNodes() {
        // Clear previous nodes
        const nodes = this.svg.querySelectorAll('.node');
        nodes.forEach(node => node.remove());
        
        // Draw nodes
        this.nodes.forEach(node => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', node.x);
            circle.setAttribute('cy', node.y);
            circle.setAttribute('r', node.radius);
            circle.setAttribute('fill', '#00B4D8');
            circle.setAttribute('opacity', '0.6');
            circle.classList.add('node');
            this.svg.appendChild(circle);
        });
    }

    updateNodes() {
        const width = this.svg.clientWidth || window.innerWidth;
        const height = this.svg.clientHeight || window.innerHeight;
        
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;
            
            // Keep within bounds
            node.x = Math.max(0, Math.min(width, node.x));
            node.y = Math.max(0, Math.min(height, node.y));
        });
    }

    animate() {
        this.updateNodes();
        this.drawConnections();
        this.drawNodes();
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===================================
// Services Pattern Generator
// ===================================
class ServicesPattern {
    constructor(svgElement) {
        this.svg = svgElement;
        this.init();
    }

    init() {
        const width = this.svg.clientWidth || window.innerWidth;
        const height = this.svg.clientHeight || 600;
        
        this.svg.setAttribute('width', width);
        this.svg.setAttribute('height', height);
        
        // Create grid pattern
        const spacing = 30;
        for (let x = 0; x < width; x += spacing) {
            for (let y = 0; y < height; y += spacing) {
                if (Math.random() > 0.5) {
                    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    circle.setAttribute('cx', x);
                    circle.setAttribute('cy', y);
                    circle.setAttribute('r', Math.random() * 2 + 0.5);
                    circle.setAttribute('fill', '#00B4D8');
                    circle.setAttribute('opacity', Math.random() * 0.3);
                    this.svg.appendChild(circle);
                }
            }
        }
    }
}

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in-up elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => fadeInObserver.observe(el));
});

// ===================================
// Navigation Scroll Effect
// ===================================
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        company: document.getElementById('company').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Show success message (in production, this would send to a backend)
    alert('Thank you for reaching out! We\'ll get back to you soon.\n\nIn a production environment, this form would be connected to a backend service.');
    
    // Log to console for demo purposes
    console.log('Form submission:', formData);
    
    // Reset form
    contactForm.reset();
});

// ===================================
// Initialize Neural Network Backgrounds
// ===================================
window.addEventListener('load', () => {
    // Hero neural network
    const heroNetwork = document.getElementById('neuralNetwork');
    if (heroNetwork) {
        new NeuralNetworkBackground(heroNetwork, 50);
    }
    
    // Services pattern
    const servicesPattern = document.getElementById('servicesPattern');
    if (servicesPattern) {
        new ServicesPattern(servicesPattern);
    }
});

// ===================================
// Resize Handler
// ===================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize backgrounds on resize
        const heroNetwork = document.getElementById('neuralNetwork');
        if (heroNetwork) {
            heroNetwork.innerHTML = '';
            new NeuralNetworkBackground(heroNetwork, 50);
        }
        
        const servicesPattern = document.getElementById('servicesPattern');
        if (servicesPattern) {
            servicesPattern.innerHTML = '';
            new ServicesPattern(servicesPattern);
        }
    }, 250);
});

// ===================================
// Card Hover Effects Enhancement
// ===================================
const cards = document.querySelectorAll('.problem-card, .service-card, .case-study-card, .step-content');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.4s ease';
    });
});

// ===================================
// Scroll Progress Indicator (Optional)
// ===================================
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, #4361EE 0%, #00B4D8 100%)';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.1s ease';
    progressBar.id = 'scrollProgress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// Uncomment to enable scroll progress indicator
// createScrollProgress();

// ===================================
// Console Branding
// ===================================
console.log('%cAIffinity', 'font-size: 48px; font-weight: bold; background: linear-gradient(90deg, #4361EE 0%, #00B4D8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cIntelligence should be engineered, not improvised.', 'font-size: 14px; color: #5A6B8A; font-style: italic;');
console.log('%cWebsite built with precision. Interested in working with us? hello@aiffinity.com', 'font-size: 12px; color: #00B4D8;');
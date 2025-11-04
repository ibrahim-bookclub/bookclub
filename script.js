// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // If clicking on brand/home link, scroll to top
        if (href === '#main-content' && this.classList.contains('nav-brand-link')) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            // Calculate offset to account for sticky navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Prevent iframe from capturing focus
            setTimeout(() => {
                if (target.id === 'join') {
                    const typeformIframe = target.querySelector('iframe');
                    if (typeformIframe) {
                        typeformIframe.blur();
                        typeformIframe.setAttribute('tabindex', '-1');
                    }
                }
                // Keep focus on window to prevent iframe from stealing it
                window.focus();
                document.body.focus();
            }, 500);
        }
    });
});

// Prevent typeform iframe from capturing focus and blocking scroll
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Typeform to load
    setTimeout(() => {
        const typeformIframe = document.querySelector('.typeform-container iframe');
        if (typeformIframe) {
            // Prevent iframe from receiving focus
            typeformIframe.setAttribute('tabindex', '-1');
            
            // Add blur event listener
            typeformIframe.addEventListener('focus', function(e) {
                e.preventDefault();
                this.blur();
                window.focus();
            });
            
            // Prevent iframe from blocking scroll
            typeformIframe.style.pointerEvents = 'auto';
        }
        
        // Monitor for dynamically loaded iframes
        const observer = new MutationObserver((mutations) => {
            const iframes = document.querySelectorAll('.typeform-container iframe');
            iframes.forEach(iframe => {
                if (!iframe.hasAttribute('data-scroll-fixed')) {
                    iframe.setAttribute('tabindex', '-1');
                    iframe.setAttribute('data-scroll-fixed', 'true');
                    iframe.addEventListener('focus', function(e) {
                        e.preventDefault();
                        this.blur();
                        window.focus();
                    });
                }
            });
        });
        
        const typeformContainer = document.querySelector('.typeform-container');
        if (typeformContainer) {
            observer.observe(typeformContainer, { childList: true, subtree: true });
        }
    }, 2000);
});

// Prevent page from losing scroll capability
let scrollBlocked = false;
window.addEventListener('wheel', function(e) {
    if (!scrollBlocked) {
        scrollBlocked = true;
        setTimeout(() => {
            scrollBlocked = false;
        }, 100);
    }
}, { passive: true });

// Ensure window stays scrollable
document.addEventListener('focusin', function(e) {
    if (e.target.tagName === 'IFRAME' && e.target.closest('.typeform-container')) {
        e.preventDefault();
        e.target.blur();
        window.focus();
    }
});

// Reading Progress Indicator
function updateReadingProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    const progressBar = document.getElementById('reading-progress');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

window.addEventListener('scroll', updateReadingProgress);
updateReadingProgress();

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

function toggleBackToTop() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
}

window.addEventListener('scroll', toggleBackToTop);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

if (themeToggle && themeIcon) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.rule-item, .book-card, .typeform-container');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Initialize back to top button
    toggleBackToTop();
});

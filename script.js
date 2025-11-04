// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.rule-item, .book-card, .typeform-container');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

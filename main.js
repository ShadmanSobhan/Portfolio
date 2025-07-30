// Main JavaScript file for portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeAnimations();
    initializeTooltips();
    initializeTabSwitching();
    initializeContactLinks();
    
    console.log('Portfolio website initialized successfully');
});

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    // Update active navigation link based on current page
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '/' && href.includes('home'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
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
}

/**
 * Initialize scroll animations and effects
 */
function initializeAnimations() {
    // Fade in animation for cards on scroll
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
    
    // Observe all cards and experience items
    document.querySelectorAll('.card, .experience-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < window.innerHeight) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

/**
 * Initialize Bootstrap tooltips
 */
function initializeTooltips() {
    // Enable tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

/**
 * Initialize tab switching functionality
 */
function initializeTabSwitching() {
    const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add loading state
            const targetPane = document.querySelector(this.getAttribute('data-bs-target'));
            if (targetPane) {
                targetPane.classList.add('loading');
                
                // Remove loading state after a short delay
                setTimeout(() => {
                    targetPane.classList.remove('loading');
                }, 300);
            }
        });
    });
    
    // Handle URL hash for direct tab access
    const hash = window.location.hash;
    if (hash) {
        const tabButton = document.querySelector(`[data-bs-target="${hash}"]`);
        if (tabButton) {
            tabButton.click();
        }
    }
}

/**
 * Initialize contact links functionality
 */
function initializeContactLinks() {
    // Handle email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track email click (you can add analytics here)
            console.log('Email link clicked:', this.href);
        });
    });
    
    // Handle external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add security attributes for external links
            this.rel = 'noopener noreferrer';
            
            // Track external link clicks
            console.log('External link clicked:', this.href);
        });
    });
    
    // Add click animations to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

/**
 * Utility function to show/hide empty states
 */
function toggleEmptyState(containerId, showEmpty = false) {
    const container = document.getElementById(containerId);
    const emptyState = document.getElementById(containerId + '-empty');
    
    if (container && emptyState) {
        if (showEmpty) {
            container.style.display = 'none';
            emptyState.style.display = 'block';
        } else {
            container.style.display = 'block';
            emptyState.style.display = 'none';
        }
    }
}

/**
 * Handle responsive navigation collapse
 */
function handleResponsiveNavigation() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close mobile menu when clicking nav links
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.getComputedStyle(navbarToggler).display !== 'none') {
                    navbarToggler.click();
                }
            });
        });
    }
}

/**
 * Initialize keyboard navigation support
 */
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key to close modals or go back
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.show');
            if (activeModal) {
                const modal = bootstrap.Modal.getInstance(activeModal);
                if (modal) {
                    modal.hide();
                }
            }
        }
        
        // Alt + H for home
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            window.location.href = '/home';
        }
        
        // Alt + P for publications/projects
        if (e.altKey && e.key === 'p') {
            e.preventDefault();
            window.location.href = '/publications-projects';
        }
        
        // Alt + E for experience
        if (e.altKey && e.key === 'e') {
            e.preventDefault();
            window.location.href = '/experience';
        }
    });
}

/**
 * Handle loading states for dynamic content
 */
function showLoadingState(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('loading');
        element.innerHTML = `
            <div class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3 text-secondary">Loading content...</p>
            </div>
        `;
    }
}

/**
 * Utility function for smooth page transitions
 */
function navigateWithTransition(url) {
    document.body.style.opacity = '0.8';
    setTimeout(() => {
        window.location.href = url;
    }, 200);
}

// Initialize additional functionality
document.addEventListener('DOMContentLoaded', function() {
    handleResponsiveNavigation();
    initializeKeyboardNavigation();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

// Export functions for external use
window.portfolioUtils = {
    toggleEmptyState,
    showLoadingState,
    navigateWithTransition
};

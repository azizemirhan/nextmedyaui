// Mobile Menu Toggle - Sidebar Version
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileSidebar = document.getElementById('mobileSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const closeSidebar = document.getElementById('closeSidebar');

// Open sidebar
mobileMenuToggle.addEventListener('click', function() {
    mobileSidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close sidebar
function closeMobileSidebar() {
    mobileSidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

closeSidebar.addEventListener('click', closeMobileSidebar);
sidebarOverlay.addEventListener('click', closeMobileSidebar);

// Expandable menu items
const expandableButtons = document.querySelectorAll('.sidebar-link[data-expand]');

expandableButtons.forEach(button => {
    button.addEventListener('click', function() {
        const parentItem = this.closest('.sidebar-item');
        const targetId = this.getAttribute('data-expand');
        
        // Close other expanded items
        document.querySelectorAll('.sidebar-item.expanded').forEach(item => {
            if (item !== parentItem) {
                item.classList.remove('expanded');
            }
        });
        
        // Toggle current item
        parentItem.classList.toggle('expanded');
    });
});

// Prevent closing when clicking inside sidebar
mobileSidebar.addEventListener('click', function(e) {
    e.stopPropagation();
});

// Dropdown Menu Enhancement
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    let timeout;
    
    dropdown.addEventListener('mouseenter', function() {
        clearTimeout(timeout);
        this.querySelector('.dropdown-menu').style.display = 'block';
    });
    
    dropdown.addEventListener('mouseleave', function() {
        const menu = this.querySelector('.dropdown-menu');
        timeout = setTimeout(() => {
            menu.style.display = '';
        }, 200);
    });
});

// Smooth Scroll for Anchor Links
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

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.main-header');
const topBar = document.querySelector('.top-bar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
        topBar.style.transform = 'translateY(-100%)';
    } else {
        header.classList.remove('scrolled');
        topBar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Animated Counter for Stats
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        if (element.dataset.format === 'currency') {
            element.textContent = '₺' + Math.floor(progress * (end - start) + start).toLocaleString('tr-TR') + 'M+';
        } else if (element.dataset.format === 'percentage') {
            element.textContent = '%' + (Math.floor(progress * (end - start) + start) / 10).toFixed(1);
        } else {
            element.textContent = Math.floor(progress * (end - start) + start).toLocaleString('tr-TR') + '+';
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer for Stats Animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                setTimeout(() => {
                    if (index === 0) {
                        stat.dataset.format = 'number';
                        animateCounter(stat, 0, 36000, 2000);
                    } else if (index === 1) {
                        stat.dataset.format = 'currency';
                        animateCounter(stat, 0, 23, 2000);
                    } else if (index === 2) {
                        stat.dataset.format = 'percentage';
                        animateCounter(stat, 0, 999, 2000);
                    }
                }, index * 200);
            });
        }
    });
}, observerOptions);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Parallax Effect for Hero Elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card, .shape');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Dynamic Chart Animation
const chartBars = document.querySelectorAll('.chart-bar');
let chartAnimated = false;

function animateChart() {
    if (!chartAnimated) {
        chartBars.forEach((bar, index) => {
            setTimeout(() => {
                const height = bar.style.height;
                bar.style.height = '0';
                bar.style.transition = 'height 0.8s ease-out';
                
                setTimeout(() => {
                    bar.style.height = height;
                }, 100);
            }, index * 100);
        });
        chartAnimated = true;
    }
}

// Chart animation on scroll
const chartContainer = document.querySelector('.chart-container');
if (chartContainer) {
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateChart();
            }
        });
    }, { threshold: 0.5 });
    
    chartObserver.observe(chartContainer);
}

// Button Ripple Effect
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
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to all buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
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
    
    .main-header.scrolled {
        padding: 12px 0;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .top-bar {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Notification Animation (for demo)
function showNotification() {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">🎉</span>
            <div class="notification-text">
                <strong>Yeni Sipariş!</strong>
                <p>Az önce İstanbul'dan bir sipariş aldınız</p>
            </div>
        </div>
    `;
    
    // Add notification styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 100px;
            right: -400px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            padding: 16px 20px;
            z-index: 9999;
            transition: right 0.5s ease;
            max-width: 350px;
        }
        
        .notification.show {
            right: 20px;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-icon {
            font-size: 24px;
        }
        
        .notification-text strong {
            display: block;
            color: var(--text-primary);
            margin-bottom: 4px;
        }
        
        .notification-text p {
            color: var(--text-secondary);
            font-size: 14px;
            margin: 0;
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'notification-styles';
        styleEl.textContent = notificationStyles;
        document.head.appendChild(styleEl);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Show notification after 3 seconds (demo)
setTimeout(showNotification, 3000);

// Typing Effect for Hero Title (Optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect (optional - uncomment to use)
// const heroHighlight = document.querySelector('.hero-title .highlight');
// if (heroHighlight) {
//     const originalText = heroHighlight.textContent;
//     typeWriter(heroHighlight, originalText, 100);
// }

// Lazy Loading Images (if you add images later)
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Form Validation (for future forms)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Export functions for use in other scripts
window.siteUtils = {
    animateCounter,
    createRipple,
    showNotification,
    validateEmail,
    validatePhone,
    typeWriter
};

console.log('E-Ticaret Pro - Site başarıyla yüklendi! 🚀');
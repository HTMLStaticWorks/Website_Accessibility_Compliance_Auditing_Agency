document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Theme Toggle
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const body = document.body;
    
    const updateThemeButtons = (isDark) => {
        themeToggles.forEach(toggle => {
            toggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
            toggle.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
        });
    };

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeButtons(isDark);
        });
    });

    // RTL Toggle
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    const html = document.documentElement;
    
    const updateRtlButtons = (isRTL) => {
        rtlToggles.forEach(toggle => {
            toggle.textContent = isRTL ? 'LTR' : 'RTL';
        });
    };

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            body.classList.toggle('rtl');
            const isRTL = body.classList.contains('rtl');
            html.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
            localStorage.setItem('rtl', isRTL ? 'true' : 'false');
            updateRtlButtons(isRTL);
        });
    });

    // Initialize Preferences
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        updateThemeButtons(true);
    } else {
        updateThemeButtons(false);
    }
    
    if (localStorage.getItem('rtl') === 'true') {
        body.classList.add('rtl');
        html.setAttribute('dir', 'rtl');
        updateRtlButtons(true);
    } else {
        html.setAttribute('dir', 'ltr');
        updateRtlButtons(false);
    }

    // Scroll Reveal
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight * 0.85) {
                el.classList.add('revealed');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Smooth Scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button Logic
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Password Visibility Toggle
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
});

// Toast Notification System
function showToast(message, type = 'info') {
    const container = document.querySelector('.toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// Live WCAG Diagnostic Inspection Simulation
function runDiagnosticTriage() {
    const input = document.getElementById('diagnostic-url');
    const scoreNum = document.getElementById('telemetry-score-num');
    const statusText = document.getElementById('telemetry-status-text');
    if (!input || !input.value) return;

    if (statusText) statusText.textContent = 'Analyzing DOM...';
    if (scoreNum) scoreNum.textContent = '...';
    if (typeof showToast === 'function') {
        showToast('Initiating non-intrusive compliance check on ' + input.value, 'info');
    }

    setTimeout(() => {
        if (statusText) statusText.textContent = 'Engine Active';
        if (scoreNum) scoreNum.textContent = '96';
        const barP = document.getElementById('bar-perceivable');
        const barO = document.getElementById('bar-operable');
        const barU = document.getElementById('bar-understandable');
        if (barP) barP.style.width = '100%';
        if (barO) barO.style.width = '94%';
        if (barU) barU.style.width = '96%';
        const scoreP = document.getElementById('score-perceivable');
        const scoreO = document.getElementById('score-operable');
        const scoreU = document.getElementById('score-understandable');
        if (scoreP) scoreP.textContent = '100%';
        if (scoreO) scoreO.textContent = '94%';
        if (scoreU) scoreU.textContent = '96%';
        if (typeof showToast === 'function') {
            showToast('Inspection complete! Ready for full human verification scope.', 'success');
        }
    }, 900);
}

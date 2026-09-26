// Accessibility Features
document.addEventListener('DOMContentLoaded', () => {
    // Keyboard Navigation for Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Toggle Navigation Menu');
        
        hamburger.addEventListener('click', () => {
            const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.setAttribute('aria-expanded', !expanded);
        });
    }

    // ARIA labels for social links
    document.querySelectorAll('.social-link').forEach(link => {
        const platform = link.querySelector('i')?.className.split('-').pop() || 'social media';
        link.setAttribute('aria-label', `Follow us on ${platform}`);
    });

    // Handle Skip Link Focus
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#main-content');
            if (target) {
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    }

    // Form Validation & Accessibility
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let valid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.setAttribute('aria-invalid', 'true');
                    input.classList.add('error');
                    // Find or create error message
                    let errorId = `${input.id}-error`;
                    let errorMsg = document.getElementById(errorId);
                    if (!errorMsg) {
                        errorMsg = document.createElement('span');
                        errorMsg.id = errorId;
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = 'var(--danger)';
                        errorMsg.style.fontSize = '12px';
                        input.parentNode.appendChild(errorMsg);
                    }
                    errorMsg.textContent = 'This field is required.';
                } else {
                    input.setAttribute('aria-invalid', 'false');
                    input.classList.remove('error');
                    const errorMsg = document.getElementById(`${input.id}-error`);
                    if (errorMsg) errorMsg.textContent = '';
                }
            });
            
            if (!valid) e.preventDefault();
        });
    });

    // Contrast Check (Log warning for devs)
    // This is a simplified placeholder for a real audit
    console.log('%c Accessibility Audit Active ', 'background: #222; color: #bada55');
});

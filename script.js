// Anyess Global - Custom JavaScript

document.addEventListener("DOMContentLoaded", function() {

    // 1. Smooth Scrolling for Navbar Links
    document.querySelectorAll('#main-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Update Footer Year Automatically
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 3. Contact Form Submission Simulation
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission

            // This is where you would integrate with a backend service (e.g., via fetch API)
            // For now, we just simulate a success message.
            formMessage.innerHTML = `
                <div class="alert alert-success" role="alert">
                    Thank you for your inquiry! We will get back to you shortly.
                </div>
            `;
            contactForm.reset(); // Clear the form fields

            // Hide the message after 5 seconds
            setTimeout(() => {
                formMessage.innerHTML = '';
            }, 5000);
        });
    }

    // 4. Close mobile navbar on link click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navCollapse = document.querySelector('.navbar-collapse.collapse');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navCollapse).hide();
            }
        });
    });

});
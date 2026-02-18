document.addEventListener("DOMContentLoaded", () => {
    
    // 🚨 CONFIG: Backend URL (Update this for Railway/Production)
    const API_BASE = "http://localhost:8080/api/public";

    // --- 1. Footer Year ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. Dynamic Navbar Dropdown ---
    const dropdownMenu = document.getElementById("dynamic-nav-dropdown");
    if (dropdownMenu) {
        fetch(`${API_BASE}/categories`)
            .then(res => res.json())
            .then(categories => {
                dropdownMenu.innerHTML = ""; // Clear "Loading..." text
                
                if (categories.length === 0) {
                    dropdownMenu.innerHTML = '<li><a class="dropdown-item" href="products.html">All Products</a></li>';
                    return;
                }

                categories.forEach(category => {
                    // Create URL-friendly slug (e.g. "Modular Wiring" -> "modular-wiring")
                    const slug = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    
                    const li = document.createElement("li");
                    // This link will go to products.html and scroll to the specific section
                    li.innerHTML = `<a class="dropdown-item" href="products.html#${slug}">${category.name}</a>`;
                    dropdownMenu.appendChild(li);
                });
            })
            .catch(err => {
                console.error("Failed to load nav categories", err);
                dropdownMenu.innerHTML = '<li><a class="dropdown-item" href="products.html">View All Products</a></li>';
            });
    }

    // --- 3. Contact Form Handling ---
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            if(formMessage) formMessage.innerHTML = '';

            const formData = {
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-email').value,
                subject: document.getElementById('contact-subject').value,
                message: document.getElementById('contact-message').value
            };

            fetch(`${API_BASE}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    if(formMessage) formMessage.innerHTML = '<div class="alert alert-success">Thank you! Your message has been sent successfully.</div>';
                    contactForm.reset();
                    // Clear message after 5 seconds
                    setTimeout(() => { if(formMessage) formMessage.innerHTML = ''; }, 5000);
                } else {
                    if(formMessage) formMessage.innerHTML = '<div class="alert alert-danger">Server Error. Please try again later.</div>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                if(formMessage) formMessage.innerHTML = '<div class="alert alert-danger">Connection Failed. Check your internet.</div>';
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Inquiry';
            });
        });
    }

    // --- 4. Mobile Navbar Helper ---
    // Closes the mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navCollapse = document.querySelector('.navbar-collapse.collapse');
    if (navCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navCollapse.classList.contains('show')) {
                    // Check if Bootstrap is available globally
                    if (typeof bootstrap !== 'undefined') {
                        new bootstrap.Collapse(navCollapse).hide();
                    } else {
                        navCollapse.classList.remove('show');
                    }
                }
            });
        });
    }
});

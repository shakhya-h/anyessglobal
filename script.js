// document.addEventListener("DOMContentLoaded", () => {
    
//     // 🚨 CONFIG: Backend URL (Update this for Railway/Production)
//     const API_BASE = "http://localhost:8080/api/public";

//     // --- 1. Footer Year ---
//     const yearSpan = document.getElementById('currentYear');
//     if (yearSpan) {
//         yearSpan.textContent = new Date().getFullYear();
//     }

//     // --- 2. Dynamic Navbar Dropdown ---
//     const dropdownMenu = document.getElementById("dynamic-nav-dropdown");
//     if (dropdownMenu) {
//         fetch(`${API_BASE}/categories`)
//             .then(res => res.json())
//             .then(categories => {
//                 dropdownMenu.innerHTML = ""; // Clear "Loading..." text
                
//                 if (categories.length === 0) {
//                     dropdownMenu.innerHTML = '<li><a class="dropdown-item" href="products.html">All Products</a></li>';
//                     return;
//                 }

//                 categories.forEach(category => {
//                     // Create URL-friendly slug (e.g. "Modular Wiring" -> "modular-wiring")
//                     const slug = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    
//                     const li = document.createElement("li");
//                     // This link will go to products.html and scroll to the specific section
//                     li.innerHTML = `<a class="dropdown-item" href="products.html#${slug}">${category.name}</a>`;
//                     dropdownMenu.appendChild(li);
//                 });
//             })
//             .catch(err => {
//                 console.error("Failed to load nav categories", err);
//                 dropdownMenu.innerHTML = '<li><a class="dropdown-item" href="products.html">View All Products</a></li>';
//             });
//     }

//     // --- 3. Contact Form Handling ---
//     const contactForm = document.getElementById('contactForm');
//     const formMessage = document.getElementById('form-message');

//     if (contactForm) {
//         contactForm.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             const submitButton = contactForm.querySelector('button[type="submit"]');
//             submitButton.disabled = true;
//             submitButton.textContent = 'Sending...';
//             if(formMessage) formMessage.innerHTML = '';

//             const formData = {
//                 name: document.getElementById('contact-name').value,
//                 email: document.getElementById('contact-email').value,
//                 subject: document.getElementById('contact-subject').value,
//                 message: document.getElementById('contact-message').value
//             };

//             fetch(`${API_BASE}/contact`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData)
//             })
//             .then(response => {
//                 if (response.ok) {
//                     if(formMessage) formMessage.innerHTML = '<div class="alert alert-success">Thank you! Your message has been sent successfully.</div>';
//                     contactForm.reset();
//                     // Clear message after 5 seconds
//                     setTimeout(() => { if(formMessage) formMessage.innerHTML = ''; }, 5000);
//                 } else {
//                     if(formMessage) formMessage.innerHTML = '<div class="alert alert-danger">Server Error. Please try again later.</div>';
//                 }
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//                 if(formMessage) formMessage.innerHTML = '<div class="alert alert-danger">Connection Failed. Check your internet.</div>';
//             })
//             .finally(() => {
//                 submitButton.disabled = false;
//                 submitButton.textContent = 'Send Inquiry';
//             });
//         });
//     }

//     // --- 4. Mobile Navbar Helper ---
//     // Closes the mobile menu when a link is clicked
//     const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
//     const navCollapse = document.querySelector('.navbar-collapse.collapse');
//     if (navCollapse) {
//         navLinks.forEach(link => {
//             link.addEventListener('click', () => {
//                 if (navCollapse.classList.contains('show')) {
//                     // Check if Bootstrap is available globally
//                     if (typeof bootstrap !== 'undefined') {
//                         new bootstrap.Collapse(navCollapse).hide();
//                     } else {
//                         navCollapse.classList.remove('show');
//                     }
//                 }
//             });
//         });
//     }
// });

// document.addEventListener("DOMContentLoaded", () => {
    
//     // 🚨 CONFIG: Backend URL
//     const API_BASE = "http://localhost:8080/api/public";

//     // --- 1. Footer Year ---
//     const yearSpan = document.getElementById('currentYear');
//     if (yearSpan) {
//         yearSpan.textContent = new Date().getFullYear();
//     }

//     // --- 2. Fetch Categories (Runs on Index AND Products pages) ---
//     fetchCategories();

//     function fetchCategories() {
//         fetch(`${API_BASE}/categories`)
//             .then(res => res.json())
//             .then(categories => {
                
//                 // A. Update Navbar Dropdown (Both Pages)
//                 const dropdownMenu = document.getElementById("dynamic-nav-dropdown");
//                 if (dropdownMenu) {
//                     dropdownMenu.innerHTML = "";
//                     if (categories.length === 0) {
//                         dropdownMenu.innerHTML = '<li><a class="dropdown-item" href="products.html">All Products</a></li>';
//                     } else {
//                         categories.forEach(category => {
//                             const slug = createSlug(category.name);
//                             const li = document.createElement("li");
//                             li.innerHTML = `<a class="dropdown-item" href="products.html#${slug}">${category.name}</a>`;
//                             dropdownMenu.appendChild(li);
//                         });
//                     }
//                 }

//                 // B. Update Homepage Grid (Index Page Only)
//                 // 👇 THIS IS THE PART YOU WERE MISSING 👇
//                 const homeGrid = document.getElementById("home-category-grid");
//                 if (homeGrid) {
//                     homeGrid.innerHTML = ""; // Clear the "Loading..." spinner
                    
//                     if (categories.length === 0) {
//                         homeGrid.innerHTML = '<p class="text-center text-muted">No categories found in database.</p>';
//                         return;
//                     }

//                     categories.forEach(category => {
//                         const slug = createSlug(category.name);
                        
//                         // Create Card HTML (Matches your Original Style)
//                         const col = document.createElement("div");
//                         col.className = "col-md-6 col-lg-3";
//                         col.innerHTML = `
//                             <a href="products.html#${slug}" class="text-decoration-none">
//                                 <div class="card h-100 text-center service-card">
//                                     <div class="card-body">
//                                         <div class="icon-circle mx-auto mb-3">
//                                             <i class="fas fa-cubes fa-2x"></i>
//                                         </div>
//                                         <h5 class="card-title fw-bold text-dark">${category.name}</h5>
//                                         <p class="card-text text-muted small">View our ${category.name} solutions.</p>
//                                     </div>
//                                 </div>
//                             </a>
//                         `;
//                         homeGrid.appendChild(col);
//                     });
//                 }
//             })
//             .catch(err => {
//                 console.error("Failed to load categories", err);
//                 const homeGrid = document.getElementById("home-category-grid");
//                 if(homeGrid) homeGrid.innerHTML = '<p class="text-center text-danger">Failed to connect to backend.</p>';
//             });
//     }

//     // Helper: Create clean URLs
//     function createSlug(name) {
//         return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
//     }

//     // --- 3. Contact Form Handling ---
//     const contactForm = document.getElementById('contactForm');
//     const formMessage = document.getElementById('form-message');

//     if (contactForm) {
//         contactForm.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             const submitButton = contactForm.querySelector('button[type="submit"]');
//             submitButton.disabled = true;
//             submitButton.textContent = 'Sending...';
//             if(formMessage) formMessage.innerHTML = '';

//             const formData = {
//                 name: document.getElementById('contact-name').value,
//                 email: document.getElementById('contact-email').value,
//                 subject: document.getElementById('contact-subject').value,
//                 message: document.getElementById('contact-message').value
//             };

//             fetch(`${API_BASE}/contact`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData)
//             })
//             .then(response => {
//                 if (response.ok) {
//                     if(formMessage) formMessage.innerHTML = '<div class="alert alert-success">Thank you! Your message has been sent successfully.</div>';
//                     contactForm.reset();
//                     setTimeout(() => { if(formMessage) formMessage.innerHTML = ''; }, 5000);
//                 } else {
//                     if(formMessage) formMessage.innerHTML = '<div class="alert alert-danger">Server Error. Please try again later.</div>';
//                 }
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//                 if(formMessage) formMessage.innerHTML = '<div class="alert alert-danger">Connection Failed. Check your internet.</div>';
//             })
//             .finally(() => {
//                 submitButton.disabled = false;
//                 submitButton.textContent = 'Send Inquiry';
//             });
//         });
//     }

//     // --- 4. Mobile Navbar Helper ---
//     const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
//     const navCollapse = document.querySelector('.navbar-collapse.collapse');
//     if (navCollapse) {
//         navLinks.forEach(link => {
//             link.addEventListener('click', () => {
//                 if (navCollapse.classList.contains('show')) {
//                     if (typeof bootstrap !== 'undefined') {
//                         new bootstrap.Collapse(navCollapse).hide();
//                     } else {
//                         navCollapse.classList.remove('show');
//                     }
//                 }
//             });
//         });
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
    
    // 🚨 CONFIG: Backend URL
    const API_BASE = "http://localhost:8080/api/public";

    // --- 1. Footer Year ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. Global Storage for Resize Events ---
    let storedCategories = [];

    // --- 3. Initial Fetch ---
    fetchCategories();

    function fetchCategories() {
        fetch(`${API_BASE}/categories`)
            .then(res => res.json())
            .then(categories => {
                storedCategories = categories; // Save data for resizing
                
                // A. Update Navbar Dropdown
                updateNavbar(categories);

                // B. Render Homepage Carousel
                renderCarousel(); 
            })
            .catch(err => {
                console.error("Failed to load categories", err);
                const carouselContainer = document.getElementById("home-category-carousel");
                if(carouselContainer) carouselContainer.innerHTML = '<p class="text-center text-danger">Failed to connect to backend.</p>';
            });
    }

    // --- 4. Render Carousel Logic (Responsive Chunking) ---
    function renderCarousel() {
        const container = document.getElementById("home-category-carousel");
        
        // Safety check: if container doesn't exist (e.g. we are on products.html), stop.
        if (!container) return;
        
        // Safety check: if no data
        if (storedCategories.length === 0) {
            container.innerHTML = '<p class="text-center text-muted">No categories found in database.</p>';
            return;
        }

        container.innerHTML = ""; // Clear loader/old slides

        // Responsive Logic: 1 item on mobile (<768px), 3 items on desktop
        const isMobile = window.innerWidth < 768;
        const itemsPerSlide = isMobile ? 1 : 3;

        // Loop through data and create "Chunks"
        for (let i = 0; i < storedCategories.length; i += itemsPerSlide) {
            
            // Get the next group of items (1 or 3)
            const chunk = storedCategories.slice(i, i + itemsPerSlide);
            
            // First slide needs 'active' class
            const activeClass = i === 0 ? 'active' : '';

            // Generate HTML for the cards inside this slide
            let cardsHtml = chunk.map(cat => {
                const slug = createSlug(cat.name);
                // On mobile use full width (col-12), on desktop share width (col-4)
                const colClass = isMobile ? 'col-12' : 'col-4';
                
                return `
                    <div class="${colClass}">
                        <a href="products.html#${slug}" class="text-decoration-none">
                            <div class="card h-100 text-center service-card mx-3"> 
                                <div class="card-body py-4">
                                    <div class="icon-circle mx-auto mb-3">
                                        <i class="fas fa-cubes fa-2x"></i>
                                    </div>
                                    <h5 class="card-title fw-bold text-dark">${cat.name}</h5>
                                    <p class="card-text text-muted small">View Solutions</p>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
            }).join('');

            // Create the Slide Element
            const slide = document.createElement("div");
            slide.className = `carousel-item ${activeClass}`;
            slide.innerHTML = `
                <div class="row justify-content-center px-4"> 
                    ${cardsHtml}
                </div>
            `;
            
            container.appendChild(slide);
        }
    }

    // --- 5. Navbar Logic ---
    function updateNavbar(categories) {
        const dropdownMenu = document.getElementById("dynamic-nav-dropdown");
        if (!dropdownMenu) return;
        
        dropdownMenu.innerHTML = "";
        if (categories.length === 0) {
            dropdownMenu.innerHTML = '<li><a class="dropdown-item" href="products.html">All Products</a></li>';
        } else {
            categories.forEach(category => {
                const slug = createSlug(category.name);
                const li = document.createElement("li");
                li.innerHTML = `<a class="dropdown-item" href="products.html#${slug}">${category.name}</a>`;
                dropdownMenu.appendChild(li);
            });
        }
    }

    // --- 6. Helper: Create Slugs ---
    function createSlug(name) {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    // --- 7. Window Resize Listener ---
    // Re-renders the carousel when window size changes (Mobile <-> Desktop)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(renderCarousel, 200); // Debounce for performance
    });

    // --- 8. Contact Form Handling ---
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

    // --- 9. Mobile Navbar Helper ---
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navCollapse = document.querySelector('.navbar-collapse.collapse');
    if (navCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navCollapse.classList.contains('show')) {
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

// // Anyess Global - Custom JavaScript

// document.addEventListener("DOMContentLoaded", function() {

//     // 1. Smooth Scrolling for Navbar Links
//     document.querySelectorAll('#main-nav a[href^="#"]').forEach(anchor => {
//         anchor.addEventListener('click', function(e) {
//             e.preventDefault();
//             const targetId = this.getAttribute('href');
//             const targetElement = document.querySelector(targetId);
//             if (targetElement) {
//                 targetElement.scrollIntoView({
//                     behavior: 'smooth'
//                 });
//             }
//         });
//     });

//     // 2. Update Footer Year Automatically
//     const currentYearSpan = document.getElementById('currentYear');
//     if (currentYearSpan) {
//         currentYearSpan.textContent = new Date().getFullYear();
//     }

//     // 3. Contact Form Submission Simulation
//     const contactForm = document.getElementById('contactForm');
//     const formMessage = document.getElementById('form-message');
//     if (contactForm) {
//         contactForm.addEventListener('submit', function(e) {
//             e.preventDefault(); // Prevent actual form submission

//             // This is where you would integrate with a backend service (e.g., via fetch API)
//             // For now, we just simulate a success message.
//             formMessage.innerHTML = `
//                 <div class="alert alert-success" role="alert">
//                     Thank you for your inquiry! We will get back to you shortly.
//                 </div>
//             `;
//             contactForm.reset(); // Clear the form fields

//             // Hide the message after 5 seconds
//             setTimeout(() => {
//                 formMessage.innerHTML = '';
//             }, 5000);
//         });
//     }

//     // 4. Close mobile navbar on link click
//     const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
//     const navCollapse = document.querySelector('.navbar-collapse.collapse');
//     navLinks.forEach(link => {
//         link.addEventListener('click', () => {
//             if (navCollapse.classList.contains('show')) {
//                 new bootstrap.Collapse(navCollapse).hide();
//             }
//         });
//     });


// });

// === IN script.js ===

// Anyess Global - Custom JavaScript

// 🚨 BASE URL FOR YOUR SPRING BOOT BACKEND 🚨
// const API_BASE_URL = 'http://localhost:8080/api'; 

// // Function to fetch data and dynamically render the product page
// const fetchAndRenderProducts = async () => {
//     const productsNav = document.getElementById('products-nav');
//     const productGridContainer = document.getElementById('product-grid-container');

//     if (!productsNav || !productGridContainer) return; // Exit if elements aren't found

//     // Display loading state
//     productGridContainer.innerHTML = '<p class="text-center text-muted mt-5">Loading products...</p>';
//     productsNav.innerHTML = ''; // Clear static sidebar

//     try {
//         // 1. Fetch Categories
//         const [categoriesResponse, productsResponse] = await Promise.all([
//             fetch(`${API_BASE_URL}/public/categories`),
//             fetch(`${API_BASE_URL}/public/products`)
//         ]);

//         const categories = await categoriesResponse.json();
//         const products = await productsResponse.json();

//         // 2. Map Category ID to name/slug
//         const categoryMap = categories.reduce((map, cat) => {
//             map[cat.id] = { name: cat.name, slug: cat.name.toLowerCase().replace(/\s+/g, '-') };
//             return map;
//         }, {});
        
//         // 3. Group products by category slug
//         const groupedProducts = products.reduce((groups, product) => {
//             // Ensure product.category.id exists, if not, skip or use a default
//             const categoryId = product.category ? product.category.id : null; 
//             const categoryInfo = categoryMap[categoryId] || { name: 'Uncategorized', slug: 'uncategorized' };

//             if (!groups[categoryInfo.slug]) {
//                 groups[categoryInfo.slug] = { 
//                     info: categoryInfo, 
//                     products: [] 
//                 };
//             }
//             groups[categoryInfo.slug].products.push(product);
//             return groups;
//         }, {});

//         let fullHTML = '';
        
//         // 4. Render Sidebar and Sections
//         for (const slug in groupedProducts) {
//             const group = groupedProducts[slug];
            
//             // Render sidebar link
//             productsNav.innerHTML += `<a class="nav-link" href="#${group.info.slug}">${group.info.name}</a>`;

//             // Start Section
//             fullHTML += `
//                 <section id="${group.info.slug}" class="product-content-section">
//                     <h2 class="section-heading">${group.info.name}</h2>
//                     <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
//             `;

//             // Render product cards
//             group.products.forEach(product => {
//                 const imageUrl = product.imageUrl || 'https://via.placeholder.com/400x300/EBF4FF/808080?text=No+Image';
//                 const shortDesc = product.shortDescription || (product.description ? product.description.substring(0, 100) + '...' : 'No description available.');

//                 fullHTML += `
//                     <div class="col">
//                         <div class="card h-100 product-card">
//                             <img src="${imageUrl}" class="card-img-top product-card-img-top" alt="${product.name}">
//                             <div class="card-body d-flex flex-column">
//                                 <h5 class="card-title">${product.name}</h5>
//                                 <p class="card-text small flex-grow-1">${shortDesc}</p>
//                                 <div class="mt-4">
//                                     <button 
//                                         class="btn btn-outline-secondary btn-sm" 
//                                         data-bs-toggle="modal" 
//                                         data-bs-target="#productModal" 
//                                         data-title="${product.name}" 
//                                         data-image="${imageUrl}" 
//                                         data-description="${product.description}"
//                                     >
//                                         Know More
//                                     </button>
//                                     <a href="index.html#contact" target="_blank" class="btn btn-primary btn-sm">Request Quote</a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//             });

//             // End Section
//             fullHTML += `
//                     </div>
//                 </section>
//             `;
//         }

//         // 5. Inject all content
//         productGridContainer.innerHTML = fullHTML;
        
//         // Re-initialize Bootstrap's scrollspy (important for sidebar navigation)
//         const scrollSpy = new bootstrap.ScrollSpy(document.body, { target: '#products-nav' });

//     } catch (error) {
//         console.error('Error fetching or rendering products:', error);
//         productGridContainer.innerHTML = '<p class="text-center text-danger mt-5">Failed to load products. Please check the API connection.</p>';
//     }
// };


// document.addEventListener("DOMContentLoaded", function() {

//     // 1. Smooth Scrolling for Navbar Links
//     document.querySelectorAll('#main-nav a[href^="#"]').forEach(anchor => {
//         anchor.addEventListener('click', function(e) {
//             e.preventDefault();
//             const targetId = this.getAttribute('href');
//             const targetElement = document.querySelector(targetId);
//             if (targetElement) {
//                 targetElement.scrollIntoView({
//                     behavior: 'smooth'
//                 });
//             }
//         });
//     });

//     // 2. Update Footer Year Automatically
//     const currentYearSpan = document.getElementById('currentYear');
//     if (currentYearSpan) {
//         currentYearSpan.textContent = new Date().getFullYear();
//     }

//     // 3. Contact Form Submission Simulation (Keep existing code)
//     const contactForm = document.getElementById('contactForm');
//     const formMessage = document.getElementById('form-message');
//     if (contactForm) {
//         contactForm.addEventListener('submit', function(e) {
//             e.preventDefault();
//             formMessage.innerHTML = `<div class="alert alert-success" role="alert">Thank you for your inquiry! We will get back to you shortly.</div>`;
//             contactForm.reset();
//             setTimeout(() => { formMessage.innerHTML = ''; }, 5000);
//         });
//     }

//     // 4. Close mobile navbar on link click (Keep existing code)
//     const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
//     const navCollapse = document.querySelector('.navbar-collapse.collapse');
//     navLinks.forEach(link => {
//         link.addEventListener('click', () => {
//             if (navCollapse.classList.contains('show')) {
//                 new bootstrap.Collapse(navCollapse).hide();
//             }
//         });
//     });

//     // 5. Execute the dynamic fetch and render function
//     fetchAndRenderProducts();

//     // 6. Existing modal script listener (will work with dynamically created buttons)
//     const productModal = document.getElementById('productModal');
//     if (productModal) {
//         productModal.addEventListener('show.bs.modal', function (event) {
//             const button = event.relatedTarget;
//             const title = button.getAttribute('data-title');
//             const description = button.getAttribute('data-description');
//             const image = button.getAttribute('data-image');

//             const modalTitle = productModal.querySelector('#modal-product-title');
//             const modalDescription = productModal.querySelector('#modal-product-description');
//             const modalImage = productModal.querySelector('#modal-product-image');

//             modalTitle.textContent = title;
//             modalDescription.textContent = description;
//             modalImage.src = image;
//         });
//     }

// });document.addEventListener("DOMContentLoaded", () => {
    
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

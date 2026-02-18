// // Anyess Global - Products Page JavaScript

// // 🚨 ===================================================================
// // 🚨 SET YOUR BACKEND API URL HERE
// // 🚨 If you deployed your backend, change 'http://localhost:8080' 
// // 🚨 to your production URL (e.g., "https://anyess-backend.onrender.com/api")
// // 🚨 ===================================================================
// const API_BASE_URL = 'http://localhost:8080/api'; 

// /**
//  * Creates a unique, URL-friendly slug from a category name.
//  * e.g., "SMPS (Switch Mode)" -> "smps-switch-mode"
//  */
// function createSlug(name) {
//     if (!name) return 'uncategorized';
//     return name.toLowerCase()
//         .replace(/\(.*\)/g, '')    // Remove text in parentheses
//         .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
//         .trim()
//         .replace(/[\s_-]+/g, '-'); // Replace spaces/underscores with a hyphen
// }

// /**
//  * Main function to fetch all data and render the page
//  */
// const fetchAndRenderProducts = async () => {
//     const productsNav = document.getElementById('products-nav');
//     const productGridContainer = document.getElementById('product-grid-container');
//     const navbarProductDropdown = document.getElementById('navbar-product-dropdown');

//     if (!productsNav || !productGridContainer || !navbarProductDropdown) {
//         console.error('Essential page elements are missing. Aborting render.');
//         return; 
//     }

//     // Display loading state
//     productGridContainer.innerHTML = '<p class="text-center text-muted mt-5">Loading products...</p>';
//     productsNav.innerHTML = '';
//     navbarProductDropdown.innerHTML = '<li><a class="dropdown-item" href="#">Loading...</a></li>';

//     try {
//         // 1. Fetch Categories and Products in parallel
//         const [categoriesResponse, productsResponse] = await Promise.all([
//             fetch(`${API_BASE_URL}/public/categories`),
//             fetch(`${API_BASE_URL}/public/products`)
//         ]);

//         if (!categoriesResponse.ok || !productsResponse.ok) {
//             throw new Error('Failed to fetch data from the server.');
//         }

//         const categories = await categoriesResponse.json();
//         const products = await productsResponse.json();

//         // 2. Map Category ID to name/slug
//         const categoryMap = categories.reduce((map, cat) => {
//             map[cat.id] = { name: cat.name, slug: createSlug(cat.name) };
//             return map;
//         }, {});
        
//         // 3. Group products by category slug
//         const groupedProducts = {};
//         for (const product of products) {
//             const categoryId = product.category ? product.category.id : null; 
//             const categoryInfo = categoryMap[categoryId] || { name: 'Uncategorized', slug: 'uncategorized' };

//             if (!groupedProducts[categoryInfo.slug]) {
//                 groupedProducts[categoryInfo.slug] = { 
//                     info: categoryInfo, 
//                     products: [] 
//                 };
//             }
//             groupedProducts[categoryInfo.slug].products.push(product);
//         }

//         let mainContentHTML = '';
document.addEventListener("DOMContentLoaded", () => {
    // 🚨 UPDATE THIS URL:
    // Local Testing: 'http://localhost:8080/api/public'
    // Production (Railway): 'https://your-app-name.up.railway.app/api/public'
    const API_BASE = "http://localhost:8080/api/public";

    // Initialize
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    fetchAndRenderCatalog();

    // --- Main Logic ---
    async function fetchAndRenderCatalog() {
        const contentArea = document.getElementById("dynamic-product-container");
        const sidebarNav = document.getElementById("products-nav");

        try {
            // 1. Fetch Data
            const [catRes, prodRes] = await Promise.all([
                fetch(`${API_BASE}/categories`),
                fetch(`${API_BASE}/products`)
            ]);

            if (!catRes.ok || !prodRes.ok) throw new Error("Backend connection failed");

            const categories = await catRes.json();
            const products = await prodRes.json();

            // 2. Clear Loading State
            contentArea.innerHTML = "";
            sidebarNav.innerHTML = "";

            if (categories.length === 0) {
                contentArea.innerHTML = `<div class="alert alert-warning">No categories found.</div>`;
                return;
            }

            // 3. Build HTML for each Category
            categories.forEach(category => {
                // A. Create Slug (e.g. "Modular Wiring" -> "modular-wiring")
                const slug = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

                // B. Filter products for this category
                // (Assuming your Product entity has a 'category' object with an 'id')
                const categoryProducts = products.filter(p => p.category && p.category.id === category.id);

                // Skip empty categories
                if (categoryProducts.length === 0) return;

                // C. Add Sidebar Link
                const navLink = document.createElement("a");
                navLink.className = "nav-link";
                navLink.href = `#${slug}`;
                navLink.innerText = category.name;
                sidebarNav.appendChild(navLink);

                // D. Build Product Cards HTML
                const cardsHtml = categoryProducts.map(product => {
                    const imgUrl = product.imageUrl || 'https://placehold.co/400x300?text=No+Image';
                    const desc = product.description || '';
                    const shortDesc = desc.length > 90 ? desc.substring(0, 90) + "..." : desc;

                    // Note: We store data in data-attributes for the modal to read later
                    return `
                        <div class="col">
                            <div class="card h-100 product-card">
                                <img src="${imgUrl}" class="card-img-top product-card-img-top" alt="${product.name}">
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title">${product.name}</h5>
                                    <p class="card-text small flex-grow-1 text-muted">${shortDesc}</p>
                                    <div class="mt-3">
                                        <button class="btn btn-outline-secondary btn-sm" 
                                            data-bs-toggle="modal" 
                                            data-bs-target="#productModal"
                                            data-title="${product.name}"
                                            data-desc="${desc}"
                                            data-img="${imgUrl}">
                                            Know More
                                        </button>
                                        <a href="index.html#contact" class="btn btn-primary btn-sm">Request Quote</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');

                // E. Assemble the Section
                const sectionHtml = `
                    <section id="${slug}" class="product-content-section mb-5" style="padding-top: 20px;">
                        <h2 class="section-heading border-bottom pb-2 mb-4">${category.name}</h2>
                        <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                            ${cardsHtml}
                        </div>
                    </section>
                `;

                contentArea.insertAdjacentHTML('beforeend', sectionHtml);
            });

            // 4. Refresh ScrollSpy (Important for sidebar highlighting)
            refreshScrollSpy();

        } catch (error) {
            console.error("Error:", error);
            contentArea.innerHTML = `
                <div class="alert alert-danger text-center">
                    <h4>Unable to load products</h4>
                    <p>Please ensure the backend is running at ${API_BASE}</p>
                    <small>${error.message}</small>
                </div>`;
        }
    }

    // --- Helper: Modal Handler ---
    const productModal = document.getElementById('productModal');
    if (productModal) {
        productModal.addEventListener('show.bs.modal', function (event) {
            // Button that triggered the modal
            const button = event.relatedTarget;
            
            // Extract info from data-* attributes
            const title = button.getAttribute('data-title');
            const desc = button.getAttribute('data-desc');
            const img = button.getAttribute('data-img');

            // Update the modal's content
            productModal.querySelector('#modal-product-name').textContent = title;
            productModal.querySelector('#modal-product-description').textContent = desc || "No details available.";
            productModal.querySelector('#modal-product-image').src = img;
        });
    }

    // --- Helper: Refresh Bootstrap ScrollSpy ---
    function refreshScrollSpy() {
        const dataSpyEl = document.querySelector('[data-bs-spy="scroll"]');
        if (dataSpyEl && bootstrap.ScrollSpy) {
            const spy = bootstrap.ScrollSpy.getInstance(dataSpyEl);
            if (spy) spy.refresh();
        }
    }
});


// document.addEventListener("DOMContentLoaded", () => {
//     const API_BASE = "http://localhost:8080/api/public"; 

//     fetchAndRenderCatalog();

//     async function fetchAndRenderCatalog() {
//         const contentArea = document.getElementById("dynamic-product-container");
//         const sidebarNav = document.getElementById("products-nav");

//         // Only run if we are on the products page
//         if (!contentArea || !sidebarNav) return;

//         try {
//             // 1. Fetch Categories and Products
//             const [catRes, prodRes] = await Promise.all([
//                 fetch(`${API_BASE}/categories`),
//                 fetch(`${API_BASE}/products`)
//             ]);

//             const categories = await catRes.json();
//             const products = await prodRes.json();

//             // 2. Clear Loading State
//             contentArea.innerHTML = "";
//             sidebarNav.innerHTML = "";

//             if (categories.length === 0) {
//                 contentArea.innerHTML = `<div class="alert alert-warning">No categories found.</div>`;
//                 return;
//             }

//             // 3. Render Each Category Section
//             categories.forEach(category => {
//                 const slug = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

//                 // Filter products belonging to this category
//                 const categoryProducts = products.filter(p => p.category && p.category.id === category.id);
//                 if (categoryProducts.length === 0) return;

//                 // A. Add Sidebar Link
//                 const navLink = document.createElement("a");
//                 navLink.className = "nav-link";
//                 navLink.href = `#${slug}`;
//                 navLink.innerText = category.name;
//                 sidebarNav.appendChild(navLink);

//                 // B. Generate Product Cards (Grid Fix Applied)
//                 const cardsHtml = categoryProducts.map(product => {
//                     const imgUrl = product.imageUrl || 'https://placehold.co/400x300?text=No+Image';
//                     const desc = product.description || '';
//                     const shortDesc = desc.length > 90 ? desc.substring(0, 90) + "..." : desc;

//                     return `
//                         <div class="col">
//                             <div class="card h-100 product-card shadow-sm border-0">
//                                 <div style="height: 220px; padding: 20px; display: flex; align-items: center; justify-content: center; background-color: #fff; border-bottom: 1px solid #f0f0f0;">
//                                     <img src="${imgUrl}" alt="${product.name}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
//                                 </div>
                                
//                                 <div class="card-body d-flex flex-column">
//                                     <h5 class="card-title fw-bold text-dark">${product.name}</h5>
//                                     <p class="card-text small text-muted flex-grow-1">${shortDesc}</p>
                                    
//                                     <div class="d-grid gap-2 mt-3">
//                                         <button class="btn btn-outline-primary btn-sm" 
//                                             data-bs-toggle="modal" 
//                                             data-bs-target="#productModal"
//                                             data-title="${product.name}"
//                                             data-desc="${desc}"
//                                             data-img="${imgUrl}">
//                                             View Details
//                                         </button>
//                                         <a href="index.html#contact" class="btn btn-primary btn-sm">Request Quote</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     `;
//                 }).join('');

//                 // C. Assemble Section
//                 const sectionHtml = `
//                     <section id="${slug}" class="product-content-section mb-5" style="padding-top: 20px;">
//                         <div class="d-flex align-items-center mb-4 border-bottom pb-2">
//                             <h2 class="section-heading mb-0 text-primary">${category.name}</h2>
//                         </div>
//                         <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//                             ${cardsHtml}
//                         </div>
//                     </section>
//                 `;

//                 contentArea.insertAdjacentHTML('beforeend', sectionHtml);
//             });

//             // 4. Refresh ScrollSpy
//             if (typeof bootstrap !== 'undefined' && bootstrap.ScrollSpy) {
//                  const dataSpyEl = document.querySelector('[data-bs-spy="scroll"]');
//                  if(dataSpyEl) bootstrap.ScrollSpy.getInstance(dataSpyEl)?.refresh();
//             }

//         } catch (error) {
//             console.error("Error:", error);
//             contentArea.innerHTML = `<div class="alert alert-danger text-center">Unable to load products. Check API connection.</div>`;
//         }
//     }

//     // --- Modal Logic ---
//     const productModal = document.getElementById('productModal');
//     if (productModal) {
//         productModal.addEventListener('show.bs.modal', function (event) {
//             const button = event.relatedTarget;
//             const title = button.getAttribute('data-title');
//             const desc = button.getAttribute('data-desc');
//             const img = button.getAttribute('data-img');

//             productModal.querySelector('#modal-product-name').textContent = title;
//             productModal.querySelector('#modal-product-description').textContent = desc || "No details available.";
//             productModal.querySelector('#modal-product-image').src = img;
//         });
//     }
// });

// document.addEventListener("DOMContentLoaded", () => {
//     const API_BASE = "http://localhost:8080/api/public"; 

//     fetchAndRenderCatalog();

//     async function fetchAndRenderCatalog() {
//         const contentArea = document.getElementById("dynamic-product-container");
//         const sidebarNav = document.getElementById("products-nav");

//         if (!contentArea || !sidebarNav) return;

//         try {
//             const [catRes, prodRes] = await Promise.all([
//                 fetch(`${API_BASE}/categories`),
//                 fetch(`${API_BASE}/products`)
//             ]);

//             const categories = await catRes.json();
//             const products = await prodRes.json();

//             contentArea.innerHTML = "";
//             sidebarNav.innerHTML = "";

//             if (categories.length === 0) {
//                 contentArea.innerHTML = `<div class="alert alert-warning">No categories found.</div>`;
//                 return;
//             }

//             categories.forEach(category => {
//                 const slug = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
//                 const categoryProducts = products.filter(p => p.category && p.category.id === category.id);
                
//                 if (categoryProducts.length === 0) return;

//                 // Sidebar Link
//                 const navLink = document.createElement("a");
//                 navLink.className = "nav-link";
//                 navLink.href = `#${slug}`;
//                 navLink.innerText = category.name;
//                 sidebarNav.appendChild(navLink);

//                 // Cards HTML
//                 const cardsHtml = categoryProducts.map(product => {
//                     const imgUrl = product.imageUrl || 'https://placehold.co/400x300?text=No+Image';
//                     const desc = product.description || '';
//                     const shortDesc = desc.length > 90 ? desc.substring(0, 90) + "..." : desc;

//                     return `
//                         <div class="col">
//                             <div class="card h-100 product-card shadow-sm border-0">
//                                 <div style="height: 220px; padding: 20px; display: flex; align-items: center; justify-content: center; background-color: #fff; border-bottom: 1px solid #f0f0f0;">
//                                     <img src="${imgUrl}" alt="${product.name}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
//                                 </div>
//                                 <div class="card-body d-flex flex-column">
//                                     <h5 class="card-title fw-bold text-dark">${product.name}</h5>
//                                     <p class="card-text small text-muted flex-grow-1">${shortDesc}</p>
//                                     <div class="d-grid gap-2 mt-3">
//                                         <button class="btn btn-outline-primary btn-sm" 
//                                             data-bs-toggle="modal" 
//                                             data-bs-target="#productModal"
//                                             data-title="${product.name}"
//                                             data-desc="${desc}"
//                                             data-img="${imgUrl}">
//                                             View Details
//                                         </button>
//                                         <a href="index.html#contact" class="btn btn-primary btn-sm">Request Quote</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     `;
//                 }).join('');

//                 const sectionHtml = `
//                     <section id="${slug}" class="product-content-section mb-5" style="padding-top: 20px;">
//                         <div class="d-flex align-items-center mb-4 border-bottom pb-2">
//                             <h2 class="section-heading mb-0 text-primary">${category.name}</h2>
//                         </div>
//                         <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//                             ${cardsHtml}
//                         </div>
//                     </section>
//                 `;
//                 contentArea.insertAdjacentHTML('beforeend', sectionHtml);
//             });

//             if (typeof bootstrap !== 'undefined' && bootstrap.ScrollSpy) {
//                  const dataSpyEl = document.querySelector('[data-bs-spy="scroll"]');
//                  if(dataSpyEl) bootstrap.ScrollSpy.getInstance(dataSpyEl)?.refresh();
//             }

//         } catch (error) {
//             console.error("Error:", error);
//             contentArea.innerHTML = `<div class="alert alert-danger text-center">Unable to load products. Check API connection.</div>`;
//         }
//     }

//     const productModal = document.getElementById('productModal');
//     if (productModal) {
//         productModal.addEventListener('show.bs.modal', function (event) {
//             const button = event.relatedTarget;
//             const title = button.getAttribute('data-title');
//             const desc = button.getAttribute('data-desc');
//             const img = button.getAttribute('data-img');

//             productModal.querySelector('#modal-product-name').textContent = title;
//             productModal.querySelector('#modal-product-description').textContent = desc || "No details available.";
//             productModal.querySelector('#modal-product-image').src = img;
//         });
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
    // 🚨 CONFIG: Backend URL
    // const API_BASE = "http://localhost:8080/api/public"; 
    const API_BASE_URL = "https://cms-backend-wj8q.onrender.com";
    fetchAndRenderCatalog();

    async function fetchAndRenderCatalog() {
        const contentArea = document.getElementById("dynamic-product-container");
        const sidebarNav = document.getElementById("products-nav");

        if (!contentArea || !sidebarNav) return;

        try {
            // 1. Fetch Data
            const [catRes, prodRes] = await Promise.all([
                fetch(`${API_BASE}/categories`),
                fetch(`${API_BASE}/products`)
            ]);

            const categories = await catRes.json();
            const products = await prodRes.json();

            // 2. Clear Loading State
            contentArea.innerHTML = "";
            sidebarNav.innerHTML = "";

            if (categories.length === 0) {
                contentArea.innerHTML = `<div class="alert alert-warning">No categories found.</div>`;
                return;
            }

            // 3. Render Each Category Section
            categories.forEach(category => {
                const slug = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                
                // Filter products belonging to this category
                const categoryProducts = products.filter(p => p.category && p.category.id === category.id);
                
                // Skip empty categories (This hides "TestCat" if it has no products)
                if (categoryProducts.length === 0) return;

                // A. Add Sidebar Link
                const navLink = document.createElement("a");
                navLink.className = "nav-link my-1"; // Added margin for spacing
                navLink.href = `#${slug}`;
                navLink.innerText = category.name;
                sidebarNav.appendChild(navLink);

                // B. Generate Product Cards
                const cardsHtml = categoryProducts.map(product => {
                    const imgUrl = product.imageUrl || 'https://placehold.co/400x300?text=No+Image';
                    const desc = product.description || '';
                    const shortDesc = desc.length > 90 ? desc.substring(0, 90) + "..." : desc;

                    return `
                        <div class="col">
                            <div class="card h-100 product-card shadow-sm border-0">
                                <div style="height: 220px; padding: 20px; display: flex; align-items: center; justify-content: center; background-color: #fff; border-bottom: 1px solid #f0f0f0;">
                                    <img src="${imgUrl}" alt="${product.name}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                                </div>
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title fw-bold text-dark">${product.name}</h5>
                                    <p class="card-text small text-muted flex-grow-1">${shortDesc}</p>
                                    <div class="d-grid gap-2 mt-3">
                                        <button class="btn btn-outline-primary btn-sm" 
                                            data-bs-toggle="modal" 
                                            data-bs-target="#productModal"
                                            data-title="${product.name}"
                                            data-desc="${desc}"
                                            data-img="${imgUrl}">
                                            View Details
                                        </button>
                                        <a href="index.html#contact" class="btn btn-primary btn-sm">Request Quote</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');

                // C. Assemble Section
                const sectionHtml = `
                    <section id="${slug}" class="product-content-section mb-5" style="padding-top: 100px; margin-top: -80px;"> 
                        <div class="d-flex align-items-center mb-4 border-bottom pb-2">
                            <h2 class="section-heading mb-0 text-primary">${category.name}</h2>
                        </div>
                        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            ${cardsHtml}
                        </div>
                    </section>
                `;
                contentArea.insertAdjacentHTML('beforeend', sectionHtml);
            });

            // 4. ✅ FIX: Scroll to Hash AFTER rendering
            if (window.location.hash) {
                const targetId = window.location.hash.substring(1); // Remove '#'
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // Small timeout to ensure browser rendering is complete
                    setTimeout(() => {
                        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 100);
                }
            }

            // 5. Refresh ScrollSpy
            if (typeof bootstrap !== 'undefined' && bootstrap.ScrollSpy) {
                 const dataSpyEl = document.querySelector('[data-bs-spy="scroll"]');
                 if(dataSpyEl) bootstrap.ScrollSpy.getInstance(dataSpyEl)?.refresh();
            }

        } catch (error) {
            console.error("Error:", error);
            contentArea.innerHTML = `<div class="alert alert-danger text-center">Unable to load products. Check API connection.</div>`;
        }
    }

    // Modal Logic
    const productModal = document.getElementById('productModal');
    if (productModal) {
        productModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const title = button.getAttribute('data-title');
            const desc = button.getAttribute('data-desc');
            const img = button.getAttribute('data-img');

            productModal.querySelector('#modal-product-name').textContent = title;
            productModal.querySelector('#modal-product-description').textContent = desc || "No details available.";
            productModal.querySelector('#modal-product-image').src = img;
        });
    }
});

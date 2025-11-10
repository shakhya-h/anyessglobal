// Anyess Global - Products Page JavaScript

// 🚨 ===================================================================
// 🚨 SET YOUR BACKEND API URL HERE
// 🚨 If you deployed your backend, change 'http://localhost:8080' 
// 🚨 to your production URL (e.g., "https://anyess-backend.onrender.com/api")
// 🚨 ===================================================================
const API_BASE_URL = 'http://localhost:8080/api'; 

/**
 * Creates a unique, URL-friendly slug from a category name.
 * e.g., "SMPS (Switch Mode)" -> "smps-switch-mode"
 */
function createSlug(name) {
    if (!name) return 'uncategorized';
    return name.toLowerCase()
        .replace(/\(.*\)/g, '')    // Remove text in parentheses
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .trim()
        .replace(/[\s_-]+/g, '-'); // Replace spaces/underscores with a hyphen
}

/**
 * Main function to fetch all data and render the page
 */
const fetchAndRenderProducts = async () => {
    const productsNav = document.getElementById('products-nav');
    const productGridContainer = document.getElementById('product-grid-container');
    const navbarProductDropdown = document.getElementById('navbar-product-dropdown');

    if (!productsNav || !productGridContainer || !navbarProductDropdown) {
        console.error('Essential page elements are missing. Aborting render.');
        return; 
    }

    // Display loading state
    productGridContainer.innerHTML = '<p class="text-center text-muted mt-5">Loading products...</p>';
    productsNav.innerHTML = '';
    navbarProductDropdown.innerHTML = '<li><a class="dropdown-item" href="#">Loading...</a></li>';

    try {
        // 1. Fetch Categories and Products in parallel
        const [categoriesResponse, productsResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/public/categories`),
            fetch(`${API_BASE_URL}/public/products`)
        ]);

        if (!categoriesResponse.ok || !productsResponse.ok) {
            throw new Error('Failed to fetch data from the server.');
        }

        const categories = await categoriesResponse.json();
        const products = await productsResponse.json();

        // 2. Map Category ID to name/slug
        const categoryMap = categories.reduce((map, cat) => {
            map[cat.id] = { name: cat.name, slug: createSlug(cat.name) };
            return map;
        }, {});
        
        // 3. Group products by category slug
        const groupedProducts = {};
        for (const product of products) {
            const categoryId = product.category ? product.category.id : null; 
            const categoryInfo = categoryMap[categoryId] || { name: 'Uncategorized', slug: 'uncategorized' };

            if (!groupedProducts[categoryInfo.slug]) {
                groupedProducts[categoryInfo.slug] = { 
                    info: categoryInfo, 
                    products: [] 
                };
            }
            groupedProducts[categoryInfo.slug].products.push(product);
        }

        let mainContentHTML = '';

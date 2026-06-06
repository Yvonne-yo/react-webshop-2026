/* ----- API: productsApi.js ----- */
// Fetches product data from the DummyJSON API (https://dummyjson.com/products).
// Handles asynchronous network requests using try-catch blocks and async-await syntax.

// ----- Error Handling -----
// - console.error: Logs the technical system error in the developer console for debugging.
// - throw new Error: Converts the failure into a short, friendly message passed up to the UI.

/* ----- Function 1: Fetch a general block of products ----- */
export async function getAllProducts(limit = 12, skip = 0) {

    try {
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);

        if(!response.ok){
            throw new Error (`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Fetch failure in getAllProducts:", error.message);
        throw new Error(`Could not load products. (${error.message})`);
    }    
}


/* ----- Function 2: Fetch products from one single category ----- */
export async function getProductsByCategory(categoryName, limit = 12, skip = 0) {

    try {
        const response = await fetch(`https://dummyjson.com/products/category/${categoryName}?limit=${limit}&skip=${skip}`);

        if(!response.ok){
            throw new Error (`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Fetch failure in getProductsByCategory for ${categoryName}:`, error.message);
        throw new Error(`Could not load ${categoryName} products. (${error.message})`);
    }    
}

/* ----- Function 3: Fetch a single specific product by its unique ID ----- */
export async function getProductById(productId) {
    try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);

        if(!response.ok) {
            throw new Error(`HTTP Error! Product ID ${productId} not found. Status: ${response.status}`);
        }

        const data = await response.json();
        return data; 

    } catch (error) {
        console.error(`Fetch failure in getProductById for ID ${productId}:`, error.message);
        throw new Error(`Could not load product details. (${error.message})`);
    }
}

/* ----- Function 4: Search the product catalog (Query pattern matching) ----- */
export async function searchProducts(queryString) {
    try {
        // Search URL dynamically according to official DummyJSON specifications
        const response = await fetch(`https://dummyjson.com/products/search?q=${queryString}`);

        if (!response.ok) {
            throw new Error (`HTTP Error! Search query failed. Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) { 
        console.error(`Fetch failure in searchProducts for query "${queryString}":`, error.message);
        throw new Error(`Search failed. Please try again. (${error.message})`);    
    }

}

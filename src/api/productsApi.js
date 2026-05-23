// Fetch product information from DummyJSON API service at "https:/dummyjson.com/products"
// async/await och try/catch används.

// ----- LAYERED ERROR HANDLING (Developer vs Webshop Customer) -----
// 1. console.error logs the raw, technical system message directly into the browser's developer console.
//    This is for developers to troubleshoot exactly what went wrong under the hood.
// 2. throw new Error translates the failure into a clean, reassuring, and human-readable message.
//    This is sent upward to the UI so the customer sees a friendly error-banner instead of scary system crash code.

/* ----- Function 1: Fetches a general block of products ----- */
export async function getAllProducts(limit = 12, skip = 0) {

    try {
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);

        if(!response.ok){
            throw new Error (`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        return(data);

    } catch (error) {
        console.error("Fetch failure in getAllProducts:", error.message);
        throw new Error(`Could not load products. (${error.message})`);
    }    
}


/* ----- Function 2: Fetches products exclusively from one single category ----- */
export async function getProductsByCategory(categoryName, limit = 12, skip = 0) {

    try {
        const response = await fetch(`https://dummyjson.com/products/category/${categoryName}?limit=${limit}&skip=${skip}`);

        if(!response.ok){
            throw new Error (`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        return(data);

    } catch (error) {
        console.error(`Fetch failure in getProductsByCategory for ${categoryName}:`, error.message);
        throw new Error(`Could not load ${categoryName} products. (${error.message})`);
    }    
}

/* ----- Function 3: Fetches a single specific product by its unique ID ----- */
export async function getProductById(productId) {
    try {
        const response = await fetch (`https://dummyjson.com/products/${productId}`);

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

/* ----- Function 4: Searches the catalogue for a specific text query string ----- */
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

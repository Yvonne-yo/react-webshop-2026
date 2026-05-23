// Fetch product information from DummyJSON API service at "https:/dummyjson.com/products"

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

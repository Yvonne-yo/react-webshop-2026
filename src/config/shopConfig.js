/* ----- CONFIG: YoYo Webshop Beauty & Style Categories ----- */

// ARCHITECTURAL RATIONALE (Data-Driven Configuration):
// This array defines the allowed product categories for the webshop application.
// Multiple components and custom hooks dynamically adapt to this list to ensure
// that adding or removing a category here updates the entire system automatically:
//
// 1. Navigation Menu (NavBar): Loops through this array to automatically build 
//    the category dropdown links without changing any React layout code.
// 2. Catalog Feeds (useFeaturedProducts): Restricts and filters the storefront 
//    collections so that only items matching these configured categories are downloaded.
// 3. Search Safeguard (useSearch): Acts as a defensive whitelist filter during 
//    live searches, cleaning out and excluding any irrelevant API products.

/* Note: Exact spelling of the categories is required to match dummyjson API          */
export const ALLOWED_CATEGORIES = [
    "beauty", 
    "fragrances", 
    "skin-care", 
    "sunglasses", 
    "womens-bags"
];

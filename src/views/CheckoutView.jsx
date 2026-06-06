import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, CreditCard, ShoppingBag, Loader2 } from "lucide-react";
import logoButterfly from "../assets/YoYo_butterfly_only_200x199.jpg";
import { useCart } from "../hooks/useCart";
import QuantityController from "../components/QuantityController";

/* ----- VIEW COMPONENT: CheckoutView ----- */
// Renders the final checkout page where users can review, change and confirm their order (Checkout simulation).
// Simulates an order process with a loading sequence and a final order confirmation message.

/* ----- SUBCOMPONENT: OrderConfirmationModal ----- */
// Renders a fixed success modal after order completion
function OrderConfirmationModal({ formData, onFinalize }) {
    return (
        // Modal backdrop 
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-out">

            {/* Modal Content */}
            <div className="bg-bg-card border border-text-muted/10 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl transition-all duration-300 ease-out scale-100 opacity-100">

                {/* Green Checkmark */}
                <div className="w-16 h-16 bg-green-500/10 dark:bg-green-500/5 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 stroke-[2.5]" />
                </div>

                {/* Success Message */}
                <h2 className="text-2xl font-black text-text-main tracking-tight mb-2 break-all whitespace-normal overflow-hidden">
                    Thank you for your order {formData.firstName}!
                </h2>
                <p className="text-text-muted text-sm font-medium mb-6">
                    Successfully placed order!
                </p>

                {/* Brand butterfly and YoYo webshop */}
                <div className="container mx-auto px-4 flex justify-center items-center relative z-10">
                    {/* The floating white circle with the logotype butterfly image */}
                    <div
                        className="p-4 rounded-full bg-white border border-brand/20 shadow-xl shadow-brand/15 
                                    transition-transform duration-300 
                                    hover:scale-105 
                                    flex items-center justify-center"
                    >
                        <img
                        src={logoButterfly}
                        alt="YoYo Webshop Centerpiece Logo"
                        className="w-16 h-16 object-contain rounded-md"
                        width="64" // html reserves size for the img
                        height="64" // avoids Layout Shift when loading the webpage
                                    // performance optimization
                        />
                    </div>
                </div>
                
                {/* Button: Clears the shopping cart and returns to the HomeView */}
                <button
                    onClick={ onFinalize }
                    className="w-full h-11 bg-brand hover:bg-brand-dark text-white font-black text-xs uppercase tracking-wider 
                                rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center mt-8"
                >
                    Return to YoYo Webshop!
                </button>

            </div>
        </div>
    );
}

 
/* ----- SUBCOMPONENT: CheckoutForm ----- */
// Renders the Form to collect the customer's personal information.
function CheckoutForm({ formData, handleInputChange }) {
    return (
        <div className="lg:col-span-2 bg-bg-card p-6 md:p-8 rounded-xl border border-text-muted/10 shadow-xs flex flex-col gap-6">
            <h3 className="font-black text-text-main text-base uppercase tracking-wider border-b border-text-muted/5 pb-2">
                Shipping & Customer Information
            </h3>

            {/* First and Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Accessibility: Links labels to inputs using htmlFor (React's version of HTML 'for'). */}
                {/* This allows screen readers to read fields correctly and expands the clickable tap area. */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="firstName" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                        First Name
                    </label>
                    <input 
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="h-10 bg-bg-main border border-text-muted/20 rounded-lg px-3 text-sm focus:outline-none focus:border-brand transition-colors text-text-main font-medium"
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="lastName" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="h-10 bg-bg-main border border-text-muted/20 rounded-lg px-3 text-sm focus:outline-none focus:border-brand transition-colors text-text-main font-medium"
                    /> 
                </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-10 bg-bg-main border border-text-muted/20 rounded-lg px-3 text-sm focus:outline-none focus:border-brand transition-colors text-text-main font-medium"
                    />
            </div>

            {/* Delivery Address */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="address" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                    Delivery Address
                </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="h-10 bg-bg-main border border-text-muted/20 rounded-lg px-3 text-sm focus:outline-none focus:border-brand transition-colors text-text-main font-medium"
                />
            </div>

            {/* Zip Code and City */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-1">
                <label htmlFor="zipCode" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                    Zip Code
                </label>
                <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="h-10 bg-bg-main border border-text-muted/20 rounded-lg px-3 text-sm focus:outline-none focus:border-brand transition-colors text-text-main font-medium"
                />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="city" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                    City
                </label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="h-10 bg-bg-main border border-text-muted/20 rounded-lg px-3 text-sm focus:outline-none focus:border-brand transition-colors text-text-main font-medium"
                />
                </div>
            </div>
        </div>
    );
}


/* ----- SUBCOMPONENT: CheckoutSummary ----- */
// Renders the total cost and the order submission button.
function CheckoutSummary({ totalItemsCount, totalCartPrice, isProcessing }) {
    return (
        <div className="bg-bg-card p-6 rounded-xl border border-text-muted/10 shadow-xs flex flex-col gap-6 lg:sticky lg:top-24">
            <h3 className="font-black text-text-main text-sm uppercase tracking-wider border-b border-text-muted/5 pb-2">
                Final Summary
            </h3>

            {/* Total items and price  */}
            <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between font-medium text-text-muted">
                    <span>Total items:</span>
                    <span className="font-bold text-text-main">{totalItemsCount} items</span>
                </div>
            
                <div className="flex justify-between font-black text-text-main text-base border-t border-text-muted/5 pt-3 mt-1">
                    <span>Total price:</span>
                    <span className="text-lg">${totalCartPrice.toFixed(2)}</span>
                </div>
            </div>

            {/* Button: Triggers the simulated checkout sequence */}
            <button
                type="submit"
                disabled={isProcessing || totalItemsCount === 0}
                className="w-full h-12 bg-brand hover:bg-brand-dark text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
                {isProcessing 
                    ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" /> Processing Order...
                        </span>
                    ) : (
                        <span>Place Order</span>
                    )
                }
            </button>
        </div>
    );
}




/* ----- MAIN: CheckoutView ----- */
export default function CheckoutView() {
    const { totalCartPrice, totalItemsCount, clearCart } = useCart();

    // Hook used for programmatic navigation
    const navigate = useNavigate();

    /* --- LOCAL STATES --- */

    // LOCAL STATE 1: Form data object
    // Form to collect the customer's personal information to complete the order.
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        zipCode: "",
        city: ""
    });
    
    // LOCAL STATE 2: Toggles a load spinner during the checkout timeout phase.
    const [isProcessing, setIsProcessing] = useState(false);

    // LOCAL STATE 3: Controls whether the success modal is open or closed
    const [showModal, setShowModal] = useState(false);

    /* --- HANDLERS --- */

    // HANDLER 1: Saves all input fields to the local state object
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // HANDLER 2: Submits the form and triggers the checkout simulation
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents browser default form page refreshing behavior

        // Step 1: Start the load spinner
        setIsProcessing(true);

        // Step 2: Trigger the delay to simulate bank communication over the network
        setTimeout(() => {
            // Turn off the load spinner
            setIsProcessing(false);

            // Open modal with a order confirmation
            setShowModal(true);

            // Clear all products from the cart
            clearCart();

        }, 3000); // 3.0 seconds delay for network communication simulation
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl transition-opacity duration-300 ease-out">
            {/* Navigation Return Link */}
            <div className="mb-6">
                <Link
                    to="/cart"
                    className="text-brand hover:underline font-bold text-sm inline-flex items-center gap-2 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to shopping cart
                </Link>
            </div>

            <h1 className="text-3xl font-black text-text-main tracking-tight mb-8">
                Checkout
            </h1>

            {/* The Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Render subcomponent: CheckoutForm */}
                {/* Passes down data and change handler as props */}
                <CheckoutForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                />

                {/* Render subcomponent: CheckoutSummary */}
                <CheckoutSummary
                    totalItemsCount={totalItemsCount}
                    totalCartPrice={totalCartPrice}
                    isProcessing={isProcessing}
                />
            </form>

            {/* Order confirmation success modal */}
            {/* Renders a full-screen modal when showModal is true */}
            {showModal && (
                <OrderConfirmationModal
                    formData={formData}
                    onFinalize={() => navigate("/")}
                />
            )}

        </div>
    );
}



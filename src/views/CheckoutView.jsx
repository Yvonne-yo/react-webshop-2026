import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, CreditCard, ShoppingBag, Loader2} from "lucide-react";
import logoButterfly from "../assets/YoYo_butterfly_only_200x199.jpg";
import { useCart } from "../hooks/useCart";
import QuantityController from "../components/QuantityController";

/* ----- VIEW COMPONENT: CheckoutView ----- */
// Renders the final customer verification and checkout layout canvas.
// Simulates a secure live ordering pipeline utilizing stateful transaction 
// processing states and an animated post-purchase modal dialogue overlay.


/* ----- SUBCOMPONENT: OrderConfirmationModal ----- */
// Renders a fixed modal dialogue simulating a successful purchase response from the backend server
function OrderConfirmationModal({ formData, onFinalize}) {
    return (
        // Backdrop shadow element that locks the screen completely
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-out">

            {/* Centralized Dialogue Content Box */}
            <div className="bg-bg-card border border-text-muted/10 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl transition-all duration-300 ease-out scale-100 opacity-100">

                {/* Animated Green Checkmark Vector Badge */}
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
                
                {/* FINAL CLOSURE ACTION TRIGGER BUTTON */}
                <button
                    onClick={onFinalize}
                    className="w-full h-11 bg-brand hover:bg-brand-dark text-white font-black text-xs uppercase tracking-wider 
                                rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center mt-8"
                >
                    Return to YoYo webshop!
                </button>

            </div>
        </div>
    );
}

 
/* ----- SUBCOMPONENT 1: CheckoutForm ----- */
// Renders the Form to collect the customer's personal information.
function CheckoutForm({ formData, handleInputChange}) {
    return (
        <div className="lg:col-span-2 bg-bg-card p-6 md:p-8 rounded-xl border border-text-muted/10 shadow-xs flex flex-col gap-6">
            <h3 className="font-black text-text-main text-base uppercase tracking-wider border-b border-text-muted/5 pb-2">
                Shipping & Customer Information
            </h3>

            {/* Symmetrical Two-Column Input Grid Row: First and Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ACCESSIBILITY & UX BINDING LAYER (WCAG Compliance) */}
                {/* Uses 'htmlFor' (JSX equivalent of HTML 'for') mapped strictly to the input 'id'. */}
                {/* This ensures screen readers can programmatically associate labels with fields, */}
                {/* while expanding the interactive click/tap target area for mobile devices. */}
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

            {/* Full-Width Email Input Row */}
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

            {/* Full-Width Delivery Address Input Row */}
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

            {/* Symmetrical Two-Column Postal Layout Grid Row: Zip Code and City */}
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


/* ----- SUBCOMPONENT 2: CheckoutSummary ----- */
// Renders the sticky capsule containing final accounting balances.
function CheckoutSummary({ totalItemsCount, totalCartPrice, isProcessing }) {
    return (
        <div className="bg-bg-card p-6 rounded-xl border border-text-muted/10 shadow-xs flex flex-col gap-6 lg:sticky lg:top-24">
            <h3 className="font-black text-text-main text-sm uppercase tracking-wider border-b border-text-muted/5 pb-2">
                Final Summary
            </h3>

            {/* Final accounting balances. */}
            <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between font-medium text-text-muted">
                    <span>Total units:</span>
                    <span className="font-bold text-text-main">{totalItemsCount} items</span>
                </div>
            
                <div className="flex justify-between font-black text-text-main text-base border-t border-text-muted/5 pt-3 mt-1">
                    <span>Total amount:</span>
                    <span className="text-lg">${totalCartPrice.toFixed(2)}</span>
                </div>
            </div>

            {/* DYNAMIC ACTION TRIGGER BUTTON */}
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




/* ----- MAIN ROUTER VIEW: CheckoutView ----- */
export default function CheckoutView() {
    // Extract global cart values and mutation clearing actions from the core engine
    const { totalCartPrice, totalItemsCount, clearCart } = useCart();

    // Navigation hook enables routing back to root branches down the pipeline
    const navigate = useNavigate();

    /* --- LOCAL STATES --- */

    // LOCAL STATE 1: Form input matrix
    // Form to collect the customer's personal information to complete the order.
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        zipCode: "",
        city: ""
    });
    
    // LOCAL STATE 2: LIVE TRANSACTION PROCESSING
    // Toggles a load spinner during the checkout timeout phase.
    const [isProcessing, setIsProcessing] = useState(false);

    // LOCAL STATE 3: MODAL DIALOGUE VISIBILITY CONTROLLER
    // Manages the absolute backdrop pop-up modal overlay state.
    const [showModal, setShowModal] = useState(false);



    /* --- HANDLERS --- */

    // HANDLER 1: Form input synchronization
    // Dynamically tracks individual keystrokes and locks them into the local form object state.
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // HANDLER 2: Live transaction simulation
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents browser default form page refreshing behavior

        // Step 1: Start the load spinner
        setIsProcessing(true);

        // Step 2: Trigger the delay to simulate bank communication over the network
        setTimeout(() => {
            // Trun off the load spinner
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
                    <ArrowLeft className="w-4 h-4" />
                        Back to shopping cart
                </Link>
            </div>

            <h1 className="text-3xl font-black text-text-main tracking-tight mb-8">
                Secure Checkout
            </h1>

            {/* Main Layout Form Wrapper */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Render subcomponent 1: Personal details form inputs */}
                {/* Passes down synchronized data and change matrix handlers */}
                <CheckoutForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                />

                {/* Render subcomponent 2: Checkout final accounting balances summary */}
                <CheckoutSummary
                    totalItemsCount={totalItemsCount}
                    totalCartPrice={totalCartPrice}
                    isProcessing={isProcessing}
                />
            </form>

            {/* POST-PURCHASE POP-UP DIALOGUE MODAL OVERLAY */}
            {/* Mounts safely onto the view root once your showModal state triggers true! */}
            {showModal && (
                <OrderConfirmationModal
                    formData={formData}
                    onFinalize={() => navigate("/")}
                />
            )}

        </div>
    );
}


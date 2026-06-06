import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../hooks/useCart";
import QuantityController from "../components/QuantityController";
import ReturnToHomeLink from "../components/ReturnToHomeLink";

/* ----- VIEW COMPONENT: CartView ----- */
// Renders the overview of the shopping cart including total sum and details for the order

/* ----- SUBCOMPONENT 1: CartItemsList ----- */
// Renders the list of all products currently added to the cart.
function CartItemsList({ cartItems, updateQuantity, removeFromCart}) {
  return (
    <div className="lg:col-span-2 flex flex-col gap-4">
      {cartItems.map((item) => (

        <div
          key={item.id}
          className="flex flex-col sm:flex-row items-center gap-4 bg-bg-card p-4 rounded-xl border border-text-muted/10 shadow-xs"
        >
          {/* Individual cart item row card */}

           {/* Product thumbnail image */}
          <div className="w-20 h-20 bg-white rounded-lg p-2 flex items-center justify-center border border-text-muted/5 shrink-0">
            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
          </div>

          {/* Product title and category */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            <h4 className="font-black text-text-main text-sm tracking-tight truncate">
              {item.title}
            </h4>
            <p className="text-text-muted text-xs capitalize mt-0.5">
              Category: {item.category.replace("-", " ")}
            </p>

            {/* Stock Availability Feedback */}
            {/* Evaluates the API stock balance to show live availability warnings. */}
            <p className={`text-[11px] font-bold mt-1 ${item.stock < 10 ? "text-red-400 motion-safe:animate-pulse opacity-90" : "text-green-500" }`}>
              {item.stock < 10 ? `Only ${item.stock} left in stock` : `In stock (${item.stock} available)`}  
            </p>

            <div className="text-text-main font-bold text-xs mt-2">
              ${item.price.toFixed(2)} each
            </div>
          </div>

          {/* Quantity controller and removal field */}
          <div className="flex items-center gap-3 w-full sm:w-44 justify-center sm:justify-end shrink-0 mt-2 sm:mt-0">
            

            {/* Quantity Controller */}
            <div className="w-28">
              <QuantityController
                quantity={item.quantity}
                onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
                onDecrement={() => updateQuantity(item.id, item.quantity - 1)}
                maxLimit={item.stock}   /* Locked to active API stock balance in the CartView */
                heightClass="h-10"
              />
            </div>

            {/* Product fast removal button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2.5 rounded-lg border border-red-500/20 text-red-400 hover:text-white hover:bg-red-500 transition-colors cursor-pointer flex items-center justify-center shadow-xs"
            >
              <Trash2 className="w-4 h-4" />
            </button>

          </div>
          
          {/* Total Price for the specific item (Price * Quantity) */}
          <div className="w-full sm:w-24 text-center sm:text-right font-black text-text-main text-sm shrink-0 border-t border-text-muted/5 sm:border-0 pt-2 sm:pt-0 mt-1 sm:mt-0">
            <span className="sm:hidden font-bold text-text-muted mr-1.5">Total:</span>
            ${(item.price * item.quantity).toFixed(2)}
          </div>

        </div>
      ))}
    </div>
  );
}

/* ----- SUBCOMPONENT 2: CartSummary ----- */
// Renders the total cost and checkout buttons
function CartSummary({ totalItemsCount, totalCartPrice, onCheckoutClick }) {
  return (
    <div className="bg-bg-card p-6 rounded-xl border border-text-muted/10 shadow-xs flex flex-col gap-6 lg:sticky lg:top-24">
      <h3 className="font-black text-text-main text-sm uppercase tracking-wider border-b border-text-muted/5 pb-2">
        Order Summary
      </h3>

      {/* Price layout block */}
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between font-medium text-text-muted">
          <span>Total items count:</span>
          <span className="font-bold text-text-main">{totalItemsCount} items</span>
        </div>

        <div className="flex justify-between font-medium text-text-muted">
          <span>Shipping fee:</span>
          <span className="text-green-500 font-bold uppercase tracking-wider text-xs flex items-center">Free</span>
        </div>

        <div className="flex justify-between font-black text-text-main text-base border-t border-text-muted/5 pt-3 mt-1">
          <span>Total price:</span>
          <span className="text-lg">${totalCartPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Action buttons block */}
      <div className="flex flex-col gap-2.5 mt-2">
        {/* BUTTON 1: Proceed to checkout */}
        <button
          onClick={onCheckoutClick}
          className="w-full h-11 bg-brand hover:bg-brand-dark text-white font-black text-xs uppercase tracking-wider 
                      rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center"  
        >
          Proceed to checkout
        </button>

        {/* BUTTON 2: Continue shopping. Link back to HomeView */}
        <Link 
          to="/"
          className="w-full h-11 bg-transparent border border-text-muted/20 text-text-main hover:bg-bg-main font-bold text-xs uppercase tracking-wider 
                      rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center"
        >
          Continue shopping
        </Link>
      </div>      

    </div>
  );
}

/* ----- MAIN: CartView ----- */
export default function CartView() {
  const { cartItems, updateQuantity, removeFromCart, totalCartPrice, totalItemsCount } = useCart();

  // Hook used for programmatic navigation to the checkout view
  const navigate = useNavigate();

  /* ----- Condition 1: Empty state guard ----- */
  // Renders a clear message instructing the user to return to the home page if the cart is empty.
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-xl text-center transition-opacity duration-300 ease-out">
        <div className="w-16 h-16 bg-brand-light dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-brand">
          <ShoppingCart className="w-8 h-8" />
        </div>
        
        <h2 className="text-2xl font-black text-text-main tracking-tight mb-3">
          Your shopping cart is empty
        </h2>
        
        <p className="text-text-muted text-sm font-medium leading-relaxed mb-8">
          Visit the boutique and choose your favorites from our luxurious selection!
        </p>

        <div className="flex justify-center">
          <ReturnToHomeLink />
        </div>
      </div>
    );
  }


  /* ----- Condition 2: Active cart layout ----- */
  // Renders the overview of the active products currently saved in the Shopping Cart
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl transition-opacity duration-300 ease-out">
      <h1 className="text-3xl font-black text-text-main tracking-tight mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Render subcomponent 1: CartItemsList */}
        <CartItemsList
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />

        {/* Render subcomponent 2: CartSummary */}
        <CartSummary
          totalItemsCount={totalItemsCount}
          totalCartPrice={totalCartPrice}
          onCheckoutClick={() => navigate("/checkout")}
        />
      </div>
    </div>
  );
}


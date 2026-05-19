export default function CartView() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-font-size-h1 font-black text-text-main mb-4">
        Your Cart
      </h1>
      <p className="text-text-muted text-lg leading-relaxed">
        Your shopping cart is currently empty. 
        Product IDs and scalable state will be safely managed here.
      </p>
    </div>
  );
};

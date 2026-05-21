export function Footer() {
  return (
    <div>
      <footer className="bg-brand dark:bg-brand-dark border-t border-black/10 py-6 text-center text-white/90 text-sm font-medium transition-colors duration-300">
        <p>&copy; {new Date().getFullYear()} YoYo Webshop. All rights reserved.</p>
      </footer>
    </div>
  );
}

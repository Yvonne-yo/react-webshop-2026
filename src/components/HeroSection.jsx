import logoButterfly from "../assets/YoYo_butterfly_only_200x199.jpg";

/* ----- BOX 1: WelcomeStrip - The top text banner. ----- */
function WelcomeStrip() {
  return (
    <div className="bg-color-brand-light dark:bg-bg-card border-b border-brand/10 py-4 text-center transition-colors duration-300">
      <span className="text-brand-dark dark:text-brand-light font-black text-sm tracking-widest uppercase block">
        Welcome to YoYo Webshop
      </span>
    </div>
  );
}

/* ----- BOX 2: LogoCenterpiece - The floating white circle with the butterfly logo and the radial ellipse behind it. ----- */
function LogoCenterpiece() {
  return (
    <section
      className="bg-radial-[100%_120px_at_center] from-white via-brand to-brand-dark 
                        border-b border-text-muted/10 py-16 
                        flex justify-center items-center 
                        relative overflow-hidden 
                        transition-all duration-300"
    >
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
            className="w-16 h-16 object-contain rounded-md" // css styling
            width="64" // html reserves size for the img
            height="64" // avoids Layout Shift when loading the webpage
                        // performance optimization
          />
        </div>
      </div>
    </section>
  );
}

/* ----- HeroSection ----- */
export default function HeroSection() {
  return (
    <div className="w-full">
      <WelcomeStrip />
      <LogoCenterpiece />
    </div>
  );
}

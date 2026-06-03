/* ----- COMPONENT: BrandTagLine ----- */
/* Used by the HomeView                */

export default function BrandTagLine(){
    return(
        <section className="text-center py-8 bg-bg-main transition-colors duration-300">
            <h2 className="text-font-size-h2 font-black text-brand tracking-tight">
                YoYo Webshop - Beauty & Style
            </h2>
            {/* An accent line in brand color diving the tagline from the next item in the layout */}
            <div className="w-12 h-1 bg-brand mx-auto mt-3 rounded-full opacity-30" />
        </section>        
    );
}
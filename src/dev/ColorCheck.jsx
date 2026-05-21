import logoButterflyText from "../assets/YoYo_butterfly_200x52.jpg"
import logoButterflyOnly from "../assets/YoYo_butterfly_only_200x199.jpg"

export default function ColorCheck() {
  return (
    <div className="p-8 space-y-10">
      <h1 className="text-4xl font-extrabold text-brand mb-10">YoYo Webshop Style Guide 🦋</h1>

      <img src={logoButterflyText} alt={"logo+text"} style={{border: "2px solid black", margin: "10px"}}></img>
      <img src={logoButterflyOnly} alt={"logo+text"} style={{border: "2px solid black", margin: "10px"}}></img>

      {/* Grid för att se Ljust vs Mörkt läge sida vid sida */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* LJUST LÄGE TEST */}
        <section className="p-8 bg-bg-main border border-gray-200 rounded-2xl">
          <h2 className="text-sm font-bold text-text-muted mb-4 uppercase">Ljust läge (Standard)</h2>
          <div className="bg-bg-card p-6 rounded-xl shadow-sm space-y-4">
            <h3 className="text-2xl font-bold text-text-main">Huvudrubrik</h3>
            <p className="text-text-muted">Detta är en sekundär text (muted) som visar kategorier eller beskrivningar.</p>
            <div className="flex gap-2">
              <button className="bg-brand text-white px-4 py-2 rounded-lg font-bold">Primary Button</button>
              <button className="bg-brand-light text-brand px-4 py-2 rounded-lg font-bold">Secondary</button>
            </div>
          </div>
        </section>

        {/* MÖRKT LÄGE TEST */}
        <div className="dark">
          <section className="p-8 rounded-2xl border transition-colors
            bg-bg-main dark:bg-[rgb(16,36,70)] 
            text-text-main dark:text-[rgb(241,245,249)]
            border-gray-800"
          >
            <h2 className="text-sm font-bold uppercase mb-4 text-text-muted dark:text-[rgb(148,163,184)]">
              Mörkt läge (Marinblå)
            </h2>
            
            <div className="p-6 rounded-xl shadow-lg space-y-4 bg-bg-card dark:bg-[rgb(28,54,95)]">
              <h3 className="text-2xl font-bold">Huvudrubrik</h3>
              <p className="opacity-90">Här ser du hur de mörka färgerna ser ut.</p>
              
              <div className="flex gap-2">
                {/* Primary Button */}
                <button className="bg-brand text-white px-4 py-2 rounded-lg font-bold hover:bg-brand-dark transition-colors">
                  Primary Button
                </button>
                
                {/* Secondary Button - Här är den! */}
                {/* Vi använder /20 för att låta bakgrunden lysa igenom lite, det ser proffsigt ut i dark mode */}
                <button className="bg-brand/20 text-brand border border-brand/30 px-4 py-2 rounded-lg font-bold hover:bg-brand/30 transition-colors">
                  Secondary
                </button>
              </div>
            </div>
          </section>
        </div>
        
      </div>

      {/* FÄRGPALETT-KOLL */}
      <div className="flex gap-4 flex-wrap">
         <div className="w-20 h-20 bg-brand rounded-full shadow-lg flex items-center justify-center text-white text-[10px]">Brand</div>
         <div className="w-20 h-20 bg-brand-dark rounded-full shadow-lg flex items-center justify-center text-white text-[10px]">Dark</div>
         <div className="w-20 h-20 bg-brand-light rounded-full shadow-lg flex items-center justify-center text-brand text-[10px]">Light</div>
      </div>
    </div>
  );
}

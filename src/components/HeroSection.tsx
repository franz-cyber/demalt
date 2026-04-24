import { Star, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import heroBackground from "@/assets/home-background.png";
import quoteMark from "@/assets/quote-mark.png";

const HeroSection = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-[100svh] bg-background flex flex-col overflow-hidden pt-14 sm:pt-20 lg:pt-28">
      <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col">
        {/* TOP CENTER TITLE */}
        <div className="text-center mt-4 lg:mt-8 relative z-[3]">
          <h1
            className="text-[2rem] sm:text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-black uppercase leading-[1] tracking-tighter text-foreground transition-all duration-[1.2s] ease-out"
            style={{
              fontFamily: "'Raleway', sans-serif",
              opacity: ready ? 1 : 0,
              transform: ready ? "translateY(0)" : "translateY(40px)",
            }}
          >
            PRODUKTE <span className="italic font-light">PROFESIONALE</span>
          </h1>
          <h1
            className="text-[2rem] sm:text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-black uppercase leading-[1] tracking-tighter text-foreground transition-all duration-[1.2s] ease-out delay-150"
            style={{
              fontFamily: "'Raleway', sans-serif",
              opacity: ready ? 1 : 0,
              transform: ready ? "translateY(0)" : "translateY(40px)",
            }}
          >
            PASTRIMI
          </h1>
        </div>

        {/* MIDDLE SECTION - image with side elements */}
        <div className="relative flex-1 flex items-center justify-center mt-4 lg:mt-8">
          {/* CENTER IMAGE */}
          <div
            className="relative z-[2] transition-all duration-[1.4s] ease-out delay-300"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "translateY(0) scale(1)" : "translateY(60px) scale(0.95)",
            }}
          >
            <img
              src={heroBackground}
              alt="Produkte profesionale pastrimi - Demalt Group"
              className="w-[320px] sm:w-[450px] md:w-[600px] lg:w-[750px] xl:w-[900px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
            />
          </div>

          {/* RIGHT - Description + Rating — hidden on small screens */}
          <div
            className="hidden md:flex absolute right-4 lg:right-8 top-1/4 z-[3] flex-col items-start gap-6 max-w-[200px] lg:max-w-[220px] transition-all duration-[1s] ease-out delay-700"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "translateX(0)" : "translateX(40px)",
            }}
          >
            <div className="relative pt-10">
              <img src={quoteMark} alt="" className="w-28 lg:w-44 opacity-10 absolute -top-10 -left-6 pointer-events-none select-none" />
              <p
                className="text-xs md:text-sm lg:text-base text-foreground leading-relaxed font-bold uppercase tracking-wider relative z-[1]"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                PRODUKTET MË TË MIRA TË PASTRIMIT PËR BIZNESIN DHE SHTËPINË TUAJ.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <span
                  className="text-3xl lg:text-5xl font-black text-foreground"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  4.5
                </span>
                <div className="w-px h-8 lg:h-10 bg-border" />
                <div className="flex flex-col gap-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground italic font-light">326k Total Review</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom search bar */}
      <div
        className="relative z-10 pb-4 sm:pb-8 pt-6 sm:pt-12 mt-4 sm:mt-8 transition-all duration-[1s] ease-out delay-1000"
        style={{
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(30px)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="bg-foreground border border-foreground rounded-2xl px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 shadow-lg shadow-foreground/5">
            <h3
              className="text-sm sm:text-base font-black text-background whitespace-nowrap tracking-wider uppercase"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              KERKO <span className="font-light italic">PRODUKT</span>
            </h3>

            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Shkruaj emrin e produktit..."
                className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-foreground/80 border border-background/20 text-sm text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                style={{ fontFamily: "'Raleway', sans-serif" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const value = (e.target as HTMLInputElement).value;
                    if (value.trim()) {
                      window.location.href = `/produktet?search=${encodeURIComponent(value.trim())}`;
                    }
                  }
                }}
              />
            </div>

            <Button
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm whitespace-nowrap shadow-md uppercase tracking-wide"
              style={{ fontFamily: "'Raleway', sans-serif" }}
              onClick={() => {
                const input = document.querySelector<HTMLInputElement>('input[placeholder*="Shkruaj"]');
                if (input?.value.trim()) {
                  window.location.href = `/produktet?search=${encodeURIComponent(input.value.trim())}`;
                }
              }}
            >
              <Search size={16} />
              Kërko
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

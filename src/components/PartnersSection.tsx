import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";

import sparLogo from "@/assets/partner-spar.png";
import conadLogo from "@/assets/partner-conad.png";
import metropolLogo from "@/assets/partner-metropol.jpg";
import elkosLogo from "@/assets/partner-elkos.png";
import bigmarketLogo from "@/assets/partner-bigmarket.png";

const partners = [
  { name: "SPAR", logo: sparLogo },
  { name: "CONAD", logo: conadLogo },
  { name: "Metropol Center", logo: metropolLogo },
  { name: "Elkos Group", logo: elkosLogo },
  { name: "Big Market", logo: bigmarketLogo },
];

const loopPartners = [...partners, ...partners, ...partners];

const PartnersSection = () => {
  const ref = useScrollReveal();
  const [paused, setPaused] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-background overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 mb-10 sm:mb-16 scroll-reveal">
        <div className="text-center">
          <h2
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-tighter text-foreground"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            <span className="font-black">Partnerët</span>{" "}
            <span className="font-light italic text-primary">Tanë</span>
          </h2>
          <p
            className="text-muted-foreground mt-3 sm:mt-5 max-w-lg mx-auto text-sm sm:text-base font-light italic"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Bashkëpunojmë me markat më të njohura në treg për të ofruar cilësinë më të lartë.
          </p>
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          setHoveredIdx(null);
        }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          className="flex"
          style={{
            animation: "partners-scroll 35s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {loopPartners.map((partner, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-3 sm:mx-5"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div
                className="w-[140px] h-[80px] sm:w-[180px] sm:h-[100px] rounded-xl sm:rounded-2xl border border-border/60 bg-card flex items-center justify-center px-4 sm:px-6 transition-all duration-500 ease-in-out"
                style={{
                  boxShadow:
                    hoveredIdx === i
                      ? "0 8px 32px -8px hsl(0 0% 0% / 0.12)"
                      : "0 2px 8px -2px hsl(0 0% 0% / 0.06)",
                  transform: hoveredIdx === i ? "scale(1.08) translateY(-4px)" : "scale(1)",
                  opacity: hoveredIdx !== null && hoveredIdx !== i ? 0.5 : 1,
                }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-[40px] sm:max-h-[56px] max-w-[110px] sm:max-w-[140px] object-contain transition-all duration-500"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes partners-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-200px * ${partners.length})); }
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FlaskConical, Users, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

import decoSponge from "@/assets/deco-sponge.png";
import decoMop from "@/assets/deco-mop.png";
import decoGloves from "@/assets/deco-gloves.png";
import decoBulb from "@/assets/deco-bulb.png";

const stats = [
  { icon: FlaskConical, text: "30+ vite\nexperiencë" },
  { icon: TrendingUp, text: "Cilësi e provuar\nnë treg" },
  { icon: Users, text: "Besuar nga 500+\nklientë biznesi" },
];

const decoItems = [
  { src: decoSponge, size: 90, top: "8%", left: "5%", speed: 0.6, rotSpeed: 0.3, opacity: 0.15 },
  { src: decoMop, size: 120, top: "15%", left: "85%", speed: 0.4, rotSpeed: -0.2, opacity: 0.12 },
  { src: decoGloves, size: 80, top: "60%", left: "3%", speed: 0.5, rotSpeed: 0.25, opacity: 0.13 },
  { src: decoBulb, size: 70, top: "70%", left: "90%", speed: 0.7, rotSpeed: -0.35, opacity: 0.14 },
  { src: decoSponge, size: 55, top: "40%", left: "15%", speed: 0.35, rotSpeed: -0.15, opacity: 0.1 },
  { src: decoMop, size: 65, top: "25%", left: "75%", speed: 0.55, rotSpeed: 0.2, opacity: 0.11 },
  { src: decoBulb, size: 50, top: "85%", left: "40%", speed: 0.45, rotSpeed: 0.3, opacity: 0.1 },
  { src: decoGloves, size: 60, top: "5%", left: "50%", speed: 0.3, rotSpeed: -0.25, opacity: 0.12 },
  { src: decoSponge, size: 45, top: "50%", left: "65%", speed: 0.65, rotSpeed: 0.18, opacity: 0.09 },
  { src: decoMop, size: 75, top: "80%", left: "20%", speed: 0.5, rotSpeed: -0.22, opacity: 0.11 },
];

// Generate sine wave path
// Generate sine wave stroke path (1 smooth wave)
const waveStrokePath = (() => {
  const w = 1200;
  const h = 60;
  const waves = 1;
  const steps = 200;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * w;
    const y = Math.sin((i / steps) * waves * Math.PI * 2) * (h * 0.4) + h * 0.5;
    d += i === 0 ? `M${x},${y}` : ` L${x},${y}`;
  }
  return d;
})();

const WhatWeOfferSection = () => {
  const sectionRef = useScrollReveal();
  const bgRef = useRef<HTMLDivElement>(null);
  const [visibility, setVisibility] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const rafRef = useRef<number>();

  const handleScroll = useCallback(() => {
    const section = bgRef.current?.parentElement;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;

    let vis = 0;
    if (rect.top < vh && rect.bottom > 0) {
      const enterProgress = Math.min(1, (vh - rect.top) / (vh * 0.3));
      const exitProgress = Math.min(1, rect.bottom / (vh * 0.3));
      vis = Math.min(enterProgress, exitProgress);
    }

    const progress = (vh - rect.top) / (rect.height + vh);
    const offset = progress * 120;

    setVisibility(vis);
    setScrollOffset(offset);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(handleScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  return (
    <div className="relative">
      <section className="pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-24 md:pb-32 bg-background relative overflow-hidden" ref={sectionRef}>
        {/* Decorative background layer */}
        <div ref={bgRef} className="absolute inset-0 pointer-events-none z-0 hidden sm:block">
          {decoItems.map((item, i) => {
            const y = scrollOffset * item.speed;
            const rot = scrollOffset * item.rotSpeed * 3;
            return (
              <img
                key={i}
                src={item.src}
                alt=""
                aria-hidden="true"
                className="absolute select-none animate-[deco-float_8s_ease-in-out_infinite]"
                style={{
                  width: item.size,
                  height: item.size,
                  objectFit: "contain",
                  top: item.top,
                  left: item.left,
                  opacity: visibility * item.opacity,
                  transform: `translateY(${y}px) rotate(${rot}deg)`,
                  willChange: "transform, opacity",
                  animationDelay: `${i * -1.2}s`,
                }}
              />
            );
          })}
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2
            className="scroll-reveal text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] max-w-4xl mx-auto uppercase tracking-tighter"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Cilësi që bën{" "}
            <span className="text-primary italic font-light">ndryshimin.</span>
          </h2>

          <p
            className="scroll-reveal stagger-1 text-muted-foreground text-sm sm:text-base md:text-lg mt-4 sm:mt-6 max-w-xl mx-auto leading-relaxed font-light italic"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Vetëm produkte profesionale pastrimi — të testuara, të certifikuara, të besuara nga qindra biznese.
          </p>

          <div className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-16 mt-8 sm:mt-16 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div key={stat.text} className={`scroll-reveal stagger-${i + 2} flex flex-col items-center gap-2 sm:gap-4 group`}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/40 transition-all duration-500">
                  <stat.icon className="text-primary" size={24} strokeWidth={1.5} />
                </div>
                <p
                  className="text-foreground font-bold text-sm md:text-base leading-snug whitespace-pre-line tracking-wide"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {stat.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sine wave thin line divider with animation */}
      <div className="relative z-10 leading-[0] overflow-hidden">
        <svg
          viewBox="0 0 2400 60"
          preserveAspectRatio="none"
          className="w-[200%] h-[24px] sm:h-[32px] md:h-[40px] block animate-[wave-slide_8s_linear_infinite]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={waveStrokePath} fill="none" className="stroke-primary" strokeWidth="3" strokeLinecap="round" />
          <path d={waveStrokePath} fill="none" className="stroke-primary" strokeWidth="3" strokeLinecap="round" transform="translate(1200,0)" />
        </svg>
      </div>
    </div>
  );
};

export default WhatWeOfferSection;

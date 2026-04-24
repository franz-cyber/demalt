import { useCountUp } from "@/hooks/useCountUp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Package, Users, Award, ShoppingBag } from "lucide-react";

const stats = [
  { end: 3578, suffix: "", label: "PRODUKTE", desc: "Produkte të dorëzuara.", icon: Package },
  { end: 537, suffix: "", label: "KLIENTË", desc: "Që bashkëpunojnë me ne.", icon: Users },
  { end: 100, suffix: "%", label: "CILËSI", desc: "Cilësi që zgjat.", icon: Award },
  { end: 30756, suffix: "", label: "OFERTA", desc: "Produkte për çdo biznes.", icon: ShoppingBag },
];

const StatItem = ({ end, suffix, label, desc, icon: Icon, index }: { end: number; suffix: string; label: string; desc: string; icon: React.ElementType; index: number }) => {
  const { count, ref } = useCountUp(end, 2500);
  return (
    <div
      ref={ref}
      className={`scroll-reveal stagger-${index + 1} flex flex-col items-center text-center gap-2 sm:gap-3 px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-12 group`}
    >
      <div
        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter"
        style={{ fontFamily: "'Raleway', sans-serif" }}
      >
        {count.toLocaleString()}{suffix}
      </div>
      <div className="flex items-center gap-2 mt-1 sm:mt-2">
        <Icon className="text-primary group-hover:scale-110 transition-transform duration-300" size={16} strokeWidth={2} />
        <h3
          className="text-white font-bold text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          {label}
        </h3>
      </div>
      <p
        className="text-white/50 text-xs md:text-sm max-w-[180px] font-light italic hidden sm:block"
        style={{ fontFamily: "'Raleway', sans-serif" }}
      >
        {desc}
      </p>
    </div>
  );
};

const StatsSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="relative overflow-hidden" ref={sectionRef}>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/stats-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center min-h-[70svh] sm:min-h-screen py-16 sm:py-20">
        <div className="scroll-reveal text-center mb-10 sm:mb-16 md:mb-20">
          <h2
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-tight"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            PËRVOJA <span className="italic font-light">JONË</span>
          </h2>
          <h2
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-primary tracking-tighter uppercase leading-tight"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            NË <span className="italic font-light">SHIFRA</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 w-full max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`${
                i < stats.length - 1 ? "lg:border-r border-white/10" : ""
              } ${i < 2 ? "border-b lg:border-b-0 border-white/10" : ""} ${
                i === 0 ? "border-r border-white/10" : ""
              } ${i === 2 ? "border-r lg:border-r border-white/10" : ""}`}
            >
              <StatItem {...stat} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

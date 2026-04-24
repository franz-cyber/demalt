import { useEffect, useRef, useState, useCallback } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import aboutHero from "@/assets/about-hero.jpg";
import aboutProducts from "@/assets/about-products.jpg";
import aboutWarehouse from "@/assets/about-warehouse.jpg";
import aboutQuality from "@/assets/about-quality.jpg";
import aboutFactory from "@/assets/about-factory.jpg";
import aboutGrid1 from "@/assets/about-grid1.jpg";
import aboutGrid2 from "@/assets/about-grid2.jpg";
import aboutDelivery from "@/assets/about-delivery.jpg";

/* ── Mobile detection ── */
function useIsMobileAbout() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

/* ── Parallax image hook (disabled on mobile) ── */
function useParallax(speed = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);
  const isMobile = useIsMobileAbout();

  const handleScroll = useCallback(() => {
    if (!ref.current || isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    const center = rect.top + rect.height / 2 - window.innerHeight / 2;
    setY(center * speed);
  }, [speed, isMobile]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { ref, y: isMobile ? 0 : y };
}

/* ── Word reveal component ── */
const RevealWords = ({
  text,
  className = "",
  highlight = [] as string[],
}: {
  text: string;
  className?: string;
  highlight?: string[];
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLSpanElement>(".wr");
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          words.forEach((w, i) => {
            setTimeout(() => {
              w.style.opacity = "1";
              w.style.transform = "translateY(0)";
            }, i * 50);
          });
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ fontFamily: "'Raleway', sans-serif" }}>
      {text.split(" ").map((word, i) => {
        const isH = highlight.some((h) => word.toLowerCase().includes(h.toLowerCase()));
        return (
          <span
            key={i}
            className={`wr inline-block mr-[0.3em] ${isH ? "text-primary italic" : ""}`}
            style={{
              opacity: 0,
              transform: "translateY(18px)",
              transition: "opacity 0.45s ease-out, transform 0.45s ease-out",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

/* ── Parallax Image Section ── */
const ParallaxImage = ({
  src,
  alt,
  speed = 0.12,
  overlay,
  className = "",
  height = "70vh",
}: {
  src: string;
  alt: string;
  speed?: number;
  overlay?: React.ReactNode;
  className?: string;
  height?: string;
}) => {
  const p = useParallax(speed);
  return (
    <div ref={p.ref} className={`relative overflow-hidden ${className}`} style={{ height }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover scale-110"
        style={{ transform: `translateY(${p.y}px) scale(1.1)`, transition: "transform 0.1s linear" }}
      />
      {overlay && (
        <div className="absolute inset-0 flex items-center justify-center z-10">{overlay}</div>
      )}
    </div>
  );
};

/* ── Values data ── */
const values = [
  { num: "30+", label: "Vite Eksperiencë", img: aboutFactory },
  { num: "500+", label: "Klientë Biznesi", img: aboutWarehouse },
  { num: "100+", label: "Produkte Profesionale", img: aboutGrid1 },
];

/* ── Horizontal Scroll-Lock Section ── */
const HorizontalScrollSection = ({
  values: items,
}: {
  values: { num: string; label: string; img: string }[];
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobileAbout();

  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const scrollableDistance = sectionHeight - viewportHeight;
      if (scrollableDistance <= 0) return;
      const p = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  const cardCount = items.length;
  const translateX = progress * (cardCount - 1) * -85;

  /* Mobile: stacked vertical cards */
  if (isMobile) {
    return (
      <section className="py-10 bg-background">
        <div className="text-center mb-6 px-4">
          <span
            className="text-primary text-xs font-bold tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            04 — <span className="italic font-light">Pse Ne</span>
          </span>
        </div>
        <div className="flex flex-col gap-4 px-4">
          {items.map((v, i) => (
            <div
              key={v.label}
              className="scroll-reveal relative overflow-hidden rounded-2xl aspect-[4/3]"
            >
              <img
                src={v.img}
                alt={v.label}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="text-white/20 text-5xl font-black leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span
                  className="text-3xl font-black text-white block mb-1"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {v.num}
                </span>
                <span
                  className="text-white text-xs font-light italic tracking-wide uppercase"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {v.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* Desktop: horizontal scroll-lock */
  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: `${cardCount * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="text-center mb-6 sm:mb-10 px-4">
          <span
            className="text-primary text-xs font-bold tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            04 — <span className="italic font-light">Pse Ne</span>
          </span>
        </div>

        <div className="flex-1 flex items-center overflow-hidden">
          <div
            className="flex gap-[5vw] pl-[10vw] will-change-transform"
            style={{
              transform: `translateX(${translateX}vw)`,
              transition: "transform 0.1s linear",
            }}
          >
            {items.map((v, i) => {
              const cardProgress = progress * (cardCount - 1);
              const distFromCenter = Math.abs(cardProgress - i);
              const isActive = distFromCenter < 0.5;
              const scale = 1 - Math.min(distFromCenter * 0.08, 0.12);
              const opacity = 1 - Math.min(distFromCenter * 0.3, 0.4);

              return (
                <div
                  key={v.label}
                  className="flex-shrink-0 w-[70vw] md:w-[60vw] lg:w-[50vw] relative overflow-hidden rounded-3xl aspect-[4/3]"
                  style={{
                    transform: `scale(${scale})`,
                    opacity,
                    transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
                  }}
                >
                  <img
                    src={v.img}
                    alt={v.label}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    style={{
                      transform: `scale(${1.05 + distFromCenter * 0.03})`,
                      transition: "transform 0.4s ease-out",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="text-white/20 text-8xl md:text-9xl font-black leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 p-8 md:p-10 transition-all duration-500"
                    style={{
                      opacity: isActive ? 1 : 0.3,
                      transform: isActive ? "translateY(0)" : "translateY(10px)",
                    }}
                  >
                    <span
                      className="text-5xl md:text-7xl font-black text-white block mb-2"
                      style={{ fontFamily: "'Raleway', sans-serif" }}
                    >
                      {v.num}
                    </span>
                    <span
                      className="text-white text-base lg:text-lg font-light italic tracking-wide uppercase"
                      style={{ fontFamily: "'Raleway', sans-serif" }}
                    >
                      {v.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-3 pb-10">
          {items.map((_, i) => {
            const cardProgress = progress * (cardCount - 1);
            const isActive = Math.abs(cardProgress - i) < 0.5;
            return (
              <div
                key={i}
                className={`h-[3px] rounded-full transition-all duration-300 ${
                  isActive ? "w-12 bg-primary" : "w-4 bg-border"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
const About = () => {
  const mainRef = useScrollReveal();
  const [heroReady, setHeroReady] = useState(false);
  const heroP = useParallax(0.08);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <main ref={mainRef} style={{ fontFamily: "'Raleway', sans-serif" }}>
      {/* ═══════════════════════════════════════
          HERO — Full-screen cinematic image
          ═══════════════════════════════════════ */}
      <section ref={heroP.ref} className="relative h-[100svh] overflow-hidden">
        <img
          src={aboutHero}
          alt="Demalt Group Factory"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: `translateY(${heroP.y}px) scale(1.05)`,
            transition: "transform 0.1s linear",
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <span
            className="text-primary text-xs md:text-sm font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-4 sm:mb-6 block transition-all duration-1000 ease-out"
            style={{
              fontFamily: "'Raleway', sans-serif",
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "translateY(0)" : "translateY(20px)",
            }}
          >
            Që nga 1993
          </span>

          <h1
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9] tracking-tighter transition-all duration-[1.2s] ease-out delay-200"
            style={{
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "translateY(0) scale(1)" : "translateY(50px) scale(0.96)",
            }}
          >
            Demalt
            <br />
            <span className="text-primary font-light italic">Group</span>
          </h1>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          CHAPTER 1 — Who We Are (Text)
          ═══════════════════════════════════════ */}
      <section className="py-10 sm:py-28 md:py-40 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="scroll-reveal mb-8">
            <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase">
              01 — <span className="italic font-light">Kush Jemi</span>
            </span>
          </div>
          <RevealWords
            text="Me një histori që daton nga viti 1993, Demalt Group ka evoluar nga tregtia tradicionale në liderin e industrisë së produkteve të pastrimit në Shqipëri."
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-snug tracking-tight"
            highlight={["1993", "Demalt", "Group", "liderin"]}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FULL-WIDTH IMAGE — Products
          ═══════════════════════════════════════ */}
      <ParallaxImage
        src={aboutProducts}
        alt="Produkte pastrimi profesionale"
        height="30vh"
        overlay={
          <div className="bg-black/40 w-full h-full flex items-center justify-center">
            <h2
              className="scroll-reveal text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight text-center px-4"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              <span className="text-white">Cilësi</span>
            </h2>
          </div>
        }
      />

      {/* ═══════════════════════════════════════
          CHAPTER 2 — Our Story (Split Layout)
          ═══════════════════════════════════════ */}
      <section className="py-10 sm:py-28 md:py-40 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            {/* Image */}
            <div className="scroll-reveal stagger-1 relative overflow-hidden rounded-2xl aspect-[4/3] group">
              <img
                src={aboutQuality}
                alt="Kontroll cilësie"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Text */}
            <div>
              <div className="scroll-reveal mb-6">
                <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase">
                  02 — <span className="italic font-light">Historia Jonë</span>
                </span>
              </div>
              <RevealWords
                text="Inovacioni dhe përshtatshmëria janë në zemër të filozofisë sonë të biznesit."
                className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-snug tracking-tight mb-5 sm:mb-8"
                highlight={["Inovacioni", "filozofisë"]}
              />
              <p className="scroll-reveal stagger-2 text-muted-foreground leading-relaxed text-sm sm:text-base md:text-lg font-light">
                Ne besojmë se çdo produkt duhet të jetë rezultat i kërkimit të vazhdueshëm
                për përmirësim. <span className="font-semibold text-foreground">Angazhimi ynë për cilësi</span> na ka bërë pionierë në tregun shqiptar,
                duke sjellë <span className="italic">standardet ndërkombëtare</span> në çdo shtëpi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PARALLAX — Warehouse
          ═══════════════════════════════════════ */}
      <ParallaxImage
        src={aboutWarehouse}
        alt="Magazina e produkteve"
        speed={0.1}
        height="25vh"
      />

      {/* ═══════════════════════════════════════
          CHAPTER 3 — Mission & Vision (Split)
          ═══════════════════════════════════════ */}
      <section className="py-10 sm:py-28 md:py-40 bg-foreground">
        <div className="container mx-auto px-4">
          <div className="scroll-reveal text-center mb-10 sm:mb-20">
            <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase block mb-6">
              03 — <span className="italic font-light">Misioni & Vizioni</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 max-w-5xl mx-auto">
            <div className="scroll-reveal stagger-1 p-6 sm:p-10 md:p-14 rounded-2xl border border-background/10 hover:border-primary/20 transition-all duration-500">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4 sm:mb-6 tracking-tight">
                Misioni
              </h3>
              <p className="text-background/70 text-sm sm:text-base md:text-lg leading-relaxed font-light">
                Të ofrojmë produkte pastrimi <span className="font-semibold">cilësore dhe efikase</span> që përmbushin nevojat e tregut
                vendas dhe ndërkombëtar, duke u angazhuar për <span className="italic">korrektësi, inovacion</span> dhe kënaqësinë
                maksimale të klientit.
              </p>
            </div>

            <div className="scroll-reveal stagger-2 p-6 sm:p-10 md:p-14 rounded-2xl border border-background/10 hover:border-primary/20 transition-all duration-500">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4 sm:mb-6 tracking-tight">
                Vizioni
              </h3>
              <p className="text-background/70 text-sm sm:text-base md:text-lg leading-relaxed font-light">
                Të jemi <span className="font-bold">lider rajonal</span> në industrinë e produkteve të pastrimit, duke zgjeruar
                vazhdimisht gamën tonë, për të përmirësuar <span className="italic">teknologjinë e prodhimit</span> dhe ndërtuar
                partneritete të qëndrueshme ndërkombëtare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          IMAGE MARQUEE — Two rows, opposite directions
          ═══════════════════════════════════════ */}
      <section className="py-8 sm:py-20 md:py-28 bg-background overflow-hidden">
        {/* Row 1: Right to Left */}
        <div className="mb-3 sm:mb-4 relative">
          <div className="flex gap-3 sm:gap-4 animate-marquee-rtl">
            {[aboutFactory, aboutQuality, aboutGrid2, aboutDelivery, aboutProducts, aboutFactory, aboutQuality, aboutGrid2, aboutDelivery, aboutProducts].map((src, i) => (
              <div
                key={`r1-${i}`}
                className="flex-shrink-0 w-[150px] sm:w-[300px] md:w-[400px] lg:w-[500px] aspect-[3/2] relative overflow-hidden rounded-lg sm:rounded-xl group"
              >
                <img
                  src={src}
                  alt="Demalt Group"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Left to Right */}
        <div className="relative">
          <div className="flex gap-3 sm:gap-4 animate-marquee-ltr">
            {[aboutGrid1, aboutWarehouse, aboutHero, aboutProducts, aboutQuality, aboutGrid1, aboutWarehouse, aboutHero, aboutProducts, aboutQuality].map((src, i) => (
              <div
                key={`r2-${i}`}
                className="flex-shrink-0 w-[150px] sm:w-[300px] md:w-[400px] lg:w-[500px] aspect-[3/2] relative overflow-hidden rounded-lg sm:rounded-xl group"
              >
                <img
                  src={src}
                  alt="Demalt Group"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CHAPTER 4 — What Makes Us Different (Horizontal Scroll-Lock)
          ═══════════════════════════════════════ */}
      <HorizontalScrollSection values={values} />

    </main>
  );
};

export default About;

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";

const categories = products.map((p) => ({
  name: p.name,
  desc: p.tagline,
  image: p.image,
  slug: p.slug,
}));

const CategoriesSection = () => {
  const sectionRef = useScrollReveal();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    setTimeout(checkScroll, 400);
  };

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12 scroll-reveal">
          <div>
            <h2
              className="text-3xl sm:text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Produktet <span className="italic font-light text-primary">Tona</span>
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary hover:scale-105 transition-all duration-300 disabled:opacity-30"
            >
              <ChevronLeft size={18} className="text-foreground sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary hover:scale-105 transition-all duration-300 disabled:opacity-30"
            >
              <ChevronRight size={18} className="text-foreground sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat, i) => (
            <div
              key={cat.name + i}
              className={`scroll-reveal stagger-${(i % 6) + 1} group flex-shrink-0 w-[220px] sm:w-[260px] md:w-[300px] cursor-pointer`}
              onClick={() => navigate(`/produktet/${cat.slug}`)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-secondary aspect-square mb-4 sm:mb-5 flex items-center justify-center p-6 sm:p-8 group-hover:shadow-xl group-hover:shadow-primary/5 transition-all duration-500 border border-border/50">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                />
              </div>
              <h3
                className="text-base sm:text-lg font-bold text-foreground mb-1 tracking-tight"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {cat.name}
              </h3>
              <p
                className="text-xs sm:text-sm text-muted-foreground font-light italic"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

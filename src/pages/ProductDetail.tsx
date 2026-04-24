import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getProductBySlug, products } from "@/data/products";
import { ArrowRight, Check, ChevronRight, X } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProductBySlug(slug || "");
  const pageRef = useScrollReveal();
  const heroImgRef = useRef<HTMLDivElement>(null);
  const [activeHeroImg, setActiveHeroImg] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Reset state on slug change
  useEffect(() => {
    setActiveHeroImg(0);
    window.scrollTo(0, 0);
  }, [slug]);

  // Parallax on hero image
  useEffect(() => {
    const handleScroll = () => {
      if (!heroImgRef.current) return;
      const y = window.scrollY;
      heroImgRef.current.style.transform = `translateY(${y * 0.12}px) scale(${1 + y * 0.0001})`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate hero images
  useEffect(() => {
    if (!product) return;
    const interval = setInterval(() => {
      setActiveHeroImg((prev) => (prev + 1) % product.heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [product]);

  if (!product) {
    return (
      <main className="pt-32 pb-20 text-center min-h-screen bg-background" ref={pageRef}>
        <h1 className="text-3xl font-bold text-foreground mb-4">Produkti nuk u gjet</h1>
        <button onClick={() => navigate("/produktet")} className="text-primary underline">
          Kthehu te Produktet
        </button>
      </main>
    );
  }

  const raleway = { fontFamily: "'Raleway', sans-serif" };

  return (
    <main className="bg-background overflow-hidden" ref={pageRef}>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[75vh] sm:min-h-[90vh] flex items-end overflow-hidden bg-secondary">
        <div ref={heroImgRef} className="absolute inset-0 flex items-center justify-center">
          {product.heroImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={product.name}
              className={`absolute w-[220px] sm:w-[350px] md:w-[450px] lg:w-[500px] h-auto object-contain transition-all duration-1000 ease-in-out ${i === activeHeroImg
                  ? "opacity-20 scale-100"
                  : "opacity-0 scale-95"
                }`}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 pb-8 sm:pb-16 md:pb-24">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-10 scroll-reveal">
            <Link to="/produktet" className="hover:text-primary transition-colors">Produktet</Link>
            <ChevronRight size={14} />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>

          <div className="scroll-reveal stagger-1">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-2 sm:mb-4" style={raleway}>
              Demalt Group
            </p>
          </div>
          <h1
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-foreground tracking-tighter leading-[0.85] mb-3 sm:mb-6 scroll-reveal stagger-2"
            style={raleway}
          >
            {product.name}
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground font-light italic max-w-xl scroll-reveal stagger-3" style={raleway}>
            {product.tagline}
          </p>

          <div className="mt-6 sm:mt-8 flex justify-end scroll-reveal stagger-4">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-8 sm:px-10 py-4 sm:py-4.5 text-base sm:text-lg font-bold tracking-wide hover:scale-105 hover:shadow-xl transition-all duration-300"
              style={raleway}
            >
              Porosit
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Hero image indicators */}
          <div className="flex gap-2 mt-5 sm:mt-6 scroll-reveal stagger-5">
            {product.heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveHeroImg(i)}
                className={`h-1 rounded-full transition-all duration-500 ${i === activeHeroImg ? "w-8 bg-primary" : "w-3 bg-muted-foreground/30"
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── STORY SECTION ─── */}
      <section className="py-14 sm:py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 sm:mb-8 scroll-reveal" style={raleway}>
              Rreth Produktit
            </p>
            <p className="text-lg sm:text-2xl md:text-3xl text-foreground font-light leading-relaxed scroll-reveal stagger-1" style={raleway}>
              {product.description}
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION BREAK ─── */}
      <div className="h-12 sm:h-20 bg-background" />

      {/* ─── SPECIFICATIONS ─── */}
      <section className="py-14 sm:py-24 md:py-32 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 sm:mb-12 scroll-reveal" style={raleway}>
              Specifikimet
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {product.specs.map((spec, i) => (
                <div key={i} className={`scroll-reveal stagger-${i + 1} p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-background border border-border/20`}>
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-2" style={raleway}>{spec.label}</p>
                  <p className="text-sm sm:text-lg font-semibold text-foreground" style={raleway}>{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── GALLERY SECTION (Controlled Looping Carousel) ─── */}
      <section className="py-12 sm:py-24 md:py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3 sm:mb-4 scroll-reveal" style={raleway}>
              Galeria
            </p>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-foreground tracking-tighter leading-none scroll-reveal stagger-1" style={raleway}>
              Detaje në <span className="italic font-light text-primary">Fokus</span>
            </h2>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-6">
              {product.gallery.map((img, i) => (
                <CarouselItem key={i} className="pl-4 sm:pl-6 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div
                    className="aspect-[16/10] rounded-2xl sm:rounded-[2rem] overflow-hidden bg-secondary/30 cursor-zoom-in group border border-border/10 transition-all duration-500 hover:border-primary/20"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i}`}
                      className="w-full h-full object-contain p-4 sm:p-12 group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-end gap-3 mt-8">
              <CarouselPrevious className="static translate-y-0 h-12 w-12 sm:h-14 sm:w-14 rounded-full border-border/50 bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300" />
              <CarouselNext className="static translate-y-0 h-12 w-12 sm:h-14 sm:w-14 rounded-full border-border/50 bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] max-h-[90vh] md:max-w-[85vw] p-0 border-none bg-transparent shadow-none flex items-center justify-center overflow-hidden outline-none">
          <div className="sr-only">
            <DialogTitle>{product.name} Gallery</DialogTitle>
            <DialogDescription>Full size preview of {product.name}</DialogDescription>
          </div>
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <img
                src={selectedImage}
                alt="Product Preview"
                className="max-w-full max-h-[85vh] object-contain animate-in zoom-in-95 duration-300 shadow-2xl rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all duration-300"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ─── FEATURES & USE CASES — Parallel minimal columns ─── */}
      <section className="py-20 sm:py-32 md:py-40 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-stretch">
            <article className="scroll-reveal border border-background/10 rounded-lg p-6 sm:p-8 md:p-10 bg-background/5 backdrop-blur-sm min-h-full">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-background/40 mb-4 sm:mb-6">
                Karakteristikat
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-background mb-6 sm:mb-8" style={raleway}>
                Detaje të forta, <span className="font-light italic">prezantim i pastër</span>
              </h2>
              <div className="space-y-4 sm:space-y-5">
                {product.features.map((feat, i) => (
                  <div
                    key={i}
                    className={`scroll-reveal stagger-${Math.min(i + 1, 5)} flex items-start gap-3 sm:gap-4 border-t border-background/10 pt-4 first:border-t-0 first:pt-0`}
                  >
                    <div className="w-8 h-8 rounded-full border border-background/15 bg-background/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-background" />
                    </div>
                    <p className="text-sm sm:text-base md:text-lg text-background/78 font-medium italic leading-relaxed">
                      {feat}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="scroll-reveal stagger-2 border border-background/10 rounded-lg p-6 sm:p-8 md:p-10 bg-background/5 backdrop-blur-sm min-h-full">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-background/40 mb-4 sm:mb-6">
                Përdorimi
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-background mb-6 sm:mb-8" style={raleway}>
                Përshtatje e zgjuar, <span className="font-light italic">në çdo ambient</span>
              </h2>
              <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
                {product.useCases.map((uc, i) => (
                  <div
                    key={i}
                    className={`scroll-reveal stagger-${Math.min(i + 1, 5)} flex items-start gap-3 sm:gap-4 border-t border-background/10 pt-4 first:border-t-0 first:pt-0`}
                  >
                    <div className="w-8 h-8 rounded-full border border-background/15 bg-background/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight size={14} className="text-background" />
                    </div>
                    <p className="text-sm sm:text-base md:text-lg text-background/78 font-medium italic leading-relaxed">
                      {uc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-background/10 pt-5 sm:pt-6">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-background/40 mb-2 sm:mb-3">
                  Materialet
                </p>
                <p className="text-sm sm:text-base md:text-lg text-background/70 font-semibold italic">
                  {product.materials}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 sm:py-28 md:py-36 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-[10px] sm:text-sm uppercase tracking-[0.3em] text-primary-foreground/60 mb-3 sm:mb-6 scroll-reveal" style={raleway}>
            Të interesuar?
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 sm:mb-8 scroll-reveal stagger-1" style={raleway}>
            Na Kontaktoni
          </h2>
          <p className="text-sm sm:text-lg text-primary-foreground/70 font-light max-w-lg mx-auto mb-6 sm:mb-12 scroll-reveal stagger-2" style={raleway}>
            Jemi të gatshëm t'ju ndihmojmë me porosi, çmime, dhe informacion shtesë për produktet tona.
          </p>
          <div className="scroll-reveal stagger-3">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 sm:gap-3 bg-background text-foreground px-8 sm:px-12 py-3.5 sm:py-5 rounded-full text-sm sm:text-base font-bold uppercase tracking-wider hover:scale-105 hover:shadow-2xl transition-all duration-300"
              style={raleway}
            >
              Na Kontakto
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;

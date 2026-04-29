import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import CatalogFlipbook from "@/components/CatalogFlipbook";
import { products } from "@/data/products";
import {
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Package,
  ShieldCheck,
  Truck,
  Headphones,
  SlidersHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import heroProductsBg from "@/assets/hero-products-bg.jpg";

/* ─── Category mapping ─── */
const categories = [
  { id: "all", label: "Të gjitha produktet", count: products.length },
  { id: "floor-care", label: "Kujdesi i Dyshemesë", slugs: ["shtupa", "fshesa", "kova", "detergjent-dyshemeje", "set-pastrimi"], count: 5 },
  { id: "surface-care", label: "Kujdesi i Sipërfaqeve", slugs: ["sfungjere", "peshqire-mikrofiber", "sprej-xhamash", "lecka-universale"], count: 4 },
  { id: "kitchen-care", label: "Kujdesi i Kuzhinës", slugs: ["sfungjere", "doreza", "leng-enesh"], count: 3 },
  { id: "waste-management", label: "Menaxhimi i Mbeturinave", slugs: ["qese"], count: 1 },
  { id: "lighting", label: "Ndriçimi", slugs: ["llamba"], count: 1 },
  { id: "protection", label: "Mbrojtja", slugs: ["doreza"], count: 1 },
  { id: "ambiance", label: "Ambienti", slugs: ["parfum-ambienti"], count: 1 },
];

/* ─── Filter definitions ─── */
const filterSections = [
  { id: "type", label: "Lloji i Produktit", options: ["Mjete Pastrimi", "Produkte Njëpërdorimshme", "Ndriçim", "Mbrojtje"] },
  { id: "industry", label: "Industria", options: ["Hoteleri", "Shëndetësi", "Retail", "Industrial"] },
  { id: "application", label: "Aplikimi", options: ["Dysheme", "Sipërfaqe", "Kuzhinë", "Banjë"] },
];



const ITEMS_PER_PAGE = 6;

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");
  const ref = useScrollReveal<HTMLElement>(0.15, [currentPage, activeCategory]);
  const navigate = useNavigate();

  const [expandedFilters, setExpandedFilters] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  /* Filter products by category */
  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    const cat = categories.find((c) => c.id === activeCategory);
    if (!cat || !("slugs" in cat)) return products;
    return products.filter((p) => (cat as any).slugs.includes(p.slug));
  }, [activeCategory]);

  /* Paginate */
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = useCallback((id: string) => {
    setActiveCategory(id);
    setCurrentPage(1);
  }, []);

  const toggleFilter = useCallback((id: string) => {
    setExpandedFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  const raleway = { fontFamily: "'Raleway', sans-serif" };

  /* ─── Trust pillars data ─── */
  const trustPillars = [
    { icon: Package, title: "Furnizim me Shumicë", desc: "Sasi të mëdha, çmime konkurruese për nevojat e biznesit" },
    { icon: ShieldCheck, title: "Cilësi Konsistente", desc: "Standarde rigoroze në çdo seri produktesh" },
    { icon: Truck, title: "Shërbim i Besueshëm", desc: "Dërgesë në kohë me mbështetje logjistike të dedikuar" },
    { icon: Headphones, title: "Mbështetje Eksperte", desc: "Menaxherë llogarie të dedikuar për biznesin tuaj" },
  ];

  /* ─── Sidebar content (reused for mobile drawer & desktop) ─── */
  const SidebarContent = () => (
    <>
      {/* Categories */}
      <div className="mb-8">
        <h3
          className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-4"
          style={raleway}
        >
          Kategoritë
        </h3>
        <div className="space-y-0.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between group ${
                activeCategory === cat.id
                  ? "bg-primary/8 text-primary border-l-[3px] border-primary"
                  : "text-foreground/70 hover:bg-secondary/60 hover:text-foreground border-l-[3px] border-transparent"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-xs font-normal px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat.id
                    ? "bg-primary/15 text-primary"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border/60 my-6" />

      {/* Filters */}
      <div className="mb-8">
        <h3
          className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-4"
          style={raleway}
        >
          Filtrat
        </h3>
        <div className="space-y-1">
          {filterSections.map((section) => (
            <div key={section.id}>
              <button
                onClick={() => toggleFilter(section.id)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-secondary/40"
              >
                <span>{section.label}</span>
                <ChevronDown
                  size={14}
                  className={`text-muted-foreground transition-transform duration-300 ${
                    expandedFilters.includes(section.id) ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  expandedFilters.includes(section.id) ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-3 pr-1 py-2 space-y-1">
                  {section.options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2.5 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors rounded-md hover:bg-secondary/30"
                    >
                      <div className="w-4 h-4 rounded border border-border/80 flex-shrink-0 hover:border-primary/50 transition-colors" />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );

  return (
    <main className="pt-14 sm:pt-16 md:pt-20 bg-background" ref={ref}>

      {/* ─── HERO HEADER ─── */}
      <section className="relative overflow-hidden border-b border-border/30">
        {/* Blurred background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroProductsBg}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-background/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 text-center">
            <div className="scroll-reveal">
              <p
                className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3"
                style={raleway}
              >
                Demalt Group
              </p>
              <h1
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tighter leading-[0.9]"
                style={raleway}
              >
                Produktet
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT: Sidebar + Grid ─── */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex gap-8 lg:gap-10">
            {/* ── Left Sidebar (Desktop) ── */}
            <div className="hidden lg:flex flex-col flex-shrink-0 sticky top-24 self-start">
              <button
                onClick={() => setSidebarOpen((v) => !v)}
                className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all duration-200 self-start"
              >
                {sidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
                {sidebarOpen ? "Fshih filtrat" : "Shfaq filtrat"}
              </button>
              <aside
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  sidebarOpen ? "w-64 xl:w-72 opacity-100" : "w-0 opacity-0"
                }`}
              >
                <div className="w-64 xl:w-72">
                  <SidebarContent />
                </div>
              </aside>
            </div>

            {/* ── Mobile filter toggle ── */}
            <div className="lg:hidden fixed bottom-6 right-6 z-40">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 bg-foreground text-background px-5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 text-sm font-semibold"
              >
                <SlidersHorizontal size={16} />
                Filtrat
              </button>
            </div>

            {/* ── Mobile Sidebar Drawer ── */}
            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div
                  className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
                  onClick={() => setMobileFiltersOpen(false)}
                />
                <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-background shadow-2xl overflow-y-auto animate-slide-in-left">
                  <div className="sticky top-0 bg-background z-10 flex items-center justify-between px-5 py-4 border-b border-border/30">
                    <h2 className="text-base font-bold text-foreground" style={raleway}>
                      Filtrat & Kategoritë
                    </h2>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="p-1.5 rounded-full hover:bg-secondary transition-colors"
                    >
                      <X size={18} className="text-muted-foreground" />
                    </button>
                  </div>
                  <div className="p-5">
                    <SidebarContent />
                  </div>
                </div>
              </div>
            )}

            {/* ── Main Product Grid Area ── */}
            <div className="flex-1 min-w-0">
              {/* Product count */}
              <div className="mb-4 sm:mb-8 scroll-reveal">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}
                  </span>{" "}
                  nga{" "}
                  <span className="font-medium text-foreground">{filteredProducts.length}</span>{" "}
                  produkte
                </p>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
                {paginatedProducts.map((product, i) => (
                  <article
                    key={product.slug}
                    className={`scroll-reveal stagger-${Math.min(i + 1, 6)} group bg-background border border-border/40 rounded-xl overflow-hidden hover:border-border/80 hover:shadow-lg transition-all duration-300 cursor-pointer`}
                    onClick={() => navigate(`/produktet/${product.slug}`)}
                  >
                    {/* Image */}
                    <div className="aspect-square sm:aspect-[4/3] bg-secondary/30 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </div>
                    {/* Content */}
                    <div className="p-3 sm:p-4 md:p-5">
                      <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-primary font-semibold mb-1">
                        {categories.find((c) =>
                          "slugs" in c && (c as any).slugs?.includes(product.slug)
                        )?.label || "Produkt"}
                      </p>
                      <h3
                        className="text-sm sm:text-base md:text-lg font-bold text-foreground mb-1 sm:mb-2 group-hover:text-foreground/90 transition-colors leading-tight"
                        style={raleway}
                      >
                        {product.name}
                      </h3>
                      <p className="hidden sm:block text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                        {product.tagline}
                      </p>
                      <span className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-300">
                        Shiko Detajet
                        <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 mt-8 sm:mt-14 scroll-reveal">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Para
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                        currentPage === page
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Pas
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="py-10 sm:py-14 bg-secondary/30 border-t border-border/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {trustPillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className={`scroll-reveal stagger-${i + 1} flex flex-col items-center text-center gap-3`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/8 flex items-center justify-center">
                  <pillar.icon size={20} className="text-primary sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-foreground mb-1" style={raleway}>
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REQUEST QUOTE CTA ─── */}
      <section className="py-12 sm:py-16 md:py-20 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <p
            className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-background/40 mb-3 sm:mb-4 scroll-reveal"
            style={raleway}
          >
            Gati për të porositur?
          </p>
          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-4 sm:mb-6 scroll-reveal stagger-1"
            style={raleway}
          >
            Kërko një Ofertë
          </h2>
          <p className="text-sm sm:text-base text-background/50 max-w-md mx-auto mb-6 sm:mb-8 scroll-reveal stagger-2">
            Merrni çmime konkurruese për porosi me shumicë. Ekipi ynë përgjigjet brenda 24 orësh.
          </p>
          <div className="scroll-reveal stagger-3">
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold tracking-wide hover:scale-105 hover:shadow-xl transition-all duration-300"
              style={raleway}
            >
              Kërko një Ofertë
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Catalog Flipbook (KEPT) ─── */}
      <section className="py-10 sm:py-20 md:py-28 bg-background border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-12 scroll-reveal">
            <p
              className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2 sm:mb-3"
              style={raleway}
            >
              Katalogu 2025
            </p>
            <h2
              className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tighter text-foreground"
              style={raleway}
            >
              Shfletoni <span className="text-primary italic font-light">Katalogun</span>
            </h2>
          </div>
          <div className="scroll-reveal stagger-2">
            <CatalogFlipbook />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Products;

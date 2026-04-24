import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import CatalogFlipbook from "@/components/CatalogFlipbook";
import { products } from "@/data/products";
import catBrooms from "@/assets/cat-brooms.png";
import catCloths from "@/assets/cat-cloths.png";
import catBucket from "@/assets/cat-bucket.png";
import catMops from "@/assets/cat-mops.png";
import catBags from "@/assets/cat-bags.png";
import catBulbs from "@/assets/cat-bulbs.png";
import catGloves from "@/assets/cat-gloves.png";
import catSponges from "@/assets/cat-sponges.png";

const sectionStyles = [
  {
    bg: "bg-background",
    cardBg: "bg-secondary",
    textColor: "text-foreground",
    descColor: "text-muted-foreground",
  },
  {
    bg: "bg-charcoal-light",
    cardBg: "bg-charcoal border border-background/10",
    textColor: "text-background",
    descColor: "text-background/60",
  },
  {
    bg: "bg-background",
    cardBg: "bg-secondary",
    textColor: "text-foreground",
    descColor: "text-muted-foreground",
  },
];

const productSections = [
  {
    title: "Sfungjerë",
    description:
      "Sfungjerë profesionale për pastrim të përditshëm dhe industrial. Nga sfungjerët klasike deri tek ato anti-gërvishtje, ofrojmë cilësi që zgjat.",
    images: [catSponges, catCloths, catBucket, catBulbs],
    layout: "text-left" as const,
  },
  {
    title: "Shtupa & Fshesa",
    description:
      "Shtupa dhe fshesa të qëndrueshme për çdo lloj dyshemeje. Pastrim efikas në çdo kënd me materialet tona profesionale.",
    images: [catMops, catBrooms, catBulbs, catSponges],
    layout: "text-center" as const,
  },
  {
    title: "Doreza & Qese",
    description:
      "Mbrojtje maksimale për duar dhe zgjidhje praktike për menaxhimin e mbeturinave. Produkte të forta dhe të qëndrueshme për çdo nevojë.",
    images: [catGloves, catBags, catCloths, catMops],
    layout: "text-left" as const,
  },
];

const Products = () => {
  const ref = useScrollReveal();
  const navigate = useNavigate();

  const handleCardClick = (imageIndex: number, sectionIndex: number) => {
    // Map section images back to product slugs
    const sectionToSlugs = [
      ["sfungjere", "peshqire-mikrofiber", "kova", "llamba"],
      ["shtupa", "fshesa", "llamba", "sfungjere"],
      ["doreza", "qese", "peshqire-mikrofiber", "shtupa"],
    ];
    const slug = sectionToSlugs[sectionIndex]?.[imageIndex];
    if (slug) navigate(`/produktet/${slug}`);
  };

  return (
    <main className="pt-16 sm:pt-20" ref={ref}>
      {/* Hero */}
      <section className="py-10 sm:py-20 md:py-28 bg-background text-center relative overflow-hidden">
        {/* Floating product PNGs — hidden on mobile for performance */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden sm:block">
          {[
            { src: catSponges, size: 90, top: "10%", left: "5%", delay: 0 },
            { src: catMops, size: 110, top: "20%", left: "85%", delay: -1.5 },
            { src: catGloves, size: 75, top: "60%", left: "8%", delay: -3 },
            { src: catBrooms, size: 100, top: "65%", left: "88%", delay: -2 },
            { src: catBucket, size: 65, top: "15%", left: "75%", delay: -4 },
            { src: catBags, size: 80, top: "70%", left: "20%", delay: -1 },
            { src: catBulbs, size: 55, top: "5%", left: "45%", delay: -2.5 },
            { src: catCloths, size: 70, top: "75%", left: "70%", delay: -3.5 },
          ].map((item, i) => (
            <img
              key={i}
              src={item.src}
              alt=""
              aria-hidden="true"
              className="absolute select-none opacity-[0.08] animate-[deco-float_8s_ease-in-out_infinite]"
              style={{
                width: item.size,
                height: item.size,
                objectFit: "contain",
                top: item.top,
                left: item.left,
                animationDelay: `${item.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 scroll-reveal relative z-10">
          <h1
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-foreground tracking-tight"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Produktet Tona
          </h1>
        </div>
      </section>

      {/* Category Sections */}
      {productSections.map((section, sIdx) => {
        const style = sectionStyles[sIdx];

        return (
          <section
            key={section.title}
            className={`py-8 sm:py-16 md:py-24 ${style.bg}`}
          >
            <div className="container mx-auto px-4">
              {/* Mobile: always single-column stacked layout */}
              <div className="block md:hidden">
                <div className="scroll-reveal mb-5">
                  <h2
                    className={`text-2xl font-extrabold ${style.textColor} tracking-tight mb-2`}
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    {section.title}
                  </h2>
                  <p className={`${style.descColor} text-sm leading-relaxed italic`}>
                    {section.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {section.images.slice(0, 4).map((img, iIdx) => (
                    <div key={iIdx} className={`scroll-reveal stagger-${iIdx + 1} cursor-pointer`} onClick={() => handleCardClick(iIdx, sIdx)}>
                      <div className={`aspect-[4/5] rounded-xl overflow-hidden ${style.cardBg} hover:shadow-lg transition-shadow duration-300`}>
                        <img
                          src={img}
                          alt={`${section.title} ${iIdx + 1}`}
                          className="w-full h-full object-contain p-3 hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop: original 5-column layouts */}
              <div className="hidden md:block">
                {section.layout === "text-center" ? (
                  <div className="grid grid-cols-5 gap-6 items-start">
                    <div className={`scroll-reveal stagger-${sIdx * 4 + 1} cursor-pointer`} onClick={() => handleCardClick(0, sIdx)}>
                      <div className={`aspect-[4/5] rounded-2xl overflow-hidden ${style.cardBg} hover:shadow-xl transition-shadow duration-300`}>
                        <img src={section.images[0]} alt={section.title} className="w-full h-full object-contain p-6 hover:scale-105 transition-transform duration-700" />
                      </div>
                    </div>
                    <div className={`scroll-reveal stagger-${sIdx * 4 + 2} cursor-pointer`} onClick={() => handleCardClick(1, sIdx)}>
                      <div className={`aspect-[4/5] rounded-2xl overflow-hidden ${style.cardBg} hover:shadow-xl transition-shadow duration-300`}>
                        <img src={section.images[1]} alt={section.title} className="w-full h-full object-contain p-6 hover:scale-105 transition-transform duration-700" />
                      </div>
                    </div>
                    <div className={`scroll-reveal stagger-${sIdx * 4 + 3} flex flex-col justify-center h-full py-8`}>
                      <h2 className={`text-3xl md:text-4xl font-extrabold ${style.textColor} tracking-tight mb-4`} style={{ fontFamily: "'Raleway', sans-serif" }}>
                        {section.title}
                      </h2>
                      <p className={`${style.descColor} text-sm md:text-base leading-relaxed italic`}>
                        {section.description}
                      </p>
                    </div>
                    <div className={`scroll-reveal stagger-${sIdx * 4 + 4} cursor-pointer`} onClick={() => handleCardClick(2, sIdx)}>
                      <div className={`aspect-[4/5] rounded-2xl overflow-hidden ${style.cardBg} hover:shadow-xl transition-shadow duration-300`}>
                        <img src={section.images[2]} alt={section.title} className="w-full h-full object-contain p-6 hover:scale-105 transition-transform duration-700" />
                      </div>
                    </div>
                    <div className={`scroll-reveal stagger-${sIdx * 4 + 5} cursor-pointer`} onClick={() => handleCardClick(3, sIdx)}>
                      <div className={`aspect-[4/5] rounded-2xl overflow-hidden ${style.cardBg} hover:shadow-xl transition-shadow duration-300`}>
                        <img src={section.images[3]} alt={section.title} className="w-full h-full object-contain p-6 hover:scale-105 transition-transform duration-700" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-5 gap-6 items-start">
                    <div className={`scroll-reveal stagger-${sIdx * 4 + 1} flex flex-col justify-center h-full py-8`}>
                      <h2 className={`text-3xl md:text-4xl font-extrabold ${style.textColor} tracking-tight mb-4`} style={{ fontFamily: "'Raleway', sans-serif" }}>
                        {section.title}
                      </h2>
                      <p className={`${style.descColor} text-sm md:text-base leading-relaxed italic`}>
                        {section.description}
                      </p>
                    </div>
                    {section.images.map((img, iIdx) => (
                      <div key={iIdx} className={`scroll-reveal stagger-${sIdx * 4 + iIdx + 2} cursor-pointer`} onClick={() => handleCardClick(iIdx, sIdx)}>
                        <div className={`aspect-[4/5] rounded-2xl overflow-hidden ${style.cardBg} hover:shadow-xl transition-shadow duration-300`}>
                          <img src={img} alt={`${section.title} ${iIdx + 1}`} className="w-full h-full object-contain p-6 hover:scale-105 transition-transform duration-700" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      {/* Catalog Flipbook */}
      <section className="py-10 sm:py-20 md:py-28 bg-background border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-12 scroll-reveal">
            <p
              className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2 sm:mb-3"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Katalogu 2025
            </p>
            <h2
              className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tighter text-foreground"
              style={{ fontFamily: "'Raleway', sans-serif" }}
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

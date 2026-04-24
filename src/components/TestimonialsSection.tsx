import { Star } from "lucide-react";

const testimonials = [
  [
    { text: "Demalt Group na ka furnizuar me produkte cilësore për më shumë se 10 vjet. Besueshmëria e tyre është e jashtëzakonshme.", author: "Arben K.", company: "SPAR Albania" },
    { text: "Produktet e pastrimit janë të shkëlqyera. Çmimet konkurruese dhe shërbimi i shpejtë na bëjnë të kthehemi gjithmonë.", author: "Fatmir H.", company: "Hotel Rogner" },
    { text: "Një partner i besueshëm që përmbush gjithmonë premtimet. Cilësia është gjithmonë e lartë dhe konstante.", author: "Dritan P.", company: "Big Market" },
    { text: "Furnizimi i rregullt dhe produktet cilësore e bëjnë Demalt partnerin tonë kryesor për produktet e pastrimit.", author: "Lindita S.", company: "Tirana Hotel" },
  ],
  [
    { text: "Produktet e pastrimit të Demalt janë zgjedhja jonë e parë. Cilësia dhe çmimi janë të shkëlqyera për biznesin tonë.", author: "Elira M.", company: "Metropol" },
    { text: "Shërbimi i klientit është i jashtëzakonshëm. Gjithmonë të gatshëm të ndihmojnë dhe të zgjidhin çdo problem shpejt.", author: "Besnik R.", company: "CONAD Albania" },
    { text: "Kemi provuar shumë furnizues, por Demalt mbetet zgjedhja jonë e parë për cilësinë dhe besueshmërinë e produkteve.", author: "Alma T.", company: "Elkos Group" },
    { text: "Gama e gjerë e produkteve na mundëson të gjejmë gjithçka që na nevojitet në një vend të vetëm.", author: "Genti B.", company: "SuperMarket ETC" },
  ],
  [
    { text: "Rekomandohet fuqishëm për çdo biznes në Shqipëri. Produktet janë të certifikuara dhe me standarde europiane.", author: "Vjollca D.", company: "Clinic Plus" },
    { text: "Demalt ofron vlera të jashtëzakonshme. Produktet e tyre industriale janë më të mirat në treg.", author: "Kushtrim L.", company: "Balfin Group" },
    { text: "Bashkëpunimi ynë me Demalt ka qenë gjithmonë i suksesshëm. Dorëzimet janë gjithmonë në kohë.", author: "Mirela Q.", company: "Mësonjëtorja" },
    { text: "Cilësia e produkteve dhe profesionalizmi i ekipit e bën Demalt partnerin ideal për biznesin tonë.", author: "Sokol V.", company: "City Park" },
  ],
];

const Stars = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={12} className="fill-primary text-primary sm:w-[14px] sm:h-[14px]" />
    ))}
  </div>
);

const TestimonialsSection = () => {
  return (
    <section className="py-12 sm:py-24 md:py-32 bg-secondary overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 lg:gap-20 items-start">
          {/* Left side - heading */}
          <div className="lg:sticky lg:top-32 text-center lg:text-left">
            <h2
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tighter"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              <span className="font-black text-foreground uppercase block">
                Disa komente
                <br />
                nga klientët
              </span>
              <span className="font-light italic text-primary block mt-1">
                tanë.
              </span>
            </h2>
          </div>

          {/* Right side - scrolling columns */}
          <div className="relative h-[350px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-b from-secondary to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-secondary to-transparent z-10 pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 h-full">
              {testimonials.map((column, colIdx) => (
                <div
                  key={colIdx}
                  className={`flex flex-col gap-3 sm:gap-4 ${colIdx === 1 ? "hidden sm:flex" : ""} ${colIdx === 2 ? "hidden md:flex" : ""}`}
                  style={{
                    animation: `testimonial-scroll-${colIdx % 2 === 0 ? "up" : "down"} ${28 + colIdx * 4}s linear infinite`,
                  }}
                >
                  {[...column, ...column, ...column].map((t, i) => (
                    <div
                      key={i}
                      className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-border/60 flex-shrink-0 hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                    >
                      <Stars />
                      <p
                        className="text-foreground/85 text-xs sm:text-sm leading-relaxed mt-2 sm:mt-3 mb-3 sm:mb-4 font-light"
                        style={{ fontFamily: "'Raleway', sans-serif" }}
                      >
                        {t.text}
                      </p>
                      <p
                        className="text-xs sm:text-sm font-bold text-foreground tracking-tight"
                        style={{ fontFamily: "'Raleway', sans-serif" }}
                      >
                        {t.author}{" "}
                        <span className="font-light italic text-muted-foreground">
                          — {t.company}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes testimonial-scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(-33.333%)); }
        }
        @keyframes testimonial-scroll-down {
          0% { transform: translateY(-33.333%); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;

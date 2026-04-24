import { Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logo-demalt.png";
import footerCleaning from "@/assets/footer-cleaning.png";
import { useLocation } from "react-router-dom";

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <footer className="bg-black text-background relative overflow-hidden">
      {/* Top: Social Media Icons */}
      <div className="container mx-auto px-4 pt-6 sm:pt-8 pb-4">
        <div className="flex items-center justify-center gap-4 sm:gap-5">
          {[
            { icon: Facebook, label: "Facebook", href: "#" },
            { icon: Instagram, label: "Instagram", href: "#" },
            { icon: TikTokIcon, label: "TikTok", href: "#" },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:text-primary hover:border-primary hover:scale-110 transition-all duration-300"
              aria-label={label}
            >
              <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
            </a>
          ))}
        </div>
      </div>

      {/* Middle: Content Row */}
      <div className="container mx-auto px-4 pb-0">
        <div className="h-px bg-background/10 mb-6 sm:mb-8" />
        {isHomePage ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <p className="text-background font-extrabold text-2xl sm:text-3xl md:text-4xl uppercase tracking-normal"
               style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Produkte
            </p>
            <p className="text-background/40 text-xs sm:text-sm tracking-wider text-center">
              Të drejtat e autorit © {currentYear} | DemaltGroup
            </p>
            <img src={logo} alt="Demalt Group" className="h-6 sm:h-8 w-auto opacity-90" />
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <img src={logo} alt="Demalt Group" className="h-6 sm:h-8 w-auto opacity-90" />
            <p className="text-background/30 text-xs tracking-wider text-center">
              © {currentYear} DemaltGroup. Të gjitha të drejtat e rezervuara.
            </p>
            <div className="text-right flex flex-col items-center sm:items-end gap-1">
              <p className="text-background/70 text-xs sm:text-sm tracking-wider">
                +355 69 123 4567
              </p>
              <p className="text-background/50 text-xs tracking-wider">
                Rruga e Kavajës, Tiranë, Shqipëri
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom: PASTRIMI text + PNG — only on home page */}
      {isHomePage ? (
        <div className="relative w-full mt-0">
          <div className="relative z-30 flex justify-center pointer-events-none select-none">
            <h2
              className="text-[15vw] sm:text-[18vw] md:text-[15vw] lg:text-[13vw] font-black uppercase tracking-normal text-background leading-none mb-[-5vw]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              PASTRIMI
            </h2>
          </div>

          <div className="relative z-20 flex justify-center">
            <div className="w-[90vw] sm:w-[85vw] md:w-[72vw] lg:w-[62vw]">
              <img
                src={footerCleaning}
                alt="Cleaning supplies"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="pb-6 sm:pb-8" />
      )}
    </footer>
  );
};

export default Footer;

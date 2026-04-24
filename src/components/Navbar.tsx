import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo-demalt.png";

const links = [
  { to: "/", label: "Kryefaqja" },
  { to: "/produktet", label: "Produktet" },
  { to: "/rreth-nesh", label: "Rreth Nesh" },
  { to: "/kontakt", label: "Kontakt" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolledPast, setScrolledPast] = useState(false);
  const location = useLocation();
  const isTransparentPage = location.pathname === "/rreth-nesh" || location.pathname.startsWith("/produktet/");

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolledPast(currentScrollY > 50);
      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleOpen = () => {
    setIsAnimating(true);
    setMenuOpen(true);
  };

  const handleClose = () => {
    setMenuOpen(false);
    setTimeout(() => setIsAnimating(false), 700);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${visible || menuOpen ? "translate-y-0" : "-translate-y-full"} ${isTransparentPage && !scrolledPast ? "bg-transparent" : "bg-background/40 backdrop-blur-md"}`}>
        <div className="container mx-auto px-3 sm:px-4 flex items-center justify-between h-14 sm:h-16 md:h-20">
          <button
            className="flex items-center gap-1.5 sm:gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-3 sm:px-5 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={handleOpen}
            aria-label="Menu"
          >
            <Menu size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span>Menu</span>
          </button>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <img src={logo} alt="Demalt Group" className="h-7 sm:h-10 md:h-12 w-auto" />
          </Link>

          <Link
            to="/kontakt"
            className="flex items-center gap-1.5 sm:gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-3 sm:px-5 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span className="hidden xs:inline">Kontakto</span>
            <span className="xs:hidden">Kontakt</span>
            <ArrowUpRight size={16} className="sm:w-[18px] sm:h-[18px]" />
          </Link>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      {(menuOpen || isAnimating) && (
        <div
          className={`fixed inset-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`absolute inset-0 bg-foreground/60 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleClose}
          />

          <div
            className={`absolute top-0 left-0 h-full w-full md:w-1/2 bg-background shadow-2xl flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
          >
            <div className="px-5 sm:px-8 md:px-12 flex items-center justify-end h-14 sm:h-20">
              <button
                onClick={handleClose}
                className="p-2 -mr-2 text-foreground/50 hover:text-primary active:text-primary transition-colors duration-300"
                aria-label="Close menu"
              >
                <X size={24} className="sm:w-8 sm:h-8" />
              </button>
            </div>

            <div className="px-5 sm:px-8 md:px-12">
              <div
                className={`h-px bg-foreground/10 transition-all duration-700 ease-out ${
                  menuOpen ? "w-full opacity-100" : "w-0 opacity-0"
                }`}
              />
            </div>

            <div className="px-5 sm:px-8 md:px-12 pt-8 sm:pt-12 md:pt-16 flex-1">
              <nav className="flex flex-col gap-1 sm:gap-2 md:gap-4">
                {links.map((link, i) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={handleClose}
                    className={`py-2 text-[1.75rem] sm:text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase transition-all duration-500 ease-out ${
                      location.pathname === link.to
                        ? "text-primary"
                        : "text-foreground/30 hover:text-primary active:text-primary"
                    }`}
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      transitionDelay: menuOpen ? `${150 + i * 80}ms` : "0ms",
                      opacity: menuOpen ? 1 : 0,
                      transform: menuOpen ? "translateX(0)" : "translateX(40px)",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="px-5 sm:px-8 md:px-12 pb-8 sm:pb-8">
              <div
                className={`h-px bg-foreground/10 mb-4 sm:mb-6 transition-all duration-700 delay-500 ease-out ${
                  menuOpen ? "w-full opacity-100" : "w-0 opacity-0"
                }`}
              />
              <div
                className="flex items-center justify-between transition-all duration-500 ease-out"
                style={{
                  transitionDelay: menuOpen ? "500ms" : "0ms",
                  opacity: menuOpen ? 1 : 0,
                }}
              >
                <p className="text-foreground/30 text-xs tracking-wider">
                  © {new Date().getFullYear()} DemaltGroup
                </p>
                <div className="flex items-center gap-4">
                  {["Facebook", "Instagram", "TikTok"].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="text-foreground/30 text-xs hover:text-primary active:text-primary transition-colors duration-300 py-1"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

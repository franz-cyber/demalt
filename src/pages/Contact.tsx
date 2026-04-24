import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const ref = useScrollReveal();
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({ title: "Mesazhi u dërgua!", description: "Do t'ju kontaktojmë sa më shpejt." });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <main className="pt-16 sm:pt-20" ref={ref}>
      {/* Hero */}
      <section className="py-10 sm:py-28 md:py-40 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="scroll-reveal">
            <span
              className="text-primary text-xs font-bold tracking-[0.3em] uppercase block mb-3 sm:mb-6"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Kontakt
            </span>
          </div>
          <h1
            className="scroll-reveal stagger-1 text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tighter leading-[0.95]"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Na{" "}
            <span className="text-primary italic font-light">shkruani</span>
          </h1>
          <p className="scroll-reveal stagger-2 text-muted-foreground text-sm sm:text-lg md:text-xl mt-4 sm:mt-8 max-w-xl leading-relaxed">
            Jemi këtu për çdo pyetje tuajën. Na kontaktoni dhe do t'ju
            përgjigjemi brenda 24 orëve.
          </p>
        </div>
      </section>

      {/* Contact details + Form */}
      <section className="pb-10 sm:pb-28 md:pb-40 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-28">
            {/* Left — Info */}
            <div>
              <div className="scroll-reveal stagger-1 mb-8 sm:mb-14">
                <span
                  className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground block mb-2"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  Adresa
                </span>
                <p
                  className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground leading-snug tracking-tight"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  Nuredin Aliu Ring Street,
                  <br />
                  <span className="font-light italic">Fier, Albania</span>
                </p>
              </div>

              <div className="scroll-reveal stagger-2 mb-8 sm:mb-14">
                <span
                  className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground block mb-2"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  Telefon
                </span>
                <a
                  href="tel:+355699133818"
                  className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground hover:text-primary active:text-primary transition-colors tracking-tight"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  +355 69 913 3818
                </a>
              </div>

              <div className="scroll-reveal stagger-3 mb-8 sm:mb-14">
                <span
                  className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground block mb-2"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  Email
                </span>
                <a
                  href="mailto:info@demaltgroup.al"
                  className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground hover:text-primary active:text-primary transition-colors tracking-tight break-all"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  info@demaltgroup.al
                </a>
              </div>

              <div className="scroll-reveal stagger-4">
                <span
                  className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground block mb-2"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  Orari i Punës
                </span>
                <p
                  className="text-base sm:text-xl md:text-2xl text-foreground tracking-tight"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  <span className="font-bold">E hënë — E premte</span>
                  <br />
                  <span className="font-light italic text-muted-foreground">
                    08:00 — 17:30
                  </span>
                </p>
              </div>
            </div>

            {/* Right — Form */}
            <div className="scroll-reveal stagger-2">
              <h2
                className="text-lg sm:text-2xl md:text-3xl font-black text-foreground tracking-tight mb-5 sm:mb-10"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Dërgoni{" "}
                <span className="font-light italic text-muted-foreground">
                  mesazh
                </span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div>
                  <label
                    className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground block mb-2"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    Emri i Plotë *
                  </label>
                  <input
                    required
                    placeholder="Emri Mbiemri"
                    className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none py-3 text-foreground text-base placeholder:text-muted-foreground/40 transition-colors"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground block mb-2"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="email@shembull.com"
                    className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none py-3 text-foreground text-base placeholder:text-muted-foreground/40 transition-colors"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground block mb-2"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    Telefon *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+355 6X XXX XXXX"
                    className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none py-3 text-foreground text-base placeholder:text-muted-foreground/40 transition-colors"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground block mb-2"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    Mesazhi *
                  </label>
                  <textarea
                    required
                    placeholder="Shkruani mesazhin tuaj këtu..."
                    rows={4}
                    className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none py-3 text-foreground text-base placeholder:text-muted-foreground/40 transition-colors resize-none"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="group inline-flex items-center gap-2 sm:gap-3 bg-foreground text-background px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground transition-all duration-300 disabled:opacity-50 mt-2"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {sending ? "Duke dërguar..." : "Dërgo Mesazhin"}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-300 sm:w-[18px] sm:h-[18px]"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="scroll-reveal">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.5!2d19.5565!3d40.7239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sFier%2C+Albania!5e0!3m2!1ssq!2sal!4v1"
          className="w-full h-[30vh] sm:h-[40vh] md:h-[50vh] grayscale hover:grayscale-0 transition-all duration-700"
          style={{ border: "none" }}
          loading="lazy"
          title="Demalt Group - Fier, Albania"
          allowFullScreen
        />
      </section>
    </main>
  );
};

export default Contact;

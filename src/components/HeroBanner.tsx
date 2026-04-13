import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBanner1 from "@/assets/hero-banner-1.jpg";
import heroBanner2 from "@/assets/hero-banner-2.jpg";
import heroBanner3 from "@/assets/hero-banner-3.jpg";

const slides = [
  {
    image: heroBanner1,
    title: "Ofertas Imperdíveis",
    subtitle: "Perfumes, celulares e eletrônicos com preço especial",
    cta: "Ver Ofertas",
    link: "/produtos?cat=Ofertas",
  },
  {
    image: heroBanner2,
    title: "Tecnologia & Estilo",
    subtitle: "Os melhores celulares e gadgets do mercado",
    cta: "Explorar",
    link: "/produtos?cat=Celulares",
  },
  {
    image: heroBanner3,
    title: "Fragrâncias Premium",
    subtitle: "As marcas mais desejadas com descontos exclusivos",
    cta: "Comprar Agora",
    link: "/produtos?cat=Perfumes",
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrent((p) => (p + 1) % slides.length);

  return (
    <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-primary">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
            width={1920}
            height={800}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
          <div className="absolute inset-0 flex items-end pb-12 sm:pb-16 md:pb-20">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="max-w-lg"
              >
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary-foreground font-display mb-2 md:mb-4">
                  {slides[current].title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-primary-foreground/80 mb-4 md:mb-6">
                  {slides[current].subtitle}
                </p>
                <Link
                  to={slides[current].link}
                  className="inline-block px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-full hover:opacity-90 transition-opacity text-sm md:text-base"
                >
                  {slides[current].cta}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-background/40 transition-colors">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-background/40 transition-colors">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-accent w-6" : "bg-primary-foreground/50"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;

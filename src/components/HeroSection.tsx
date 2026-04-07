import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-tv.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Premium electronics showroom"
          className="w-full h-full object-cover opacity-40"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-neon-blue text-sm font-semibold tracking-[0.3em] uppercase mb-6"
          >
            Collection Premium 2026
          </motion.p>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
            <span className="text-foreground">L'Électroménager</span>
            <br />
            <span className="neon-text">du Futur</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Découvrez notre sélection d'appareils haut de gamme conçus pour
            transformer votre quotidien avec style et performance.
          </p>

          <Link to="/catalogue">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn-neon neon-border inline-flex items-center gap-3 text-lg group"
            >
              Découvrir la collection
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "500+", label: "Produits" },
            { value: "24/7", label: "Support" },
            { value: "100%", label: "Garantie" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-2xl md:text-3xl font-bold neon-text">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

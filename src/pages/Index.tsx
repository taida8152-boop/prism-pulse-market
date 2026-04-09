import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import FlashSale from "@/components/FlashSale";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Truck, Headphones } from "lucide-react";

const features = [
  { icon: Truck, title: "Livraison Gratuite", desc: "Partout à Dakar" },
  { icon: Shield, title: "Garantie 1 An", desc: "Sur tous nos produits" },
  { icon: Headphones, title: "Support 24/7", desc: "À votre écoute" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <f.icon className="w-6 h-6 text-neon-blue" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <FlashSale />

      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Prêt à <span className="neon-text">transformer</span> votre intérieur ?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Explorez notre catalogue complet et trouvez l'appareil parfait.
            </p>
            <Link to="/catalogue">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn-neon inline-flex items-center gap-2"
              >
                Voir tout le catalogue
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;

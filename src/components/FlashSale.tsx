import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Timer } from "lucide-react";
import { useStore } from "@/store/useStore";
import ProductCard from "./ProductCard";

const FlashSale = () => {
  const { products } = useStore();
  const flashProducts = products.slice(0, 4);

  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4"
        >
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-neon-blue" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              <span className="glitch-text neon-text">Ventes Flash</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Timer className="w-5 h-5 text-neon-violet" />
            <div className="flex gap-2">
              {[
                { value: pad(timeLeft.hours), label: "H" },
                { value: pad(timeLeft.minutes), label: "M" },
                { value: pad(timeLeft.seconds), label: "S" },
              ].map((unit, i) => (
                <div key={i} className="glass-card px-3 py-2 text-center min-w-[60px]">
                  <span className="font-heading text-xl font-bold text-neon-cyan">
                    {unit.value}
                  </span>
                  <span className="text-muted-foreground text-xs ml-1">{unit.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {flashProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;

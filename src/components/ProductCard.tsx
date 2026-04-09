import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, GitCompare, X } from "lucide-react";
import { Product, formatPrice, WHATSAPP_NUMBERS } from "@/data/products";
import { useStore } from "@/store/useStore";

interface Props {
  product: Product;
}

const generateWhatsAppMsg = (product: Product) => {
  return encodeURIComponent(
    `Bonjour ! Je suis intéressé(e) par :\n\n` +
    `🛒 *${product.name}*\n` +
    `💰 Prix : ${formatPrice(product.price)}\n` +
    `🆔 Réf : ${product.id}\n\n` +
    `Merci de me confirmer la disponibilité.`
  );
};

const ProductCard = ({ product }: Props) => {
  const [showSpecs, setShowSpecs] = useState(false);
  const { compareList, addToCompare, removeFromCompare, incrementWhatsApp } = useStore();
  const isCompared = compareList.includes(product.id);

  const handleWhatsApp = (number: string) => {
    incrementWhatsApp(product.id);
    const msg = generateWhatsAppMsg(product);
    window.open(`https://wa.me/${number}?text=${msg}`, "_blank");
  };

  return (
    <motion.div
      layout
      className="glass-card-hover group relative"
      onMouseEnter={() => setShowSpecs(true)}
      onMouseLeave={() => setShowSpecs(false)}
    >

      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />

        <AnimatePresence>
          {showSpecs && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-0 left-0 right-0 p-4 glass-card rounded-none border-x-0 border-b-0"
            >
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(product.specs).slice(0, 4).map(([key, val]) => (
                  <div key={key} className="text-xs">
                    <span className="text-muted-foreground">{key}:</span>{" "}
                    <span className="text-foreground font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-5">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-end gap-2 mb-4">
          <span className="font-heading text-2xl font-bold neon-text">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-muted-foreground text-sm line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          {WHATSAPP_NUMBERS.map((num, idx) => (
            <motion.button
              key={num}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleWhatsApp(num)}
              className="btn-neon flex-1 flex items-center justify-center gap-1.5 text-xs py-2.5"
            >
              <MessageCircle className="w-4 h-4" />
              Ligne {idx + 1}
            </motion.button>
          ))}
        </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              isCompared
                ? removeFromCompare(product.id)
                : addToCompare(product.id)
            }
            className={`p-2.5 rounded-xl border transition-all ${
              isCompared
                ? "bg-neon-blue/20 border-neon-blue/50 text-neon-blue"
                : "border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
            }`}
            title={isCompared ? "Retirer de la comparaison" : "Comparer"}
          >
            {isCompared ? <X className="w-4 h-4" /> : <GitCompare className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

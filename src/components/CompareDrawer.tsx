import { motion, AnimatePresence } from "framer-motion";
import { X, GitCompare } from "lucide-react";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/data/products";

const CompareDrawer = () => {
  const { products, compareList, clearCompare } = useStore();
  const items = compareList.map((id) => products.find((p) => p.id === id)!).filter(Boolean);

  if (items.length < 2) return null;

  const allKeys = [...new Set(items.flatMap((p) => Object.keys(p.specs)))];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25 }}
        className="fixed bottom-0 left-0 right-0 z-50 glass-card rounded-b-none max-h-[60vh] overflow-auto"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-neon-blue" />
              <h3 className="font-heading text-lg font-bold text-foreground">
                Comparaison
              </h3>
            </div>
            <button onClick={clearCompare} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-muted-foreground font-medium">Caractéristique</th>
                  {items.map((item) => (
                    <th key={item.id} className="p-3 text-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mx-auto mb-2" />
                      <p className="font-heading font-semibold text-foreground">{item.name}</p>
                      <p className="neon-text font-bold mt-1">{formatPrice(item.price)}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allKeys.map((key) => (
                  <tr key={key} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="p-3 text-muted-foreground">{key}</td>
                    {items.map((item) => (
                      <td key={item.id} className="p-3 text-center text-foreground font-medium">
                        {item.specs[key] || "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompareDrawer;

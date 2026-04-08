import { motion } from "framer-motion";
import { Tv, WashingMachine, CookingPot, LayoutGrid, AirVent, Snowflake } from "lucide-react";
import { useStore } from "@/store/useStore";
import { categoryLabels } from "@/data/products";

const categories = [
  { key: "all", label: "Tous", icon: LayoutGrid },
  { key: "image-son", label: categoryLabels["image-son"], icon: Tv },
  { key: "climatisation", label: categoryLabels["climatisation"], icon: AirVent },
  { key: "froid", label: categoryLabels["froid"], icon: Snowflake },
  { key: "lavage", label: categoryLabels["lavage"], icon: WashingMachine },
  { key: "cuisine", label: categoryLabels["cuisine"], icon: CookingPot },
];

const CategoryFilter = () => {
  const { activeCategory, setActiveCategory } = useStore();

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.key;
        return (
          <motion.button
            key={cat.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(cat.key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              isActive
                ? "btn-neon"
                : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/30"
            }`}
          >
            <cat.icon className="w-4 h-4" />
            {cat.label}
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;

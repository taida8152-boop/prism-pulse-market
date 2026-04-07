import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import CompareDrawer from "@/components/CompareDrawer";
import { useMemo } from "react";

const Catalogue = () => {
  const { products, searchQuery, activeCategory } = useStore();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, searchQuery, activeCategory]);

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2">
            Notre <span className="neon-text">Catalogue</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
          </p>
          <CategoryFilter />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Aucun produit trouvé.</p>
          </div>
        )}
      </div>
      <CompareDrawer />
    </div>
  );
};

export default Catalogue;

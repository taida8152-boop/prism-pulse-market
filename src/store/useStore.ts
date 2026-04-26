import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, initialProducts } from "@/data/products";

interface StoreState {
  products: Product[];
  compareList: string[];
  searchQuery: string;
  activeCategory: string;
  isAdmin: boolean;
  setSearchQuery: (q: string) => void;
  setActiveCategory: (cat: string) => void;
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  incrementWhatsApp: (id: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProducts: () => void;
  loginAdmin: () => void;
  logoutAdmin: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      products: initialProducts,
      compareList: [],
      searchQuery: "",
      activeCategory: "all",
      isAdmin: false,
      setSearchQuery: (q) => set({ searchQuery: q }),
      setActiveCategory: (cat) => set({ activeCategory: cat }),
      addToCompare: (id) =>
        set((s) => ({
          compareList: s.compareList.length < 2 ? [...s.compareList, id] : s.compareList,
        })),
      removeFromCompare: (id) =>
        set((s) => ({ compareList: s.compareList.filter((i) => i !== id) })),
      clearCompare: () => set({ compareList: [] }),
      incrementWhatsApp: (id) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id ? { ...p, whatsappClicks: p.whatsappClicks + 1 } : p
          ),
        })),
      addProduct: (product) =>
        set((s) => ({ products: [...s.products, product] })),
      updateProduct: (id, updates) =>
        set((s) => ({
          products: s.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),
      deleteProduct: (id) =>
        set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
      resetProducts: () => set({ products: initialProducts }),
      loginAdmin: () => set({ isAdmin: true }),
      logoutAdmin: () => set({ isAdmin: false }),
    }),
    {
      name: "electropremium-store-v2",
      partialize: (state) => ({
        products: state.products,
        isAdmin: state.isAdmin,
      }),
    }
  )
);

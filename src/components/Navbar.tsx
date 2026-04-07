import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, BarChart3, Zap } from "lucide-react";
import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useStore();

  const links = [
    { to: "/", label: "Accueil", icon: Zap },
    { to: "/catalogue", label: "Catalogue", icon: ShoppingBag },
    { to: "/admin", label: "Admin", icon: BarChart3 },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-t-0 border-x-0 rounded-none"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-neon-blue" />
          <span className="font-heading text-xl font-bold neon-text">
            ElectroPremium
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher..."
            className="bg-muted/50 border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 w-48 transition-all"
          />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, LogOut, Plus, Trash2, Edit2, MessageCircle, Save, X } from "lucide-react";
import { useStore } from "@/store/useStore";
import { formatPrice, type Product, type Category } from "@/data/products";

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === "admin2026") {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 w-full max-w-sm"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="w-7 h-7 text-neon-blue" />
          </div>
        </div>
        <h2 className="font-heading text-2xl font-bold text-center text-foreground mb-2">
          Espace Admin
        </h2>
        <p className="text-muted-foreground text-sm text-center mb-6">
          Mot de passe : admin2026
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={pass}
            onChange={(e) => { setPass(e.target.value); setError(false); }}
            placeholder="Mot de passe"
            className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
          />
          {error && <p className="text-destructive text-sm">Mot de passe incorrect</p>}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn-neon w-full py-3"
          >
            Connexion
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

const AdminDashboard = () => {
  const { products, deleteProduct, addProduct, updateProduct, logoutAdmin } = useStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", category: "image-son" as Category, description: "" });

  const totalClicks = products.reduce((sum, p) => sum + p.whatsappClicks, 0);

  const handleAdd = () => {
    if (!form.name || !form.price) return;
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: form.name,
      price: Number(form.price),
      image: products[0]?.image || "",
      category: form.category,
      description: form.description,
      specs: {},
      whatsappClicks: 0,
    };
    addProduct(newProduct);
    setForm({ name: "", price: "", category: "image-son", description: "" });
    setShowAdd(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Dashboard Admin</h1>
            <p className="text-muted-foreground">Gérez vos produits et suivez les performances</p>
          </div>
          <button onClick={logoutAdmin} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Produits", value: products.length, color: "text-neon-blue" },
            { label: "Clics WhatsApp", value: totalClicks, color: "text-neon-violet" },
            { label: "Taux de conversion", value: "—", color: "text-neon-cyan" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-5">
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className={`font-heading text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-bold text-foreground">Produits</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowAdd(!showAdd)}
            className="btn-neon flex items-center gap-2 text-sm py-2"
          >
            {showAdd ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showAdd ? "Annuler" : "Ajouter"}
          </motion.button>
        </div>

        {showAdd && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 mb-6 space-y-3">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nom du produit" className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
            <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Prix (DA)" type="number" className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })} className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary/50">
              <option value="image-son">Image & Son</option>
              <option value="lavage">Lavage</option>
              <option value="cuisine">Cuisine</option>
            </select>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 resize-none h-20" />
            <button onClick={handleAdd} className="btn-neon flex items-center gap-2 text-sm py-2">
              <Save className="w-4 h-4" /> Enregistrer
            </button>
          </motion.div>
        )}

        <div className="space-y-3">
          {products.map((product) => (
            <motion.div key={product.id} layout className="glass-card p-4 flex items-center gap-4">
              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                {editingId === product.id ? (
                  <input
                    defaultValue={product.name}
                    onBlur={(e) => { updateProduct(product.id, { name: e.target.value }); setEditingId(null); }}
                    autoFocus
                    className="bg-muted/50 border border-border rounded px-2 py-1 text-foreground text-sm w-full"
                  />
                ) : (
                  <p className="font-heading font-semibold text-foreground truncate">{product.name}</p>
                )}
                <p className="text-sm neon-text font-bold">{formatPrice(product.price)}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
                <MessageCircle className="w-4 h-4" />
                <span>{product.whatsappClicks}</span>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => setEditingId(product.id)} className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => deleteProduct(product.id)} className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const { isAdmin, loginAdmin } = useStore();
  return isAdmin ? <AdminDashboard /> : <AdminLogin onLogin={loginAdmin} />;
};

export default Admin;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogOut, Plus, Trash2, Edit2, MessageCircle, Save, X, RotateCcw } from "lucide-react";
import { useStore } from "@/store/useStore";
import { formatPrice, type Product, type Category, categoryLabels } from "@/data/products";

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
          Entrez le mot de passe administrateur
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

interface EditForm {
  name: string;
  price: string;
  oldPrice: string;
  category: Category;
  description: string;
}

const AdminDashboard = () => {
  const { products, deleteProduct, addProduct, updateProduct, logoutAdmin, resetProducts } = useStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({ name: "", price: "", oldPrice: "", category: "image-son", description: "" });
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState<EditForm>({ name: "", price: "", oldPrice: "", category: "image-son", description: "" });

  const totalClicks = products.reduce((sum, p) => sum + p.whatsappClicks, 0);

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      price: String(product.price),
      oldPrice: product.oldPrice ? String(product.oldPrice) : "",
      category: product.category,
      description: product.description,
    });
    setShowAdd(false);
  };

  const saveEdit = () => {
    if (!editingId || !editForm.name || !editForm.price) return;
    updateProduct(editingId, {
      name: editForm.name,
      price: Number(editForm.price),
      oldPrice: editForm.oldPrice ? Number(editForm.oldPrice) : undefined,
      category: editForm.category,
      description: editForm.description,
    });
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleAdd = () => {
    if (!addForm.name || !addForm.price) return;
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: addForm.name,
      price: Number(addForm.price),
      oldPrice: addForm.oldPrice ? Number(addForm.oldPrice) : undefined,
      image: products[0]?.image || "",
      category: addForm.category,
      description: addForm.description,
      specs: {},
      whatsappClicks: 0,
    };
    addProduct(newProduct);
    setAddForm({ name: "", price: "", oldPrice: "", category: "image-son", description: "" });
    setShowAdd(false);
  };

  const inputClass = "w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm";

  const renderForm = (form: EditForm, setForm: (f: EditForm) => void, onSave: () => void, onCancel: () => void) => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="glass-card p-5 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nom du produit"
            className={inputClass}
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
            className={inputClass}
          >
            {Object.entries(categoryLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="Prix (FCFA)"
            type="number"
            className={inputClass}
          />
          <input
            value={form.oldPrice}
            onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
            placeholder="Ancien prix (optionnel)"
            type="number"
            className={inputClass}
          />
        </div>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description du produit"
          className={`${inputClass} resize-none h-20`}
        />
        <div className="flex gap-2">
          <button onClick={onSave} className="btn-neon flex items-center gap-2 text-sm py-2.5 px-5">
            <Save className="w-4 h-4" /> Enregistrer
          </button>
          <button onClick={onCancel} className="flex items-center gap-2 text-sm py-2.5 px-5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
            <X className="w-4 h-4" /> Annuler
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Dashboard Admin</h1>
            <p className="text-muted-foreground">Gérez vos produits et suivez les performances</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { if (confirm("Réinitialiser tous les produits aux valeurs d'origine ?")) resetProducts(); }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Réinitialiser
            </button>
            <button onClick={logoutAdmin} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </div>
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
            onClick={() => { setShowAdd(!showAdd); setEditingId(null); }}
            className="btn-neon flex items-center gap-2 text-sm py-2"
          >
            {showAdd ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showAdd ? "Annuler" : "Ajouter"}
          </motion.button>
        </div>

        <AnimatePresence>
          {showAdd && (
            <div className="mb-6">
              {renderForm(addForm, setAddForm, handleAdd, () => setShowAdd(false))}
            </div>
          )}
        </AnimatePresence>

        <div className="space-y-3">
          {products.map((product) => (
            <div key={product.id}>
              <motion.div layout className="glass-card p-4 flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-semibold text-foreground truncate">{product.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm neon-text font-bold">{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                      <span className="text-xs text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{categoryLabels[product.category]}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
                  <MessageCircle className="w-4 h-4" />
                  <span>{product.whatsappClicks}</span>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => editingId === product.id ? cancelEdit() : startEdit(product)}
                    className={`p-2 rounded-lg transition-colors ${
                      editingId === product.id
                        ? "bg-primary/20 text-primary"
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {editingId === product.id ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => { if (confirm("Supprimer ce produit ?")) deleteProduct(product.id); }}
                    className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              <AnimatePresence>
                {editingId === product.id && (
                  <div className="mt-2">
                    {renderForm(editForm, setEditForm, saveEdit, cancelEdit)}
                  </div>
                )}
              </AnimatePresence>
            </div>
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

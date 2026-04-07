import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, X, ArrowRight, RotateCcw } from "lucide-react";
import { useStore } from "@/store/useStore";

const questions = [
  {
    question: "Quel type de produit recherchez-vous ?",
    options: [
      { label: "TV / Son", category: "image-son" },
      { label: "Lavage", category: "lavage" },
      { label: "Cuisine", category: "cuisine" },
    ],
  },
];

const GuideBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const { setActiveCategory } = useStore();

  const handleSelect = (category: string) => {
    setActiveCategory(category);
    setResult(category);
    setStep(1);
  };

  const reset = () => {
    setStep(0);
    setResult(null);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full btn-neon flex items-center justify-center neon-glow"
      >
        {isOpen ? <X className="w-6 h-6" /> : <HelpCircle className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 glass-card p-5"
          >
            <h3 className="font-heading text-lg font-bold text-foreground mb-1">
              Aidez-moi à choisir
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Répondez à quelques questions pour trouver le produit idéal.
            </p>

            {step === 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground mb-3">
                  {questions[0].question}
                </p>
                {questions[0].options.map((opt) => (
                  <motion.button
                    key={opt.category}
                    whileHover={{ x: 4 }}
                    onClick={() => handleSelect(opt.category)}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/40 transition-all text-sm text-foreground"
                  >
                    {opt.label}
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </motion.button>
                ))}
              </div>
            )}

            {step === 1 && result && (
              <div className="text-center">
                <p className="text-sm text-foreground mb-4">
                  Parfait ! Nous avons filtré les produits pour vous. 🎉
                </p>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 mx-auto text-sm text-primary hover:underline"
                >
                  <RotateCcw className="w-4 h-4" />
                  Recommencer
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GuideBot;

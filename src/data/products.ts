import productTv from "@/assets/product-tv.jpg";
import productWasher from "@/assets/product-washer.jpg";
import productOven from "@/assets/product-oven.jpg";
import productMicrowave from "@/assets/product-microwave.jpg";
import productDishwasher from "@/assets/product-dishwasher.jpg";

export type Category = "image-son" | "lavage" | "cuisine";

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: Category;
  description: string;
  specs: Record<string, string>;
  isFlashSale?: boolean;
  whatsappClicks: number;
}

export const categoryLabels: Record<Category, string> = {
  "image-son": "Image & Son",
  lavage: "Lavage",
  cuisine: "Cuisine",
};

export const initialProducts: Product[] = [
  {
    id: "tv-oled-65",
    name: 'Smart TV OLED 65"',
    price: 1299000,
    oldPrice: 1599000,
    image: productTv,
    category: "image-son",
    description: "Écran OLED 4K UHD avec HDR10+, Dolby Vision et son surround intégré. Processeur IA pour une image toujours parfaite.",
    specs: { "Taille": '65"', "Résolution": "4K UHD", "HDR": "HDR10+ / Dolby Vision", "Smart TV": "Oui", "Connectivité": "WiFi 6, Bluetooth 5.2", "Ports HDMI": "4" },
    isFlashSale: true,
    whatsappClicks: 24,
  },
  {
    id: "lave-linge-12kg",
    name: "Lave-linge Intelligent 12kg",
    price: 549000,
    image: productWasher,
    category: "lavage",
    description: "Machine à laver connectée avec dosage automatique, moteur inverter silencieux et programme vapeur anti-allergies.",
    specs: { "Capacité": "12 kg", "Essorage": "1400 tr/min", "Classe": "A+++", "Programmes": "16", "Moteur": "Inverter", "Bruit": "47 dB" },
    whatsappClicks: 18,
  },
  {
    id: "four-pyrolyse",
    name: "Four Encastrable Pyrolyse",
    price: 459000,
    oldPrice: 529000,
    image: productOven,
    category: "cuisine",
    description: "Four multifonction 72L avec nettoyage pyrolyse, cuisson vapeur et écran tactile intuitif.",
    specs: { "Capacité": "72L", "Nettoyage": "Pyrolyse", "Fonctions": "12", "Classe": "A+", "Vapeur": "Oui", "Minuterie": "Programmable" },
    isFlashSale: true,
    whatsappClicks: 15,
  },
  {
    id: "micro-ondes-grill",
    name: "Micro-ondes Grill Combiné",
    price: 189000,
    image: productMicrowave,
    category: "cuisine",
    description: "Micro-ondes 30L avec fonction grill et convection. Interface tactile et programmes automatiques.",
    specs: { "Capacité": "30L", "Puissance": "1000W", "Grill": "Oui", "Programmes": "10", "Plateau": "34cm", "Classe": "A+" },
    whatsappClicks: 12,
  },
  {
    id: "lave-vaisselle-14",
    name: "Lave-vaisselle Silence Plus",
    price: 399000,
    oldPrice: 479000,
    image: productDishwasher,
    category: "lavage",
    description: "Lave-vaisselle ultra silencieux 14 couverts avec tiroir à couverts, séchage par zéolite et connexion WiFi.",
    specs: { "Couverts": "14", "Bruit": "42 dB", "Programmes": "8", "Classe": "A+++", "Séchage": "Zéolite", "WiFi": "Oui" },
    whatsappClicks: 9,
  },
];

export const WHATSAPP_NUMBER = "212600000000";

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-MA", { style: "decimal" }).format(price) + " DA";
}

export function generateWhatsAppLink(product: Product): string {
  const message = encodeURIComponent(
    `Bonjour ! Je suis intéressé(e) par :\n\n` +
    `🛒 *${product.name}*\n` +
    `💰 Prix : ${formatPrice(product.price)}\n` +
    `🆔 Réf : ${product.id}\n\n` +
    `Merci de me confirmer la disponibilité.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

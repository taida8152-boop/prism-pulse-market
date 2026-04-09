import productTv from "@/assets/product-tv.jpg";
import productWasher from "@/assets/product-washer.jpg";
import productOven from "@/assets/product-oven.jpg";
import productMicrowave from "@/assets/product-microwave.jpg";
import productDishwasher from "@/assets/product-dishwasher.jpg";
import productClimatiseur from "@/assets/product-climatiseur.png";
import productTvSamsung from "@/assets/product-tv-samsung.png";
import productTvAndroid from "@/assets/product-tv-android.png";
import productTv75 from "@/assets/product-tv-75.png";
import productTv98 from "@/assets/product-tv-98.png";
import productTv32 from "@/assets/product-tv-32.png";
import productRefrigerateur from "@/assets/product-refrigerateur.png";

export type Category = "image-son" | "lavage" | "cuisine" | "climatisation" | "froid";

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
  climatisation: "Climatisation",
  froid: "Froid",
};

export const initialProducts: Product[] = [
  {
    id: "tv-oled-65",
    name: 'Smart TV OLED 65"',
    price: 450000,
    oldPrice: 520000,
    image: productTv,
    category: "image-son",
    description: "Écran OLED 4K UHD avec HDR10+, Dolby Vision et son surround intégré. Processeur IA pour une image toujours parfaite.",
    specs: { "Taille": '65"', "Résolution": "4K UHD", "HDR": "HDR10+ / Dolby Vision", "Smart TV": "Oui", "Connectivité": "WiFi 6, Bluetooth 5.2", "Ports HDMI": "4" },
    whatsappClicks: 24,
  },
  {
    id: "climatiseur-astech",
    name: "Climatiseur ASTECH Inverter",
    price: 185000,
    oldPrice: 220000,
    image: productClimatiseur,
    category: "climatisation",
    description: "Climatiseur split ASTECH avec technologie Inverter, tube 100% cuivre CertiTube, connectivité WiFi et télécommande intelligente.",
    specs: { "Type": "Split", "Technologie": "Inverter", "Tube": "100% Cuivre", "WiFi": "Oui", "Classe": "A++", "Garantie": "12 mois" },
    whatsappClicks: 31,
  },
  {
    id: "tv-samsung-crystal",
    name: "TV Samsung Crystal UHD",
    price: 320000,
    image: productTvSamsung,
    category: "image-son",
    description: "Téléviseur Samsung Crystal UHD avec des couleurs vibrantes et un design ultra-fin. Processeur Crystal 4K pour une qualité d'image exceptionnelle.",
    specs: { "Taille": '55"', "Résolution": "4K UHD", "Processeur": "Crystal 4K", "HDR": "HDR10+", "Smart TV": "Tizen", "Ports HDMI": "3" },
    whatsappClicks: 19,
  },
  {
    id: "tv-android-43",
    name: 'Smart TV Android 43"',
    price: 155000,
    image: productTvAndroid,
    category: "image-son",
    description: "Smart TV sous Android TV avec accès à Netflix, YouTube, Spotify et toutes vos applications préférées. Chromecast intégré.",
    specs: { "Taille": '43"', "Résolution": "Full HD", "Système": "Android TV", "Chromecast": "Intégré", "WiFi": "Oui", "Ports HDMI": "3" },
    whatsappClicks: 14,
  },
  {
    id: "tv-android-75",
    name: 'TV Android 75" 4K',
    price: 580000,
    oldPrice: 650000,
    image: productTv75,
    category: "image-son",
    description: "Grand écran 75 pouces Android TV 4K avec Google Assistant, Chromecast intégré, WiFi 2.4G/5G et Bluetooth 5.0.",
    specs: { "Taille": '75"', "Résolution": "4K UHD", "Système": "Android TV", "Google Assistant": "Oui", "WiFi": "2.4G/5G", "Bluetooth": "5.0" },
    whatsappClicks: 22,
  },
  {
    id: "tv-google-98",
    name: 'TV Google TV 98"',
    price: 1250000,
    image: productTv98,
    category: "image-son",
    description: "Écran géant 98 pouces avec Google TV intégré. Une expérience cinéma immersive directement chez vous.",
    specs: { "Taille": '98"', "Résolution": "4K UHD", "Système": "Google TV", "HDR": "Dolby Vision", "Son": "Dolby Atmos", "Ports HDMI": "4" },
    whatsappClicks: 8,
  },
  {
    id: "tv-astech-32",
    name: 'TV ASTECH Android 32"',
    price: 85000,
    image: productTv32,
    category: "image-son",
    description: "TV ASTECH 32 pouces Android TV AG220A avec Google Assistant, Chromecast intégré, 2 télécommandes et 12 mois de garantie.",
    specs: { "Taille": '32"', "Résolution": "HD Ready", "Système": "Android TV", "Chromecast": "Intégré", "Télécommandes": "2x", "Garantie": "12 mois" },
    whatsappClicks: 27,
  },
  {
    id: "refrigerateur-combine",
    name: "Réfrigérateur Combiné Inox",
    price: 165000,
    oldPrice: 195000,
    image: productRefrigerateur,
    category: "froid",
    description: "Réfrigérateur combiné en inox avec grande capacité de rangement, compartiment congélateur en bas et éclairage LED intérieur.",
    specs: { "Type": "Combiné", "Finition": "Inox", "Classe": "A+", "Congélateur": "En bas", "Éclairage": "LED", "Garantie": "12 mois" },
    whatsappClicks: 16,
  },
  {
    id: "lave-linge-12kg",
    name: "Lave-linge Intelligent 12kg",
    price: 175000,
    image: productWasher,
    category: "lavage",
    description: "Machine à laver connectée avec dosage automatique, moteur inverter silencieux et programme vapeur anti-allergies.",
    specs: { "Capacité": "12 kg", "Essorage": "1400 tr/min", "Classe": "A+++", "Programmes": "16", "Moteur": "Inverter", "Bruit": "47 dB" },
    whatsappClicks: 18,
  },
  {
    id: "four-pyrolyse",
    name: "Four Encastrable Pyrolyse",
    price: 145000,
    oldPrice: 175000,
    image: productOven,
    category: "cuisine",
    description: "Four multifonction 72L avec nettoyage pyrolyse, cuisson vapeur et écran tactile intuitif.",
    specs: { "Capacité": "72L", "Nettoyage": "Pyrolyse", "Fonctions": "12", "Classe": "A+", "Vapeur": "Oui", "Minuterie": "Programmable" },
    whatsappClicks: 15,
  },
  {
    id: "micro-ondes-grill",
    name: "Micro-ondes Grill Combiné",
    price: 55000,
    image: productMicrowave,
    category: "cuisine",
    description: "Micro-ondes 30L avec fonction grill et convection. Interface tactile et programmes automatiques.",
    specs: { "Capacité": "30L", "Puissance": "1000W", "Grill": "Oui", "Programmes": "10", "Plateau": "34cm", "Classe": "A+" },
    whatsappClicks: 12,
  },
  {
    id: "lave-vaisselle-14",
    name: "Lave-vaisselle Silence Plus",
    price: 125000,
    oldPrice: 150000,
    image: productDishwasher,
    category: "lavage",
    description: "Lave-vaisselle ultra silencieux 14 couverts avec tiroir à couverts, séchage par zéolite et connexion WiFi.",
    specs: { "Couverts": "14", "Bruit": "42 dB", "Programmes": "8", "Classe": "A+++", "Séchage": "Zéolite", "WiFi": "Oui" },
    whatsappClicks: 9,
  },
];

export const WHATSAPP_NUMBERS = ["221776652675", "221776307770"];
export const WHATSAPP_NUMBER = WHATSAPP_NUMBERS[0];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "decimal" }).format(price) + " FCFA";
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

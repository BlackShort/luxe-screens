import type { AddOn } from "@/types";
import { Cake, CupSoda, Gift, Monitor, Sparkles, Utensils } from "lucide-react";

export const addOns: AddOn[] = [
  {
    id: "addon-cake",
    category: "CAKE",
    label: "Cake",
    icon: Cake,
    options: [
      { name: "Chocolate Truffle (1kg)", price: 899 },
      { name: "Red Velvet (1kg)", price: 999 },
      { name: "Black Forest (1kg)", price: 849 },
      { name: "Vegan Vanilla (1kg)", price: 1099 },
    ],
  },
  {
    id: "addon-decoration",
    category: "DECORATION",
    label: "Decoration",
    icon: Sparkles,
    options: [
      { name: "Balloon Arch", price: 799 },
      { name: "Fairy Light Backdrop", price: 999 },
      { name: "LED Marquee Letters", price: 1299 },
      { name: "Rose Petal Trail", price: 599 },
    ],
  },
  {
    id: "addon-gifts",
    category: "GIFT",
    label: "Gifts",
    icon: Gift,
    options: [
      { name: "Photo Frame Bundle", price: 649 },
      { name: "Scented Candle Set", price: 549 },
      { name: "Personalized Mug", price: 399 },
      { name: "Teddy Bear (Large)", price: 899 },
    ],
  },
  {
    id: "addon-food",
    category: "FOOD",
    label: "Food",
    icon: Utensils,
    options: [
      { name: "Popcorn Bucket Duo", price: 449 },
      { name: "Nachos Platter", price: 549 },
      { name: "Loaded Fries", price: 399 },
      { name: "Sandwich Combo", price: 599 },
    ],
  },
  {
    id: "addon-drinks",
    category: "DRINK",
    label: "Drinks",
    icon: CupSoda,
    options: [
      { name: "Mocktail Pitcher", price: 699 },
      { name: "Soft Drinks (4 cans)", price: 249 },
      { name: "Cold Coffee Duo", price: 399 },
      { name: "Fresh Juice Pitcher", price: 549 },
    ],
  },
  {
    id: "addon-projector",
    category: "PROJECTOR",
    label: "Projector Add-ons",
    icon: Monitor,
    options: [
      { name: "HDMI Streaming Remote", price: 299 },
      { name: "Gaming Console Hookup", price: 799 },
      { name: "Karaoke Mic Pair", price: 499 },
    ],
  },
];

export function getAddOnById(id: string) {
  return addOns.find((a) => a.id === id);
}

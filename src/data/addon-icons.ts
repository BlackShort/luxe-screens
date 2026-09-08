import { Cake, CupSoda, Gift, Monitor, Sparkles, Utensils, type LucideIcon } from "lucide-react";
import type { AddOnCategory, AddOn, AddOnDTO } from "@/types";

export const addOnIcons: Record<AddOnCategory, LucideIcon> = {
  CAKE: Cake,
  DECORATION: Sparkles,
  GIFT: Gift,
  FOOD: Utensils,
  DRINK: CupSoda,
  PROJECTOR: Monitor,
};

// Merges a DB-sourced AddOn with its display icon for rendering.
export function withIcon(addOn: AddOnDTO): AddOn {
  return { ...addOn, icon: addOnIcons[addOn.category] };
}

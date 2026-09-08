import type { Occasion } from "@/types";
import { Cake, Heart, Sparkles, Presentation, Moon, Gem } from "lucide-react";

export const occasions: Occasion[] = [
  {
    id: "occ-birthday",
    type: "Birthday",
    description: "Balloons, cake, and a screen that's all yours.",
    icon: Cake,
  },
  {
    id: "occ-anniversary",
    type: "Anniversary",
    description: "Relive your favorite film, just the two of you.",
    icon: Heart,
  },
  {
    id: "occ-party",
    type: "Party",
    description: "Bring the whole crew for a private watch party.",
    icon: Sparkles,
  },
  {
    id: "occ-seminar",
    type: "Seminar",
    description: "Presentation-ready screens for small workshops.",
    icon: Presentation,
  },
  {
    id: "occ-date",
    type: "Date",
    description: "A quiet corner of the city, dimmed and just for you.",
    icon: Moon,
  },
  {
    id: "occ-engagement",
    type: "Engagement",
    description: "Say yes on the big screen before the film starts.",
    icon: Gem,
  },
];
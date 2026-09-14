import type { Occasion } from "@/types";
import { seminar, anniversary, birthday, engagement, party, date } from "@/assets";
import { Cake, Heart, Sparkles, Presentation, Moon, Gem } from "lucide-react";

export const occasions: Occasion[] = [
  {
    id: "occ-birthday",
    type: "Birthday",
    description: "Balloons, cake, and a screen that's all yours.",
    icon: Cake,
    image: birthday,
  },
  {
    id: "occ-anniversary",
    type: "Anniversary",
    description: "Relive your favorite film, just the two of you.",
    icon: Heart,
    image: anniversary,
  },
  {
    id: "occ-party",
    type: "Party",
    description: "Bring the whole crew for a private watch party.",
    icon: Sparkles,
    image: party,
  },
  {
    id: "occ-seminar",
    type: "Seminar",
    description: "Presentation-ready screens for small workshops.",
    icon: Presentation,
    image: seminar,
  },
  {
    id: "occ-date",
    type: "Date",
    description: "A quiet corner of the city, dimmed and just for you.",
    icon: Moon,
    image: date,
  },
  {
    id: "occ-engagement",
    type: "Engagement",
    description: "Say yes on the big screen before the film starts.",
    icon: Gem,
    image: engagement,
  },
];
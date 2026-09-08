import { NextRequest, NextResponse } from "next/server";
import { plannerSchema } from "@/lib/validation";
import { listTheaters } from "@/server/services/theaters.service";
import { listAddOns } from "@/server/services/addons.service";

// Rule-based stand-in for an LLM recommendation call. Swap the body of
// this handler for a real model call later; the request/response
// contract for the client stays the same.
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed JSON body" }, { status: 400 });
  }

  const parsed = plannerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { occasion, guests, budget, city } = parsed.data;

  const [theatersInCity, addOns] = await Promise.all([
    listTheaters(city),
    listAddOns(),
  ]);

  const candidates = theatersInCity.filter((t) => t.maxCapacity >= guests);
  if (candidates.length === 0) {
    return NextResponse.json({ recommendation: null, reason: "No rooms in this city fit your group size yet." });
  }

  const sorted = [...candidates].sort((a, b) => a.basePrice - b.basePrice);
  const theater = sorted.find((t) => t.basePrice <= budget) ?? sorted[0];
  if (!theater) {
    return NextResponse.json({ recommendation: null, reason: "No rooms in this city fit your group size yet." });
  }

  const remainingBudget = Math.max(budget - theater.basePrice, 0);

  const suggestedAddOns: { addOnId: string; optionName: string; price: number }[] = [];
  let spend = 0;

  const priorityByCategory: Record<string, string[]> = {
    Birthday: ["CAKE", "DECORATION", "GIFT"],
    Anniversary: ["DECORATION", "DRINK", "GIFT"],
    Party: ["DRINK", "FOOD", "DECORATION"],
    Seminar: ["PROJECTOR", "FOOD"],
    Date: ["DRINK", "DECORATION"],
    Engagement: ["DECORATION", "GIFT", "DRINK"],
  };

  for (const category of priorityByCategory[occasion] ?? []) {
    const addOn = addOns.find((a) => a.category === category);
    if (!addOn) continue;
    const affordable = [...addOn.options]
      .sort((a, b) => a.price - b.price)
      .find((o) => spend + o.price <= remainingBudget);
    if (affordable) {
      suggestedAddOns.push({ addOnId: addOn.id, optionName: affordable.name, price: affordable.price });
      spend += affordable.price;
    }
  }

  return NextResponse.json({
    recommendation: {
      theater,
      suggestedAddOns,
      estimatedTotal: theater.basePrice + spend,
    },
  });
}

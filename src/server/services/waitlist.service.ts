import { prisma } from "@/server/db/client";
import { sanitizeText } from "@/lib/utils";
import type { WaitlistInput } from "@/lib/validation";

export async function addWaitlistEntry(data: WaitlistInput) {
  return prisma.waitlistEntry.create({
    data: {
      name: sanitizeText(data.name),
      email: data.email,
      city: sanitizeText(data.city),
    },
  });
}

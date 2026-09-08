import { prisma } from "@/server/db/client";
import { sanitizeText } from "@/lib/utils";
import type { ContactMessageInput } from "@/lib/validation";

export async function saveContactMessage(data: ContactMessageInput) {
  return prisma.contactMessage.create({
    data: {
      name: sanitizeText(data.name),
      email: data.email,
      message: sanitizeText(data.message),
    },
  });
}

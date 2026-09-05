import { z } from "zod";

// Shared, real validation used on both the client (inline form feedback)
// and the server (API routes) so nothing trusts the client alone.

const NAME_RE = /^[a-zA-Z\s.'-]{2,60}$/;
// India-friendly phone: optional +91, then 10 digits starting 6-9.
const PHONE_RE = /^(?:\+91[\s-]?)?[6-9]\d{9}$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name is too long")
    .regex(NAME_RE, "Name can only contain letters, spaces, and ' . -"),
  phone: z
    .string()
    .trim()
    .regex(PHONE_RE, "Enter a valid 10-digit Indian mobile number"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address")
    .max(120, "Email is too long"),
});

export const citySchema = z.enum([
  "Delhi",
  "Ahmedabad",
  "Noida",
  "Bangalore",
  "Mumbai",
  "Lucknow",
]);

export const occasionTypeSchema = z.enum([
  "Birthday",
  "Anniversary",
  "Party",
  "Seminar",
  "Date",
  "Engagement",
]);

export const cartItemSchema = z.object({
  addOnId: z.string().min(1),
  category: z.enum(["CAKE", "DECORATION", "GIFT", "FOOD", "DRINK", "PROJECTOR"]),
  optionName: z.string().trim().min(1).max(80),
  price: z.number().int().nonnegative().max(100000),
  quantity: z.number().int().min(1).max(20),
});

export const slotsQuerySchema = z.object({
  theaterId: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]{3,40}$/i, "Invalid theater id"),
});

export const couponValidateSchema = z.object({
  code: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z0-9]{3,20}$/, "Coupon codes are 3-20 letters/numbers"),
  subtotal: z.number().nonnegative().max(1000000),
});

export const bookingCreateSchema = z.object({
  location: citySchema,
  theaterId: z.string().regex(/^[a-z0-9-]{3,40}$/i, "Invalid theater id"),
  slotId: z.string().min(3).max(100),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format"),
  guests: z.number().int().min(1, "At least 1 guest").max(30, "Max 30 guests"),
  contact: contactSchema,
  occasion: occasionTypeSchema,
  occasionNote: z.string().trim().max(300).optional(),
  cart: z.array(cartItemSchema).max(50),
  couponCode: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z0-9]{3,20}$/)
    .optional()
    .or(z.literal("")),
});

export const bookingConfirmSchema = z.object({
  bookingId: z.string().min(3).max(60),
  paymentToken: z.string().min(6).max(120),
});

export const waitlistSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(60)
    .regex(NAME_RE, "Name can only contain letters, spaces, and ' . -"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(120),
  city: z
    .string()
    .trim()
    .min(2, "Tell us which city")
    .max(60)
    .regex(/^[a-zA-Z\s.'-]{2,60}$/, "City can only contain letters and spaces"),
});

export const contactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(60)
    .regex(NAME_RE, "Name can only contain letters, spaces, and ' . -"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(120),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (10+ characters)")
    .max(600, "Keep it under 600 characters"),
});

export const plannerSchema = z.object({
  occasion: occasionTypeSchema,
  guests: z.number().int().min(1).max(30),
  budget: z.number().int().min(500).max(200000),
  city: citySchema,
});

export type ContactInput = z.infer<typeof contactSchema>;
export type BookingCreateInput = z.infer<typeof bookingCreateSchema>;
export type WaitlistInput = z.infer<typeof waitlistSchema>;
export type PlannerInput = z.infer<typeof plannerSchema>;

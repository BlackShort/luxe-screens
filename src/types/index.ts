import { LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";

export interface ImageSource {
  src: string | StaticImageData;
  isStatic: boolean;
  priority: boolean;
}

export type Place =
  | "Delhi"
  | "Ahmedabad"
  | "Hyderabad"
  | "Bangalore"
  | "Mumbai"
  | "Lucknow"
  | "Chennai"
  | "Pune"
  | "Vishakhapatnam";

export type City = {
  name: Place;
  icon: StaticImageData;
};

export interface Theater {
  id: string;
  name: string;
  city: Place;
  address: string;
  basePrice: number;
  maxCapacity: number;
  screen: string;
  sound: string;
  amenities: string[];
  images: string[];
  rating: number;
  reviewCount: number;
}

export type SlotStatus = "AVAILABLE" | "HELD" | "BOOKED" | "PAST";

export interface Slot {
  id: string;
  theaterId: string;
  date: string; // ISO date, e.g. 2026-09-10
  time: string; // e.g. "14:30"
  status: SlotStatus;
}

export type OccasionType =
  | "Birthday"
  | "Anniversary"
  | "Party"
  | "Seminar"
  | "Date"
  | "Engagement";

export interface Occasion {
  id: string;
  type: OccasionType;
  description: string;
  icon: LucideIcon;
}

export type AddOnCategory = "CAKE" | "DECORATION" | "GIFT" | "FOOD" | "DRINK" | "PROJECTOR";

export interface AddOnOption {
  id?: string;
  name: string;
  price: number;
  image?: string;
}

export interface AddOn {
  id: string;
  category: AddOnCategory;
  label: string;
  icon: LucideIcon;
  options: AddOnOption[];
}

export interface AddOnDTO {
  id: string;
  category: AddOnCategory;
  label: string;
  options: AddOnOption[];
}

export interface CartItem {
  addOnId: string;
  category: AddOnCategory;
  optionName: string;
  price: number;
  quantity: number;
}

export type PaymentStatus = "PENDING" | "PAID" | "FAILED";

export interface BookingContact {
  name: string;
  phone: string;
  email: string;
}

export interface Booking {
  id: string;
  location: Place;
  theaterId: string;
  slotIds: string[];
  durationSlots: number;
  date: string;
  time: string;
  guests: number;
  contact: BookingContact;
  occasion: OccasionType;
  occasionNote?: string;
  cart: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export interface Coupon {
  code: string;
  description: string;
  percentOff: number;
  minSpend: number;
  active: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  id: string;
  name: string;
  city: Place;
  quote: string;
  occasion: OccasionType;
  rating: number;
}

export interface WaitlistEntry {
  name: string;
  email: string;
  city: string;
}

export interface BookingDraft {
  location?: Place;
  theaterId?: string;
  holdToken?: string;
  holdExpiresAt?: string;
  durationSlots?: number;
  date?: string;
  time?: string;
  contact?: Partial<BookingContact>;
  guests?: number;
  occasion?: OccasionType;
  occasionNote?: string;
  cart: CartItem[];
  couponCode?: string;
}

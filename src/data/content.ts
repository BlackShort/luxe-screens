import type { FaqItem, ServiceItem, Testimonial, City, Slide } from "@/types";
import {
  ahemdabad,
  bengaluru,
  chennai,
  delhi,
  hyderabad,
  lucknow,
  mumbai,
  pune,
  vishakhapatnam
} from "@/assets";

import {
  Utensils,
  Presentation,
  Clapperboard,
  PartyPopper,
  Wand2,
  ConciergeBell,
} from "lucide-react";

export const cities: City[] = [
  {
    name: "Delhi",
    icon: delhi,
  },
  {
    name: "Ahmedabad",
    icon: ahemdabad,
  },
  {
    name: "Chennai",
    icon: chennai,
  },
  {
    name: "Bangalore",
    icon: bengaluru
  },
  {
    name: "Mumbai",
    icon: mumbai
  },
  {
    name: "Lucknow",
    icon: lucknow
  },
  {
    name: "Hyderabad",
    icon: hyderabad
  },
  {
    name: "Pune",
    icon: pune
  },
  {
    name: "Vishakhapatnam",
    icon: vishakhapatnam
  }
];

export const services: ServiceItem[] = [
  {
    id: "svc-private",
    title: "Private Screenings",
    description: "A screen, a room, and a door that closes. No strangers, no shared armrests.",
    icon: Clapperboard,
  },
  {
    id: "svc-occasion",
    title: "Occasion Styling",
    description: "Cakes, decor, and gifts arranged before you walk in — tell us the moment, we set the scene.",
    icon: PartyPopper,
  },
  {
    id: "svc-planner",
    title: "AI Experience Planner",
    description: "Describe the occasion and headcount; we shortlist the room and package that fit.",
    icon: Wand2,
  },
  {
    id: "svc-corporate",
    title: "Small Seminars",
    description: "HDMI-ready screens for pitch rehearsals, team offsites, and quiet workshops.",
    icon: Presentation,
  },
  {
    id: "svc-catering",
    title: "In-room Catering",
    description: "Popcorn to full platters, delivered to your seat without pausing the film.",
    icon: Utensils,
  },
  {
    id: "svc-concierge",
    title: "Day-of Concierge",
    description: "A single point of contact from booking to the credits rolling.",
    icon: ConciergeBell,
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "How far in advance should I book?",
    answer: "Popular slots on weekends fill up 3-5 days ahead. Weekday evenings are usually available with 24 hours' notice.",
  },
  {
    id: "faq-2",
    question: "Can I bring my own cake or decorations?",
    answer: "Yes. Outside cakes and decor are welcome — just let us know so we can plan the room setup around them.",
  },
  {
    id: "faq-3",
    question: "What's included in the base price?",
    answer: "The private screen, seating for your group, climate control, and a dedicated host for the duration of your slot.",
  },
  {
    id: "faq-4",
    question: "Is there a cancellation policy?",
    answer: "Free rescheduling up to 24 hours before your slot. Cancellations within 24 hours are non-refundable.",
  },
  {
    id: "faq-5",
    question: "Can I stream from my own account?",
    answer: "Every room has HDMI and screen-mirroring support, so Netflix, Prime, or your own laptop all work.",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Ananya R.",
    city: "Delhi",
    quote: "We booked The Velvet Room for my sister's birthday and the decor team had it looking like a film premiere by the time we walked in.",
    occasion: "Birthday",
    rating: 5,
  },
  {
    id: "test-2",
    name: "Rohit & Meera",
    city: "Mumbai",
    quote: "Our anniversary screening at Starlit was the calmest, most us date night we've had in years.",
    occasion: "Anniversary",
    rating: 5,
  },
  {
    id: "test-3",
    name: "Kabir S.",
    city: "Bangalore",
    quote: "Used Orchid Private Cinema for a 10-person product rehearsal. Better than any conference room I've rented.",
    occasion: "Seminar",
    rating: 4,
  },
];

export const slides: Slide[] = [
  {
    eyebrow: "PRIVATE SCREENING",
    title: "Cinema, Reimagined.",
    description: "An elevated private theatre experience designed around you.",
  },
  {
    eyebrow: "PREMIUM EXPERIENCES",
    title: "Every Moment, Unforgettable.",
    description: "Experience the magic of cinema in extraordinary surroundings.",
  },
  {
    eyebrow: "LUXURY THEATRES",
    title: "Your Screen. Your Space.",
    description: "Private viewing, exceptional comfort, and complete privacy.",
  },
  {
    eyebrow: "LUXE SCREENS",
    title: "Where Stories Come Alive.",
    description: "A cinematic experience crafted for the moments that matter.",
  },
];
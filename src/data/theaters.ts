import type { Theater } from "@/types";

// Mock seed data standing in for the `Theater` table until Prisma + Postgres
// is wired up. Shape matches the schema in the project documentation.
export const theaters: Theater[] = [
  {
    id: "thr-del-01",
    name: "The Velvet Room",
    city: "Delhi",
    address: "Shahpur Jat, New Delhi",
    basePrice: 2499,
    maxCapacity: 8,
    screen: "120-inch 4K laser projection",
    sound: "7.1 Dolby surround",
    amenities: ["Recliner sofas", "Mood lighting", "Private washroom", "Mini bar"],
    images: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80",
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&q=80",
    ],
    rating: 4.9,
    reviewCount: 214,
  },
  {
    id: "thr-del-02",
    name: "Marigold Screening Lounge",
    city: "Delhi",
    address: "Hauz Khas Village, New Delhi",
    basePrice: 1999,
    maxCapacity: 6,
    screen: "100-inch 4K",
    sound: "5.1 surround",
    amenities: ["Bean bags", "Fairy lighting", "Bluetooth mic"],
    images: [
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1200&q=80",
    ],
    rating: 4.7,
    reviewCount: 132,
  },
  {
    id: "thr-amd-01",
    name: "Amber Cinehall",
    city: "Ahmedabad",
    address: "Prahladnagar, Ahmedabad",
    basePrice: 1799,
    maxCapacity: 10,
    screen: "130-inch 4K laser",
    sound: "7.1 Dolby Atmos",
    amenities: ["Recliner sofas", "Karaoke system", "Snack counter"],
    images: [
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80",
    ],
    rating: 4.8,
    reviewCount: 98,
  },
  {
    id: "thr-noi-01",
    name: "Noir Screening Suite",
    city: "Pune",
    address: "Sector 18, Noida",
    basePrice: 2199,
    maxCapacity: 8,
    screen: "110-inch 4K",
    sound: "5.1 Dolby",
    amenities: ["Recliner sofas", "Disco lighting", "Private entrance"],
    images: [
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&q=80",
    ],
    rating: 4.6,
    reviewCount: 87,
  },
  {
    id: "thr-blr-01",
    name: "Orchid Private Cinema",
    city: "Bangalore",
    address: "Indiranagar, Bangalore",
    basePrice: 2699,
    maxCapacity: 12,
    screen: "140-inch 4K laser",
    sound: "9.1 Dolby Atmos",
    amenities: ["Recliner sofas", "Dance floor", "Premium bar", "Mood lighting"],
    images: [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&q=80",
    ],
    rating: 5.0,
    reviewCount: 301,
  },
  {
    id: "thr-mum-01",
    name: "Starlit Screening Room",
    city: "Mumbai",
    address: "Bandra West, Mumbai",
    basePrice: 2999,
    maxCapacity: 10,
    screen: "130-inch 4K",
    sound: "7.1 Dolby Atmos",
    amenities: ["Recliner sofas", "Rooftop view", "Private bar"],
    images: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80",
    ],
    rating: 4.9,
    reviewCount: 256,
  },
  {
    id: "thr-lko-01",
    name: "Nawabi Screening Hall",
    city: "Lucknow",
    address: "Hazratganj, Lucknow",
    basePrice: 1599,
    maxCapacity: 8,
    screen: "100-inch 4K",
    sound: "5.1 surround",
    amenities: ["Recliner sofas", "Traditional decor", "Snack counter"],
    images: [
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1200&q=80",
    ],
    rating: 4.7,
    reviewCount: 64,
  },
];

export function getTheatersByCity(city: string): Theater[] {
  return theaters.filter((t) => t.city.toLowerCase() === city.toLowerCase());
}

export function getTheaterById(id: string): Theater | undefined {
  return theaters.find((t) => t.id === id);
}

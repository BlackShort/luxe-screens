import { PrismaClient, AddOnCategory } from "@prisma/client";

const prisma = new PrismaClient();

const theaters = [
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
    images: ["https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1200&q=80"],
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
    images: ["https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80"],
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
    images: ["https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&q=80"],
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
    images: ["https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&q=80"],
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
    images: ["https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80"],
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
    images: ["https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1200&q=80"],
    rating: 4.7,
    reviewCount: 64,
  },
];

const addOns: {
  category: AddOnCategory;
  label: string;
  options: { name: string; price: number }[];
}[] = [
    {
      category: AddOnCategory.CAKE,
      label: "Cake",
      options: [
        { name: "Chocolate Truffle (1kg)", price: 899 },
        { name: "Red Velvet (1kg)", price: 999 },
        { name: "Black Forest (1kg)", price: 849 },
        { name: "Vegan Vanilla (1kg)", price: 1099 },
      ],
    },
    {
      category: AddOnCategory.DECORATION,
      label: "Decoration",
      options: [
        { name: "Balloon Arch", price: 799 },
        { name: "Fairy Light Backdrop", price: 999 },
        { name: "LED Marquee Letters", price: 1299 },
        { name: "Rose Petal Trail", price: 599 },
      ],
    },
    {
      category: AddOnCategory.GIFT,
      label: "Gifts",
      options: [
        { name: "Photo Frame Bundle", price: 649 },
        { name: "Scented Candle Set", price: 549 },
        { name: "Personalized Mug", price: 399 },
        { name: "Teddy Bear (Large)", price: 899 },
      ],
    },
    {
      category: AddOnCategory.FOOD,
      label: "Food",
      options: [
        { name: "Popcorn Bucket Duo", price: 449 },
        { name: "Nachos Platter", price: 549 },
        { name: "Loaded Fries", price: 399 },
        { name: "Sandwich Combo", price: 599 },
      ],
    },
    {
      category: AddOnCategory.DRINK,
      label: "Drinks",
      options: [
        { name: "Mocktail Pitcher", price: 699 },
        { name: "Soft Drinks (4 cans)", price: 249 },
        { name: "Cold Coffee Duo", price: 399 },
        { name: "Fresh Juice Pitcher", price: 549 },
      ],
    },
    {
      category: AddOnCategory.PROJECTOR,
      label: "Projector Add-ons",
      options: [
        { name: "HDMI Streaming Remote", price: 299 },
        { name: "Gaming Console Hookup", price: 799 },
        { name: "Karaoke Mic Pair", price: 499 },
      ],
    },
  ];

const coupons = [
  { code: "FIRSTSHOW", description: "10% off your first booking", percentOff: 10, minSpend: 1500, active: true },
  { code: "LUXE20", description: "20% off bookings above ₹5,000", percentOff: 20, minSpend: 5000, active: true },
  { code: "WEEKDAY15", description: "15% off weekday shows", percentOff: 15, minSpend: 2000, active: true },
  { code: "EXPIRED10", description: "No longer valid", percentOff: 10, minSpend: 0, active: false },
];

async function main() {
  console.log("Seeding theaters...");
  await Promise.all(
    theaters.map((theater) =>
      prisma.theater.upsert({
        where: { id: theater.id },
        update: theater,
        create: theater,
      })
    )
  );
  
  console.log(`  done (${theaters.length} theaters)`);

  console.log("Seeding add-ons...");
  for (const addOn of addOns) {
    const created = await prisma.addOn.upsert({
      where: { category: addOn.category },
      update: { label: addOn.label },
      create: { category: addOn.category, label: addOn.label },
    });

    for (const option of addOn.options) {
      await prisma.addOnOption.upsert({
        where: { addOnId_name: { addOnId: created.id, name: option.name } },
        update: { price: option.price },
        create: { addOnId: created.id, name: option.name, price: option.price },
      });
    }
  }
  console.log(`  done (${addOns.length} add-ons)`);

  console.log("Seeding coupons...");
  for (const coupon of coupons) {
    await prisma.coupon.upsert({
      where: { code: coupon.code },
      update: coupon,
      create: coupon,
    });
  }
  console.log(`  done (${coupons.length} coupons)`);

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

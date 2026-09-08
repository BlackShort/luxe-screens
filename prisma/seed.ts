import { PrismaClient, AddOnCategory } from "@prisma/client";

const prisma = new PrismaClient();

const theaters = [
  // ============================================================
  // DELHI
  // ============================================================
  {
    id: "thr-del-01",
    name: "The Velvet Room",
    city: "Delhi",
    address: "Shahpur Jat, New Delhi",
    basePrice: 2499,
    maxCapacity: 8,
    screen: "120-inch 4K laser projection",
    sound: "7.1 Dolby Atmos",
    amenities: [
      "Luxury recliner sofas",
      "Mood lighting",
      "Private washroom",
      "Celebration table",
      "Bluetooth audio",
    ],
    images: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80",
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&q=80",
    ],
    rating: 4.9,
    reviewCount: 214,
  },
  {
    id: "thr-del-02",
    name: "Marigold Celebration Lounge",
    city: "Delhi",
    address: "Hauz Khas Village, New Delhi",
    basePrice: 1999,
    maxCapacity: 10,
    screen: "110-inch 4K projection",
    sound: "5.1 Dolby surround",
    amenities: [
      "Lounge seating",
      "Fairy lighting",
      "Celebration table",
      "Bluetooth karaoke",
      "Snack counter",
    ],
    images: [
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1200&q=80",
    ],
    rating: 4.7,
    reviewCount: 132,
  },

  // ============================================================
  // AHMEDABAD
  // ============================================================
  {
    id: "thr-amd-01",
    name: "Amber Celebration Hall",
    city: "Ahmedabad",
    address: "Prahladnagar, Ahmedabad",
    basePrice: 1799,
    maxCapacity: 12,
    screen: "130-inch 4K laser projection",
    sound: "7.1 Dolby Atmos",
    amenities: [
      "Recliner sofas",
      "Karaoke system",
      "Party lighting",
      "Celebration table",
      "Snack counter",
    ],
    images: [
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80",
    ],
    rating: 4.8,
    reviewCount: 98,
  },
  {
    id: "thr-amd-02",
    name: "The Ivory Screening Lounge",
    city: "Ahmedabad",
    address: "Sindhu Bhavan Road, Ahmedabad",
    basePrice: 2299,
    maxCapacity: 8,
    screen: "120-inch 4K laser projection",
    sound: "7.1 Dolby surround",
    amenities: [
      "Premium recliners",
      "Ambient lighting",
      "Private lounge",
      "Celebration table",
      "Bluetooth audio",
    ],
    images: [
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80",
    ],
    rating: 4.8,
    reviewCount: 116,
  },

  // ============================================================
  // HYDERABAD
  // ============================================================
  {
    id: "thr-hyd-01",
    name: "The Grand Screening Room",
    city: "Hyderabad",
    address: "Jubilee Hills, Hyderabad",
    basePrice: 2399,
    maxCapacity: 12,
    screen: "135-inch 4K laser projection",
    sound: "7.1 Dolby Atmos",
    amenities: [
      "Premium recliners",
      "Private entrance",
      "Mood lighting",
      "Celebration table",
      "Refreshment counter",
    ],
    images: [
      "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=1200&q=80",
    ],
    rating: 4.9,
    reviewCount: 187,
  },
  {
    id: "thr-hyd-02",
    name: "Moonlight Celebration Lounge",
    city: "Hyderabad",
    address: "Banjara Hills, Hyderabad",
    basePrice: 1899,
    maxCapacity: 8,
    screen: "110-inch 4K projection",
    sound: "5.1 Dolby surround",
    amenities: [
      "Comfort sofas",
      "Star ceiling",
      "Party lighting",
      "Bluetooth karaoke",
      "Snack counter",
    ],
    images: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80",
    ],
    rating: 4.7,
    reviewCount: 104,
  },

  // ============================================================
  // BANGALORE
  // ============================================================
  {
    id: "thr-blr-01",
    name: "Orchid Private Cinema",
    city: "Bangalore",
    address: "Indiranagar, Bangalore",
    basePrice: 2699,
    maxCapacity: 14,
    screen: "140-inch 4K laser projection",
    sound: "9.1 Dolby Atmos",
    amenities: [
      "Luxury recliner sofas",
      "Dance floor",
      "Premium party lighting",
      "Karaoke setup",
      "Celebration table",
    ],
    images: [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&q=80",
    ],
    rating: 5.0,
    reviewCount: 301,
  },
  {
    id: "thr-blr-02",
    name: "The Silver Screen Lounge",
    city: "Bangalore",
    address: "Koramangala, Bangalore",
    basePrice: 2199,
    maxCapacity: 10,
    screen: "120-inch 4K laser projection",
    sound: "7.1 Dolby surround",
    amenities: [
      "Luxury sofas",
      "Gaming console setup",
      "Ambient lighting",
      "Karaoke microphones",
      "Snack counter",
    ],
    images: [
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1200&q=80",
    ],
    rating: 4.8,
    reviewCount: 173,
  },

  // ============================================================
  // MUMBAI
  // ============================================================
  {
    id: "thr-mum-01",
    name: "Starlit Screening Room",
    city: "Mumbai",
    address: "Bandra West, Mumbai",
    basePrice: 2999,
    maxCapacity: 12,
    screen: "130-inch 4K laser projection",
    sound: "7.1 Dolby Atmos",
    amenities: [
      "Luxury recliners",
      "Private lounge",
      "Mood lighting",
      "Celebration table",
      "Refreshment counter",
    ],
    images: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80",
    ],
    rating: 4.9,
    reviewCount: 256,
  },
  {
    id: "thr-mum-02",
    name: "The Cinema Atelier",
    city: "Mumbai",
    address: "Lower Parel, Mumbai",
    basePrice: 2599,
    maxCapacity: 10,
    screen: "125-inch 4K laser projection",
    sound: "7.1 Dolby surround",
    amenities: [
      "Designer recliners",
      "Private lounge",
      "Ambient lighting",
      "Celebration table",
      "Premium snack counter",
    ],
    images: [
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&q=80",
    ],
    rating: 4.8,
    reviewCount: 192,
  },

  // ============================================================
  // LUCKNOW
  // ============================================================
  {
    id: "thr-lko-01",
    name: "Nawabi Screening Hall",
    city: "Lucknow",
    address: "Hazratganj, Lucknow",
    basePrice: 1599,
    maxCapacity: 10,
    screen: "110-inch 4K projection",
    sound: "5.1 Dolby surround",
    amenities: [
      "Recliner sofas",
      "Traditional decor",
      "Party lighting",
      "Celebration table",
      "Snack counter",
    ],
    images: [
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1200&q=80",
    ],
    rating: 4.7,
    reviewCount: 64,
  },
  {
    id: "thr-lko-02",
    name: "The Royal Picture Room",
    city: "Lucknow",
    address: "Gomti Nagar, Lucknow",
    basePrice: 1899,
    maxCapacity: 12,
    screen: "120-inch 4K projection",
    sound: "7.1 Dolby surround",
    amenities: [
      "Luxury recliners",
      "Royal themed decor",
      "Private lounge",
      "Celebration table",
      "Refreshment counter",
    ],
    images: [
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80",
    ],
    rating: 4.8,
    reviewCount: 91,
  },

  // ============================================================
  // CHENNAI
  // ============================================================
  {
    id: "thr-chn-01",
    name: "Marina Private Cinema",
    city: "Chennai",
    address: "Adyar, Chennai",
    basePrice: 1999,
    maxCapacity: 10,
    screen: "120-inch 4K laser projection",
    sound: "7.1 Dolby surround",
    amenities: [
      "Recliner sofas",
      "Coastal themed decor",
      "Private entrance",
      "Celebration table",
      "Snack counter",
    ],
    images: [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&q=80",
    ],
    rating: 4.8,
    reviewCount: 128,
  },
  {
    id: "thr-chn-02",
    name: "The Palm Screening Lounge",
    city: "Chennai",
    address: "Anna Nagar, Chennai",
    basePrice: 1699,
    maxCapacity: 8,
    screen: "105-inch 4K projection",
    sound: "5.1 Dolby surround",
    amenities: [
      "Comfort sofas",
      "Mood lighting",
      "Bluetooth audio",
      "Celebration table",
      "Snack counter",
    ],
    images: [
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80",
    ],
    rating: 4.7,
    reviewCount: 83,
  },

  // ============================================================
  // PUNE
  // ============================================================
  {
    id: "thr-pun-01",
    name: "Noir Screening Suite",
    city: "Pune",
    address: "Koregaon Park, Pune",
    basePrice: 2199,
    maxCapacity: 10,
    screen: "110-inch 4K projection",
    sound: "5.1 Dolby surround",
    amenities: [
      "Recliner sofas",
      "Disco lighting",
      "Private entrance",
      "Karaoke setup",
      "Celebration table",
    ],
    images: [
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&q=80",
    ],
    rating: 4.6,
    reviewCount: 87,
  },
  {
    id: "thr-pun-02",
    name: "The Copper Screen",
    city: "Pune",
    address: "Kalyani Nagar, Pune",
    basePrice: 1999,
    maxCapacity: 12,
    screen: "120-inch 4K laser projection",
    sound: "7.1 Dolby surround",
    amenities: [
      "Premium sofas",
      "Gaming console setup",
      "Mood lighting",
      "Karaoke microphones",
      "Private lounge",
    ],
    images: [
      "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=1200&q=80",
    ],
    rating: 4.8,
    reviewCount: 109,
  },

  // ============================================================
  // VISAKHAPATNAM
  // ============================================================
  {
    id: "thr-viz-01",
    name: "Bayview Private Cinema",
    city: "Vishakhapatnam",
    address: "Beach Road, Vishakhapatnam",
    basePrice: 1799,
    maxCapacity: 10,
    screen: "115-inch 4K projection",
    sound: "5.1 Dolby surround",
    amenities: [
      "Recliner sofas",
      "Sea-view lounge",
      "Mood lighting",
      "Celebration table",
      "Refreshment counter",
    ],
    images: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80",
    ],
    rating: 4.8,
    reviewCount: 76,
  },
  {
    id: "thr-viz-02",
    name: "The Pearl Celebration Lounge",
    city: "Vishakhapatnam",
    address: "MVP Colony, Vishakhapatnam",
    basePrice: 1599,
    maxCapacity: 8,
    screen: "100-inch 4K projection",
    sound: "5.1 Dolby surround",
    amenities: [
      "Comfort sofas",
      "Ambient lighting",
      "Bluetooth audio",
      "Celebration table",
      "Refreshment counter",
    ],
    images: [
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1200&q=80",
    ],
    rating: 4.7,
    reviewCount: 58,
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
        {
          name: "Chocolate Truffle Cake (1kg)",
          price: 899,
        },
        {
          name: "Red Velvet Cake (1kg)",
          price: 999,
        },
        {
          name: "Black Forest Cake (1kg)",
          price: 849,
        },
        {
          name: "Butterscotch Crunch Cake (1kg)",
          price: 949,
        },
        {
          name: "Vanilla Berry Cake (1kg)",
          price: 899,
        },
        {
          name: "Vegan Chocolate Cake (1kg)",
          price: 1099,
        },
      ],
    },
    {
      category: AddOnCategory.DECORATION,
      label: "Decoration",
      options: [
        {
          name: "Birthday Balloon Setup",
          price: 699,
        },
        {
          name: "Balloon Arch",
          price: 799,
        },
        {
          name: "Fairy Light Backdrop",
          price: 999,
        },
        {
          name: "Rose Petal Trail",
          price: 599,
        },
        {
          name: "LED Marquee Letters",
          price: 1299,
        },
        {
          name: "Romantic Candlelight Setup",
          price: 1199,
        },
        {
          name: "Premium Celebration Decor",
          price: 1699,
        },
      ],
    },
    {
      category: AddOnCategory.GIFT,
      label: "Gifts",
      options: [
        {
          name: "Personalized Mug",
          price: 399,
        },
        {
          name: "Scented Candle Set",
          price: 549,
        },
        {
          name: "Photo Frame Bundle",
          price: 649,
        },
        {
          name: "Teddy Bear - Large",
          price: 899,
        },
        {
          name: "Personalized Photo Album",
          price: 999,
        },
        {
          name: "Couple Gift Hamper",
          price: 1299,
        },
        {
          name: "Premium Celebration Hamper",
          price: 1599,
        },
      ],
    },
    {
      category: AddOnCategory.FOOD,
      label: "Food",
      options: [
        {
          name: "Popcorn Bucket Duo",
          price: 449,
        },
        {
          name: "Nachos Platter",
          price: 549,
        },
        {
          name: "Loaded Fries",
          price: 399,
        },
        {
          name: "Sandwich Combo",
          price: 599,
        },
        {
          name: "Pizza & Garlic Bread Combo",
          price: 799,
        },
        {
          name: "Movie Night Snack Platter",
          price: 899,
        },
        {
          name: "Premium Gourmet Platter",
          price: 1299,
        },
      ],
    },
    {
      category: AddOnCategory.DRINK,
      label: "Drinks",
      options: [
        {
          name: "Soft Drinks - 4 Cans",
          price: 249,
        },
        {
          name: "Cold Coffee Duo",
          price: 399,
        },
        {
          name: "Iced Tea Pitcher",
          price: 449,
        },
        {
          name: "Fresh Juice Pitcher",
          price: 549,
        },
        {
          name: "Premium Mocktail Duo",
          price: 599,
        },
        {
          name: "Mocktail Pitcher",
          price: 699,
        },
      ],
    },
    {
      category: AddOnCategory.PROJECTOR,
      label: "Projector Add-ons",
      options: [
        {
          name: "HDMI Streaming Setup",
          price: 299,
        },
        {
          name: "Gaming Console Hookup",
          price: 799,
        },
        {
          name: "Karaoke Mic Pair",
          price: 499,
        },
        {
          name: "Karaoke Experience",
          price: 699,
        },
        {
          name: "Premium Gaming Package",
          price: 999,
        },
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

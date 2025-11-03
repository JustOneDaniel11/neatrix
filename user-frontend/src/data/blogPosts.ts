export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: "tips" | "fabric-care" | "stain-removal";
  tags: string[];
  image: string;
  featured?: boolean;
  likes?: number;
  shares?: number;
  sections: { heading?: string; paragraphs: string[]; bullets?: string[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "10-essential-cleaning-tips-for-nigerian-homes",
    title: "10 Essential Cleaning Tips for Nigerian Homes",
    excerpt:
      "Effective strategies tailored to Nigeria’s climate, dust levels, and everyday household realities.",
    author: "Neatrix",
    date: "March 15, 2024",
    readTime: "7 min read",
    category: "tips",
    tags: ["home cleaning", "tips", "nigeria"],
    image: "/images/blog/cleaning-tips.svg",
    featured: true,
    likes: 45,
    shares: 12,
    sections: [
      {
        paragraphs: [
          "Living in Nigeria presents unique cleaning challenges. Between harmattan dust, humidity, and busy households, keeping a home spotless requires consistency and clever hacks.",
          "Here are ten practical tips our team uses in the field every day—simple changes that make a noticeable difference without adding stress to your routine.",
        ],
      },
      {
        heading: "1) Start with a Weekly Routine",
        paragraphs: [
          "Assign specific tasks to specific days. For example: floors on Monday, bathrooms on Wednesday, deep kitchen clean on Saturday. Routines beat motivation every time.",
        ],
        bullets: [
          "Use 30–45 minute focused blocks",
          "Keep a small caddy with essentials (microfiber cloths, all-purpose cleaner, gloves)",
          "Set reminders—consistency is key",
        ],
      },
      {
        heading: "2) Beat Harmattan Dust",
        paragraphs: [
          "During harmattan, dust finds its way into every corner. Close windows during peak hours and prioritize dusting high-touch surfaces.",
        ],
        bullets: [
          "Use microfiber cloths (they trap dust better than feather dusters)",
          "Vacuum rugs weekly; shake them outdoors",
          "Wipe door frames, light switches, and window ledges",
        ],
      },
      {
        heading: "3) Protect Against Humidity",
        paragraphs: [
          "Humidity can invite mildew in bathrooms and kitchens. Improve ventilation and use anti-mold sprays in humid areas.",
        ],
      },
      {
        heading: "4) Use Natural Boosters",
        paragraphs: [
          "Lime, salt, and baking soda are excellent helpers for sinks, tiles, and odors. They’re budget-friendly and effective.",
        ],
      },
      {
        heading: "5) Don’t Forget High-Touch Zones",
        paragraphs: [
          "Handles, remotes, switches, and phones collect grime quickly. A quick disinfecting wipe daily keeps things fresh.",
        ],
      },
      {
        heading: "6) Floors: Mop Smart",
        paragraphs: [
          "Sweep first, then mop with a mild solution. For tiles, warm water + a few drops of dish soap works beautifully.",
        ],
      },
      {
        heading: "7) Kitchen Hygiene",
        paragraphs: [
          "Degrease stovetops weekly and disinfect counters daily. Keep raw meat prep separate and clean up spills immediately.",
        ],
      },
      {
        heading: "8) Laundry Habits",
        paragraphs: [
          "Sort by fabric and color; don’t overload the machine. Air-dry in well-ventilated areas to prevent musty smells.",
        ],
      },
      {
        heading: "9) Bathroom Care",
        paragraphs: [
          "Use a squeegee after showers to reduce water spots. Treat grout with a mild baking-soda paste monthly.",
        ],
      },
      {
        heading: "10) Small Daily Wins",
        paragraphs: [
          "Five-minute tidy-ups after dinner and before bed keep clutter from building up. It’s the little things that stack up.",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "remove-common-stains-from-nigerian-fabrics",
    title: "How to Remove Common Stains from Nigerian Fabrics",
    excerpt:
      "Palm oil, tomato, and everyday stains—professional techniques that actually work.",
    author: "Neatrix",
    date: "March 10, 2024",
    readTime: "8 min read",
    category: "stain-removal",
    tags: ["stain removal", "fabrics", "laundry"],
    image: "/images/blog/stains-fabrics.svg",
    sections: [
      {
        paragraphs: [
          "Between cooking, commuting, and celebrations, stains happen. The trick is choosing the right method for the fabric and stain type—gentle but effective.",
        ],
      },
      {
        heading: "Palm Oil on Cotton",
        paragraphs: [
          "Pre-treat with a small amount of dish soap and warm water. Gently massage, rinse, then launder. Avoid hot water at first—it can set the stain.",
        ],
      },
      {
        heading: "Tomato Sauce on Ankara",
        paragraphs: [
          "Blot, don’t rub. Use cold water first, then dab with mild detergent. Rinse and repeat. Test any stain remover on an inconspicuous area.",
        ],
      },
      {
        heading: "Sweat Marks",
        paragraphs: [
          "Mix baking soda and water to make a paste. Apply, wait 20 minutes, and rinse. Repeat for stubborn areas.",
        ],
      },
      {
        heading: "Pro Tips",
        bullets: [
          "Treat stains quickly—time matters",
          "Always check the care label",
          "Air-dry after treatment to avoid setting leftover stains",
        ],
        paragraphs: ["When in doubt, bring it to our dry cleaning team—we’ll handle it."],
      },
    ],
  },
  {
    id: 3,
    slug: "caring-for-traditional-nigerian-fabrics",
    title: "Caring for Traditional Nigerian Fabrics: Ankara, Aso‑Oke & More",
    excerpt:
      "Preserve vibrant colors and textures with gentle washing and smart storage.",
    author: "Neatrix",
    date: "March 5, 2024",
    readTime: "6 min read",
    category: "fabric-care",
    tags: ["fabric care", "traditional", "ankara"],
    image: "/images/blog/traditional-fabrics.svg",
    featured: true,
    likes: 28,
    shares: 15,
    sections: [
      {
        paragraphs: [
          "Traditional textiles are artworks—bold colors, intricate weaving, and cultural significance. Treat them with respect and they’ll reward you for years.",
        ],
      },
      {
        heading: "Washing",
        bullets: [
          "Hand-wash with cool water and mild detergent",
          "Avoid harsh scrubbing that can fade prints",
          "Rinse thoroughly; residual soap dulls colors",
        ],
        paragraphs: ["For Aso‑Oke, spot-clean where possible and avoid soaking."],
      },
      {
        heading: "Drying",
        paragraphs: [
          "Air-dry in shade to prevent bleaching from direct sun. Lay flat for heavy woven fabrics to avoid stretching.",
        ],
      },
      {
        heading: "Storage",
        paragraphs: [
          "Use breathable garment bags. Avoid damp areas and plastic wraps that trap moisture.",
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "office-cleaning-during-harmattan-season",
    title: "Office Cleaning During Harmattan Season",
    excerpt:
      "Combat dust and keep the workspace healthy during Nigeria’s dry season.",
    author: "Neatrix",
    date: "February 28, 2024",
    readTime: "5 min read",
    category: "tips",
    tags: ["office cleaning", "harmattan", "dust"],
    image: "/images/blog/office-harmattan.svg",
    sections: [
      {
        paragraphs: [
          "Harmattan brings dry winds and fine dust that settles everywhere. A proactive routine keeps your office clean and healthy for the team.",
        ],
      },
      {
        heading: "Daily Essentials",
        bullets: [
          "Wipe high-touch surfaces (desks, keyboards, handles)",
          "Vacuum carpets; mop hard floors",
          "Change air filters more frequently",
        ],
      },
      {
        heading: "Team Habits",
        paragraphs: [
          "Encourage desk tidiness and provide sanitizing wipes. Small habits reduce dust buildup and improve morale.",
        ],
      },
    ],
  },
  {
    id: 5,
    slug: "diy-natural-cleaning-solutions-using-local-ingredients",
    title: "DIY Natural Cleaning Solutions Using Local Ingredients",
    excerpt:
      "Eco‑friendly, budget‑friendly cleaning recipes using lime, salt, and pantry staples.",
    author: "Neatrix",
    date: "February 20, 2024",
    readTime: "8 min read",
    category: "tips",
    tags: ["diy", "natural", "eco-friendly"],
    image: "/images/blog/diy-cleaning.svg",
    sections: [
      {
        paragraphs: [
          "Homemade solutions are powerful when used correctly. They’re gentle on surfaces and kinder to the environment.",
        ],
      },
      {
        heading: "All‑Purpose Cleaner",
        bullets: [
          "Mix: 1 cup water, 1 tbsp dish soap, juice of 1 lime",
          "Use on countertops, tiles, and sinks",
          "Avoid unfinished wood",
        ],
      },
      {
        heading: "Deodorizing Paste",
        bullets: [
          "Baking soda + water to a paste",
          "Apply on drains and grout; rinse after 15 minutes",
        ],
      },
    ],
  },
  {
    id: 6,
    slug: "removing-red-soil-stains-in-nigerian-homes",
    title: "Removing Red Soil Stains: A Nigerian Household Challenge",
    excerpt:
      "Get rid of stubborn red soil on clothes, carpets, and upholstery with proven methods.",
    author: "Neatrix",
    date: "February 15, 2024",
    readTime: "6 min read",
    category: "stain-removal",
    tags: ["stain removal", "red soil", "laundry"],
    image: "/images/blog/red-soil-stains.svg",
    sections: [
      {
        paragraphs: [
          "Red soil can be relentless. The key is loosening the particles before washing and avoiding heat early on.",
        ],
      },
      {
        heading: "For Clothes",
        bullets: [
          "Shake off dry soil outside",
          "Rinse with cold water from the back of the fabric",
          "Pre‑treat with mild detergent; launder as usual",
        ],
      },
      {
        heading: "For Carpets and Upholstery",
        bullets: [
          "Vacuum first",
          "Blot with a damp cloth and gentle cleaner",
          "Avoid soaking—use minimal moisture",
        ],
      },
    ],
  },
];

export const categories = [
  { id: "all", label: "All Posts" },
  { id: "tips", label: "Cleaning Tips" },
  { id: "fabric-care", label: "Fabric Care" },
  { id: "stain-removal", label: "Stain Removal" },
];

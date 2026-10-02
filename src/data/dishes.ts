export interface Dish {
  id: string;
  name: string;
  slug: string;
  course: 'Entrées' | 'Plats' | 'Desserts' | 'Boissons';
  price: number; // in Naira (₦)
  image: string;
  story: string;
  description: string;
  ingredients: string[];
  prepTime: string;
  origin: string;
  portions: { name: string; priceMultiplier: number }[];
  isChefSpecial?: boolean;
}

export const DISHES: Dish[] = [
  // --- ENTRÉES ---
  {
    id: 'entree-1',
    name: 'Suya Prime Rib Bites',
    slug: 'suya-prime-rib-bites',
    course: 'Entrées',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    story: 'Born under the twilight smoke of Northern Nigerian night markets, Suya is an art form of woodfire and patience. We select prime aged beef rib-eye, dry-aged for 28 days, and tenderly coat it with hand-pounded Hausa yaji spice, charred slow over hickory coals and served with whipped peanut velouté.',
    description: 'Charred 28-day dry-aged beef rib-eye infused with artisanal Hausa yaji spice, micro-herbs, and a roasted peanut emulsion.',
    ingredients: ['28-Day Aged Rib-Eye', 'Northern Yaji Spice', 'Roasted Peanut Emulsion', 'Pickled Red Shallots', 'Micro Coriander'],
    prepTime: '20 mins',
    origin: 'Kano, Northern Nigeria',
    portions: [
      { name: 'Individual Tasting (4 pcs)', priceMultiplier: 1 },
      { name: 'Maison Sharing (8 pcs)', priceMultiplier: 1.8 }
    ],
    isChefSpecial: true
  },
  {
    id: 'entree-2',
    name: 'Truffle & Smoked Crayfish Puff Puff',
    slug: 'truffle-crayfish-puff-puff',
    course: 'Entrées',
    price: 14000,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop',
    story: 'Puff Puff is the universal celebration ball of West Africa. In our kitchen, the familiar golden cloud is elevated with wild Périgord black truffle essence and dusting of wild smoked Oron crayfish, creating an intoxicating dance between street comfort and Parisian luxury.',
    description: 'Golden fermented dough spheres infused with black truffle oil, dusted with smoked coastal crayfish powder, served with whipped palm honey butter.',
    ingredients: ['Slow-Fermented Dough', 'Wild Black Truffle Oil', 'Smoked Oron Crayfish', 'Artisanal Honey Butter', 'Sea Salt Flakes'],
    prepTime: '15 mins',
    origin: 'Lagos Coastline',
    portions: [
      { name: 'Classic Platter (6 pcs)', priceMultiplier: 1 },
      { name: 'Grand Degustation (12 pcs)', priceMultiplier: 1.75 }
    ]
  },
  {
    id: 'entree-3',
    name: 'Maison Small Chops Symphony',
    slug: 'maison-small-chops-symphony',
    course: 'Entrées',
    price: 24000,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop',
    story: 'No West African gathering begins without the cherished "Small Chops." We reinterpret this beloved ritual as a 3-act chamber symphony: smoked goat confit samosa, caramelized plantain spring rolls, and glaze-dusted peppered gizzard croquettes.',
    description: 'A curated trio of pulled smoked goat samosa with habanero mint gel, sweet dodo spring roll, and honey-glazed chicken gizzard croquette.',
    ingredients: ['Smoked Goat Confit', 'Ripe Plantain (Dodo)', 'Habanero Mint Gel', 'Spring Pastry', 'Honey Chili Glaze'],
    prepTime: '25 mins',
    origin: 'Pan-West African Heritage',
    portions: [
      { name: 'Duet Trio (6 pcs)', priceMultiplier: 1 },
      { name: 'Table Quartet (12 pcs)', priceMultiplier: 1.85 }
    ]
  },

  // --- PLATS ---
  {
    id: 'plat-1',
    name: 'Smoked Firewood Jollof & Poulet De Bresse',
    slug: 'smoked-firewood-jollof',
    course: 'Plats',
    price: 34000,
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1200&auto=format&fit=crop',
    story: 'Jollof is not merely rice; it is national pride simmered in a cast-iron pot. Our signature recipe slow-steams long-grain rice over sweet hickory and acacia firewood with double-reduced tomato paste, smoked red bell peppers, and scotch bonnet essence, paired with herb-marinated organic chicken.',
    description: 'Heritage firewood-smoked long grain Jollof rice, served with charred organic chicken supreme, caramelised sweet plantain, and charred vine tomato concassé.',
    ingredients: ['Long-Grain Parboiled Rice', 'Smoked Tatos & Habaneros', 'Firewood Infusion', 'Charred Organic Chicken', 'Caramelized Sweet Plantain'],
    prepTime: '35 mins',
    origin: 'Senegambia & Nigerian Heritage',
    portions: [
      { name: 'Solitary Feast', priceMultiplier: 1 },
      { name: 'Royal Duo Portion', priceMultiplier: 1.9 }
    ],
    isChefSpecial: true
  },
  {
    id: 'plat-2',
    name: 'Royal Egusi Velouté & Pounded Yam',
    slug: 'royal-egusi-pounded-yam',
    course: 'Plats',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop',
    story: 'In ancient royal courts, Egusi was prepared only for kings during yam harvest season. Sun-dried melon seeds are ground fine and toasted in palm oil simmered with dried wild prawns, stockfish, and tender slow-braised short rib, accompanied by velvet-soft hand-pounded white yam.',
    description: 'Toasted wild melon seed soup simmered with dried king prawns, braised beef short rib, and bitterleaf essence, served with warm silky pounded yam.',
    ingredients: ['Toasted Melon Seeds (Egusi)', 'Prime Beef Short Rib', 'Jumbo Smoked Prawns', 'Ugwu Greens', 'Velvet Pounded White Yam'],
    prepTime: '40 mins',
    origin: 'Yoruba & Igbo Monarchy',
    portions: [
      { name: 'Single Royal Portion', priceMultiplier: 1 },
      { name: 'Banquet Portion', priceMultiplier: 1.85 }
    ],
    isChefSpecial: true
  },
  {
    id: 'plat-3',
    name: 'Pan-Seared Snapper in Obe Ata Reduction',
    slug: 'pan-seared-snapper-obe-ata',
    course: 'Plats',
    price: 36000,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200&auto=format&fit=crop',
    story: 'Freshly landed red snapper from the Atlantic coast, pan-seared skin-crisp with citrus butter, resting over a silky, slow-cooked Obe Ata sauce — a reduction of roasted bell peppers, tomatoes, and scotch bonnet perfumed with thyme.',
    description: 'Crispy skin wild Atlantic red snapper on a bed of velvet red pepper reduction, garnished with coconut rice pilaf and blanched sea asparagus.',
    ingredients: ['Atlantic Red Snapper', 'Roasted Bell Pepper Reduction', 'Scotch Bonnet Essence', 'Coconut Jasmine Rice', 'Fresh Thyme Oil'],
    prepTime: '30 mins',
    origin: 'Lagos Atlantic Coast',
    portions: [
      { name: 'Classic Filet', priceMultiplier: 1 },
      { name: 'Whole Snapper Service', priceMultiplier: 1.75 }
    ]
  },
  {
    id: 'plat-4',
    name: '12-Hour Braised Oxtail Pepper Soup',
    slug: 'braised-oxtail-pepper-soup',
    course: 'Plats',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1200&auto=format&fit=crop',
    story: 'Pepper soup is the medicinal elixir of West Africa. We braise tender oxtail for 12 hours until melt-in-mouth, in a clear aromatic broth infused with calabash nutmeg (Ehuru), grains of selim (Uda), and fresh scent leaf.',
    description: 'Slow-braised oxtail in a soul-warming broth of wild West African herbs, Ehuru nutmeg, and fresh scent leaf, paired with toasted garlic sourdough.',
    ingredients: ['12-Hour Braised Oxtail', 'Ehuru Calabash Nutmeg', 'Uda Pods', 'Fresh Scent Leaf', 'Artisanal Garlic Toast'],
    prepTime: '25 mins',
    origin: 'Delta State Heritage',
    portions: [
      { name: 'Bowl of Solace', priceMultiplier: 1 },
      { name: 'Grand Tureen', priceMultiplier: 1.8 }
    ]
  },

  // --- DESSERTS ---
  {
    id: 'dessert-1',
    name: 'Caramelized Plantain Tart Tatin',
    slug: 'caramelized-plantain-tart-tatin',
    course: 'Desserts',
    price: 15500,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=1200&auto=format&fit=crop',
    story: 'A French classic meets West Africa’s most cherished fruit. Ripe sweet plantains are caramelized in palm sugar, butter, and dark rum, inverted over buttery puff pastry, and topped with Madagascar vanilla bean ice cream.',
    description: 'Warm caramelized sweet plantain baked upside down in French butter pastry, topped with Madagascar vanilla ice cream and roasted nutmeg crumbs.',
    ingredients: ['Ripe Sweet Plantains', 'French Butter Pastry', 'Dark Rum Caramel', 'Vanilla Bean Gelato', 'Nutmeg Dust'],
    prepTime: '20 mins',
    origin: 'Franco-African Fusion',
    portions: [
      { name: 'Individual Slice', priceMultiplier: 1 },
      { name: 'Whole Tart (Feeds 4)', priceMultiplier: 2.8 }
    ],
    isChefSpecial: true
  },
  {
    id: 'dessert-2',
    name: 'Chin Chin & White Chocolate Mille-Feuille',
    slug: 'chin-chin-mille-feuille',
    course: 'Desserts',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1200&auto=format&fit=crop',
    story: 'The crunchy holiday biscuit of Nigerian childhoods is refashioned into delicate puff wafers, layered with light white chocolate coconut mousse and edible 24k gold leaf.',
    description: 'Crisp nutmeg chin-chin pastry wafers layered with velvety coconut white chocolate mousse, finished with passionfruit reduction.',
    ingredients: ['Nutmeg Pastry Wafers', 'White Chocolate Coconut Mousse', 'Passionfruit Reduction', 'Edible Gold Leaf'],
    prepTime: '15 mins',
    origin: 'Lagos Fine Patisserie',
    portions: [
      { name: 'Single Mille-Feuille', priceMultiplier: 1 }
    ]
  },

  // --- BOISSONS ---
  {
    id: 'boisson-1',
    name: 'Hibiscus & Ginger Zobo Elixir',
    slug: 'hibiscus-zobo-elixir',
    course: 'Boissons',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1200&auto=format&fit=crop',
    story: 'Infused over 24 hours with wild dried organic hibiscus flowers, crushed ginger root, star anise, pineapple skin, and fresh mint, served over crystal clear ice spheres with dehydrated orange.',
    description: 'Artisanal cold-steeped hibiscus brew with spiced ginger infusion, sparkling mineral splash, and candied citrus.',
    ingredients: ['Organic Hibiscus Petals', 'Wild Ginger Root', 'Star Anise', 'Pineapple Essence', 'Sparkling Mineral Water'],
    prepTime: '5 mins',
    origin: 'Northern Nigeria & Sahelian Tradition',
    portions: [
      { name: 'Glass Service (350ml)', priceMultiplier: 1 },
      { name: 'Decanter (750ml)', priceMultiplier: 1.8 }
    ]
  },
  {
    id: 'boisson-2',
    name: 'Maison Heritage Chapman',
    slug: 'maison-heritage-chapman',
    course: 'Boissons',
    price: 9500,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1200&auto=format&fit=crop',
    story: 'Created in the iconic Ikoyi Club of Lagos in the mid-20th century. Our elevated version mixes sparkling citrus bitters, blood orange syrup, cucumber ribbon infusions, and Angostura aromatics.',
    description: 'Lagos socialite signature mocktail with blood orange syrup, sparkling citrus soda, cucumber ribbons, and aromatic bitters.',
    ingredients: ['Blood Orange Reduction', 'Sparkling Citrus Bitters', 'Cucumber Ribbons', 'Fresh Mint', 'Angostura Drops'],
    prepTime: '5 mins',
    origin: 'Ikoyi Club, Lagos (1930s)',
    portions: [
      { name: 'Tall Highball', priceMultiplier: 1 },
      { name: 'Punch Decanter', priceMultiplier: 1.9 }
    ]
  }
];

export const CHAPTERS = [
  {
    id: 'hero',
    number: '00',
    title: 'Maison Jollof',
    subtitle: 'From the pot to the table',
    description: 'An haute cuisine tribute to West African culinary heritage, crafted with European fine-dining finesse.'
  },
  {
    id: 'pot',
    number: '01',
    title: 'The Pot',
    subtitle: 'Ancestral Roots & Firewood Heritage',
    story: 'Before Jollof became a global icon, it was born from cast-iron pots cradled over red-hot hickory coals. In West Africa, the pot is a sacred hearth where clay, fire, and red pepper reduction weave stories passed down across centuries. At Maison Jollof, every dish honors this ancient alchemy.',
    quote: 'Food is the memory of a culture made edible.'
  },
  {
    id: 'fire',
    number: '02',
    title: 'The Fire',
    subtitle: 'The Craft of Patience',
    story: 'True luxury cannot be rushed. Our chefs spend 12 hours reduction-simmering stockfish and scotch bonnets, hand-grinding Hausa yaji spices, and infusing hickory smoke directly into long-grain rice grains. We bring Parisian precision to ancestral flame.',
    quote: 'Patience transforms humble ingredients into royalty.'
  },
  {
    id: 'table',
    number: '03',
    title: 'The Table',
    subtitle: 'The Art of Shared Communion',
    story: 'In West African tradition, to sit at the table is to become family. We present our dishes in elevated multi-course European formats — Entrées, Plats, Desserts, and Boissons — while preserving the soul of generous, joyful communal feasting.',
    quote: 'A table set with love is a home for every traveler.'
  },
  {
    id: 'order',
    number: '04',
    title: 'The Pre-Order',
    subtitle: 'Crafted Specially For Your Moment',
    story: 'Because every meal is prepared fresh from scratch for your specified date, we require pre-orders at least 48 hours in advance. Choose your course, reserve your time slot, and allow us to cook your feast.',
    steps: [
      { step: '01', title: 'Explore & Choose', desc: 'Browse our seasonal menu cards and curate your multi-course banquet.' },
      { step: '02', title: 'Reserve Your Date', desc: 'Select a delivery or pickup slot minimum 48 hours in advance.' },
      { step: '03', title: 'Savor & Share', desc: 'Receive your freshly smoked, hot feast presented in luxury packaging.' }
    ]
  }
];

export const NGO_NAME = 'Dr. Joseph Helping Children Community';

export type FeedingBudget = {
  title: string;
  lead: string;
  goal: string;
  supportHeading: string;
  perChild: { amount: string; label: string }[];
  forAllChildren: { amount: string; label: string }[];
  additionalHeading: string;
  additionalCosts: { emoji: string; label: string; amount: string }[];
  annualHeading: string;
  annualBreakdown: { label: string; amount: string }[];
  annualTotal: { emoji: string; label: string; amount: string };
  notes: string[];
};

export type Project = {
  number: string;
  slug: string;
  title: string;
  shortTitle: string;
  image?: string;
  imageAlt?: string;
  emoji?: string;
  description: string;
  highlight: string;
  introduction: string;
  whatWeProvide: string[];
  whyItMatters: string;
  feedingBudget?: FeedingBudget;
};

// One photo in the home page slideshow. The list itself is read from the
// public/images/slideshow folder by app/lib/slideshow.ts.
export type HeroSlide = {
  image: string;
  alt: string;
};

export const stats = [
  { value: '79', label: 'Children receiving daily care' },
  { value: '≈1,500', label: 'Students supported' },
  { value: '50', label: 'Farming families supported' },
  { value: '99', label: 'Elders receiving food' },
];

export const team = [
  {
    name: 'Dr. Joseph',
    role: 'Honorary Chairman',
    initials: 'DJ',
    description:
      'Provides guidance and support, connects us with donors and supporters, and promotes our mission internationally.',
  },
  {
    name: 'Samnang T.',
    role: 'Executive Director',
    initials: 'ST',
    description:
      'Provides overall leadership and oversees our projects, programs, staff, and daily operations.',
  },
  {
    name: 'Yoeurn Yan',
    role: 'IT & Website Supervisor',
    initials: 'YY',
    description:
      'Manages our website, technology, digital communication, and online information for supporters around the world.',
  },
  {
    name: 'SreyNit',
    role: 'Accountant',
    initials: 'SN',
    description:
      'Manages financial records, accounting, and administration to maintain responsible, transparent practices.',
  },
  {
    name: 'Bora',
    role: 'Center Coordinator',
    initials: 'B',
    description:
      'Oversees daily center activities and coordinates staff, programs, and community activities.',
  },
  {
    name: 'Yay Hoeun',
    role: "Children's Care Coordinator",
    initials: 'YH',
    description:
      "Supports the children's daily care and wellbeing, ensuring they receive attention, guidance, and support.",
  },
];

export const values = [
  ['Compassion', 'We care for others with kindness and respect.'],
  ['Integrity', 'We act honestly, responsibly, and transparently.'],
  ['Education', 'We believe education can open doors to a better future.'],
  ['Community', 'Lasting change is stronger when we work together.'],
  ['Hope', 'Every child deserves a chance to dream and build a better life.'],
];

export const projects: Project[] = [
  {
    number: '01',
    slug: 'children-support',
    title: 'Children Support',
    shortTitle: 'Care for children',
    image: '/images/children-2.jpg',
    imageAlt: 'The children in our care with our team at the center',
    description:
      'We support 79 children with three nutritious meals each day, clothing, school bags, school supplies, and healthcare support. Our goal is to help every child grow up healthy, safe, and cared for.',
    highlight: '79 children · 3 meals every day',
    introduction:
      'Consistent care gives children the stability they need to learn, build confidence, and imagine a hopeful future. Our local team is present every day to make sure essential needs do not interrupt childhood.',
    whatWeProvide: [
      'Three nutritious meals for every child, every day',
      'Clothing, school bags, and learning materials',
      'Healthcare support when a child needs it',
      'Daily care, encouragement, and a safe community',
    ],
    whyItMatters:
      'When food, care, and school essentials are dependable, children can focus their energy on learning, friendships, and growing well.',
    feedingBudget: {
      title: 'Feeding 79 Children with 3 Meals a Day',
      lead: '$3 a day can help provide 3 meals for one child: breakfast, lunch, and dinner.',
      goal:
        'Our goal is to provide children with regular meals including rice, vegetables, meat, fish, eggs, other nutritious foods, and clean drinking water, according to the available food budget.',
      supportHeading: 'Support for 79 Children',
      perChild: [
        { amount: '$3', label: 'a day/child' },
        { amount: '$21', label: 'a week/child' },
        { amount: '$90', label: 'a month/child' },
      ],
      forAllChildren: [
        { amount: '$237', label: 'per day for 79 children' },
        { amount: '$1,659', label: 'per week' },
        { amount: '$7,110', label: 'per 30-day month' },
        { amount: '$86,505', label: 'per year' },
      ],
      additionalHeading: 'Additional Monthly Costs',
      additionalCosts: [
        { emoji: '🔥', label: 'Cooking gas', amount: '$150/month' },
        { emoji: '🏠', label: 'House rental', amount: '$150/month' },
      ],
      annualHeading: 'Total Estimated Annual Cost',
      annualBreakdown: [
        { label: 'Food', amount: '$86,505' },
        { label: 'Cooking gas', amount: '$1,800' },
        { label: 'House rental', amount: '$1,800' },
      ],
      annualTotal: { emoji: '❤️', label: 'Total', amount: '$90,105 per year' },
      notes: [
        "This food budget is specifically for the children's 3 daily meals and clean drinking water. It does not include school uniforms, school bags, stationery, shoes or sandals, healthcare, dental care, or other educational and personal needs.",
        'Every contribution helps us continue providing children with regular meals and a safer, more stable environment to learn and grow.',
      ],
    },
  },
  {
    number: '02',
    slug: 'education-support',
    title: 'Education Support',
    shortTitle: 'Access to education',
    image: '/images/children-1.jpg',
    imageAlt: 'Children supported through our education program',
    description:
      'Approximately 1,500 children receive school supplies, uniforms, and bicycles. When possible, we also help students continue through university in Cambodia and internationally.',
    highlight: 'Approximately 1,500 students supported',
    introduction:
      'A notebook, a uniform, or a bicycle can decide whether a child is able to keep attending school. We remove practical barriers so students can continue learning for as long as possible.',
    whatWeProvide: [
      'School supplies and learning materials',
      'Uniforms for students who need them',
      'Bicycles that make long journeys to school possible',
      'University support when resources allow',
    ],
    whyItMatters:
      'Education creates choices. By helping children stay in school, we help them build skills that can strengthen their families and communities for years to come.',
  },
  {
    number: '03',
    slug: 'family-agriculture',
    title: 'Agricultural Support for Families',
    shortTitle: 'Family livelihoods',
    emoji: '🌱',
    description:
      'We help 50 families grow lemongrass as a source of income. We purchase their harvest and connect it with local markets, helping families build more sustainable livelihoods.',
    highlight: '50 families growing sustainable income',
    introduction:
      'Long-term change grows when families have a dependable way to earn. Our agriculture program combines practical growing support with a route to market for each harvest.',
    whatWeProvide: [
      'Support for families beginning lemongrass cultivation',
      'A dependable buyer for participating families’ harvests',
      'Connections between local production and local markets',
      'A practical path toward more stable household income',
    ],
    whyItMatters:
      'Income earned with dignity helps families make their own decisions, meet daily needs, and plan beyond the next meal or school term.',
  },
  {
    number: '04',
    slug: 'elderly-support',
    title: 'Support for Elderly People',
    shortTitle: 'Care for elders',
    image: '/images/food-support.jpg',
    imageAlt: 'Elderly community members receiving food support',
    description:
      'Each month, 99 elders in need receive 15 kg of rice, soy-based food products, and dried meat. This essential food helps reduce the burden of hunger.',
    highlight: '99 elders · Monthly essential food',
    introduction:
      'Older people are an important part of every community. We visit elders facing hardship and deliver dependable food support with care, conversation, and respect.',
    whatWeProvide: [
      '15 kg of rice for each participating elder',
      'Soy-based food products and dried meat',
      'A consistent monthly distribution',
      'Personal visits from our local community team',
    ],
    whyItMatters:
      'Reliable food reduces an immediate burden while regular visits remind older community members that they are seen, valued, and not alone.',
  },
];

export const impactUpdates = [
  {
    id: 'growing-with-hope',
    category: 'Children & education',
    title: 'From first care to university',
    excerpt:
      'The journey began with 45 children in 2010. Today, many are studying at university and some have already graduated.',
    image: '/images/children-2.jpg',
    imageAlt: 'Children standing together with members of the community team',
    metric: 'A journey since 2010',
  },
  {
    id: 'monthly-food-support',
    category: 'Elderly support',
    title: 'Essential food, delivered every month',
    excerpt:
      'Rice and nutritious food reach 99 elders through a regular distribution led by people who know the community.',
    image: '/images/hero.jpg',
    imageAlt: 'Elderly community members with food support and the local team',
    metric: '99 elders supported',
  },
  {
    id: 'family-livelihoods',
    category: 'Family livelihoods',
    title: 'Helping local income take root',
    excerpt:
      'Fifty families grow lemongrass with a dependable buyer and a stronger connection to local markets.',
    image: '/images/distribution.jpg',
    imageAlt: 'A community gathering during a local support activity',
    metric: '50 farming families',
  },
];

export const volunteerWays = [
  ['📚', 'Teach English to children'],
  ['🎨', 'Teach drawing and painting'],
  ['🌱', 'Grow vegetables and support community projects'],
  ['👧', 'Spend time with and encourage the children'],
  ['🤝', 'Share your skills and experience'],
  ['❤️', 'Help in a way that matches your abilities'],
];

export type Activity = {
  id: string;
  kind: 'photo' | 'video';
  category: string;
  title: string;
  description: string;
  src: string;
  poster?: string;
  alt: string;
};

export const activities: Activity[] = [
  {
    id: 'new-footballs-and-toys',
    kind: 'video',
    category: 'Gift day',
    title: 'New footballs and toys',
    description: 'The children try out new footballs and toy trucks on the center floor, then gather round as a visiting supporter hands a gift to every child.',
    src: '/videos/activity-footballs-and-toys.mp4',
    poster: '/images/activity-footballs-and-toys-poster.jpg',
    alt: 'Short video of children playing with new footballs and toy trucks inside the center, then receiving gifts from a visiting supporter',
  },
  {
    id: 'opening-new-school-bags',
    kind: 'video',
    category: 'Gift day',
    title: 'Opening new school bags',
    description: 'A visiting supporter unpacks a new school bag with the children while our team helps hand out bags and toys around the room.',
    src: '/videos/activity-school-bags.mp4',
    poster: '/images/activity-school-bags-poster.jpg',
    alt: 'Short video of a visiting supporter opening a new school bag surrounded by children at the center',
  },
  {
    id: 'all-aboard-the-truck',
    kind: 'video',
    category: 'Community visit',
    title: 'All aboard the truck',
    description: 'The children squeeze into the green truck with our team for a ride together, waving and cheering the whole way.',
    src: '/videos/activity-truck-ride.mp4',
    poster: '/images/activity-truck-ride-poster.jpg',
    alt: 'Short video filmed inside the green truck as the children wave and make peace signs with a member of our team',
  },
  {
    id: 'lunch-together',
    kind: 'photo',
    category: 'Mealtime',
    title: 'Lunch together',
    description: 'The children sit together for a shared meal of bread and soup, served by our team at the center.',
    src: '/images/activity-shared-meal.jpg',
    alt: 'Children seated in rows on the floor of the center sharing a meal of bread and soup',
  },
  {
    id: 'mealtime-up-close',
    kind: 'video',
    category: 'Mealtime',
    title: 'Mealtime, up close',
    description: 'A short clip from lunch at the center. Every child receives a warm meal each day.',
    src: '/videos/activity-mealtime.mp4',
    poster: '/images/activity-mealtime-poster.jpg',
    alt: 'Short video of children eating lunch together on the floor of the center',
  },
  {
    id: 'visit-from-a-supporter',
    kind: 'video',
    category: 'Community visit',
    title: 'A visit from a supporter',
    description: 'The children gather to welcome a visiting supporter and spend time together at the center.',
    src: '/videos/activity-visitor-gathering.mp4',
    poster: '/images/activity-visitor-gathering-poster.jpg',
    alt: 'Short video of children gathered with a visiting supporter at the center',
  },
];

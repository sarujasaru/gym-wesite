'use client';

export interface Service {
  _id: string;
  title: string;
  description: string;
  iconName: string;
  coverImage: string;
}

export interface Trainer {
  _id: string;
  name: string;
  specialization: string[];
  experienceYears: number;
  bio: string;
  contactPhone: string;
  image: string;
}

export interface MembershipPlan {
  _id: string;
  name: string;
  description: string;
  priceLKR: number;
  billingPeriod: string;
  features: string[];
  badge?: string;
}

export interface Schedule {
  _id: string;
  className: string;
  trainerId: string; // references trainer _id
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  capacity: number;
  enrolledCount: number;
}

export interface Booking {
  _id: string;
  memberName: string;
  memberEmail: string;
  scheduleId: string; // references schedule _id
  bookingDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface GalleryItem {
  _id: string;
  title: string;
  category: 'gym' | 'equipment' | 'success-story';
  image: string;
  description?: string;
}

export interface Promotion {
  _id: string;
  title: string;
  description: string;
  promoCode?: string;
  discountText: string;
  validUntil: string;
  active: boolean;
}

export interface Member {
  _id: string;
  name: string;
  email: string;
  phone: string;
  planId?: string; // references membership plan _id
  status: 'active' | 'inactive';
  joinedDate: string;
}

export interface Payment {
  _id: string;
  memberEmail: string;
  memberName: string;
  planName: string;
  amountLKR: number;
  paymentDate: string;
  paymentMethod: string;
  status: 'completed' | 'pending';
}

// Initial default data representing the state populated from Sanity schemas
export const DEFAULT_SERVICES: Service[] = [
  {
    _id: 'srv-1',
    title: 'Strength & Conditioning',
    description: 'Expert-guided heavy compound lifts, olympic weightlifting, and structural hypertrophy programs using premium Sri Lankan-crafted and imported equipment.',
    iconName: 'Dumbbell',
    coverImage: 'https://picsum.photos/seed/strength/800/600',
  },
  {
    _id: 'srv-2',
    title: 'High Intensity Interval Arena',
    description: 'Blazing group classes designed to supercharge your metabolism, increase vo2 max, and torch body fat with expert cardiovascular coaching.',
    iconName: 'Flame',
    coverImage: 'https://picsum.photos/seed/hiit/800/600',
  },
  {
    _id: 'srv-3',
    title: 'One-on-One Elite Coaching',
    description: 'Fully personalized, highly accountable fitness guidance covering exercise biomechanics, posture adjustment, and tailored Sri Lankan diet planning.',
    iconName: 'Award',
    coverImage: 'https://picsum.photos/seed/coach/800/600',
  },
  {
    _id: 'srv-4',
    title: 'Combat Cardio & Boxing',
    description: 'Develop fast footwork, punching power, and core endurance in our specialized combat training zones. Perfect for self-defense and stress relief.',
    iconName: 'Shield',
    coverImage: 'https://picsum.photos/seed/boxing/800/600',
  },
  {
    _id: 'srv-5',
    title: 'Post-Workout Recuperation',
    description: 'A dedicated steam lounge, herbal recovery tea station, and deep tissue sports therapy sessions to rebuild muscle fibers and prevent injury.',
    iconName: 'Sparkles',
    coverImage: 'https://picsum.photos/seed/recovery/800/600',
  }
];

export const DEFAULT_TRAINERS: Trainer[] = [
  {
    _id: 'tr-1',
    name: 'Roshan De Silva',
    specialization: ['Bodybuilding', 'Powerlifting', 'Strength Mechanics'],
    experienceYears: 8,
    bio: 'Former National Weightlifting Silver Medalist in Sri Lanka. Dedicated to helping individuals achieve absolute physical strength and safe mechanical efficiency.',
    contactPhone: '+94 77 123 4567',
    image: 'https://picsum.photos/seed/roshan/400/500',
  },
  {
    _id: 'tr-2',
    name: 'Suresh Kumara',
    specialization: ['HIIT Conditioning', 'Calisthenics', 'Functional Athletics'],
    experienceYears: 6,
    bio: 'Athletic conditioning expert specialized in fat loss, metabolic acceleration, and agile movement patterns. Known for highly motivating, intense class vibes.',
    contactPhone: '+94 71 987 6543',
    image: 'https://picsum.photos/seed/suresh/400/500',
  },
  {
    _id: 'tr-3',
    name: 'Anjali Perera',
    specialization: ['Power Yoga', 'Core Rehabilitation', 'Nutrition Consulting'],
    experienceYears: 5,
    bio: 'Holistic wellness coach focusing on deep core stability, flexibility, and sustainable Sri Lankan diet programming for ultimate physiological balance.',
    contactPhone: '+94 76 555 4321',
    image: 'https://picsum.photos/seed/anjali/400/500',
  }
];

export const DEFAULT_PLANS: MembershipPlan[] = [
  {
    _id: 'plan-1',
    name: 'Lanka Basic Plan',
    description: 'Essential access for individual training and foundational workouts.',
    priceLKR: 4500,
    billingPeriod: 'monthly',
    features: [
      'Full Gym floor & weights access',
      'Locker room & shower access',
      '1 Initial physical assessment',
      'Anytime access (05:00 AM - 10:00 PM)'
    ]
  },
  {
    _id: 'plan-2',
    name: 'Ceylon Iron Elite',
    description: 'Our most popular tier combining weights access and premium personalized coaching.',
    priceLKR: 8500,
    billingPeriod: 'monthly',
    features: [
      'Full Gym floor, Cardio & Boxing access',
      '2 Personal trainer consultations / month',
      'Custom Sri Lankan diet & meal layout',
      'Unlimited group class access',
      'Free steam room access'
    ],
    badge: 'Popular'
  },
  {
    _id: 'plan-3',
    name: 'Sinha Strength VIP',
    description: 'The ultimate luxury fitness experience with complete premium coaching and recovery privileges.',
    priceLKR: 15000,
    billingPeriod: 'monthly',
    features: [
      'All access in all centers (Colombo, Galle, Kandy)',
      'Unlimited group & combat classes',
      '1-on-1 private trainer (2 sessions per week)',
      'Weekly biosignature/body fat analysis',
      'Dedicated private VIP locker & laundry service',
      'Unlimited steam room & recovery zone access'
    ],
    badge: 'Elite'
  }
];

export const DEFAULT_SCHEDULES: Schedule[] = [
  {
    _id: 'sch-1',
    className: 'Compound Powerlifting',
    trainerId: 'tr-1',
    dayOfWeek: 'Monday',
    startTime: '06:00 AM',
    endTime: '07:30 AM',
    durationMinutes: 90,
    capacity: 15,
    enrolledCount: 12,
  },
  {
    _id: 'sch-2',
    className: 'Blazing HIIT Burnout',
    trainerId: 'tr-2',
    dayOfWeek: 'Tuesday',
    startTime: '05:30 PM',
    endTime: '06:30 PM',
    durationMinutes: 60,
    capacity: 25,
    enrolledCount: 18,
  },
  {
    _id: 'sch-3',
    className: 'Core & Flex Yoga',
    trainerId: 'tr-3',
    dayOfWeek: 'Wednesday',
    startTime: '07:00 AM',
    endTime: '08:00 AM',
    durationMinutes: 60,
    capacity: 20,
    enrolledCount: 9,
  },
  {
    _id: 'sch-4',
    className: 'Combat Box Conditioning',
    trainerId: 'tr-2',
    dayOfWeek: 'Thursday',
    startTime: '06:00 PM',
    endTime: '07:00 PM',
    durationMinutes: 60,
    capacity: 20,
    enrolledCount: 15,
  },
  {
    _id: 'sch-5',
    className: 'Sinha Strength Gladiator',
    trainerId: 'tr-1',
    dayOfWeek: 'Friday',
    startTime: '05:30 PM',
    endTime: '07:00 PM',
    durationMinutes: 90,
    capacity: 15,
    enrolledCount: 14,
  }
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    _id: 'gal-1',
    title: 'Our Premium Lifting Platform',
    category: 'gym',
    image: 'https://picsum.photos/seed/lifting/800/500',
    description: 'Professional grade competition-spec lifting racks, platforms, and solid rubber bumper plates.'
  },
  {
    _id: 'gal-2',
    title: 'High-Performance Cardio Zone',
    category: 'gym',
    image: 'https://picsum.photos/seed/cardio/800/500',
    description: 'Rowers, ski-ergs, assault bikes, and standard curve treadmills looking out towards the cityscape.'
  },
  {
    _id: 'gal-3',
    title: 'Premium Dumbbells & Racks',
    category: 'equipment',
    image: 'https://picsum.photos/seed/dumbbells/800/500',
    description: 'Precision cast-iron dumbbell set ranging from 2.5 kg up to 60 kg for extreme hypertrophy loads.'
  },
  {
    _id: 'gal-4',
    title: 'Elite Plate-Loaded Machines',
    category: 'equipment',
    image: 'https://picsum.photos/seed/machines/800/500',
    description: 'Biomedically aligned chest-press, leg-press, and hack-squat machines for safe isolation stimulus.'
  },
  {
    _id: 'gal-5',
    title: 'Dinesh Kumara Transformation',
    category: 'success-story',
    image: 'https://picsum.photos/seed/transform1/800/500',
    description: 'Dinesh dropped 24 kg, stabilized his blood pressure, and gained incredible core compound strength in 8 months.'
  },
  {
    _id: 'gal-6',
    title: 'Sanduni Perera Fitness Journey',
    category: 'success-story',
    image: 'https://picsum.photos/seed/transform2/800/500',
    description: 'From chronic lower back discomfort to squatting bodyweight! Sanduni achieved supreme functional core safety.'
  }
];

export const DEFAULT_PROMOTIONS: Promotion[] = [
  {
    _id: 'promo-1',
    title: 'Esala Festival Strength Offer',
    description: 'Get a heavy 20% discount on all annual elite plans, plus free initial postural analysis and a Ceylon Iron shirt!',
    promoCode: 'FESTIVE20',
    discountText: '20% OFF ANNUAL PLANS',
    validUntil: '2026-08-31',
    active: true,
  },
  {
    _id: 'promo-2',
    title: 'Colombo Gym Launch Offer',
    description: 'First 50 signups pay zero registration admission fee. Join our community today and claim your free trial pack.',
    promoCode: 'COLOMBOFIT',
    discountText: 'SAVE RS. 5,000 ADMISSION',
    validUntil: '2026-07-25',
    active: true,
  }
];

export const DEFAULT_MEMBERS: Member[] = [
  {
    _id: 'mem-1',
    name: 'Janaka Gunawardene',
    email: 'janaka@gmail.com',
    phone: '+94 77 123 1111',
    planId: 'plan-2',
    status: 'active',
    joinedDate: '2026-02-15'
  },
  {
    _id: 'mem-2',
    name: 'Dilhara Jayasinghe',
    email: 'dilhara@gmail.com',
    phone: '+94 71 456 2222',
    planId: 'plan-1',
    status: 'active',
    joinedDate: '2026-04-10'
  },
  {
    _id: 'mem-3',
    name: 'Thisara Perera',
    email: 'thisara@gmail.com',
    phone: '+94 76 789 3333',
    planId: 'plan-3',
    status: 'inactive',
    joinedDate: '2025-11-20'
  }
];

export const DEFAULT_PAYMENTS: Payment[] = [
  {
    _id: 'pay-1',
    memberEmail: 'janaka@gmail.com',
    memberName: 'Janaka Gunawardene',
    planName: 'Ceylon Iron Elite',
    amountLKR: 8500,
    paymentDate: '2026-06-15',
    paymentMethod: 'Bank Transfer (BOC)',
    status: 'completed'
  },
  {
    _id: 'pay-2',
    memberEmail: 'dilhara@gmail.com',
    memberName: 'Dilhara Jayasinghe',
    planName: 'Lanka Basic Plan',
    amountLKR: 4500,
    paymentDate: '2026-06-20',
    paymentMethod: 'Credit Card (Sampath Bank)',
    status: 'completed'
  },
  {
    _id: 'pay-3',
    memberEmail: 'thisara@gmail.com',
    memberName: 'Thisara Perera',
    planName: 'Sinha Strength VIP',
    amountLKR: 15000,
    paymentDate: '2026-06-01',
    paymentMethod: 'Cash',
    status: 'completed'
  }
];

export const DEFAULT_BOOKINGS: Booking[] = [
  {
    _id: 'bk-1',
    memberName: 'Janaka Gunawardene',
    memberEmail: 'janaka@gmail.com',
    scheduleId: 'sch-1',
    bookingDate: '2026-07-06',
    status: 'confirmed'
  },
  {
    _id: 'bk-2',
    memberName: 'Dilhara Jayasinghe',
    memberEmail: 'dilhara@gmail.com',
    scheduleId: 'sch-2',
    bookingDate: '2026-07-07',
    status: 'pending'
  }
];

// LocalStorage helpers
const IS_SERVER = typeof window === 'undefined';

export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (IS_SERVER) return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (IS_SERVER) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error setting localStorage key "${key}":`, error);
  }
}

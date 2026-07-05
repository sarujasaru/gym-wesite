/**
 * Sanity.io Database Schemas for Ceylon Iron Club Gym.
 * Copy and paste these schema definitions into your Sanity Studio schemas folder.
 * Path: schemas/schema.js or schemas/index.ts in your Sanity project.
 */

export const ServiceSchema = {
  name: 'service',
  title: 'Gym Services',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'iconName',
      title: 'Lucide Icon Name',
      type: 'string',
      description: 'e.g., Dumbbell, Flame, Heart, Activity, Target',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }
  ]
};

export const TrainerSchema = {
  name: 'trainer',
  title: 'Trainers',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'specialization',
      title: 'Specializations',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. Bodybuilding, Strength Training, Cardio, Nutrition',
    },
    {
      name: 'experienceYears',
      title: 'Years of Experience',
      type: 'number',
      validation: (Rule: any) => Rule.min(0),
    },
    {
      name: 'bio',
      title: 'Biography / Background',
      type: 'text',
    },
    {
      name: 'contactPhone',
      title: 'Phone Number',
      type: 'string',
    }
  ]
};

export const PlanSchema = {
  name: 'membershipPlan',
  title: 'Membership Plans',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'priceLKR',
      title: 'Price (LKR)',
      type: 'number',
      description: 'Price in Sri Lankan Rupees',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'billingPeriod',
      title: 'Billing Period',
      type: 'string',
      options: {
        list: [
          { title: 'Monthly', value: 'monthly' },
          { title: 'Quarterly', value: 'quarterly' },
          { title: 'Annually', value: 'annually' },
          { title: 'One-Time', value: 'one-time' }
        ]
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'features',
      title: 'Included Features',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'badge',
      title: 'Badge / Tag',
      type: 'string',
      description: 'e.g., Popular, Best Value, New',
    }
  ]
};

export const ScheduleSchema = {
  name: 'schedule',
  title: 'Class Schedule',
  type: 'document',
  fields: [
    {
      name: 'className',
      title: 'Class Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'trainer',
      title: 'Trainer',
      type: 'reference',
      to: [{ type: 'trainer' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'dayOfWeek',
      title: 'Day of Week',
      type: 'string',
      options: {
        list: [
          { title: 'Monday', value: 'Monday' },
          { title: 'Tuesday', value: 'Tuesday' },
          { title: 'Wednesday', value: 'Wednesday' },
          { title: 'Thursday', value: 'Thursday' },
          { title: 'Friday', value: 'Friday' },
          { title: 'Saturday', value: 'Saturday' },
          { title: 'Sunday', value: 'Sunday' }
        ]
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'startTime',
      title: 'Start Time',
      type: 'string',
      description: 'e.g. 06:00 AM, 05:30 PM',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'endTime',
      title: 'End Time',
      type: 'string',
      description: 'e.g. 07:00 AM, 06:30 PM',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'durationMinutes',
      title: 'Duration (Minutes)',
      type: 'number',
      validation: (Rule: any) => Rule.min(10),
    },
    {
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      validation: (Rule: any) => Rule.min(1),
    }
  ]
};

export const BookingSchema = {
  name: 'booking',
  title: 'Class Bookings',
  type: 'document',
  fields: [
    {
      name: 'memberName',
      title: 'Member Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'memberEmail',
      title: 'Member Email',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'classSchedule',
      title: 'Class / Schedule',
      type: 'reference',
      to: [{ type: 'schedule' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'bookingDate',
      title: 'Booking Date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Cancelled', value: 'cancelled' }
        ]
      },
      initialValue: 'pending',
    }
  ]
};

export const GallerySchema = {
  name: 'gallery',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Gym Facility', value: 'gym' },
          { title: 'Equipment', value: 'equipment' },
          { title: 'Success Story', value: 'success-story' }
        ]
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
    }
  ]
};

export const PromotionSchema = {
  name: 'promotion',
  title: 'Offers & Promotions',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Offer Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Offer Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'promoCode',
      title: 'Promo Code',
      type: 'string',
    },
    {
      name: 'discountText',
      title: 'Discount Text',
      type: 'string',
      description: 'e.g. 20% OFF, Buy 1 Get 1, No Admission Fee',
    },
    {
      name: 'validUntil',
      title: 'Valid Until',
      type: 'date',
    },
    {
      name: 'active',
      title: 'Active Now',
      type: 'boolean',
      initialValue: true,
    }
  ]
};

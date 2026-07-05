import { defineType, defineField } from "sanity";

export default defineType({
  name: "trainer",
  title: "Trainers / Coaches",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "specialization",
      title: "Specializations",
      type: "array",
      of: [{ type: "string" }],
      description: 'e.g. "Bodybuilding", "Powerlifting", "Strength Mechanics"',
    }),
    defineField({
      name: "experienceYears",
      title: "Years of Experience",
      type: "number",
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [{ type: "string" }],
      description: 'e.g. "ISSA Certified PT", "CPT", "NSCA-CSCS"',
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
    }),
    defineField({
      name: "instagram",
      title: "Instagram Handle",
      type: "string",
      description: 'e.g. "@trainer_handle" (optional)',
    }),
    defineField({
      name: "image",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "isActive",
      title: "Active (Show on Website)",
      type: "boolean",
      initialValue: true,
      description: "Uncheck to hide this coach without deleting",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first on the website",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "specialization",
      media: "image",
      active: "isActive",
    },
    prepare({ title, subtitle, media, active }) {
      const tag = active === false ? " (Hidden)" : "";
      return {
        title: `${title}${tag}`,
        subtitle: Array.isArray(subtitle) ? subtitle.join(" · ") : subtitle,
        media,
      };
    },
  },
});
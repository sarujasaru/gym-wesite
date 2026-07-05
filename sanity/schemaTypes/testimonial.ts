import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Member Name",
      type: "string",
    }),
    defineField({
      name: "review",
      title: "Review Text",
      type: "text",
    }),
    defineField({
      name: "rating",
      title: "Rating (1–5)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5).integer(),
    }),
    defineField({
      name: "avatar",
      title: "Avatar Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "planName",
      title: "Membership Plan",
      type: "string",
      description: 'e.g. "Iron Club Pro" — shown under reviewer name',
    }),
    defineField({
      name: "isApproved",
      title: "Approved (Show on Website)",
      type: "boolean",
      initialValue: false,
      description: "Only approved testimonials appear on the website",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "review",
      media: "avatar",
      approved: "isApproved",
    },
    prepare({ title, subtitle, media, approved }) {
      const tag = approved ? "✅ " : "⏳ ";
      return {
        title: `${tag}${title}`,
        subtitle: subtitle?.slice(0, 60),
        media,
      };
    },
  },
});
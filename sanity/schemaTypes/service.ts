import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Services",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "iconName",
      title: "Icon",
      type: "string",
      description: "Icon shown on the service card",
      options: {
        list: [
          { title: "Dumbbell", value: "Dumbbell" },
          { title: "Flame", value: "Flame" },
          { title: "Award", value: "Award" },
          { title: "Shield", value: "Shield" },
          { title: "Sparkles", value: "Sparkles" },
        ],
      },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
import { defineType, defineField } from "sanity";

export default defineType({
  name: "membership",
  title: "Membership Plans",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Plan Name",
      type: "string",
      description: 'e.g. "Starter Pack", "Iron Club Pro", "Elite Unlimited"',
    }),
    defineField({
      name: "description",
      title: "Plan Description",
      type: "text",
    }),
    defineField({
      name: "priceLKR",
      title: "Price (LKR)",
      type: "number",
      description: "Price in Sri Lankan Rupees",
    }),
    defineField({
      name: "billingPeriod",
      title: "Billing Period",
      type: "string",
      description: 'e.g. "month", "3 months", "year"',
    }),
    defineField({
      name: "features",
      title: "Included Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "badge",
      title: "Badge Label",
      type: "string",
      description: 'Optional highlight e.g. "Popular" or "Elite"',
      options: {
        list: [
          { title: "Popular", value: "Popular" },
          { title: "Elite", value: "Elite" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
    defineField({
      name: "isActive",
      title: "Active (Show on Website)",
      type: "boolean",
      initialValue: true,
      description: "Uncheck to hide this plan without deleting it",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured / Recommended",
      type: "boolean",
      initialValue: false,
      description: "Highlight this plan as the recommended choice",
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
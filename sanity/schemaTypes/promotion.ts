import { defineType, defineField } from "sanity";

export default defineType({
  name: "promotion",
  title: "Promotions",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Promotion Title",
      type: "string",
      description: 'e.g. "Student Iron Pack — 30% Off"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "promoCode",
      title: "Promo Code",
      type: "string",
      description: "Leave empty for automatically applied discounts",
    }),
    defineField({
      name: "discountText",
      title: "Discount Badge Text",
      type: "string",
      description: 'Shown on the badge e.g. "30% OFF" or "FREE MONTH"',
    }),
    defineField({
      name: "validUntil",
      title: "Valid Until",
      type: "date",
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Only active promotions are shown on the website",
    }),
  ],
});

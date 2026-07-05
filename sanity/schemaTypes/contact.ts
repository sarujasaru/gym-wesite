import { defineType, defineField } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact & Branches",
  type: "document",
  fields: [
    defineField({
      name: "generalEmail",
      title: "General Email",
      type: "string",
    }),
    defineField({
      name: "hotlinePhone",
      title: "National Hotline Phone",
      type: "string",
      description: 'e.g. "+94 11 234 5000"',
    }),
    defineField({
      name: "hotlineHours",
      title: "Hotline Hours",
      type: "string",
      description: 'e.g. "06:00 AM – 08:00 PM"',
    }),
    defineField({
      name: "branches",
      title: "Branch Locations",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Branch Name", type: "string" }),
            defineField({ name: "address", title: "Address", type: "text" }),
            defineField({ name: "phone", title: "Phone", type: "string" }),
            defineField({
              name: "hours",
              title: "Operating Hours",
              type: "string",
              description: 'e.g. "05:00 AM – 10:00 PM"',
            }),
          ],
        },
      ],
    }),
  ],
});
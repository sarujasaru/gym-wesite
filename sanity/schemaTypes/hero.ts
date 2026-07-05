import { defineType, defineField } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "badge",
      title: "Badge Text",
      type: "string",
      description: 'e.g. "Sri Lanka\'s Ultimate Strength Elite Club"',
    }),
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      description: 'Main heading e.g. "Forge Your Best Self Today."',
    }),
    defineField({
      name: "titleAccent",
      title: "Headline Accent (coloured part)",
      type: "string",
      description: 'The highlighted portion e.g. "Self Today."',
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle / Description",
      type: "text",
    }),
    defineField({
      name: "primaryButtonText",
      title: "Primary Button Text",
      type: "string",
      description: 'e.g. "JOIN AS A MEMBER"',
    }),
    defineField({
      name: "secondaryButtonText",
      title: "Secondary Button Text",
      type: "string",
      description: 'e.g. "VIEW CLASS SCHEDULE"',
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "stats",
      title: "Statistics Bar",
      type: "array",
      description: 'e.g. 1200+ Active Lifters, 15+ Elite Mentors, 3 SL Centers',
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string", description: 'e.g. "1200+"' }),
            defineField({ name: "label", title: "Label", type: "string", description: 'e.g. "ACTIVE LIFTERS"' }),
          ],
        },
      ],
    }),
    defineField({
      name: "philosophyBadge",
      title: "Philosophy Badge",
      type: "string",
      description: 'e.g. "LION HEART PHILOSOPHY"',
    }),
    defineField({
      name: "philosophyQuote",
      title: "Philosophy Main Quote",
      type: "string",
    }),
    defineField({
      name: "philosophySubquote",
      title: "Philosophy Sub-Quote",
      type: "text",
    }),
    defineField({
      name: "philosophyBody",
      title: "Philosophy Body Text",
      type: "text",
    }),
  ],
});
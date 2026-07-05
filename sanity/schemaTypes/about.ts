import { defineType, defineField } from "sanity";

export default defineType({
  name: "about",
  title: "About Section",
  type: "document",
  fields: [
    defineField({
      name: "establishedBadge",
      title: "Established Badge",
      type: "string",
      description: 'e.g. "ESTABLISHED 2021 • COLOMBO"',
    }),
    defineField({
      name: "historyImage",
      title: "History Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "historyParagraph1",
      title: "History Paragraph 1",
      type: "text",
    }),
    defineField({
      name: "historyParagraph2",
      title: "History Paragraph 2",
      type: "text",
    }),
    defineField({
      name: "historyParagraph3",
      title: "History Paragraph 3",
      type: "text",
    }),
    defineField({
      name: "missionText",
      title: "Mission Text",
      type: "text",
    }),
    defineField({
      name: "visionText",
      title: "Vision Text",
      type: "text",
    }),
  ],
});
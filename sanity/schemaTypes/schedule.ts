import { defineType, defineField } from "sanity";

export default defineType({
  name: "schedule",
  title: "Class Schedule",
  type: "document",
  fields: [
    defineField({
      name: "className",
      title: "Class Name",
      type: "string",
      description: 'e.g. "Morning Power Lift", "HIIT Blast"',
    }),
    defineField({
      name: "trainer",
      title: "Trainer",
      type: "reference",
      to: [{ type: "trainer" }],
    }),
    defineField({
      name: "dayOfWeek",
      title: "Day of Week",
      type: "string",
      options: {
        list: [
          { title: "Monday", value: "Monday" },
          { title: "Tuesday", value: "Tuesday" },
          { title: "Wednesday", value: "Wednesday" },
          { title: "Thursday", value: "Thursday" },
          { title: "Friday", value: "Friday" },
          { title: "Saturday", value: "Saturday" },
          { title: "Sunday", value: "Sunday" },
        ],
      },
    }),
    defineField({
      name: "startTime",
      title: "Start Time",
      type: "string",
      description: 'e.g. "06:00 AM"',
    }),
    defineField({
      name: "endTime",
      title: "End Time",
      type: "string",
      description: 'e.g. "07:00 AM"',
    }),
    defineField({
      name: "durationMinutes",
      title: "Duration (minutes)",
      type: "number",
    }),
    defineField({
      name: "capacity",
      title: "Max Capacity",
      type: "number",
      description: "Maximum number of members per session",
    }),
    defineField({
      name: "location",
      title: "Location / Room",
      type: "string",
      description: 'e.g. "Main Floor", "Colombo Branch", "Studio A"',
    }),
    defineField({
      name: "description",
      title: "Session Description",
      type: "text",
      rows: 2,
      description: "Short description shown to members when booking",
    }),
    defineField({
      name: "isActive",
      title: "Active (Accepting Bookings)",
      type: "boolean",
      initialValue: true,
      description: "Uncheck to pause bookings for this class",
    }),
  ],
  orderings: [
    {
      title: "Day of Week",
      name: "dayAsc",
      by: [{ field: "dayOfWeek", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "className",
      day: "dayOfWeek",
      start: "startTime",
      active: "isActive",
    },
    prepare({ title, day, start, active }) {
      const tag = active === false ? " (Paused)" : "";
      return {
        title: `${title}${tag}`,
        subtitle: `${day} at ${start}`,
      };
    },
  },
});
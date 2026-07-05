import { defineType, defineField } from "sanity";

export default defineType({
  name: "member",
  title: "Members",
  type: "document",
  fields: [
    defineField({
      name: "memberId",
      title: "Member ID",
      type: "string",
      description: 'Unique reference number e.g. "MEM-0001"',
    }),
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      description: 'e.g. "+94 77 123 4567"',
    }),
    defineField({
      name: "membershipPlan",
      title: "Membership Plan",
      type: "reference",
      to: [{ type: "membership" }],
      description: "Assigned membership package",
    }),
    defineField({
      name: "status",
      title: "Membership Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Inactive", value: "inactive" },
          { title: "Suspended", value: "suspended" },
        ],
        layout: "radio",
      },
      initialValue: "active",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "joinedDate",
      title: "Joined Date",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
    }),
    defineField({
      name: "emergencyContact",
      title: "Emergency Contact",
      type: "string",
      description: "Emergency contact name and phone",
    }),
    defineField({
      name: "notes",
      title: "Admin Notes",
      type: "text",
      rows: 3,
      description: "Internal notes visible only in Studio",
    }),
  ],
  orderings: [
    {
      title: "Joined Date (Newest First)",
      name: "joinedDateDesc",
      by: [{ field: "joinedDate", direction: "desc" }],
    },
    {
      title: "Name A–Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      status: "status",
    },
    prepare({ title, subtitle, status }) {
      const statusIcon =
        status === "active" ? "🟢" : status === "suspended" ? "🔴" : "🟡";
      return {
        title: `${statusIcon} ${title}`,
        subtitle,
      };
    },
  },
});

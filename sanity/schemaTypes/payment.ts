import { defineType, defineField } from "sanity";

export default defineType({
  name: "payment",
  title: "Payments",
  type: "document",
  fields: [
    defineField({
      name: "member",
      title: "Member",
      type: "reference",
      to: [{ type: "member" }],
      description: "Link to the paying member",
    }),
    defineField({
      name: "memberName",
      title: "Member Name",
      type: "string",
      description: "Name at time of payment (kept if member record changes)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "memberEmail",
      title: "Member Email",
      type: "string",
    }),
    defineField({
      name: "membershipPlan",
      title: "Membership Plan",
      type: "reference",
      to: [{ type: "membership" }],
      description: "Plan paid for",
    }),
    defineField({
      name: "planName",
      title: "Plan Name",
      type: "string",
      description: "Snapshot of plan name at payment time",
    }),
    defineField({
      name: "amountLKR",
      title: "Amount Paid (LKR)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "paymentDate",
      title: "Payment Date",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          { title: "Cash", value: "Cash" },
          { title: "Bank Transfer", value: "Bank Transfer" },
          { title: "Card (Visa / Master)", value: "Card" },
          { title: "Online Transfer", value: "Online Transfer" },
          { title: "Cheque", value: "Cheque" },
        ],
        layout: "radio",
      },
      initialValue: "Cash",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Payment Status",
      type: "string",
      options: {
        list: [
          { title: "Completed ✅", value: "completed" },
          { title: "Pending ⏳", value: "pending" },
          { title: "Failed ❌", value: "failed" },
        ],
        layout: "radio",
      },
      initialValue: "completed",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "receiptNumber",
      title: "Receipt / Invoice Number",
      type: "string",
      description: 'Optional reference number e.g. "INV-2024-0042"',
    }),
    defineField({
      name: "coversPeriod",
      title: "Covers Period",
      type: "string",
      description: 'Month(s) this payment covers e.g. "July 2025"',
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "text",
      rows: 2,
      description: "Any additional notes about this payment",
    }),
  ],
  orderings: [
    {
      title: "Payment Date (Newest First)",
      name: "paymentDateDesc",
      by: [{ field: "paymentDate", direction: "desc" }],
    },
    {
      title: "Amount (Highest First)",
      name: "amountDesc",
      by: [{ field: "amountLKR", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "memberName",
      amount: "amountLKR",
      date: "paymentDate",
      status: "status",
    },
    prepare({ title, amount, date, status }) {
      const icon =
        status === "completed" ? "✅" : status === "failed" ? "❌" : "⏳";
      return {
        title: `${icon} ${title || "Unknown Member"}`,
        subtitle: `Rs. ${amount?.toLocaleString() ?? "—"} — ${date ?? "No date"}`,
      };
    },
  },
});

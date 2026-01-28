import { FieldSchema } from "./types";

export const userRegistrationSchema: FieldSchema[] = [
  {
    type: "text",
    name: "fullName",
    label: "Full Name",
    required: true,
    placeholder: "Enter your full name",
  },
  {
    type: "text",
    name: "email",
    label: "Email Address",
    required: true,
    placeholder: "Enter your email",
  },
  {
    type: "select",
    name: "country",
    label: "Country",
    required: true,
    options: [
      { label: "India", value: "IN" },
      { label: "United States", value: "US" },
    ],
  },
  {
    type: "group",
    name: "address",
    fields: [
      {
        type: "text",
        name: "city",
        label: "City",
        required: true,
      },
      {
        type: "text",
        name: "pincode",
        label: "Pincode",
        required: true,
        visibleIf: {
          field: "country",
          equals: "IN",
        },
      },
    ],
  },
  {
    type: "repeat",
    name: "skills",
    fields: [
      {
        type: "text",
        name: "skillName",
        label: "Skill",
        required: true,
      },
    ],
  },
];

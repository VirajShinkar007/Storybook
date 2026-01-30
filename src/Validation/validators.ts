// src/validation/validators.ts

import { FieldSchema } from "../schema/types";

type FormValues = Record<string, unknown>;
type FormErrors = Record<string, string | undefined>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateForm(
  schema: FieldSchema[],
  values: FormValues
): FormErrors {
  const errors: FormErrors = {};

  schema.forEach((field) => {
    // ✅ Skip repeat / group fields completely
    if (field.type === "repeat" || field.type === "group") return;

    const value = values[field.name];

    // ✅ Narrow fields that support `required` + `label`
    if ("required" in field && field.required) {
      const isEmpty =
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "");

      if (isEmpty) {
        errors[field.name] = `${field.label} is required`;
        return;
      }
    }

    // ✅ Email validation (only for text fields)
    if (
      field.type === "text" &&
      field.name === "email" &&
      typeof value === "string"
    ) {
      if (!emailRegex.test(value)) {
        errors[field.name] = "Please enter a valid email address";
      }
    }
  });

  return errors;
}

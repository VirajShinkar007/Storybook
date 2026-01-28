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
    if (field.type === "repeat") return;

    const value = values[field.name];

    // Required check
    if (field.required) {
      const isEmpty =
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "");

      if (isEmpty) {
        errors[field.name] = `${field.label} is required`;
        return;
      }
    }

    // Email format check
    if (field.type === "text" && field.name === "email") {
      if (typeof value === "string" && !emailRegex.test(value)) {
        errors[field.name] = "Please enter a valid email address";
      }
    }
  });

  return errors;
}

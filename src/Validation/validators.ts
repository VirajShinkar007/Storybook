// src/validation/validators.ts

import { FieldSchema } from "../schema/types";

type FormValues = Record<string, unknown>;
type FormErrors = Record<string, string | undefined>;

export function validateForm(
  schema: FieldSchema[],
  values: FormValues
): FormErrors {
  const errors: FormErrors = {};

  for (const field of schema) {
    // Skip validation for non-input fields
    if (field.type === "repeat") {
      continue;
    }

    const value = values[field.name];

    // Check required fields
    if ("required" in field && field.required) {
      if (value === undefined || value === null || value === "") {
        errors[field.name] = `${field.label || field.name} is required`;
        continue;
      }
    }

    // Validate text fields
    if (field.type === "text" && value) {
      if (typeof value !== "string") {
        errors[field.name] = "Must be a text value";
        continue;
      }

      // Min length validation
      if ("minLength" in field && field.minLength) {
        if (value.length < field.minLength) {
          errors[field.name] = `Must be at least ${field.minLength} characters`;
        }
      }

      // Max length validation
      if ("maxLength" in field && field.maxLength) {
        if (value.length > field.maxLength) {
          errors[field.name] = `Must be no more than ${field.maxLength} characters`;
        }
      }

      // Pattern validation
      if ("pattern" in field && field.pattern) {
        const regex = new RegExp(field.pattern);
        if (!regex.test(value)) {
          errors[field.name] = field.patternError || "Invalid format";
        }
      }
    }

    // Validate select fields
    if (field.type === "select" && value) {
      if (typeof value !== "string") {
        errors[field.name] = "Must select a valid option";
        continue;
      }

      // Check if value is in options
      if ("options" in field && field.options) {
        const validOptions = field.options.map((opt) => opt.value);
        if (!validOptions.includes(value)) {
          errors[field.name] = "Invalid selection";
        }
      }
    }
  }

  return errors;
}

// Additional validator for individual fields (optional)
export function validateField(
  field: FieldSchema,
  value: unknown
): string | undefined {
  const errors = validateForm([field], { [field.name]: value });
  return errors[field.name];
}
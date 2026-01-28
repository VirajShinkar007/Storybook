// src/components/fields/TextField.tsx

import { TextField as TextFieldSchema } from "../../schema/types";

type TextFieldProps = {
  field: TextFieldSchema;
  value: unknown;
  error?: string;
  onChange: (value: string) => void;
};

export function TextField({
  field,
  value,
  error,
  onChange,
}: TextFieldProps) {
  const inputId = `field-${field.name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-gray-700"
      >
        {field.label}
        {field.required && <span className="text-red-500"> *</span>}
      </label>

      <input
        id={inputId}
        type="text"
        value={typeof value === "string" ? value : ""}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`rounded-md border px-3 py-2 text-sm outline-none focus:ring-2
          ${
            error
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
      />

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}

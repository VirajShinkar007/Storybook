
import { SelectField as SelectFieldSchema } from "../../schema/types";

type SelectFieldProps = {
  field: SelectFieldSchema;
  value: unknown;
  error?: string;
  onChange: (value: string) => void;
};

export function SelectField({
  field,
  value,
  error,
  onChange,
}: SelectFieldProps) {
  const selectId = `field-${field.name}`;
  const errorId = `${selectId}-error`;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={selectId}
        className="text-sm font-medium text-gray-700"
      >
        {field.label}
        {field.required && <span className="text-red-500"> *</span>}
      </label>

      <select
        id={selectId}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`rounded-md border px-3 py-2 text-sm outline-none focus:ring-2
          ${
            error
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
      >
        <option value="">Select an option</option>

        {Array.isArray(field.options) &&
          field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>

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

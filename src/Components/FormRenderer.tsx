// src/components/FormRenderer.tsx

import { FieldSchema } from "../schema/types";
import { useFormState } from "../hooks/useFormState";
import { TextField } from "./fields/TextField";
import { SelectField } from "./fields/SelectField";
import { Repeater } from "./Repeater";
import { evaluateConditions } from "../utils/evaluateConditions";
import { validateForm } from "../validation/validators";

type FormRendererProps = {
  schema: FieldSchema[];
};

export function FormRenderer({ schema }: FormRendererProps) {
  const { values, errors, setValue, setErrorsBulk } = useFormState();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(schema, values);
    setErrorsBulk(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("✅ Form submitted successfully", values);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {schema.map((field) => {
        const isVisible = evaluateConditions(field.visibleIf, values);
        if (!isVisible) return null;

        if (field.type === "text") {
          return (
            <TextField
              key={field.name}
              field={field}
              value={values[field.name]}
              error={errors[field.name]}
              onChange={(value) => setValue(field.name, value)}
            />
          );
        }

        if (field.type === "select") {
          return (
            <SelectField
              key={field.name}
              field={field}
              value={values[field.name]}
              error={errors[field.name]}
              onChange={(value) => setValue(field.name, value)}
            />
          );
        }

        if (field.type === "repeat") {
          return (
            <Repeater
              key={field.name}
              field={field}
              values={values[field.name]}
              onChange={(updatedItems) =>
                setValue(field.name, updatedItems)
              }
            />
          );
        }

        return null;
      })}

      {/* Submit Button */}
      <button
        type="submit"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}

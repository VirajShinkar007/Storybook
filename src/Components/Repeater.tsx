
import { RepeatField, FieldSchema } from "../schema/types";

type RepeaterProps = {
  field: RepeatField;
  values: unknown;
  onChange: (value: unknown[]) => void;
};

export function Repeater({ field, values, onChange }: RepeaterProps) {
  const items = Array.isArray(values) ? values : [];

  const addItem = () => {
    onChange([...items, {}]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (
    index: number,
    fieldName: string,
    value: unknown
  ) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...(item as Record<string, unknown>), [fieldName]: value } : item
    );
    onChange(updatedItems);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">
        {field.name}
      </h3>

      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-md border border-gray-200 p-3 space-y-3"
        >
          {field.fields.map((childField) => {
            if (childField.type !== "text") {
              return null;
            }

            return (
              <div key={childField.name}>
                <label className="text-sm text-gray-600">
                  {childField.label}
                </label>
                <input
                  type="text"
                  value={
                    typeof (item as Record<string, unknown>)[
                      childField.name
                    ] === "string"
                      ? ((item as Record<string, unknown>)[
                          childField.name
                        ] as string)
                      : ""
                  }
                  onChange={(e) =>
                    updateItem(index, childField.name, e.target.value)
                  }
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                />
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => removeItem(index)}
            className="text-sm text-red-600"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="text-sm text-blue-600"
      >
        Add {field.name}
      </button>
    </div>
  );
}

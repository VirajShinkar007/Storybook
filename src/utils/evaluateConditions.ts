
import { Condition } from "../schema/types";

type FormValues = Record<string, unknown>;

export function evaluateConditions(
  condition: Condition | undefined,
  values: FormValues
): boolean {
  if (!condition) {
    return true;
  }

  const fieldValue = values[condition.field];

  return fieldValue === condition.equals;
}

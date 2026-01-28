
import { useCallback, useState } from "react";

type FormValues = Record<string, unknown>;
type FormErrors = Record<string, string | undefined>;

export function useFormState() {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});

  const setValue = useCallback((fieldName: string, value: unknown) => {
    setValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Clear error on change (UX improvement)
    setErrors((prev) => ({
      ...prev,
      [fieldName]: undefined,
    }));
  }, []);

  const setError = useCallback((fieldName: string, message?: string) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: message,
    }));
  }, []);

  const setErrorsBulk = useCallback((newErrors: FormErrors) => {
    setErrors(newErrors);
  }, []);

  return {
    values,
    errors,
    setValue,
    setError,
    setErrorsBulk,
  };
}

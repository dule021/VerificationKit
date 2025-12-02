import { useState } from "preact/hooks";
import {
  validateField,
  FormErrors,
  ValidationResult,
} from "../utils/validators";

const isStringOrUndefined = (value: unknown): boolean => {
  return typeof value === "string" || typeof value === "undefined";
};

export const useFormValidation = () => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateFormField = (
    step: string,
    fieldData: any,
  ): string | undefined => {
    const stepErrors = validateField(step, fieldData);

    if (isStringOrUndefined(stepErrors)) {
      setErrors((prev) => ({
        ...prev,
        [step]: stepErrors,
      }));

      return stepErrors as ValidationResult;
    } else {
      setErrors((prev) => ({
        ...prev,
        [step]: { ...(stepErrors as FormErrors) },
      }));

      return Object.values(stepErrors as FormErrors).some((error) => !!error)
        ? "has_errors"
        : undefined;
    }
  };

  const isFormValid = Object.entries(errors).every(([key, error]) => {
    if (typeof error === "object" && !Array.isArray(error)) {
      return Object.values(error).every((e) => !e);
    }
    return !error;
  });

  return { errors, validateFormField, isFormValid };
};

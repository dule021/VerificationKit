export type ValidationResult = string | undefined;

export interface FormErrors {
  [key: string]: ValidationResult | FormErrors;
}

const photoValidator = (value: string): ValidationResult => {
  if (!value) {
    return "Photo is mandatory.";
  }

  return undefined;
};

const phoneValidator = (value: string): ValidationResult => {
  if (value.trimEnd().length > 17) {
    return "Phone number is too long";
  }
  if (value.trimEnd().length < 10) {
    return "Phone number too short";
  }

  return undefined;
};

const addressValidator = (
  addressDetails: Record<string, string>,
): FormErrors => {
  return {
    street: !addressDetails.street?.trim()
      ? "Street address required"
      : addressDetails.street.trim().length < 5
        ? "Street too short"
        : undefined,
    city: !addressDetails.city?.trim()
      ? "City required"
      : addressDetails.city.trim().length < 2
        ? "City too short"
        : undefined,
    state: !addressDetails.state?.trim()
      ? "State/Province required"
      : addressDetails.state.trim().length < 2
        ? "State too short"
        : undefined,
    country: !addressDetails.country?.trim() ? "Country required" : undefined,
    postalCode: !addressDetails.postalCode?.trim()
      ? "Postal code required"
      : !/^[a-zA-Z0-9\s-]+$/.test(addressDetails.postalCode.trim())
        ? "Invalid postal code"
        : undefined,
  };
};

export const validators = {
  photo: photoValidator,
  phone: phoneValidator,
  addressDetails: addressValidator,
};

export const validateField = (
  field: string,
  value: any,
): FormErrors | ValidationResult => {
  const validator = validators[field as keyof typeof validators];
  if (!validator) return {};
  return validator(value);
};

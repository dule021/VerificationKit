export type Step = "photo" | "phone" | "addressDetails" | "validation";

export interface StepProps {
  formData: any;
  errors: any;
  updateField: (
    field: string,
    value: string | undefined | Record<string, any>,
  ) => void;
}

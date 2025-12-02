import { Fragment, h, JSX, createContext } from "preact";
import { useState } from "preact/hooks";

import PhotoStep from "./steps/PhotoStep/PhotoStep";
import PhoneStep from "./steps/PhoneStep/PhoneStep";
import AddressStep from "./steps/AddressStep/AddressStep";
import ValidationStep from "./steps/ValidationStep/ValidationStep";
import { Step, StepProps } from "./steps/types";
import { useFormValidation } from "../hooks/useFormValidation";
import {
  getIdentityData,
  VerificationResponse,
  VerificationStatus,
} from "../utils/getIdentityData";
import register from "preact-custom-element";
import { emitVerificationMessage } from "../messaging/messagingUtils";
import { Spinner } from "../components/Spinner";

export const ThemeContext = createContext("light");

type StepComponent = (props: StepProps) => JSX.Element;

const STEPS: Step[] = ["photo", "phone", "addressDetails", "validation"];

const STEP_COMPONENTS: Record<Step, StepComponent> = {
  photo: PhotoStep,
  phone: PhoneStep,
  addressDetails: AddressStep,
  validation: ValidationStep,
};

export interface FormData extends Record<string, unknown> {
  photo?: Base64URLString;
  phone: string;
  addressDetails: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
}

interface Props {
  apiKey?: string;
  theme?: "light" | "dark";
}

function UserVerify({ apiKey, theme = "light" }: Props) {
  const [step, setStep] = useState<Step>("photo");
  const [formData, setFormData] = useState<FormData>({
    photo: undefined,
    phone: "",
    addressDetails: {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
  });
  const [isFinalValidationLoading, setIsFinalValidationLoading] =
    useState(false);
  const [finalValidationResults, setFinalValidationResults] = useState<
    Pick<VerificationResponse, "score" | "status"> | undefined
  >(undefined);

  const updateField = (field: keyof FormData, value: any) => {
    if (field === "addressDetails") {
      setFormData((prev) => ({
        ...prev,
        addressDetails: { ...prev.addressDetails, ...value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const { errors, validateFormField } = useFormValidation();

  const stepIndex = STEPS.indexOf(step);

  const performFinalValidation = async (formData: FormData) => {
    try {
      const { score, status } = await getIdentityData(formData);

      emitVerificationMessage({
        score,
        status,
        ...formData,
      });
      setIsFinalValidationLoading(false);
      return setFinalValidationResults({ score, status });
    } catch (error) {
      setIsFinalValidationLoading(false);
      console.error("Error in identity verification : " + error);
    }
  };

  const nextStep = () => {
    if (stepIndex < STEPS.length - 1) {
      const error = validateFormField(step, formData[step]);
      if (error) return;

      setStep(STEPS[stepIndex + 1]);
    } else {
      setIsFinalValidationLoading(true);
      performFinalValidation(formData);
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      setStep(STEPS[stepIndex - 1]);
    }
  };

  const StepComponent = STEP_COMPONENTS[step];

  const isLastStep = stepIndex === STEPS.length - 1;

  return (
    <ThemeContext.Provider value={theme}>
      <div
        part="sdk-container"
        class={`sdk sdk-${theme}`}
        style={{
          minWidth: "320px",
          maxWidth: "600px",
          margin: "0 auto",
          height: "80vh",
          padding: "1.5rem",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          fontFamily: "system-ui, sans-serif",
          background: theme === "dark" ? "#1a1a1a" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#1a1a1a",
          position: "relative",
        }}
      >
        <header
          part="header"
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Verify Identity
        </header>
        <div part="progress-container" style={{ marginBottom: "1.5rem" }}>
          <div
            part="progress-bar"
            style={{
              height: "4px",
              background: theme === "dark" ? "#333" : "#e0e0e0",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              part="progress-fill"
              style={{
                height: "100%",
                width: `${(stepIndex / (STEPS.length - 1)) * 100}%`,
                background: "linear-gradient(90deg, #007bff, #00c851)",
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <div
            part="step-indicator"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "0.5rem",
              fontSize: "0.75rem",
              opacity: 0.7,
            }}
          >
            {STEPS.map((_, i) => (
              <span
                key={i}
                style={{
                  width: "20px",
                  textAlign: "center",
                  fontWeight: i < stepIndex ? "bold" : "normal",
                }}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>
        {isFinalValidationLoading ? (
          <div style={{ margin: "150px auto" }}>
            <Spinner />
          </div>
        ) : null}
        {finalValidationResults ? (
          <div
            style={{
              width: "100%",
              height: "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              part="final-title"
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "1.5rem",
              }}
            >
              {finalValidationResults.status === VerificationStatus.verified ? (
                <>
                  <div style={{ width: "min-content", margin: "1rem auto" }}>
                    ✅
                  </div>
                  <b style={{ color: "#008000" }}>Verification Successful!</b>
                </>
              ) : (
                <>
                  <div style={{ width: "min-content", margin: "1rem auto" }}>
                    ❌
                  </div>
                  <b style={{ color: "#CC0000" }}>Verification Failed!</b>
                </>
              )}
            </div>
            <div style={{ fontSize: "1rem", fontWeight: "600" }}>
              Verification score :{" "}
              <b
                style={{
                  color:
                    finalValidationResults.status ===
                    VerificationStatus.verified
                      ? "#008000"
                      : "#CC0000",
                }}
              >
                {finalValidationResults.score}
              </b>
            </div>
            <div style={{ fontSize: "1rem", fontWeight: "600" }}>
              Status :
              <b
                style={{
                  color:
                    finalValidationResults.status ===
                    VerificationStatus.verified
                      ? "#008000"
                      : "#CC0000",
                }}
              >
                {finalValidationResults.status.toUpperCase()}
              </b>
            </div>
          </div>
        ) : null}

        {!finalValidationResults && !isFinalValidationLoading ? (
          <Fragment>
            <div part="step-content" style={{ marginBottom: "1.5rem" }}>
              <StepComponent
                formData={formData}
                errors={errors}
                updateField={updateField}
              />
            </div>
            <div
              part="button-container"
              style={{
                display: "flex",
                gap: "0.75rem",
                position: "absolute",
                bottom: "2.5rem",
                width: "90%",
              }}
            >
              {stepIndex > 0 && (
                <button
                  part="secondary-button"
                  onClick={prevStep}
                  style={{
                    flex: 1,
                    padding: "12px 20px",
                    background: "transparent",
                    color: theme === "dark" ? "#ccc" : "#666",
                    border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
                    borderRadius: "6px",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  Previous
                </button>
              )}
              <button
                part="primary-button"
                onClick={nextStep}
                style={{
                  flex: stepIndex > 0 ? 1 : "100%",
                  padding: "12px 20px",
                  background: !isLastStep
                    ? "#007bff"
                    : isLastStep
                      ? "#28a745"
                      : "#ccc",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {isLastStep ? "Complete Verification" : "Continue"}
              </button>
            </div>
          </Fragment>
        ) : null}
      </div>
    </ThemeContext.Provider>
  );
}

const UserVerifySdk = UserVerify as any;

const mountUserVerifySdk = () => {
  register(UserVerifySdk, "user-verify", ["apiKey", "theme"], {
    shadow: true,
  });
};

export { UserVerifySdk, mountUserVerifySdk };

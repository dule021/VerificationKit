import { h } from "preact";

import { StepProps } from "../types";
import FormInput from "../../../components/FormInput";

const AddressStep = ({ formData, errors, updateField }: StepProps) => {
  const address = formData.addressDetails || {};

  const updateAddressField = (field: keyof typeof address, value: string) => {
    updateField("addressDetails", { [field]: value });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "320px",
        padding: "1rem 0",
        width: "100%",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div
          part="step-icon"
          style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}
        >
          🏠
        </div>
        <div
          part="step-title"
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            marginBottom: "0.25rem",
          }}
        >
          Enter Full Address
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: "380px" }}>
        <FormInput
          label="Street Address"
          value={address.street || ""}
          error={errors.addressDetails?.street}
          onChange={(value) => updateAddressField("street", value)}
          placeholder="123 Main St"
        />

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: 1, maxWidth: "45%" }}>
            <FormInput
              label="ZIP Code"
              value={address.postalCode || ""}
              error={errors.addressDetails?.postalCode}
              onChange={(value) => updateAddressField("postalCode", value)}
              placeholder="11000"
            />
          </div>
          <div style={{ flex: 1, maxWidth: "45%" }}>
            <FormInput
              label="City"
              value={address.city || ""}
              error={errors.addressDetails?.city}
              onChange={(value) => updateAddressField("city", value)}
              placeholder="Belgrade"
            />
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <FormInput
            label="State/Prov"
            value={address.state || ""}
            error={errors.addressDetails?.state}
            onChange={(value) => updateAddressField("state", value)}
            placeholder="VO"
          />
        </div>

        <div style={{ flex: 1 }}>
          <FormInput
            label="Country"
            value={address.country || ""}
            error={errors.addressDetails?.country}
            onChange={(value) => updateAddressField("country", value)}
            placeholder="Serbia"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressStep;

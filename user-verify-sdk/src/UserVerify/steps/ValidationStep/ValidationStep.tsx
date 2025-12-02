import { h } from "preact";
import { StepProps } from "../types";

const ValidationStep = ({ formData }: StepProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        padding: "1.5rem",
        maxWidth: "480px",
        width: "100%",
        gap: "1.5rem",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        <div
          part="step-icon"
          style={{
            fontSize: "2.5rem",
            marginBottom: "0.75rem",
            color: "#10b981",
          }}
        >
          ✅
        </div>
        <div
          part="step-title"
          style={{
            fontSize: "1.25rem",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "0.25rem",
          }}
        >
          Review & Submit
        </div>
        <div
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            fontWeight: "500",
          }}
        >
          Please verify your information before submitting
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          width: "100%",
          alignItems: "flex-start",
          flex: 1,
          minHeight: "200px",
        }}
      >
        <div style={{ flex: 1, maxWidth: "180px" }}>
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Selfie Photo
          </div>
          <div
            part="photo-preview"
            style={{
              width: "100%",
              height: "160px",
              borderRadius: "12px",
              objectFit: "cover",
              border: "2px solid #e5e7eb",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            {formData.photo ? (
              <img
                src={formData.photo}
                alt="Captured selfie"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#f3f4f6",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#9ca3af",
                  fontSize: "0.875rem",
                }}
              >
                No photo
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div part="summary-item" style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Phone Number
            </div>
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: "#1f2937",
                padding: "0.75rem",
                background: "rgba(243, 244, 246, 0.8)",
                borderRadius: "8px",
                borderLeft: "4px solid #3b82f6",
              }}
            >
              {formData.phone || "Not entered"}
            </div>
          </div>
          <div part="summary-item" style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Address
            </div>
            <div
              style={{
                fontSize: "0.95rem",
                color: "#374151",
                padding: "0.75rem",
                background: "rgba(243, 244, 246, 0.8)",
                borderRadius: "8px",
                borderLeft: "4px solid #10b981",
                lineHeight: "1.5",
                overflow: "hidden",
              }}
            >
              {Object.keys(formData.addressDetails || {}).length > 0
                ? Object.entries(formData.addressDetails).map(
                    ([key, value]) => (
                      <div key={key} style={{ marginBottom: "0.25rem" }}>
                        <span style={{ fontSize: "10px" }}>
                          {key.toUpperCase()}:
                        </span>
                        <b>{` ${value}`}</b>
                      </div>
                    ),
                  )
                : "Not entered"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationStep;

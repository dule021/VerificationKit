interface ModalContentProps {
  addressDetails: Record<string, string>;
  phone: string;
  photo: string;
  score: number;
  status: string;
}

export function ModalContent({
  addressDetails,
  phone,
  photo,
  score,
  status,
}: ModalContentProps) {
  return (
    <div
      style={{
        maxWidth: "360px",
        margin: "0 auto",
        fontFamily: "sans-serif",
        padding: "0.75rem",
      }}
    >
      {/* Photo */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <img
          src={photo}
          alt="User selfie"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "12px",
            objectFit: "cover",
            display: "inline-block",
          }}
        />
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <div
          style={{ fontSize: "14px", color: "#555", marginBottom: "0.25rem" }}
        >
          Phone
        </div>
        <div style={{ fontSize: "16px", fontWeight: "600", color: "#222" }}>
          {phone}
        </div>
      </div>

      {/* Address Details */}
      <div style={{ marginBottom: "0.75rem" }}>
        <div
          style={{ fontSize: "14px", color: "#555", marginBottom: "0.5rem" }}
        >
          Address
        </div>
        {Object.entries(addressDetails).map(([key, value]) => (
          <div key={key} style={{ marginBottom: "0.25rem" }}>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#444",
                textTransform: "capitalize",
              }}
            >
              {key}:
            </span>
            <span style={{ fontSize: "16px", color: "#222" }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Score */}
      <div style={{ marginBottom: "0.75rem" }}>
        <div
          style={{ fontSize: "14px", color: "#555", marginBottom: "0.25rem" }}
        >
          Score
        </div>
        <div style={{ fontSize: "16px", fontWeight: "600", color: "#222" }}>
          {score}
        </div>
      </div>

      {/* Status */}
      <div>
        <div
          style={{ fontSize: "14px", color: "#555", marginBottom: "0.25rem" }}
        >
          Status
        </div>
        <div
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#222",
            textTransform: "capitalize",
          }}
        >
          {status}
        </div>
      </div>
    </div>
  );
}

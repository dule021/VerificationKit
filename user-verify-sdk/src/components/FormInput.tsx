import { h } from "preact";
import { useContext } from "preact/hooks";
import { ThemeContext } from "../UserVerify/UserVerify";

interface FormInputProps {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: "text" | "tel";
  placeholder: string;
}

export default function FormInput({
  label,
  value,
  error,
  onChange,
  type = "text",
  placeholder,
}: FormInputProps) {
  const theme = useContext(ThemeContext);

  return (
    <div
      part="form-field"
      style={{
        marginBottom: "1rem",
        width: "100%",
      }}
    >
      <label
        part="form-label"
        style={{
          display: "block",
          fontSize: "0.85rem",
          fontWeight: 500,
          marginBottom: "0.25rem",
          color: error ? "#dc3545" : "inherit",
        }}
      >
        {label}
      </label>
      <input
        part="form-input"
        type={type}
        value={value}
        placeholder={placeholder}
        onInput={(e) => onChange((e.target as HTMLInputElement).value)}
        style={{
          width: "100%",
          padding: "12px 14px",
          border: error ? "2px solid #dc3545" : "1px solid #ddd",
          borderRadius: "6px",
          fontSize: "16px",
          transition: "border-color 0.2s",
          background: "transparent",
          color: theme === "dark" ? "#ffffff" : "#1a1a1a",
        }}
      />
      {error && (
        <div
          part="form-error"
          style={{
            fontSize: "0.75rem",
            color: "#dc3545",
            marginTop: "0.25rem",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

import { h } from "preact";
import { StepProps } from "../types";
import { ThemeContext } from "../../UserVerify";
import { useContext } from "preact/hooks";

interface Country {
  code: string;
  dial: string;
  flag: string;
  name: string;
}

const COUNTRIES: Country[] = [
  { code: "US", dial: "+1", flag: "🇺🇸", name: "United States" },
  { code: "CA", dial: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "GB", dial: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "AU", dial: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "DE", dial: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "FR", dial: "+33", flag: "🇫🇷", name: "France" },
  { code: "RS", dial: "+381", flag: "🇷🇸", name: "Serbia" },
];

const PhoneStep = ({ formData, errors, updateField }: StepProps) => {
  const theme = useContext(ThemeContext);

  const countryCode = formData.country || "US";
  const country = COUNTRIES.find((c) => c.code === countryCode);

  const dialRegex = country
    ? new RegExp(`^${country.dial.replace(/[+]/g, "\\+")}`)
    : /^/;
  const phoneNumber = formData.phone?.replace(dialRegex, "") || "";

  const handleCountryChange = (e: Event) => {
    const code = (e.target as HTMLSelectElement).value;
    const selectedCountry = COUNTRIES.find((c) => c.code === code);
    if (selectedCountry) {
      updateField("country", selectedCountry.code);
      updateField("phone", "");
    }
  };

  const handlePhoneChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value.replace(/\D/g, "");
    const selectedCountry = COUNTRIES.find((c) => c.code === countryCode);
    const fullNumber = selectedCountry
      ? `${selectedCountry.dial}${value}`
      : value;
    updateField("phone", fullNumber);
  };

  const isValid = () => {
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    return cleanNumber.length >= 10;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "180px",
        padding: "1rem 0",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div
          part="step-icon"
          style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}
        >
          📱
        </div>
        <div
          part="step-title"
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            marginBottom: "0.25rem",
          }}
        >
          Enter Phone Number
        </div>
      </div>

      <div part="phone-input-container" style={{ width: "280px" }}>
        <label
          style={{
            display: "block",
            fontSize: "0.85rem",
            fontWeight: 500,
            marginBottom: "0.5rem",
            color: errors.phone ? "#dc3545" : "inherit",
          }}
        >
          Phone Number
        </label>

        <div
          style={{
            display: "flex",
            gap: "0",
            borderRadius: "8px",
            border: errors.phone ? "2px solid #dc3545" : "1px solid #ddd",
          }}
        >
          <select
            part="country-select"
            value={countryCode}
            onChange={handleCountryChange}
            style={{
              flex: "0 0 10px",
              padding: "14px 12px",
              border: "none",
              background: "transparent",
              fontSize: "16px",
              cursor: "pointer",
              appearance: "none",
              backgroundImage:
                "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              backgroundSize: "16px",
            }}
          >
            {COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag}
              </option>
            ))}
          </select>

          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              paddingLeft: "12px",
              fontSize: "16px",
              fontWeight: "500",
              color: theme === "dark" ? "#ffffff" : "#1a1a1a",
            }}
          >
            {country?.dial || "+1"}
          </div>

          <input
            part="phone-input"
            type="tel"
            placeholder="234 567 8900"
            value={phoneNumber}
            onInput={handlePhoneChange}
            style={{
              flex: 1,
              padding: "14px 16px",
              border: "none",
              background: "transparent",
              fontSize: "16px",
              outline: "none",
              color: theme === "dark" ? "#ffffff" : "#1a1a1a",
            }}
          />
        </div>

        {errors.phone && (
          <div
            part="phone-error"
            style={{
              fontSize: "0.75rem",
              color: "#dc3545",
              marginTop: "0.25rem",
            }}
          >
            {errors.phone}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneStep;

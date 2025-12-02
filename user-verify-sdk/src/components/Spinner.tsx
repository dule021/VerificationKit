import { h } from "preact";

export const Spinner = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 40 40"
    style={{ display: "block", margin: "0 auto" }}
  >
    <circle
      cx="16"
      cy="16"
      r="14"
      fill="none"
      stroke="#6b7280"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0 16 16"
        to="360 16 16"
        dur="1.2s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="stroke-dasharray"
        values="0,88;44,88;88,88;88,88"
        dur="1.2s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="stroke-dashoffset"
        values="0;-22;-44;0"
        dur="1.2s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

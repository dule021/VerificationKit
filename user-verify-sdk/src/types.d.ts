import { UserVerify } from ".UserVerify/UserVerify";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "user-verify": React.DetailedHTMLProps<
        React.HTMLAttributes<UserVerify> & {
          apiKey?: string;
          theme?: "light" | "dark";
        },
        UserVerify
      >;
    }
  }
}

export {};

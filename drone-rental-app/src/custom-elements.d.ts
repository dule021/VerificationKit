declare global {
  namespace JSX {
    interface IntrinsicElements {
      "user-verify": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "api-key"?: string;
          theme?: string;
          [key: string]: unknown;
        },
        HTMLElement
      >;
    }
  }
}

export {};

import "preact";

declare module "preact" {
  namespace JSX {
    interface IntrinsicElements {
      "user-verify": {
        "api-key"?: string;
        theme?: string;
        [key: string]: any;
      };
    }
  }
}

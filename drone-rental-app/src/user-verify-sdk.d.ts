/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "user-verify-sdk" {
  export const mountUserVerifySdk: any;
  export const UserVerifySdk: any;
  export const addVerificationMessageListener: any;
  export type VerificationResponse = any;

  export interface UserVerifyProps {
    "api-key"?: string;
    theme?: string;
  }
}

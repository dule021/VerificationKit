import { FormData } from "../UserVerify/UserVerify";
import { generateVerificationScore } from "./generateVerificationScore";

export enum VerificationStatus {
  "verified" = "verified",
  "failed" = "failed",
}

type VerificationStatusType = {
  status: VerificationStatus.verified | VerificationStatus.failed;
};

type VerificationScore = { score: number };

export type VerificationResponse = FormData &
  VerificationStatusType &
  VerificationScore;

export const getIdentityData = async (
  formData: FormData,
): Promise<VerificationResponse> => {
  const verificationScore = generateVerificationScore();

  return new Promise((resolve) => {
    setTimeout(() => {
      if (verificationScore > 50) {
        resolve({
          ...formData,
          score: verificationScore,
          status: VerificationStatus.verified,
        });
      } else {
        resolve({
          ...formData,
          score: verificationScore,
          status: VerificationStatus.failed,
        });
      }
    }, 1500);
  });
};

export const generateVerificationScore = (): number => {
  const isSuccess = Math.random() < 0.7;
  const min = isSuccess ? 50 : 0;
  const max = isSuccess ? 100 : 49;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

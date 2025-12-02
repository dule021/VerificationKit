import { VerificationResponse } from "../utils/getIdentityData";

const VERIFICATION_MESSAGE_EVENT = "VERIFICATION_MESSAGE_EVENT";

export function emitVerificationMessage<TPayload extends VerificationResponse>(
  payload: TPayload,
): void {
  const event = new CustomEvent<TPayload>(VERIFICATION_MESSAGE_EVENT, {
    detail: payload,
    bubbles: true,
    composed: true, // allows crossing shadow DOM boundaries
  });
  window.dispatchEvent(event);
}

export function addVerificationMessageListener<
  TPayload extends VerificationResponse,
>(listener: (event: CustomEvent<TPayload>) => void): () => void {
  const handler = (event: Event) => {
    listener(event as CustomEvent<TPayload>);
  };
  window.addEventListener(VERIFICATION_MESSAGE_EVENT, handler);
  return () => window.removeEventListener(VERIFICATION_MESSAGE_EVENT, handler);
}

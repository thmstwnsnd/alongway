export const EMAIL_CAPTURE_STATUS_KEY = "email_capture_status";
export const EMAIL_CAPTURED_KEY = "email_captured";

export type EmailCaptureStatus = "dismissed" | "subscribed";

export function getEmailCaptureStatus() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(EMAIL_CAPTURE_STATUS_KEY) as EmailCaptureStatus | null;
}

export function hasEmailBeenCaptured() {
  if (typeof window === "undefined") {
    return false;
  }

  return Boolean(window.localStorage.getItem(EMAIL_CAPTURED_KEY));
}

export function shouldHideEmailCapture() {
  return Boolean(getEmailCaptureStatus() || hasEmailBeenCaptured());
}

export function storeCapturedEmail(email: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(EMAIL_CAPTURED_KEY, email);
  window.localStorage.setItem(EMAIL_CAPTURE_STATUS_KEY, "subscribed");
  window.dispatchEvent(new CustomEvent("alongway-email-captured", { detail: { email } }));
}

export function dismissEmailCapture() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(EMAIL_CAPTURE_STATUS_KEY, "dismissed");
}

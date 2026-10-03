// Only allow same-site paths as a post-sign-in destination (blocks open redirects).
export function safeNext(value: unknown, fallback = "/portal/dashboard") {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return fallback;
  return value;
}

/**
 * Format a stored datetime ("YYYY-MM-DD HH:MM" or ISO) for display.
 * Falls back to the raw string on anything unparseable — never throws.
 */
export function formatDateTime(value: string | null | undefined): string {
  if (!value) return "—";
  // Normalize "YYYY-MM-DD HH:MM" to ISO-ish so Date can parse it reliably.
  const iso = value.includes("T") ? value : value.replace(" ", "T");
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

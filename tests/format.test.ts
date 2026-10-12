import { describe, it, expect } from "vitest";
import { formatDateTime } from "@/lib/format";

describe("formatDateTime", () => {
  it("formats a stored 'YYYY-MM-DD HH:MM' value", () => {
    const out = formatDateTime("2026-10-14 10:00");
    expect(out).toContain("2026");
    expect(out).toContain("Oct");
  });

  it("returns an em dash for empty input", () => {
    expect(formatDateTime(null)).toBe("—");
    expect(formatDateTime("")).toBe("—");
  });

  it("falls back to the raw string on unparseable input", () => {
    expect(formatDateTime("not-a-date")).toBe("not-a-date");
  });
});

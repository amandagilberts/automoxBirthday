import { describe, it, expect } from "vitest";
import { isValidDate, isNotFutureDate, validateBirthdayMessage } from "./validation.js";

describe("isValidDate", () => {
  it.each(["2024-02-29", "1815-12-10"])("accepts %s", (value) => {
    expect(isValidDate(value)).toBe(true);
  });

  it.each([
    "2023-02-29", // not a leap year
    // TODO: add 2024-02-30, 2024-04-31, 2024-13-01
  ])("rejects %s", (value) => {
    expect(isValidDate(value)).toBe(false);
  });
});

describe("isNotFutureDate", () => {
  it("accepts a past date", () => {
    expect(isNotFutureDate("1990-05-01")).toBe(true);
  });
  // TODO: rejects "2999-01-01"
  // TODO: accepts today (build it with new Date().toISOString().slice(0, 10))
});

describe("validateBirthdayMessage schema", () => {
  it("accepts a valid body", () => {
    const result = validateBirthdayMessage.safeParse({ name: "Ada", birthday: "1815-12-10" });
    expect(result.success).toBe(true);
  });
  // TODO: rejects a name of only spaces ("   ")
  // TODO: rejects a missing name
  // TODO: rejects birthday "12/10/1815" (wrong format)
});
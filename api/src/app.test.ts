import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { createApp } from "./app.js";

const validBody = { name: "Ada Lovelace", birthday: "1815-12-10" };

describe("POST /birthdays", () => {
  const publishBirthdayMessage = vi.fn();
  const fakePublisher = { publishBirthdayMessage, close: vi.fn() };
  const app = createApp(fakePublisher);

  beforeEach(() => {
    publishBirthdayMessage.mockReset();
    publishBirthdayMessage.mockResolvedValue(undefined);
  });

  it("returns 200 with an id and publishes once", async () => {
    const res = await request(app).post("/birthdays").send(validBody);

    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
    expect(publishBirthdayMessage).toHaveBeenCalledTimes(1);
    expect(publishBirthdayMessage).toHaveBeenCalledWith(
      expect.objectContaining({ id: res.body.id, ...validBody })
    );
  });

  // TODO: invalid body ({ name: "", birthday: "2024-02-30" })
  //       -> expect 400 and publishBirthdayMessage not called

  // TODO: publisher failure
  //       publishBirthdayMessage.mockRejectedValue(new Error("broker down"))
  //       -> expect 503
});
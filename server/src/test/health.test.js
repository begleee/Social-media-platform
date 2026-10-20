import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("health route", () => {
  it("responds with 200", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
  });
});

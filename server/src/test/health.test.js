import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Health check", () => {
  it("responds with 200", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
  });
});

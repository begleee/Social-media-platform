import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Authentication flow", () => {
  describe("POST /login", () => {
    it("should return a jwt token when credentials are valid", async () => {
      const response = await request(app)
        .post("/login")
        .send({ email: "test@gmail.com", password: "12345678" })
      ;

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(typeof response.body.token).toBe("string");
    });

    it("should reject invalid credenails with 401", async () => {
      const response = await request(app)
        .post("/login")
        .send({ email: "wrongemail", passowrd: "wrongpassword" })
      ;

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Invalid email or password");
    });
  });
})

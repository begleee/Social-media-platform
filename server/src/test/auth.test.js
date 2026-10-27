import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Authentication flow", () => {
  describe("/login", () => {
    it("should return a jwt token when credentials are valid", async () => {
      const response = await request(app)
        .post("/login")
        .send({ email: "test@gmail.com", password: "12345678" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(typeof response.body.token).toBe("string");
    });

    it("should reject invalid credenails with 401", async () => {
      const response = await request(app)
        .post("/login")
        .send({ email: "wrongemail", password: "wrongpassword" });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Invalid email or password");
    });
  });

  describe("/logout", () => {
    it("should return message \"Logout successfully\" and status 200", async () => {
      const response = await request(app)
        .post("/logout");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Logout successfully");
    });
  });

  describe("User Lifecycle (Register, Login, Delete)", () => {
    it("should successfully register, login, and delete a new account", async () => {
      const registerRes = await request(app)
        .post("/register")
        .send({ email: "testuser@gmail.com", password: "12345678", name: "Test user" });

      expect(registerRes.status).toBe(201);
      expect(registerRes.body.status).toBe("success");

      const loginRes = await request(app)
        .post("/login")
        .send({ email: "testuser@gmail.com", password: "12345678" });

      expect(loginRes.status).toBe(200);
      expect(typeof loginRes.body.token).toBe("string");

      const token = loginRes.body.token;

      const deleteRes = await request(app)
        .delete("/delete-user")
        .auth(token, { type: "bearer" });

      expect(deleteRes.status).toBe(200);
    });
  });
});

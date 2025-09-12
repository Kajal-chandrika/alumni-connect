import request from "supertest";
import app from "../src/app.js";
import sequelize from "../src/config/db.js";
import { Sequelize } from "sequelize";

beforeAll(async () => {
  if (process.env.NODE_ENV === "test") {
    sequelize = new Sequelize("sqlite::memory:", {
      logging: false,
    });
  }
});

describe("User Authentication", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      role: "alumni",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should login an existing user", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

import request from "supertest";
import app from "../src/app.js";
import sequelize from "../src/config/db.js";
import { User } from "../src/models/userModel.js";
import bcrypt from "bcryptjs";
import { Sequelize } from "sequelize";
import jwt from "jsonwebtoken";

let token;

if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize("sqlite::memory:", { logging: false });
}

beforeAll(async () => {
  await sequelize.sync({ force: true });
  console.log("SQLite in-memory DB synced");

  const hashedPwd = await bcrypt.hash("admin123", 10);
  await User.create({
    name: "Admin",
    email: "admin@test.com",
    password: hashedPwd,
    role: "admin",
  });
});

describe("Events API", () => {
  it("should create a new event (admin only)", async () => {
    const res = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Alumni Meet",
        description: "Networking event",
        event_date: "2025-12-20",
        location: "Cuttack",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("title", "Test Alumni Meet");
  });

  it("should list all events", async () => {
    const res = await request(app).get("/api/events");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

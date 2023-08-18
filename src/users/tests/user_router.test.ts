import request from "supertest";
import express, { Express } from "express";
import users_router from "../users_router";
import Authentication from "../authentication";
import Register from "../register"; // Adjust the path based on your project structure
import db from "../../db";

const app = express();

app.use(express.json());
app.use("/users", users_router);
jest.mock("../authentication");
jest.mock("../register");
jest.mock("../../db");

describe("Authentication Endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should refresh a token", async () => {
    const refreshTokenMock = jest.spyOn(Authentication, "refreshToken");
    refreshTokenMock.mockResolvedValue("newToken");

    const response = await request(app)
      .post("/users/refresh")
      .send({ token: "oldToken" });

    expect(response.statusCode).toBe(200);
    expect(response.body.access_token).toBe("newToken");
  });

  it("should register a user", async () => {
    const registerMock = jest.spyOn(Register, "register");
    registerMock.mockResolvedValue();

    const response = await request(app).post("/users/register").send({
      username: "newuser",
      password: "newpassword",
      email: "test@example.com",
    });

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Registration successful");
  }, 10000);
});

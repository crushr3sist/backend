import express from "express";
import { PrismaClient } from "@prisma/client";
import Authentication from "./authentication";
import Register from "./register";
import db from "../db";
const users_router = express.Router();

users_router.post("/refresh", async (req, res, next) => {
  try {
    const token = await Authentication.refreshToken(req.body.token);
    res.send({ access_token: token });
  } catch (error) {
    console.error("Error refreshing:", error.message);
    res.status(500).send("Error refreshing token");
  }
});

users_router.post("/", async (req, res, next) => {
  try {
    const user = await Authentication.get_user_record(req.body.token);
    res.send({ user: user });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).send("Error fetching user");
  }
});

users_router.post("/login", async (req, res, next) => {
  try {
    const token = await Authentication.create_token(req.body);
    res.send({ access_token: token });
  } catch (error) {
    console.error("Error with login:", error.message);
    res.status(500).send("Error with login");
  }
});

users_router.post("/register", async (req, res, next) => {
  try {
    await Register.register(req.body);
    await db.prisma.$disconnect();
    res.send("Registration successful");
  } catch (error) {
    console.error("Error during registration:", error.message);
    await db.prisma.$disconnect();
    res.status(500).send("Error during registration");
  }
});

export default users_router;

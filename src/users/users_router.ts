import express from "express";
import { PrismaClient } from "@prisma/client";
import Authentication from "./authentication";
import Register from "./register";
import db from "../db";
const users_router = express.Router();

users_router.post("/refresh", async (req, res, next) => {
  try {
    let token = await Authentication.refreshToken(req.body.token);
    res.send({ access_token: token });
  } catch {
    throw new Error("Error refreshing");
  }
});

users_router.post("/", async (req, res, next) => {
  try {
    let user = await Authentication.get_user_record(req.body.token);
    res.send({ user: user });
  } catch {
    throw new Error("Error refreshing");
  }
});

users_router.post("/login", async (req, res, next) => {
  try {
    let token = await Authentication.create_token(req.body);
    res.send({ access_token: token });
  } catch (err) {
    throw new Error(err);
  }
});

users_router.post("/register", async (req, res, next) => {
  console.log("Got body:", req.body);
  Register.register(req.body)
    .then(async () => {
      await db.prisma.$disconnect();
    })
    .catch(async (err) => {
      console.error(err);
      await db.prisma.$disconnect();
      next(err);
      process.exit(1);
    });
});

export default users_router;

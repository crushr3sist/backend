import express from "express";
import { PrismaClient } from "@prisma/client";
import Authentication from "./authentication";
import Register from "./register";
import db from "../db";
import { configDotenv } from "dotenv";
const users_router = express.Router();

users_router.post("/login", async (req, res) => {
  let token = await Authentication.create_token(req.body);

  res.send({ access_token: token });
});

users_router.get("/", async (req, res) => {
  const token = req.body.token;

  const user = await Authentication.get_user(token);

  res.send(user);
});

users_router.post("/register", (req, res) => {
  console.log("Got body:", req.body);

  Register.register(req.body)
    .then(async () => {
      await db.prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await db.prisma.$disconnect();
      res.send(`there was an error creating the user: error\n${e}`);
      process.exit(1);
    });
  res.send("User was successfully created");
  res.sendStatus(200);
});

export default users_router;

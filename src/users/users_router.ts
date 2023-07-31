import express from "express";
import { PrismaClient } from "@prisma/client";
import Authentication from "./authentication";
import Register from "./register";
import db from "../db";

const users_router = express.Router();

users_router.post("/login", async (req, res) => {
  let token = await Authentication.create_token(req.body);

  console.log(token);

  res.send({ access_token: token });
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

import express from "express";
import { PrismaClient } from "@prisma/client";
import db from "../db";
import Wishlist from "./wishlist";

const wishlist_router = express.Router();

wishlist_router.post("/create/item", (req, res) => {});

wishlist_router.post("/create/wishlist", (req, res) => {
  const wishlist_data = req.body;

  Wishlist.create_wishlist(
    {
      username: "ronny",
      email: "hello@mail.com",
      password: "secret",
    },
    req.body
  )
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

import express from "express";
import { PrismaClient } from "@prisma/client";
import db from "../db";
import Wishlist from "./wishlist";
import Authentication from "../users/authentication";

const wishlist_router = express.Router();

wishlist_router.post("/create/item", (req, res) => {});

wishlist_router.post("/create/wishlist", async (req, res) => {
  const wishlist_data = req.body;

  const user = await Authentication.get_user(wishlist_data.token);
  console.log(user);

  Wishlist.create_wishlist(user, wishlist_data.wishListName)

    .then(async () => {
      await db.prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await db.prisma.$disconnect();
      res.send(`there was an error creating the user: error\n${e}`);
      process.exit(1);
    });
  res.sendStatus(200);
});
export default wishlist_router;

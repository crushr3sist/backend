import express from "express";
import { PrismaClient } from "@prisma/client";
import db from "../db";
import Wishlist from "./wishlist";
import Authentication from "../users/authentication";

const wishlist_router = express.Router();

wishlist_router.post("/create/item", async (req, res) => {
  try {
    const wishlist_data = req.body;
    const user = await Authentication.get_user_record(wishlist_data.token);
    console.log(user);
    Wishlist.addToWishlist(user, wishlist_data)

      .then(async () => {
        await db.prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await db.prisma.$disconnect();
        process.exit(1);
      });
  } catch (err) {
    console.log(err);
  }
  res.sendStatus(200);
});

wishlist_router.post("/get/all", async (req, res) => {
  try {
    const wishlist_data = req.body;
    console.log(wishlist_data);
    const user = await Authentication.get_user(wishlist_data.token);
    const allRecords = await Wishlist.getAll(user);

    res.send({ all: allRecords });
  } catch (err) {
    console.log(err);
  }
});

wishlist_router.post("/create/wishlist", async (req, res) => {
  const wishlist_data = req.body;

  const user = await Authentication.get_user(wishlist_data.token);

  Wishlist.create_wishlist(user, wishlist_data.wishListName)

    .then(async () => {
      await db.prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await db.prisma.$disconnect();
      process.exit(1);
    });
  res.sendStatus(200);
});

wishlist_router.get("/get/wishlists", async (req, res) => {
  const user = await Authentication.get_user(req.body.token);
  const wishlists = await Wishlist.getWishlists(user);

  res.send({ wishlists: wishlists });
});

export default wishlist_router;

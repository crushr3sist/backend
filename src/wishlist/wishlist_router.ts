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
    await Wishlist.addToWishlist(user, wishlist_data);
    await db.prisma.$disconnect();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error creating wishlist item:", error.message);
    await db.prisma.$disconnect();
    res.status(500).send("Error creating wishlist item");
  }
});

wishlist_router.post("/get/all", async (req, res) => {
  try {
    const wishlist_data = req.body;
    const user = await Authentication.get_user(wishlist_data.token);
    const allRecords = await Wishlist.getAll(user);

    res.send({ all: allRecords });
  } catch (error) {
    console.error("Error fetching all wishlist items:", error.message);
    res.status(500).send("Error fetching all wishlist items");
  }
});

wishlist_router.post("/create/wishlist", async (req, res) => {
  try {
    const wishlist_data = req.body;
    const user = await Authentication.get_user(wishlist_data.token);
    await Wishlist.create_wishlist(user, wishlist_data.wishListName);
    await db.prisma.$disconnect();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error creating wishlist:", error.message);
    await db.prisma.$disconnect();
    res.status(500).send("Error creating wishlist");
  }
});

wishlist_router.get("/get/wishlists", async (req, res) => {
  try {
    const user = await Authentication.get_user(req.body.token);
    const wishlists = await Wishlist.getWishlists(user);

    res.send({ wishlists: wishlists });
  } catch (error) {
    console.error("Error fetching wishlists:", error.message);
    res.status(500).send("Error fetching wishlists");
  }
});

export default wishlist_router;

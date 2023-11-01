import express from 'express';
import db from '../db';
import Wishlist from './wishlist';
import Authentication from '../users/authentication';
import {type JwtPayload} from 'jsonwebtoken';

const wishlist_router = express.Router();

/* The code `wishlist_router.post("/create/item", (req, res) => { ... })` is defining a route for
creating a new item in a wishlist. */
wishlist_router.post('/create/item', async (req, res) => {
	try {
		const wishlist_data = req.body;
		const user = Authentication.get_user_record(wishlist_data.token);
		await Wishlist.addToWishlist(user, wishlist_data);
		await db.prisma.$disconnect();
		res.status(200).send('item added to wishlist');
	} catch (error) {
		console.error('Error creating wishlist item:', error.message);
		db.prisma.$disconnect();
		res.status(500).send('Error creating wishlist item');
	}
});

wishlist_router.post('/get/all', async (req, res) => {
	try {
		const wishlist_data = req.body;
		const userRecord = await Authentication.get_user(wishlist_data.token);
		if (!userRecord) {
			throw new Error('User not found');
		}

		const allRecords = await Wishlist.getAll(userRecord as JwtPayload);
		res.status(200).send({all: allRecords});
	} catch (error) {
		console.error('Error fetching all wishlist items:', error.message);
		res.status(500).send(`Error fetching all wishlist items ${error.message}`);
	}
});

/* The code `wishlist_router.post("/create/wishlist", (req, res) => { ... })` is defining a route for
creating a new wishlist. */
wishlist_router.post('/create/wishlist', (req, res) => {
	try {
		const wishlist_data = req.body;
		const user = Authentication.get_user(wishlist_data.token);
		Wishlist.create_wishlist(user as JwtPayload, wishlist_data.wishListName);
		db.prisma.$disconnect();
		res.status(200).send('wishlist created');
	} catch (error) {
		db.prisma.$disconnect();
		res.status(500).send('Error creating wishlist');
	}
});

/* The code `wishlist_router.get("/get/wishlists", (req, res) => { ... })` is defining a route for
retrieving all wishlists belonging to a user. */
wishlist_router.get('/get/wishlists', (req, res) => {
	try {
		const user = Authentication.get_user(req.body.token);
		const wishlists = Wishlist.getWishlists(user);
		res.send({wishlists});
	} catch (error) {
		res.status(500).send('Error fetching wishlists');
	}
});

export default wishlist_router;

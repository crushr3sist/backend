import db from '../db';
import {type JwtPayload} from 'jsonwebtoken';

namespace Wishlist {
	export async function create_wishlist(
		userId: JwtPayload,
		wishListName: string,
	) {
		await db.prisma.wishlist.create({
			data: {
				userId: userId.id,
				wishlistName: wishListName,
			},
		});
	}

	export async function addToWishlist(user: JwtPayload, wishlistBody: any) {
		await db.prisma.wishlistItem.create({
			data: {
				userId: user.id,
				wishlistId: parseInt(wishlistBody.wishlistId),
				product: wishlistBody.product,
				url: wishlistBody.url,
				current_price: parseInt(wishlistBody.current_price),
				date: new Date(),
			},
		});
	}

	export async function getWishlists(user: any) {
		return db.prisma.wishlist.findMany({
			where: {
				userId: user.userId,
			},
		});
	}

	export async function getAll(user: JwtPayload) {
		const wishlists = await db.prisma.wishlist.findMany({
			where: {
				userId: user.id,
			},
			include: {
				WishlistItem: true, // Include the associated WishlistItems
			},
		});

		return wishlists;
	}
}

export default Wishlist;

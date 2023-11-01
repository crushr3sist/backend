import db from '../db';
import {type JwtPayload} from 'jsonwebtoken';
import Authentication from '../users/authentication';

namespace Wishlist {
	
	/**
	 * The function creates a wishlist for a user with a given wishlist name.
	 * @param {JwtPayload} userId - The userId parameter is of type JwtPayload, which likely represents
	 * the user's ID extracted from a JSON Web Token (JWT). It is used to identify the user who is
	 * creating the wishlist.
	 * @param {string} wishListName - The `wishListName` parameter is a string that represents the name of
	 * the wishlist that the user wants to create.
	 */
	export async function create_wishlist(
		userId: JwtPayload,
		wishListName: string,
	) {
		void await db.prisma.wishlist.create({
			data: {
				userId: userId.id,
				wishlistName: wishListName,
			},
		});
	}

	/**
	 * The function `addToWishlist` adds a new item to a user's wishlist in a database.
	 * @param {JwtPayload} user - The user parameter is an object that represents the user who is adding
	 * an item to their wishlist. It contains information about the user, such as their ID.
	 * @param {any} wishlistBody - The `wishlistBody` parameter is an object that contains the following
	 * properties:
	 */
	export async function addToWishlist(user: JwtPayload, wishlistBody: any) {
		void await db.prisma.wishlistItem.create({
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

	/**
	 * The function `getWishlists` retrieves wishlists belonging to a user.
	 * @param {JwtPayload} user - The user parameter is of type JwtPayload, which is an object containing
	 * information about the user. It typically includes properties such as userId, username, and other
	 * user-related data. In this case, the userId property is used to filter the wishlists.
	 * @returns an array of objects, where each object has the properties "id", "userId", and
	 * "wishlistName".
	 */
	export async function getWishlists(user: JwtPayload): Promise<
    {
	id: number;
	userId: string | null;
	wishlistName: string;
    }[]
> {
    return await db.prisma.wishlist.findMany({
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

import { PrismaClient } from "@prisma/client";
import db from "../db";
import Register from "../users/register";

namespace Wishlist {
  export async function create_wishlist(userId: any, wishListName: string) {
    await db.prisma.wishlist.create({
      data: {
        userId: userId.user.id,
        wishlistName: wishListName,
      },
    });
  }

  export async function addToWishlist(user: any, wishlistBody: any) {
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
    return await db.prisma.wishlist.findMany({
      where: {
        userId: user.userId,
      },
    });
  }

  export async function getAll(user: any) {
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

import { PrismaClient } from "@prisma/client";
import db from "../db";
import Register from "../users/register";

namespace Wishlist {
  export async function create_wishlist(userId: any, wishListName: string) {
    /**
     * The function `create_wishlist` creates a new wishlist in the database for a given user.
     * @param {any} userId - The `userId` parameter is the ID of the user for whom the wishlist is being
     * created. It can be of any type, but in this case, it is expected to be an object with an `id`
     * property.
     * @param {string} wishListName - The `wishListName` parameter is a string that represents the name
     * of the wishlist that you want to create.
     */
    await db.prisma.wishlist.create({
      data: {
        userId: userId.user.id,
        wishlistName: wishListName,
      },
    });
  }

  export async function create_wishlist_item(user: Register.User) {
    /**
     * The function creates a wishlist item for a user in a TypeScript application.
     * @param user - The parameter "user" is of type "Register.User".
     */
    await db.prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
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
}

export default Wishlist;

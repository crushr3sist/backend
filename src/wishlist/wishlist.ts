import { PrismaClient } from "@prisma/client";
import db from "../db";
import Register from "../users/register";

namespace Wishlist {
  export interface wishlistItem {
    userId: string;
    product: string;
    url: string;
    date: string;
    current_price: number;
  }

  export interface wishlist {
    userId: string;
    wishlistName: string;
  }

  export async function create_wishlist(userid: any, wishlistname: string) {
    const add_wishlist = await db.prisma.wishlist.create({
      data: {
        userId: userid.user.id,
        wishlistName: wishlistname,
      },
    });
  }

  export async function create_wishlist_item(
    user: Register.User,
    wishlist_item: wishlist
  ) {
    const add_wishlist_item = await db.prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });
  }

  export async function get(user: Register.User) {}
}

export default Wishlist;

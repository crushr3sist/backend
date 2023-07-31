import express from "express";
import { PrismaClient } from "@prisma/client";

namespace db {
  export const prisma = new PrismaClient();
}

namespace Authentication {
  interface Auth {
    username: string;
    password: string;
  }

  async function check_if_user_exists(user: Auth): Promise<boolean> {
    const user_is_found = db.prisma.user.findFirst({
      where: {
        username: user.username,
        password: user.password,
      },
    });
    if (user_is_found) {
      return true;
    } else {
      return false;
    }
  }
}

namespace Register {
  interface User {
    username: string;
    password: string;
    email: string;
  }

  export async function register(user: User) {
    const reguser = await db.prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });
  }
}

import express from "express";
import { PrismaClient } from "@prisma/client";

const users_router = express.Router();

users_router.get("/", (req, res) => {
  res.send({ title: "hellooo " });
});
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
users_router.post("/register", (req, res) => {
  console.log("Got body:", req.body);

  Register.register(req.body)
    .then(async () => {
      await db.prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await db.prisma.$disconnect();
      res.send(`there was an error creating the user: error\n${e}`);
      process.exit(1);
    });
  res.send("User was successfully created");
  res.sendStatus(200);
});

export default users_router;

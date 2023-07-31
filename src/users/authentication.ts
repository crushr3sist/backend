import express from "express";
import { PrismaClient } from "@prisma/client";
import db from "../db";
import jwt from "jsonwebtoken";
import { GetResult } from "@prisma/client/runtime/library";
import { access } from "fs";

namespace Authentication {
  interface Auth {
    username: string;
    password: string;
  }

  const check_if_user_exists = async (user: Auth) => {
    return await db.prisma.user.findFirst({
      where: {
        username: user.username,
        password: user.password,
      },
    });
  };

  export const create_token = async (user: Auth) => {
    const _user = check_if_user_exists(user);

    return jwt.sign({ user: _user }, "lolololol", { expiresIn: 60 * 60 * 7 });
  };
}

export default Authentication;

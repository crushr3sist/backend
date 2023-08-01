import express from "express";
import { PrismaClient } from "@prisma/client";
import db from "../db";
import jwt from "jsonwebtoken";
import { GetResult } from "@prisma/client/runtime/library";
import "dotenv/config";
import { configDotenv } from "dotenv";

namespace Authentication {
  interface Auth {
    username: string;
    password: string;
  }
  const config = configDotenv();
  const check_if_user_exists = async (user: Auth) => {
    return await db.prisma.user.findFirst({
      where: {
        username: user.username,
        password: user.password,
      },
    });
  };

  export const get_user = async (token: string) => {
    const decoded = await jwt.verify(
      token,
      process.env.ACCESS_SECRET as string
    );
    return decoded;
  };

  export const create_token = async (user: Auth) => {
    const _user = await check_if_user_exists(user);
    console.log(process.env.ACCESS_SECRET);
    console.log(_user);

    return await jwt.sign(
      { user: _user },
      process.env.ACCESS_SECRET as string,
      {
        expiresIn: 60 * 60 * 7,
      }
    );
  };
}

export default Authentication;

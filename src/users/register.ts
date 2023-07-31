import express from "express";
import { PrismaClient } from "@prisma/client";
import db from "../db";

namespace Register {
  export interface User {
    username: string;
    password: string;
    email: string;
  }

  export async function getUserId(user: User) {
    return await db.prisma.user.findFirst({
      where: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });
  }

  export async function register(user: User) {
    const reg_user = await db.prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });
  }
}

export default Register;

import db from "../db";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

namespace Authentication {
  interface Auth {
    username: string;
    password: string;
  }

  const check_if_user_exists = async (user: any) => {
    return await db.prisma.user.findFirst({
      where: {
        username: user.username,
        password: user.password,
      },
    });
  };

  export const get_user = async (token: string) => {
    try {
      const decoded = await jwt.verify(
        token,
        process.env.ACCESS_SECRET as string
      );
      return decoded;
    } catch (err) {
      console.log(err);
    }
  };

  export const get_user_record = async (token: string) => {
    try {
      const decoded = (await jwt.verify(
        token,
        process.env.ACCESS_SECRET as string
      )) as JwtPayload;
      const user = db.prisma.user.findFirst({
        where: {
          username: decoded.username,
        },
      });
      return user;
    } catch (err) {
      console.log(err);
    }
  };

  export const createExpire = () => {
    const date = Date.now();
    const timeDiff = 60 * 60 * 24 * 30;

    const expTime = Math.floor(date / 1000) + timeDiff;
    return expTime;
  };

  export const create_token = async (user: Auth) => {
    try {
      const _user = await check_if_user_exists(user);

      return await jwt.sign(
        { user: _user },
        process.env.ACCESS_SECRET as string,
        {
          expiresIn: createExpire(),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  export const refreshToken = async (token: string) => {
    try {
      const tokenDecoded = (await Authentication.get_user(token)) as JwtPayload;
      if (typeof tokenDecoded === "string") {
        throw new Error("Invalid token");
      }

      const _user = await check_if_user_exists({
        username: tokenDecoded.username,
      });

      console.log(process.env.ACCESS_SECRET);
      console.log(_user);

      return await jwt.sign(
        { user: _user },
        process.env.ACCESS_SECRET as string,
        {
          expiresIn: createExpire(),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
}

export default Authentication;

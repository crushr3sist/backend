import db from "../db";
import jwt from "jsonwebtoken";
import "dotenv/config";

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

  export const get_user = async (token: string) => {
    const decoded = await jwt.verify(
      token,
      process.env.ACCESS_SECRET as string
    );
    return decoded;
  };

  export const create_token = async (user: Auth) => {
    const _user = await check_if_user_exists(user);
    const date = Date.now();
    const timeDiff = 60 * 60 * 24 * 30;

    const expTime = Math.floor(date / 1000) + timeDiff;
    console.log(expTime);

    console.log(process.env.ACCESS_SECRET);
    console.log(_user);
    return await jwt.sign(
      { user: _user },
      process.env.ACCESS_SECRET as string,
      {
        expiresIn: expTime,
      }
    );
  };

  export const refreshToken = async (token: string) => {
    const date = Date.now();
    const timeDiff = 60 * 60 * 24 * 30;

    const expTime = Math.floor(date / 1000) + timeDiff;

    const tokenDecoded = Authentication.get_user(token);

    const _user = await check_if_user_exists(tokenDecoded);

    console.log(process.env.ACCESS_SECRET);
    console.log(_user);

    return await jwt.sign(
      { user: _user },
      process.env.ACCESS_SECRET as string,
      {
        expiresIn: expTime,
      }
    );
  };
}

export default Authentication;

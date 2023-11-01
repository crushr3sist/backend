import db from '../db';
import jwt, {type JwtPayload} from 'jsonwebtoken';
import 'dotenv/config';

namespace Authentication {
	export interface Auth {
		username: string;
		password: string;
	}
	type Record = {
		id: string;
		email: string;
	} & Auth;
	// Overloaded function to accept auth interface completely and to be loosely typed
	/**
   * The function checks if a user exists in the database based on their username and password.
   * @param {any} user - The `user` parameter is an object that represents the user's authentication
   * information. It has two properties:
   * @returns a Promise that resolves to any type of value.
   */
	async function check_if_user_exists(user: Auth): Promise<any>;
	async function check_if_user_exists(user: {
		username: Auth['username'];
	}): Promise<any>;
	async function check_if_user_exists(user: any): Promise<any> {
		return db.prisma.user.findFirst({
			where: {
				username: user.username,
				password: user.password,
			},
		});
	}

	/**
   * The function `get_user` takes a token as input, verifies it using a secret key, and returns the
   * decoded token if successful.
   * @param {string} token - A string representing the access token that needs to be verified.
   * @returns The decoded token is being returned.
   */
	export const get_user = async (
		token: string,
	): Promise<string | JwtPayload | undefined> => {
		try {
			const decoded = await jwt.verify(
				token,
				process.env.ACCESS_SECRET!,
			);
			return decoded;
		} catch (err) {
			console.log(err);
		}
	};

	/**
   * The function `get_user_record` takes a token as input, verifies it using a secret, and returns the
   * user record associated with the decoded username.
   * @param {string} token - The `token` parameter is a string that represents a JSON Web Token (JWT).
   * It is used to authenticate and authorize a user.
   * @returns the user record from the database.
   */
	export const get_user_record = async (
		token: string,
	): Promise<Record | undefined> => {
		try {
			const decoded = (await jwt.verify(
				token,
				process.env.ACCESS_SECRET!,
			)) as JwtPayload;
			const user = await db.prisma.user.findFirst({
				where: {
					username: decoded.username,
				},
			});
			return user || undefined;
		} catch (err) {
			console.log(err);
		}
	};

	/**
   * The function `createExpire` calculates the expiration time for a date 30 days in the future.
   * @returns The function `createExpire` returns the expiration time in seconds.
   */
	export const createExpire = () => {
		const date = Date.now();
		const timeDiff = 60 * 60 * 24 * 30;

		const expTime = Math.floor(date / 1000) + timeDiff;
		return expTime;
	};

	/**
   * The function `create_token` creates a JSON Web Token (JWT) for a given user and signs it using an
   * access secret.
   * @param {Auth} user - The `user` parameter is an object of type `Auth` which represents the user's
   * authentication details. It likely contains properties such as `username`, `password`, and other
   * relevant information needed for authentication.
   * @returns a JWT token.
   */
	export const create_token = async (
		user: Auth,
	): Promise<string | undefined> => {
		try {
			const _user = await check_if_user_exists(user);
			return jwt.sign(
				{user: _user},
				process.env.ACCESS_SECRET!,
				{
					expiresIn: createExpire(),
				},
			);
		} catch (err) {
			return err;
		}
	};

	/**
   * The `refreshToken` function takes a token as input, decodes it, checks if the user exists, and
   * returns a new token with an updated expiration date.
   * @param {string} token - The `token` parameter is a string that represents the authentication token
   * that needs to be refreshed.
   * @returns The function `refreshToken` returns a `Promise` that resolves to a string or `undefined`.
   */
	export const refreshToken = async (
		token: string,
	): Promise<string | undefined> => {
		try {
			const tokenDecoded = (await get_user(token)) as JwtPayload;
			if (typeof tokenDecoded === 'string') {
				throw new Error('Invalid token');
			}

			const _user = await check_if_user_exists({
				username: tokenDecoded.username,
			});

			return jwt.sign(
				{user: _user},
				process.env.ACCESS_SECRET!,
				{
					expiresIn: createExpire(),
				},
			);
		} catch (err) {
			return err;
		}
	};
}

export default Authentication;

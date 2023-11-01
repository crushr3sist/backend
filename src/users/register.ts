import express from 'express';
import {PrismaClient} from '@prisma/client';
import db from '../db';

namespace Register {
	export interface User {
		username: string;
		password: string;
		email: string;
	}

	/**
   * The function `getUserId` takes a `User` object as input and returns a `Register.User` object or
   * `null` after querying the database for a matching user.
   * @param {User} user - The `user` parameter is an object that represents a user. It has the
   * following properties:
   * @returns a Promise that resolves to either a User object or null.
   */
	export async function getUserId(user: User): Promise<User | undefined> {
		return db.prisma.user.findFirst({
			where: {
				username: user.username,
				email: user.email,
				password: user.password,
			},
		});
	}

	/**
   * The `register` function is an asynchronous function that creates a new user in a database using
   * the provided user object.
   * @param {User} user - The `user` parameter is an object that represents the user's information. It
   * has the following properties:
   * @returns a Promise that resolves to a value of type `Register.User` or `undefined`.
   */
	export async function register(
		user: User,
	): Promise<User | undefined> {
		try {
			await db.prisma.user.create({
				data: {
					username: user.username,
					email: user.email,
					password: user.password,
				},
			});
		} catch (err) {
			return err;
		}
	}
}

export default Register;

import express from 'express';
import Authentication from './authentication';
import Register from './register';
import db from '../db';
const users_router = express.Router();

/* The code `users_router.post("/refresh", async (req, res) => { ... })` is defining a route for
handling a POST request to the "/refresh" endpoint. */
users_router.post('/refresh', async (req, res) => {
	try {
		const token = await Authentication.refreshToken(req.body.token);
		res.status(200).send({access_token: token});
	} catch (error) {
		console.error('Error refreshing:', error.message);
		res.status(500).send(`Error refreshing token ${error.message}`);
	}
});

/* The code `users_router.post("/", async (req, res) => { ... })` is defining a route for handling a
POST request to the root endpoint ("/"). */
users_router.post('/', async (req, res) => {
	try {
		const user = await Authentication.get_user_record(req.body.token);
		res.status(200).send({user});
	} catch (error) {
		console.error('Error fetching user:', error.message);
		res.status(500).send(`Error fetching user ${error.message}`);
	}
});

/* The code `users_router.post("/login", async (req, res) => { ... })` is defining a route for handling
a POST request to the "/login" endpoint. */
users_router.post('/login', async (req, res) => {
	try {
		const token = await Authentication.create_token(req.body);
		res.status(200).send({access_token: token});
	} catch (error) {
		console.error('Error with login:', error.message);
		res.status(500).send(`Error with login ${error.message}`);
	}
});

/* The code `users_router.post("/register", async (req, res) => { ... })` is defining a route for
handling a POST request to the "/register" endpoint. */
users_router.post('/register', async (req, res) => {
	try {
		await Register.register(req.body);
		await db.prisma.$disconnect();
		res.status(200).send('Registration successful');
	} catch (error) {
		console.error('Error during registration:', error.message);
		await db.prisma.$disconnect();
		res.status(500).send(`Error during registration ${error.message}`);
	}
});

export default users_router;

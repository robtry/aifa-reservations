import { https } from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import { isAuthMiddleware } from './middlewares/isAuth.middleware';
import { reserve } from './controllers/gates.controller';
import { createGates } from './seeders/gate';

const server = express();
server.use(cors());
server.use(express.json());

server.post('/reserve', isAuthMiddleware, async (req, res) => {
	console.log('body', req.body);
	await reserve();
	res.send({ message: 'good' });
});

server.post('/seed', async (_, res) => {
	await createGates();
	res.send({ message: 'complete' });
});

export const app = https.onRequest(server);

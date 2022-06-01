import { https } from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import gatesRouter from './routes/gates.router';
// Seeders
// import { createGates } from './seeders/gate.seeder';

// Create server
const server = express();
// Enable cors
server.use(cors());
// Enable json request
server.use(express.json());

// ROUTES
server.use('/', gatesRouter);

// Export to firebase HTTP SERVER
export const api = https.onRequest(server);
// export const seeder = runWith({
// 	timeoutSeconds: 540,
// }).https.onRequest(async (_, res) => {
// 	try {
// 		await createGates();
// 		res.send({ message: 'complete' });
// 	} catch (error) {
// 		res.status(500).send({ message: 'internal server error', details: error });
// 	}
// });

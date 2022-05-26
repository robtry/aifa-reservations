import { https } from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import gatesRouter from './routes/gates.router';

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

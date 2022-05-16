import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';

import permissions from '../permissions.json';

if (process.env.NODE_ENV === 'development') {
	process.env['FIREBASE_DATABASE_EMULATOR_HOST'] = 'localhost:9000';
	process.env['PUBSUB_EMULATOR_HOST'] = 'localhost:8085';
	process.env['PUBSUB_PROJECT_ID'] = 'metamascota';
}

const app = initializeApp({
	credential: cert(permissions as ServiceAccount),
	databaseURL: 'https://aifa-2022-default-rtdb.firebaseio.com',
});

export const auth = getAuth(app);

const db = getDatabase(app);
export const dbRef = db.ref().child('gates');

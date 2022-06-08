import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';
import { getFirestore } from 'firebase-admin/firestore';
// import { config } from 'firebase-functions';
import permissions from '../permissions.json';

// console.log('firebase keys', config());
// To connect locally

// // auth
// process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:9099';
// // firestore
// process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';
// // db
// process.env['FIREBASE_DATABASE_EMULATOR_HOST'] = 'localhost:9000';
// // pubsub
// process.env['PUBSUB_EMULATOR_HOST'] = 'localhost:8085';
// process.env['PUBSUB_PROJECT_ID'] = 'aifa-2022';

// console.log('firebase keys after', config());

const app = initializeApp({
	credential: cert(permissions as ServiceAccount),
	databaseURL: 'https://aifa-2022-default-rtdb.firebaseio.com',
	// databaseAuthVariableOverride: { uid: 'main-server' }
});

// Auth
export const auth = getAuth(app);

// Database
export const db = getDatabase(app);

// Firestore
export const firestore = getFirestore();
export const usersReference = firestore.collection('users');

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
	getAuth,
	connectAuthEmulator,
	GoogleAuthProvider,
} from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
// import { getMessaging } from "firebase/messaging";
// import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE,
	messagingSenderId: process.env.REACT_APP_SENDER,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// - Google provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// - Auth
export const auth = getAuth(app);

// - NRT Database
// export const db = getDatabase(app);

// - Firestore
export const db = getFirestore(app);

// Notifications
// export const messaging = getMessaging(app);

// Enable analytics
if (process.env.NODE === 'production') {
	getAnalytics(app);
}

// Connect emulatos
if (window.location.hostname === 'localhost') {
	console.log('connected with emulators');
	connectAuthEmulator(auth, 'http://localhost:9099');
	connectFirestoreEmulator(db, 'localhost', 8080);
	//connectDatabaseEmulator(db, 'localhost', 9000);
}

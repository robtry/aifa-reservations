import { auth } from 'firebaseui';
import firebase from 'firebase/compat/app';
import { useEffect } from 'react';
import { auth as localAuth } from '../../util/firebase_config';

// Create AuthUI Instance
const ui = new auth.AuthUI(localAuth);

// Auth logic
export default function useAuth() {
	// Search for

	// Load the ui firebase interface
	useEffect(() => {
		ui.start('#firebaseui-auth-container', {
			signInFlow: 'popup',
			signInOptions: [
				firebase.auth.EmailAuthProvider.PROVIDER_ID,
				firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			],
			callbacks: {
				signInSuccessWithAuthResult: function (authResult) {
					// console.log('firebase result', authResult);
					// User successfully signed in.
					// Return type determines whether we continue the redirect automatically
					// or whether we leave that to developer to handle.
					return false; // to avoid redirect url
				},
			},
		});
	}, []);
}
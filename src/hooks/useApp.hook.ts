import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import useUserStore from '../store/user.store';
import { auth } from '../util/firebase_config';

// Suscribe to changes from firebase
export default function useApp() {
	const [setIsAuth, setVerifying, setUser, setIsAdmin] = useUserStore(
		(state) => [
			state.setIsAuth,
			state.setIsVerifying,
			state.setUser,
			state.setIsAdmin,
		],
		shallow
	);


	// Subscribe to validate if the user was auth
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			if (firebaseUser) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				// const uid = user.uid;
				console.log('user logged', firebaseUser);
				setIsAdmin(firebaseUser.displayName === 'ADMIN');
			}
			setIsAuth(Boolean(firebaseUser));
			setUser(firebaseUser);
			setVerifying(false);
		});

		// Cleanup suscription
		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// TODO refresh auth token

	return {};
}

import { onAuthStateChanged } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import useGatesStore from '../store/gates.store';
import useUserStore from '../store/user.store';
import { auth, db } from '../util/firebase_config';

// Suscribe to changes from firebase
export default function useApp() {
	const [setIsAuth, setVerifying, setUser] = useUserStore(
		(state) => [state.setIsAuth, state.setIsVerifying, state.setUser],
		shallow
	);

	const [setFirebaseGateReference, firebaseGatesReference, setGates] =
		useGatesStore(
			(state) => [
				state.setFirebaseGateReference,
				state.firebaseGatesReference,
				state.setGates,
			],
			shallow
		);

	// Validate if the user was auth
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			if (firebaseUser) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				// const uid = user.uid;
				console.log('user logged', firebaseUser);
			}
			setIsAuth(Boolean(firebaseUser));
			setUser(firebaseUser);
			setVerifying(false);
			setFirebaseGateReference(ref(db, 'gates'));
		});

		// Cleanup suscription
		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// TODO refresh auth token

	// Use zustand to listen for the arrays changes
	useEffect(() => {
		if (!firebaseGatesReference) return;
		const unsubscribe = onValue(ref(db, 'gates'), (snap) => {
			if (snap.exists()) {
				const data = snap.val();
				// console.log('data changes', data);
				setGates(data);
			} else {
				setGates([]);
			}
		});
		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [firebaseGatesReference]);

	return {};
}

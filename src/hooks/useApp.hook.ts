import { onAuthStateChanged } from 'firebase/auth';
import {
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	collection,
} from 'firebase/firestore';
import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import useGatesStore from '../store/gates.store';
import useUserStore from '../store/user.store';
import { auth, db } from '../util/firebase_config';

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

	const [setFirebaseGateReference, firebaseGatesReference, setGates] =
		useGatesStore(
			(state) => [
				state.setFirebaseGateReference,
				state.firebaseGatesReference,
				state.setGates,
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
			setFirebaseGateReference(collection(db, 'schedules'));
		});

		// Cleanup suscription
		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// TODO refresh auth token

	// getDoc(doc(db, 'schedules', '6-4-2022', '1654372800000', '106')).then(
	// 	(val) => console.log(val.data())
	// );

	return {};
}

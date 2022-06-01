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

	// Subscribe to validate if the user was auth
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
			setFirebaseGateReference(collection(db, 'schedules'));
		});

		// Cleanup suscription
		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// TODO refresh auth token

	// Use zustand to listen for the arrays changes
	useEffect(() => {
		if (!firebaseGatesReference) return;
		// const unsubscribe = onSnapshot(doc(db, 'schedules', '6-1-2022'), (snap) => {
		// 	if (snap.exists()) {
		// 		const data = snap.data();
		// 		console.log('data changes', data);
		// 		setGates(data as Gate[]);
		// 	} else {
		// 		setGates([]);
		// 	}
		// });
		// return () => unsubscribe();
		console.log('hey you!');
		// get a doc
		getDoc(doc(db, 'schedules', '6-1-2022', '1654041600000', '502')).then(val => console.log(val.data()))
		
		// getDocsFromServer(collection(db, 'schedules', '6-1-2022', '1654041600000'))	
		// .then((snapshot) => {
		// 	console.log('snapshot size:', snapshot.size);
		// 	snapshot.forEach((doc) => {
		// 		console.log(`${doc.id} =>`);
		// 		console.log(doc.data());
		// 	});
		// });



		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [firebaseGatesReference]);

	return {};
}

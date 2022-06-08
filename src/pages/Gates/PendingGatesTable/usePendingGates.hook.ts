import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../../../util/firebase_config';
import useUserStore from '../../../store/user.store';
import shallow from 'zustand/shallow';

export default function usePendingGates() {
	const [isAdmin, user] = useUserStore(
		(state) => [state.isAdmin, state.user],
		shallow
	);
	const [pendingGates, setPendingGates] = useState<PendingGates>([]);

	useEffect(() => {
		const pendingRef = collection(db, 'pending');
		const q = isAdmin
			? query(pendingRef)
			: query(pendingRef, where('booker', '==', user?.displayName));

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const pending: PendingGates = [];
			querySnapshot.forEach((doc) => {
				const data = doc.data() as PendingGate;
				// console.log(doc.data());
				pending.push({ ...data, id: doc.id });
			});
			setPendingGates(pending);
		});
		return () => unsubscribe();
	}, [isAdmin, user?.displayName]);

	return {
		pendingGates,
	};
}

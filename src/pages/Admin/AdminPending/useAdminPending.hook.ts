import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../../util/firebase_config';

export default function useAdminPending() {
	const [pendingGates, setPendingGates] = useState<PendingGates>([]);

	useEffect(() => {
		const q = query(collection(db, 'pending'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const pending: PendingGates = [];
			// console.log('pending to aprove by admin');
			querySnapshot.forEach((doc) => {
				const data = doc.data() as PendingGate;
				// console.log(doc.data());
				pending.push({ ...data, id: doc.id });
			});
			setPendingGates([...pending]);
		});
		return () => unsubscribe();
	}, []);

	return {
		pendingGates
	}
}

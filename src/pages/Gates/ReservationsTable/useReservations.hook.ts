import { useEffect, useState } from 'react';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../util/firebase_config';
import useUserStore from '../../../store/user.store';

export default function useReservations() {
	const [reservations, setReservations] = useState<Reservations>([]);
	const [currentUser] = useUserStore((state) => [state.user]);

	useEffect(() => {
		const q = query(
			collection(db, 'reservations'),
			where('booker', '==', currentUser?.displayName)
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const reservs: Reservations = [];
			querySnapshot.forEach((doc) => {
				reservs.push({ ...doc.data(), id: doc.id } as Reservation);
			});
			setReservations(reservs);
		});
		return () => unsubscribe();
	}, [currentUser?.displayName]);

	return {
		reservations,
	};
}

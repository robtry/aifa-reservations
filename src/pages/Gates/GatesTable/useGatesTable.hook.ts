import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import useGatesStore from '../../../store/gates.store';
import { db } from '../../../util/firebase_config';
import shallow from 'zustand/shallow';
import useAppStore from '../../../store/app.store';

export default function useGatesTable() {
	const [queryDate, setSchedules] = useGatesStore(
		(state) => [state.queryDate, state.setSchedule],
		shallow
	);
	const [setNotification] = useAppStore(
		(state) => [state.setNotification],
		shallow
	);

	useEffect(() => {
		if (!queryDate) return;

		const schedulesGate = doc(
			db,
			'schedules',
			new Date(queryDate).toLocaleDateString().replace(/\//gi, '-')
		);

		const unsubscribe = onSnapshot(schedulesGate, (doc) => {
			if (!doc.exists) {
				return setNotification('No hay registros', 'error');
			}
			// const data: Schedule = doc.data() as Schedule;
			setSchedules(doc.data() as Schedule);
		});

		return () => unsubscribe();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryDate]);
}

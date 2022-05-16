import { dbRef } from '../util/firebase_admin';

export const createGates = async () => {
	await dbRef.set({
		1: {
			name: 'Puerta 1',
			status: 'free',
			date: '',
		},
		2: {
			name: 'Puerta 2',
			status: 'free',
			date: '',
		},
	});
};

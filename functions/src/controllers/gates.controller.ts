import { dbRef } from '../util/firebase_admin';

export const reserve = async () => {
	await dbRef.once('value', (snapshot) => {
		console.log('gates on back', snapshot.val());
	});
};

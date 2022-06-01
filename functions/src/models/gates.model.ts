import {
	CollectionReference,
	DocumentReference,
} from 'firebase-admin/firestore';
import { firestore } from '../util/firebase_admin';
// import { AIRLINES } from '../seeders/gate.seeder';

class GatesModel {
	// Reservar por la aereolinea
	public async book(airline: string, date: Date, gate: string) {
		console.log(
			'wil book in model',
			'airline:',
			airline,
			'date:',
			date.toLocaleDateString().replace(/\//gi, '-'),
			'hour:',
			date.getTime(),
			'gate:',
			gate
		);

		const schedulesRef = firestore
			.collection('schedules')
			.doc(date.toLocaleDateString().replace(/\//gi, '-'))
			.collection(date.getTime().toString())
			.doc(gate);

		const pendingRef = firestore.collection('pending');

		try {
			await firestore.runTransaction(async (t) => {
				const schedule = await t.get(schedulesRef);
				const data: Gate = schedule.data() as Gate;
				console.log('current data', data);
				if (data.booker === null && data.status === 'available') {
					t.update(schedulesRef, { booker: airline, status: 'pending' });
					// This may be a trigger by firebase functions?
					await pendingRef.add({ date: date.getTime(), gate, booker: airline });
				} else {
					throw new Error('Already booked');
				}
			});
			console.log('Transaction success, pending to reserve!');
		} catch (e) {
			console.log('Transaction failure:', e);
			throw new Error('Already booked');
		}
	}

	// Aprobar, rechazar, bloquear por los admins
	public async action(date: Date, gate: string, action: string) {
		console.log(
			'wil ' + action + ' in model',
			'date',
			date.toLocaleDateString().replace(/\//gi, '-'),
			'hour',
			date.getTime(),
			'gate',
			gate
		);

		const dbRef = firestore
			.collection('schedules')
			.doc(date.toLocaleDateString().replace(/\//gi, '-'))
			.collection(date.getTime().toString())
			.doc(gate);

		const pendingRef = firestore.collection('pending');

		switch (action) {
			case 'approve':
				await this.approvePendingGate(dbRef, pendingRef, date, gate);
				break;
			case 'reject':
				await this.rejectPendingGate(dbRef, pendingRef, date, gate);
				break;
			case 'lock':
				await this.lockGate(dbRef);
				break;
			default:
				console.log('Caso no manejado');
		}

		this.notify();
	}

	// Send notifications
	private notify() {
		console.log('will notify');
	}

	// Helper functions
	private async approvePendingGate(
		dbReference: DocumentReference,
		pendingRef: CollectionReference,
		date: Date,
		gate: string
	) {
		await firestore.runTransaction(async (t) => {
			const doc = await t.get(dbReference);
			const data: Gate = doc.data() as Gate;
			console.log('current data', data);
			if (data.status === 'pending') {
				t.update(dbReference, { status: 'confirmed' });
				const docsInPeding = await pendingRef
					.where('date', '==', date.getTime())
					.where('gate', '==', gate)
					.get();
				if (!docsInPeding.empty && docsInPeding.size === 1) {
					docsInPeding.forEach(async (doc) => {
						await pendingRef.doc(doc.id).delete();
					});
				} else {
					console.log('el registro ya no existia en db o hay más de uno');
				}
			} else {
				throw new Error('Status is not pending, cant not be approved');
			}
		});
		console.log('Transaction success, confirmed!');
	}

	private async rejectPendingGate(
		dbReference: DocumentReference,
		pendingRef: CollectionReference,
		date: Date,
		gate: string
	) {
		await firestore.runTransaction(async (t) => {
			const doc = await t.get(dbReference);
			const data: Gate = doc.data() as Gate;
			console.log('current data', data);
			if (data.status === 'pending') {
				t.update(dbReference, { status: 'available' });
				const docsInPeding = await pendingRef
					.where('date', '==', date.getTime())
					.where('gate', '==', gate)
					.get();
				if (!docsInPeding.empty && docsInPeding.size === 1) {
					docsInPeding.forEach(async (doc) => {
						await pendingRef.doc(doc.id).delete();
					});
				} else {
					console.log('el registro ya no existia en db o hay más de uno');
				}
			} else {
				throw new Error('Status is not pending, cant not be rejected');
			}
		});
		console.log('Transaction success, confirmed!');
	}

	private async lockGate(dbReference: DocumentReference) {
		await firestore.runTransaction(async (t) => {
			const doc = await t.get(dbReference);
			const data: Gate = doc.data() as Gate;
			console.log('current data', data);
			if (data.status === 'available') {
				t.update(dbReference, { status: 'locked', booker: 'ADMIN' });
			} else {
				throw new Error('Status is not available, cant not be locked');
			}
		});
		console.log('Transaction success, confirmed!');
	}
}

export default GatesModel;

import { DocumentReference } from 'firebase-admin/firestore';
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

		const scheduleRef = firestore
			.collection('schedules')
			.doc(date.toLocaleDateString().replace(/\//gi, '-'));

		const pendingRef = firestore.collection('pending');

		try {
			await firestore.runTransaction(async (t) => {
				const schedule = await t.get(scheduleRef);
				const data: Schedule = schedule.data() as Schedule;
				const dateTime = date.getTime();
				console.log('booker', data[dateTime][gate].booker);
				console.log('status', data[dateTime][gate].status);

				if (
					data[dateTime][gate].booker === null &&
					data[dateTime][gate].status === 'available'
				) {
					t.update(scheduleRef, {
						// prev data
						...data,
						// overwrite time
						[date.getTime().toString()]: {
							// prev gates
							...data[date.getTime().toString()],
							// change gate info
							[gate]: {
								booker: airline,
								status: 'pending',
							},
						},
					});
					// This may be a trigger by firebase functions?
					t.create(pendingRef.doc(dateTime.toString() + gate), {
						gate,
						booker: airline,
						date: dateTime,
					});
				} else {
					throw new Error('Already booked');
				}
			});
			console.log('Transaction success, pending to reserve!');
		} catch (e) {
			console.log('Transaction failure:', e);
			throw new Error(e as string);
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
			.doc(date.toLocaleDateString().replace(/\//gi, '-'));

		const pendingRef = firestore
			.collection('pending')
			.doc(date.getTime().toString() + gate);

		const reservationsRef = firestore
			.collection('reservations')
			.doc(date.getTime().toString() + gate);

		switch (action) {
			case 'approve':
				await this.approveRejectPendingGate(
					dbRef,
					pendingRef,
					reservationsRef,
					date,
					gate,
					'approve'
				);
				break;
			case 'reject':
				await this.approveRejectPendingGate(
					dbRef,
					pendingRef,
					reservationsRef,
					date,
					gate,
					'reject'
				);
				break;
			case 'lock':
				await this.lockGate(dbRef, reservationsRef, date, gate);
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
	private async approveRejectPendingGate(
		dbReference: DocumentReference,
		pendingRef: DocumentReference,
		reservationRef: DocumentReference,
		date: Date,
		gate: string,
		action: 'approve' | 'reject'
	) {
		await firestore.runTransaction(async (t) => {
			const doc = await t.get(dbReference);
			const data: Schedule = doc.data() as Schedule;
			const docsInPeding = await t.get(pendingRef);
			const dateTime = date.getTime();

			// Update status
			if (data[date.getTime()][gate].status !== 'pending') {
				throw new Error('Status is not pending, cant not be approved');
			}
			t.update(dbReference, {
				// prev data
				...data,
				// overwrite time
				[dateTime.toString()]: {
					// prev gates
					...data[dateTime.toString()],
					// change gate info
					[gate]: {
						booker:
							action === 'approve'
								? data[dateTime.toString()][gate].booker
								: null,
						status: action === 'approve' ? 'confirmed' : 'available',
					},
				},
			});

			// Delete from pedings collection
			if (!docsInPeding.exists) {
				throw new Error('Was not peding to aprove');
			}
			t.delete(pendingRef);

			// Add to reservations collection
			if (action === 'approve') {
				t.create(reservationRef, {
					booker: data[dateTime.toString()][gate].booker,
					gate,
					date: dateTime,
				});
			}

		});
		console.log('Transaction success, confirmed!');
	}

	private async lockGate(
		dbReference: DocumentReference,
		reservationsRef: DocumentReference,
		date: Date,
		gate: string
	) {
		await firestore.runTransaction(async (t) => {
			const doc = await t.get(dbReference);
			const data: Schedule = doc.data() as Schedule;
			const dateTime = date.getTime();

			// Update the gate status
			if (data[dateTime][gate].status !== 'available') {
				throw new Error('Status is not pending, cant not be approved');
			}
			t.update(dbReference, {
				// prev data
				...data,
				// overwrite time
				[dateTime.toString()]: {
					// prev gates
					...data[dateTime.toString()],
					// change gate info
					[gate]: {
						booker: 'ADMIN',
						status: 'locked',
					},
				},
			});
			t.create(reservationsRef, { gate, date: dateTime, booker: data[dateTime][gate].booker })
		});
		console.log('Transaction success, confirmed!');
	}
}

export default GatesModel;

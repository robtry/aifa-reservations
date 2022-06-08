import { firestore, auth } from '../util/firebase_admin';

export const GATES = [
	'106',
	'107',
	'108',
	'109',
	'110',
	'111',
	'112',
	'113',
	'114',
	'115',
	'116',
	'117',
	'501',
	'502',
	'503',
	'504',
	'505',
];

export const AIRLINES = [
	'ADMIN',
	'Aereomexico',
	'Volaris',
	'Vivaaereobus',
	'Interjet',
];

// Wait function
// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Seleccionar el rango de fechas
export const initialDate = new Date('06/08/2022'); // June 1
// export const initialDate = new Date(); // June 1
export const endDate = new Date('07/01/2022'); // July 1

// Seeder to populate db
export const createGates = () => {
	// Crear los horarios disponibles
	return new Promise(async (resolve, reject) => {
		// Crear las objetos que alamacenaran la info
		let schedules: { [key: string]: any } = {};
		let counter = 0;
		// Gates
		const gatesLen = GATES.length;
		const gates: { [key: string]: any } = {};
		// Generar las combinaciones
		for (let i = 0; i < gatesLen; i++) {
			gates[GATES[i]] = {
				status: 'available',
				booker: null,
			};
		}
		// Iterar sobre los dias
		for (
			let currentDay = initialDate;
			currentDay <= endDate;
			currentDay.setDate(currentDay.getDate() + 1)
		) {
			// Fin del día para iterar sobre las horas
			let nextDay = new Date(currentDay);
			nextDay.setDate(nextDay.getDate() + 1);
			// Get the current key
			const day = currentDay.toLocaleDateString().replace(/\//gi, '-');
			// Iterar sobre las horas de los días
			for (
				let hours = new Date(currentDay);
				hours <= nextDay;
				hours.setHours(hours.getHours() + 1)
			) {
				counter++;
				// console.log('current', counter, 'for', day, 'hour', hours.getHours());
				schedules[hours.getTime()] = gates;
			}
			// console.log('schedule', schedules);
			try {
				const res = await firestore.collection('schedules').doc(day).set(schedules);
				schedules = {};
				console.log('result', res.writeTime);
				// await sleep(500);
			} catch (e) {
				reject(e);
			}
		}
		// 3 - Complete
		resolve('complete, total: ' + counter);
	});
};

export const createUsers = async () => {
	// 2 - Crear usuarios
	const airlinesLen = AIRLINES.length;
	for (let i = 0; i < airlinesLen; i++) {
		try {
			const userRecord = await auth.createUser({
				email: `${AIRLINES[i].toLocaleLowerCase()}@email.com`,
				emailVerified: true,
				password: '123456',
				displayName: AIRLINES[i].toLocaleLowerCase(),
				disabled: false,
			});
			await firestore
				.collection('users')
				.doc(userRecord.uid)
				.set({
					role: AIRLINES[i] === 'ADMIN' ? 'admin' : 'airline',
					name: AIRLINES[i],
				});
			console.log('Successfully created new user:', userRecord.uid);
		} catch (error) {
			console.log('Error creating new user:', error);
		}
	}
};

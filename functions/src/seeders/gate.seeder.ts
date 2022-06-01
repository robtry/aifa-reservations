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
export const initialDate = new Date('06/01/2022'); // June 6
export const endDate = new Date('12/31/2022'); // July 6
// export const endDate = new Date('06/01/2022'); // July 6

// Seeder to populate db
export const createGates = () => {
	// Crear los horarios disponibles
	return new Promise(async (resolve, reject) => {
		// Crear las objetos que alamacenaran la info
		let counter = 0;
		// Aereolineas
		const airlinesLen = AIRLINES.length;
		const airlines: { [key: string]: any } = {};
		// Gates
		const gatesLen = GATES.length;
		// 1 - Llenar la db
		// Generar las combinaciones
		for (let i = 0; i < airlinesLen; i++) {
			airlines[AIRLINES[i]] = 'none';
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
				for (let i = 0; i < gatesLen; i++) {
					counter++;
					console.log('current', counter, 'for', day, hours.getHours());
					try {
						const res = await firestore
							.collection('schedules')
							.doc(day)
							.collection(hours.getTime().toString())
							.doc(GATES[i])
							.set({
								// gate: GATES[gateIndex],
								status: 'available',
								booker: null,
							});
						console.log('result', res.writeTime);
						// await sleep(500);
					} catch (e) {
						reject(e);
					}
				}
			}
		}
		// 3 - Complete
		resolve('complete');
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
				displayName: AIRLINES[i],
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

// (async () => {
	// await createUsers();
	// await createGates();
// })();

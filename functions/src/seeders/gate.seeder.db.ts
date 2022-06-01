import { db as rtdb } from '../util/firebase_admin';

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
	'Interjet'
]

// Seleccionar el rango de fechas
export const initialDate = new Date('06/01/2022'); // June 6
export const endDate = new Date('06/05/2022'); // July 6

// Seeder to populate db
export const createGates = async () => {
	// Crear los horarios disponibles
	return new Promise((resolve, reject) => {
		// Crear las objetos que alamacenaran la info
		// Base de datos general
		const db : { [key: string]: any } = {} ;
		// Aereolineas
		const airlinesLen = AIRLINES.length;
		const airlines: { [key: string]: any } = {};
		// Gates
		const gatesLen = GATES.length;
		const gates: { [key: string]: any } = {};
		// Horas
		let schedules: { [key: string]: any } = {};
		// Generar las combinaciones
		for(let i = 0; i < airlinesLen; i++){ airlines[AIRLINES[i]] = 'none'; }
		for(let i = 0; i < gatesLen; i++){ gates[GATES[i]] = airlines; }
		// Iterar sobre los dias
		for(let currentDay = initialDate;
				currentDay <= endDate;
				currentDay.setDate(currentDay.getDate() + 1)){
			// Fin del día para iterar sobre las horas
			let nextDay = new Date(currentDay);
			nextDay.setDate(nextDay.getDate() + 1);
			// Get the current key
			const day = currentDay.toLocaleDateString().replace(/\//gi, '-');
			schedules = {};
			// Iterar sobre las horas de los días
			for(let hours = new Date(currentDay);
					hours <= nextDay;
					hours.setHours(hours.getHours() + 1)){
				schedules[hours.getTime()] = gates;
			}
			db[day] = schedules;
		}
		// Save into db
		const dbRef = rtdb.ref('schedules');
		dbRef.set(db).then(() => resolve('complete')).catch((e: any) => reject(e));
	});
};

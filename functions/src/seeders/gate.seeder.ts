import { dbRef } from '../util/firebase_admin';

const GATES = [
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

const AIRLINES = [
	'ADMIN',
	'Aereomexico',
	'Volaris',
	'Vivaaereobus',
	'Interjet'
]

export const createGates = async () => {
	// Crear los horarios disponibles
	return new Promise((resolve) => {
		const db : { [key: string]: any } = {} ;
		const gatesLen = GATES.length;
		let gateValue: { [key: string]: any } = {};
		let gateKey: { [key: string]: any } = {};
		const airlinesLen = AIRLINES.length;
		const initialDate = new Date('05/05/2021');
		const endDate = new Date('05/15/2021');
		//const endDate = new Date('01/02/2021');
		for(let i = initialDate; i <= endDate; i.setHours(i.getHours() + 1)){
			for(let j = 0; j < gatesLen; j++){
				for(let k = 0; k < airlinesLen; k++){
					gateValue[AIRLINES[k]] = 'none';
				}
				gateKey[GATES[j]] = gateValue;
			}
			db[i.getTime()] = { ...db[i.getTime()], ...gateKey};
		}
		dbRef.set(db).then(() => resolve('complete')).catch(console.log);
	});
};

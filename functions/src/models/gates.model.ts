import { db } from '../util/firebase_admin';
import { AIRLINES } from '../seeders/gate.seeder';

class GatesModel {

	// Reservar por la aereolinea
	public async reserve(airline: string, date: Date, gate: string) {
		console.log('wil-reserve', 'air', airline, 'date', date, 'gate', gate);
		const route = `schedules/${date.toLocaleDateString().replace(/\//gi, '-')}/${date.getTime()}/${gate}/${airline}`
		console.log('route', route);
		const dbRef = db.ref(route);
		await dbRef.transaction(function(currentData) {
			if (currentData === null) {
				const airlinesDB: { [key: string]: any } = {};
				const airlinesLen = AIRLINES.length;
				for(let i = 0; i < airlinesLen; i++){
					if(AIRLINES[i] === airline){
						airlinesDB[AIRLINES[i]] = 'pending';
					}else{
						airlinesDB[AIRLINES[i]] = 'none';
					}
					console.log('Airlines DB', airlinesDB);
				}
				return airlinesDB; //Set the value
			} else {
				console.log('This gate is already reserved', currentData);
				return; // Abort the transaction.
			}
		}, function(error, committed, snapshot) {
			if (error) {
				console.log('Transaction failed abnormally!', error);
			} else if (!committed) {
				console.log('We aborted the transaction (because this was already reserved).');
			} else {
				console.log('reservation created and peding to aprove');
			}
			console.log('Value after transaction', snapshot!.val());
		});
		//await dbRef.once('value', (val) => {
		//	console.log('gates availability on the hour', val.val());
		//});
	}

	// Aprobar por los admins
	public async approve(airline: string, date: string){
		console.log('will approve');
		console.log('air', airline, 'date', date);
		this.notify();
	}

	// Bloquear por los admis
	public async lock(airline: string, date: string){
		console.log('will lock');
	}

	// Send notifications
	private notify(){
		console.log('will notify');
	}

}

export default GatesModel;

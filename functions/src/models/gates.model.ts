import { dbRef } from '../util/firebase_admin';

class GatesModel {

	// Reservar por la aereolinea
	public async reserve(airline: string, date: string) {
		console.log('will reserve');
		console.log('air', airline, 'date', date);
		await dbRef.once('value', (snapshot) => {
			console.log('gates on back', snapshot.val());
		});
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

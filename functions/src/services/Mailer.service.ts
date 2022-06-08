import { firestore } from '../util/firebase_admin';

export default class MailService {

	public async sendApprovalMessage(
		email: string,
		subject: string,
		body: string
	): Promise<void> {
		await firestore.collection('mail').add({
			to: email,
			message: {
				subject,
				html: body,
			},
		});
	}

}

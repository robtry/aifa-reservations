import { RequestHandler } from 'express';
import { https } from 'firebase-functions/v1';
import { auth, usersReference } from '../util/firebase_admin';

// Validate if user is auth
export const isAuthMiddleware: RequestHandler = (req, res, next) => {
	if (req.headers.authorization) {
		const token = req.headers.authorization.replace('Bearer ', '');
		auth
			.verifyIdToken(token)
			.then(decodedToken => {
				const uid = decodedToken.uid;
				// Attach uid to request
				req.uid = uid;
				next();
			})
			.catch(err => {
				res.status(403).send({ message: 'The function must be called while authenticated.' });
				throw new https.HttpsError(
					'failed-precondition',
					'The function must be called while authenticated.'
				);
			});
	} else {
		res.status(403).send({ message: 'The function must be called while authenticated.' });
		throw new https.HttpsError(
			'failed-precondition',
			'The function must be called while authenticated.'
		);
	}
};

// Validate if the user is admin
export const isAdminMiddleware: RequestHandler = async (req, res, next) => {
	try {
		isAuthMiddleware(req, res, next);
		console.log('will check if this id is valid', req.uid);
		const currentUser = await usersReference.doc(req.uid).get();
		// Validate that exists
		if (!currentUser.exists) {
			return res.status(403).send({ message: 'The user does not exists' });
		}
		const doc = currentUser.data();
		// Validate that is admin
		if(doc!.role !== 'admin'){
			return res.status(403).send({ message: 'The user must be admin' });
		} 
		return next();
	} catch(e) {
		console.error('admin auth failed', e);
		return res.status(403).send({ message: 'The function must be called while authenticated as admin' });
	}
};

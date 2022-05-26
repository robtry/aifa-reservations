import { RequestHandler } from 'express';
import { https } from 'firebase-functions/v1';
import { auth } from '../util/firebase_admin';

export const isAuthMiddleware: RequestHandler = (req, res, next) => {
	// console.log('header', req.headers)
	if (req.headers.authorization) {
		const token = req.headers.authorization.replace('Bearer ', '');
		auth
			.verifyIdToken(token)
			.then(decodedToken => {
				const uid = decodedToken.uid;
				// console.log('decoded token', decodedToken);
				// console.log('current user', uid);
				req.uid = uid;
				next();
			})
			.catch(err => {
				console.log('auth middwareError', err);
				// res.status(403).send({ message: 'no joven' });
				throw new https.HttpsError(
					'failed-precondition',
					'The function must be called while authenticated.'
				);
			});
	} else {
		throw new https.HttpsError(
			'failed-precondition',
			'The function must be called while authenticated.'
		);
	}
};

export const isAdminMiddleware: RequestHandler = (req, res, next) => {
	isAuthMiddleware(req, res, next);
	console.log('will check if this id is valid', req.uid);
	next();
};

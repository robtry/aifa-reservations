import { Router } from 'express';
// Middlewares
import {
	isAuthMiddleware,
	isAdminMiddleware,
} from '../middlewares/isAuth.middleware';
import { validateReservationScheme } from '../validators/gates.validator';
// Models
import GatesModel from '../models/gates.model';

const router = Router();
const gatesModel = new GatesModel();

// Reserve
router.post('/reserve', isAuthMiddleware, async (req, res) => {
	// Validate body
	const { value, error } = validateReservationScheme.validate(req.body);
	if (error) {
		return res
			.status(400)
			.send({
				message: 'Invalid request data. Please review request and try again',
				details: error.details,
			});
	}
	const { airline, date, gate } = value;
	try {
		await gatesModel.reserve(airline, date, gate);
		return res.send({ message: 'completed' });
	} catch(e) {
		return res.status(500).send(e);
	}
});

// Aprove request
router.post('/approve', isAdminMiddleware, async (req, res) => {
	console.log('body', req.body);
	res.send({ message: 'completed' });
});

// Lock request
router.post('/lock', isAdminMiddleware, async (req, res) => {
	console.log('body', req.body);
	res.send({ message: 'completed' });
});

export default router;

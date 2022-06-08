import { Router } from 'express';
// Middlewares
import {
	isAuthMiddleware,
	isAdminMiddleware,
} from '../middlewares/isAuth.middleware';
import {
	validateBookScheme,
	validateApproveSchema,
} from '../validators/gates.validator';
// Models
import GatesModel from '../models/gates.model';
// Seeders
import { createGates, createUsers } from '../seeders/gate.seeder';

const router = Router();
const gatesModel = new GatesModel();

// Simple Hello
router.get('/', (_, res) => {
	res.send({ message: 'It is working' });
});

// Reserve
router.post('/book', isAuthMiddleware, async (req, res) => {
	// Validate body
	const { value, error } = validateBookScheme.validate(req.body);
	if (error) {
		return res.status(400).send({
			message: 'Invalid request data. Please review request and try again',
			details: error.details,
		});
	}
	const { airline, date, gate } = value;
	// Call model function
	try {
		await gatesModel.book(airline, date, gate);
		return res.send({ message: 'Booking completed successfully' });
	} catch (e) {
		console.log('router error', e);
		return res.status(422).send({ message: 'Already booked' });
	}
});

// Aprove Lock Reject
router.post('/gate', isAuthMiddleware, isAdminMiddleware, async (req, res) => {
	const { value, error } = validateApproveSchema.validate(req.body);
	if (error) {
		return res.status(400).send({
			message: 'Invalid request data. Please review request and try again',
			details: error.details,
		});
	}
	const { date, gate, action } = value;
	try {
		await gatesModel.action(date, gate, action);
		return res.send({
			message: `${(
				action as string
			).toLocaleUpperCase()} completed successfully`,
		});
	} catch (e) {
		console.log('router error', e, JSON.stringify(e));
		return res.status(500).send({ message: 'Couldnt complete', details: e });
	}
});

router.post('/seed', async (_, res) => {
	await createUsers();
	await createGates();
	res.send({ message: 'seeder complete' });
});

export default router;

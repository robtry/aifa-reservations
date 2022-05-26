import { Router } from 'express';
import { isAuthMiddleware, isAdminMiddleware } from '../middlewares/isAuth.middleware';
import GatesModel from '../models/gates.model';
import { createGates } from '../seeders/gate.seeder';

const router = Router();
const gatesModel = new GatesModel();

// Reserve
router.post('/reserve', isAuthMiddleware, async (req, res) => {
	console.log('body', req.body);
	await gatesModel.reserve('', '');
	res.send({ message: 'completed' });
});

// Aprove request
router.post('/approve', isAdminMiddleware, async (req, res) => {
	console.log('body', req.body);
	await gatesModel.reserve('', '');
	res.send({ message: 'completed' });
});

// Lock request
router.post('/lock', isAdminMiddleware, async (req, res) => {
	console.log('body', req.body);
	await gatesModel.reserve('', '');
	res.send({ message: 'completed' });
});

// Seed DB
router.post('/seed', async (_, res) => {
	await createGates();
	res.send({ message: 'complete' });
});

export default router;

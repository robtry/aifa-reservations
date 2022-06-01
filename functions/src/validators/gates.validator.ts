import Joi from 'joi';
import { GATES, AIRLINES, initialDate, endDate } from '../seeders/gate.seeder';

export const validateReservationScheme = Joi.object().keys({
	airline: Joi.string().valid(...AIRLINES).required(),
	gate: Joi.string().valid(...GATES).required(),
	date: Joi.date().timestamp('javascript').greater(new Date(initialDate)).less(new Date(endDate)).required()
});


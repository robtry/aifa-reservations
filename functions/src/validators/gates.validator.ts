import Joi from 'joi';
import { GATES, AIRLINES, initialDate, endDate } from '../seeders/gate.seeder';

export const validateBookScheme = Joi.object().keys({
	airline: Joi.string()
		.valid(...AIRLINES.map((a) => a.toLocaleLowerCase()))
		.required(),
	gate: Joi.string()
		.valid(...GATES)
		.required(),
	date: Joi.date()
		.timestamp('javascript')
		.greater(new Date(initialDate).setDate(initialDate.getDay() - 1))
		.less(new Date(endDate))
		.required(),
});

export const validateApproveSchema = Joi.object().keys({
	gate: Joi.string()
		.valid(...GATES)
		.required(),
	date: Joi.date()
		.timestamp('javascript')
		.greater(new Date(initialDate).setDate(initialDate.getDay() - 1))
		.less(new Date(endDate))
		.required(),
	action: Joi.string().valid('approve', 'reject', 'lock').required(),
});

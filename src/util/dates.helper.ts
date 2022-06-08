export const AifaDateString = (date: string): string => {
	return new Date(
		parseInt(date) + new Date().getTimezoneOffset() * 60 * 1000
	).toLocaleString('es');
};

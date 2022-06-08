import { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import useGatesStore from '../../store/gates.store';
import { DateTime } from 'luxon';

export default function GatesDatePicker() {
	const [setQueryDate] = useGatesStore((state) => [state.setQueryDate]);
	const [localDate, setLocalDate] = useState<null | DateTime>(null);
	useEffect(() => {
		if (!localDate) return;
		setQueryDate(localDate.toMillis());
	}, [localDate, setQueryDate]);
	return (
		<LocalizationProvider dateAdapter={AdapterLuxon}>
			<Box sx={{margin: 3}}>
			<DatePicker
				renderInput={(props) => <TextField {...props} />}
				label='Fecha'
				value={localDate}
				onChange={(newValue) => {
					if (!newValue) return;
					// console.log('new value', newValue);
					setLocalDate(newValue);
				}}
			/>
			</Box>
		</LocalizationProvider>
	);
}

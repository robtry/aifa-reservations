import { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import useGatesStore from '../../store/gates.store';
import { DateTime } from 'luxon';

export default function GatesDatePicker() {
	const [setQueryDate, queryDate] = useGatesStore((state) => [
		state.setQueryDate,
		state.queryDate,
	]);
	const [localDate, setLocalDate] = useState<DateTime>(DateTime.now());
	useEffect(() => {
		setQueryDate(localDate.toMillis());
	}, [localDate, setQueryDate]);
	return (
		<LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale={'es'}>
			<Box sx={{ margin: 3 }}>
				<DatePicker
					renderInput={(props) => <TextField {...props} />}
					label='Fecha'
					value={DateTime.fromMillis(queryDate)}
					onChange={(newValue) => {
						if (!newValue) return;
						// console.log('new value', newValue);
						setLocalDate(newValue as any);
					}}
					minDate={DateTime.now() as any}
					maxDate={DateTime.now().plus({ days: 15 })}
				/>
			</Box>
		</LocalizationProvider>
	);
}

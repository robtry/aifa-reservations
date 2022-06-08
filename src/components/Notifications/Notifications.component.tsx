import { forwardRef } from 'react';
import { Stack, Alert as MuiAlert, AlertProps, Snackbar } from '@mui/material';
import useNotifications from './useNotifications.hook';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref
) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function Notifications() {
	const { open, handleClose, message, severity } = useNotifications();

	return (
		<Stack spacing={2} sx={{ width: '100%' }}>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
					{message}
				</Alert>
			</Snackbar>
		</Stack>
	);
}

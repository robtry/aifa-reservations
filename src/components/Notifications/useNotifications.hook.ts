import { useState, useCallback, useEffect } from 'react';
import shallow from 'zustand/shallow';
import useAppStore from '../../store/app.store';

export default function useNotifications() {
	const [message, severity, setNotification] = useAppStore(
		(state) => [
			state.notificationMessage,
			state.notificationSeverity,
			state.setNotification,
		],
		shallow
	);

	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(message.length > 0);
	}, [message]);

	useEffect(() => {
		let timeOut: NodeJS.Timeout;
		if (!open) {
			timeOut = setTimeout(() => {
				setNotification('', 'success');
			}, 2000);
		}
		return () => clearTimeout(timeOut);
	}, [open, setNotification]);

	const handleClose = useCallback(
		(_?: React.SyntheticEvent | Event, reason?: string) => {
			if (reason === 'clickaway') {
				return;
			}
			setOpen(false);
		},
		[]
	);

	return {
		open,
		handleClose,
		message,
		severity,
	};
}

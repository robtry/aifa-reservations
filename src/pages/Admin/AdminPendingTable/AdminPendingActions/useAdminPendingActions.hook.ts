import axios from 'axios';
import { useCallback, useState } from 'react';
import shallow from 'zustand/shallow';
import useAppStore from '../../../../store/app.store';
import useUserStore from '../../../../store/user.store';

export default function useAdminPedingActions(gate: string, date: number) {
	const [setNotification] = useAppStore(
		(state) => [state.setNotification],
		shallow
	);
	// To get the current token
	const [currentUser] = useUserStore((state) => [state.user], shallow);
	// To identify the type of request
	const [action, setAction] = useState<'approve' | 'reject' | null>(null);
	// To open the modal
	const [open, setOpen] = useState(false);
	// Loading
	const [isLoading, setIsLoading] = useState(true);

	// Reject gate
	const handleReject = useCallback(() => {
		setOpen(true);
		setAction('reject');
	}, []);

	// Aprove gate
	const handleApprove = useCallback(() => {
		setOpen(true);
		setAction('approve');
	}, []);

	// Do nothing and close dialog
	const handleCancelButton = useCallback(() => {
		setOpen(false);
	}, []);

	// Approve or Reject according to the action
	const handleContinueButton = useCallback(async () => {
		const body = {
			date: new Date(date).getTime(),
			gate,
			action,
		};

		try {
			setIsLoading(true);
			const res = await axios.post(
				`${process.env.REACT_APP_API_URL}/gate`,
				body,
				{
					headers: {
						Authorization: (currentUser as any).accessToken,
					},
				}
			);
			console.log('axios response', res.data);
			setNotification(
				action === 'approve'
					? 'Se aprovó correctamente'
					: 'Se rechazó correctamente',
				'success'
			);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.log(error.response.data);
					// @ts-ignore
					setNotification(error.response.data?.message as string, 'error');
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					console.log(error.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log('Error', error.message);
				}
				console.log(error.config);
			} else {
				console.log('unexpexted error', error);
			}
		}
		setIsLoading(false);
		setOpen(false);
	}, [gate, date, currentUser, action, setNotification]);

	return {
		open,
		handleApprove,
		handleReject,
		handleCancelButton,
		handleContinueButton,
		isLoading,
	};
}

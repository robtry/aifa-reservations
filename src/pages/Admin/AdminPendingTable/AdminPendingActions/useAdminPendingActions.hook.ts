import axios from 'axios';
import { useCallback, useState } from 'react';
import shallow from 'zustand/shallow';
import useHandleAxiosError from '../../../../hooks/useHandleAxiosError.hook';
import useAppStore from '../../../../store/app.store';
import useUserStore from '../../../../store/user.store';

export default function useAdminPedingActions() {
	const [setNotification] = useAppStore(
		(state) => [state.setNotification],
		shallow
	);
	const { handler } = useHandleAxiosError();
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
	const handleContinueButton = useCallback(
		async (date: number, gate: string) => {
				setIsLoading(true);
			const body = {
				date: new Date(date).getTime(),
				gate,
				action,
			};
			// console.log('sending body', body, new Date(date).toDateString());
			try {
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
				handler(error);
			} finally {
				setOpen(false);
				setIsLoading(false);
			}
		},
		[action, currentUser, setNotification, handler]
	);

	return {
		open,
		handleApprove,
		handleReject,
		handleCancelButton,
		handleContinueButton,
		isLoading,
	};
}

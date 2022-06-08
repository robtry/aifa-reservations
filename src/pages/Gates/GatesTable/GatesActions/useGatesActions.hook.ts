import axios from 'axios';
import { useCallback, useState } from 'react';
import shallow from 'zustand/shallow';
import useHandleAxiosError from '../../../../hooks/useHandleAxiosError.hook';
import useAppStore from '../../../../store/app.store';
import useUserStore from '../../../../store/user.store';

export default function useGatesActions() {
	const { handler } = useHandleAxiosError();
	// Notifications
	const [setNotification] = useAppStore(
		(state) => [state.setNotification],
		shallow
	);
	// To get the current token
	const [isAdmin, currentUser] = useUserStore(
		(state) => [state.isAdmin, state.user],
		shallow
	);
	// To open the modal
	const [open, setOpen] = useState(false);
	// Loading
	const [isLoading, setIsLoading] = useState(false);

	const handleOpen = useCallback(() => {
		setOpen(true);
	}, []);

	// Do nothing and close dialog
	const handleCancelButton = useCallback(() => {
		setOpen(false);
	}, []);

	const adminLock = useCallback(
		async (gate: string, date: string) => {
			setIsLoading(true);

			const body = {
				date: new Date(parseInt(date)).getTime(),
				gate,
				action: 'lock',
			};

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
				setNotification('Se bloqueó correctamente', 'success');
				handleCancelButton();
			} catch (error) {
				handler(error);
			} finally {
				setIsLoading(false);
			}
		},
		[currentUser, handleCancelButton, handler, setNotification]
	);

	const airlineBook = useCallback(async (gate: string, date: string) => {
		setIsLoading(true);

		const body = {
			date: new Date(parseInt(date)).getTime(),
			gate,
			airline: currentUser?.displayName,
		};

		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API_URL}/book`,
				body,
				{
					headers: {
						Authorization: (currentUser as any).accessToken,
					},
				}
			);
			console.log('axios response', res.data);
			setNotification('Se solicitó la reservación con éxito', 'success');
			handleCancelButton();
		} catch (error) {
			handler(error);
		} finally {
			setIsLoading(false);
		}
	}, [currentUser, handleCancelButton, handler, setNotification]);

	return {
		open,
		isAdmin,
		isLoading,
		handleOpen,
		adminLock,
		airlineBook,
		handleCancelButton,
	};
}

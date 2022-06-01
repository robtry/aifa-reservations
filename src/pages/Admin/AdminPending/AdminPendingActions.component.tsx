import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import axios from 'axios';
import { useCallback, useState } from 'react';
import shallow from 'zustand/shallow';
import useUserStore from '../../../store/user.store';

interface Props {
	date: number;
	gate: string;
}

export default function AdminPendingActions({ date, gate }: Props) {
	const [currentUser] = useUserStore((state) => [state.user], shallow);

	const [action, setAction] = useState<'approve' | 'reject' | null>(null);
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCloseWithAction = useCallback(async () => {
		if (action === 'approve') {
			try {
				const res = await axios.post(
					`${process.env.REACT_APP_API_URL}/gate`,
					{
						date: new Date(date).getTime(),
						gate,
						action: 'approve',
					},
					{
						headers: {
							Authorization: (currentUser as any).accessToken,
						},
					}
				);
				console.log('axios response', res.data);
			} catch (error) {
				console.log('error when approving', error);
			}
		} else {
			// Reject
		}
		setOpen(false);
	}, [action, gate, date, currentUser]);

	return (
		<div>
			<Button
				variant='outlined'
				color='success'
				onClick={() => {
					setAction('approve');
					handleClickOpen();
				}}
			>
				Aceptar
			</Button>
			&nbsp;
			<Button
				variant='contained'
				color='error'
				onClick={() => {
					setAction('reject');
					handleClickOpen();
				}}
			>
				Rechazar
			</Button>
			<Dialog open={open} keepMounted onClose={handleClose}>
				<DialogTitle>
					Esta seguro que desea {action === 'approve' ? 'Aprobar' : 'Rechazar'}?
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Esta acción notificará a la aereolínea
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseWithAction}>Continuar</Button>
					<Button onClick={handleClose}>Cancelar</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

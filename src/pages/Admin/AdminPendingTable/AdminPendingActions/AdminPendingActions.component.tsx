import { LoadingButton } from '@mui/lab';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import useAdminPedingActions from './useAdminPendingActions.hook';

interface Props {
	date: number;
	gate: string;
}

export default function AdminPendingActions({ date, gate }: Props) {
	const {
		open,
		handleApprove,
		handleReject,
		handleCancelButton,
		handleContinueButton,
		isLoading,
	} = useAdminPedingActions(gate, date);

	return (
		<div>
			<Button variant='outlined' color='success' onClick={handleApprove}>
				Aceptar
			</Button>
			&nbsp;
			<Button variant='contained' color='error' onClick={handleReject}>
				Rechazar
			</Button>
			<Dialog open={open} keepMounted>
				<DialogTitle>¿Esta seguro que desea continuar?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Esta acción notificará a la aereolínea
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					{isLoading ? (
						<Button onClick={handleContinueButton}>Continuar</Button>
					) : (
						<LoadingButton loading variant='contained'>
							Aceptar
						</LoadingButton>
					)}
					<Button
						onClick={handleCancelButton}
						variant='outlined'
						color='error'
						disabled={!isLoading}
					>
						Cancelar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

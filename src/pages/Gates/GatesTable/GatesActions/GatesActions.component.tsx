import { LoadingButton } from '@mui/lab';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import useGatesActions from './useGatesActions.hook';

interface Props {
	isUsed: boolean;
	gate: string;
	hour: string;
}

export default function GatesAction({ isUsed, gate, hour }: Props) {
	const {
		open,
		isLoading,
		isAdmin,
		handleOpen,
		handleCancelButton,
		adminLock,
		airlineBook,
	} = useGatesActions();

	return (
		<div>
			<Button
				variant='contained'
				disabled={isUsed}
				color='secondary'
				onClick={handleOpen}
			>
				{isAdmin ? 'Bloquear' : 'Reservar'}
			</Button>
			<Dialog open={open} keepMounted>
				<DialogTitle>¿Esta seguro que desea continuar?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Confirmar la puerta {gate} para la{' '}
						{new Date(parseInt(hour)).toLocaleString('es')}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					{!isLoading ? (
						<Button
							color='secondary'
							variant='contained'
							disabled={isLoading}
							onClick={() => (isAdmin ? adminLock(gate, hour) : airlineBook(gate, hour))}
						>
							Continuar
						</Button>
					) : (
						<LoadingButton loading variant='outlined'>
							Aceptar
						</LoadingButton>
					)}
					<Button
						variant='outlined'
						color='error'
						onClick={handleCancelButton}
						disabled={isLoading}
					>
						Cancelar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

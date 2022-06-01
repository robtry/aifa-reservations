import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import AdminPendingActions from './AdminPendingActions.component';
import useAdminPending from './useAdminPending.hook';

export default function AdminPending() {
	const { pendingGates } = useAdminPending();
	console.log('pending gates', pendingGates);
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }}>
				<TableHead>
					<TableRow>
						<TableCell>ID Reservación</TableCell>
						<TableCell align='right'>Puerta</TableCell>
						<TableCell align='right'>Fecha y Hora</TableCell>
						<TableCell align='right'>Aereolinea</TableCell>
						<TableCell align='right'>Estatus</TableCell>
						<TableCell align='right'>Acciones</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{pendingGates.map((row) => (
						<TableRow
							key={row.id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							{/* ID */}
							<TableCell component='th' scope='row'>
								{row.id}
							</TableCell>
							{/* Puerta */}
							<TableCell align='right'>{row.gate}</TableCell>
							{/* Fecha */}
							<TableCell align='right'>
								{new Date(row.date).toLocaleString('es')}
							</TableCell>
							{/* Aereolinea */}
							<TableCell align='right'>{row.booker}</TableCell>
							{/* Estatus */}
							<TableCell align='right'>PENDING</TableCell>
							{/* Acciones */}
							<TableCell align='right'>
								<AdminPendingActions date={row.date} gate={row.gate} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

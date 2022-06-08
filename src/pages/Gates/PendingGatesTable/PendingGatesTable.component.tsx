import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import shallow from 'zustand/shallow';
import useUserStore from '../../../store/user.store';
import { AifaDateString } from '../../../util/dates.helper';
import AdminPendingActions from './PendingActions';
import usePensingGates from './usePendingGates.hook';

export default function PendingGatesTable() {
	const [isAdmin] = useUserStore((state) => [state.isAdmin], shallow);
	const { pendingGates } = usePensingGates();
	// console.log('pending gates', pendingGates);
	if (pendingGates.length === 0) {
		return <h3>No hay reservaciones pendientes</h3>;
	}
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }}>
				<TableHead>
					<TableRow>
						<TableCell>ID Reservación</TableCell>
						<TableCell align='right'>Puerta</TableCell>
						<TableCell align='right'>Fecha y Hora</TableCell>
						{isAdmin && <TableCell align='right'>Aereolinea</TableCell>}
						<TableCell align='right'>Estatus</TableCell>
						{isAdmin && <TableCell align='right'>Acciones</TableCell>}
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
								{/* {row.date} */}
								{AifaDateString(row.date)}
							</TableCell>
							{/* Aereolinea */}
							{isAdmin && <TableCell align='right'>{row.booker}</TableCell>}
							{/* Estatus */}
							<TableCell align='right'>Pendiente</TableCell>
							{/* Acciones */}
							{isAdmin && (
								<TableCell align='right'>
									<AdminPendingActions
										date={parseInt(row.date)}
										gate={row.gate}
									/>
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

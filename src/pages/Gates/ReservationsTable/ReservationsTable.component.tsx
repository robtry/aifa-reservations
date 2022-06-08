import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { AifaDateString } from '../../../util/dates.helper';
import useReservations from './useReservations.hook';

export default function ReservationsTable() {
	const { reservations } = useReservations();
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }}>
				<TableHead>
					<TableRow>
						<TableCell>ID Reservación</TableCell>
						<TableCell align='right'>Puerta</TableCell>
						<TableCell align='right'>Fecha y Hora</TableCell>
						<TableCell align='right'>Estatus</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{reservations.map((row) => (
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
								{AifaDateString(row.date.toString())}
							</TableCell>
							{/* Estatus */}
							<TableCell align='right'>Confirmado</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

import {
	Table,
	TableContainer,
	Paper,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from '@mui/material';
import shallow from 'zustand/shallow';
import useGatesStore from '../../../store/gates.store';
import GateTableRow from './GatesTableRow.component';
import useGatesTable from './useGatesTable.hook';

export default function GatesTable() {
	const [schedules] = useGatesStore((state) => [state.schedules], shallow);
	useGatesTable();

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }}>
				<TableHead>
					<TableRow>
						<TableCell>Fecha y Hora</TableCell>
						<TableCell>Disponibles</TableCell>
						<TableCell>Detalles</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{!schedules
						? null
						: Object.keys(schedules)
								.sort((a, b) => parseInt(a) - parseInt(b))
								.map((hour) => (
									<GateTableRow row={schedules[hour]} hour={hour} key={hour} />
								))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

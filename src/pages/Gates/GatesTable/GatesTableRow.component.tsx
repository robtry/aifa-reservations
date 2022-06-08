import {
	TableRow,
	TableCell,
	TableBody,
	Box,
	Collapse,
	TableHead,
	Table,
	IconButton,
} from '@mui/material';
import { useState, Fragment } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GatesAction from './GatesActions';

interface Props {
	hour: string;
	row: {
		[key: string]: {
			booker: string;
			status: string;
		};
	};
}

const translateStatus = (estatus: string) => {
	switch (estatus) {
		case 'available':
			return 'Disponible';
		case 'pending':
			return 'Pendiente de revisión';
		case 'confirmed':
			return 'Reservado';
		case 'locked':
			return 'Bloqueado';
		default:
			return estatus;
	}
};

export default function GateTableRow({ hour, row }: Props) {
	// console.log('hour', hour);
	// console.log('row', row);

	const [open, setOpen] = useState(false);

	return (
		<Fragment>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				{/* Date */}
				<TableCell component='th' scope='row'>
					{new Date(parseInt(hour)).toLocaleString('es')}
				</TableCell>
				{/* Availables */}
				<TableCell>2/24</TableCell>
				{/* Show details */}
				<TableCell>
					<IconButton size='small' onClick={() => setOpen((prev) => !prev)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Table size='small'>
								<TableHead>
									<TableRow>
										<TableCell>Puerta</TableCell>
										<TableCell>Esatatus</TableCell>
										<TableCell>Reservado</TableCell>
										<TableCell>Acciones</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{Object.keys(row).map((gate) => (
										<TableRow key={gate}>
											<TableCell component='th' scope='row'>
												{gate}
											</TableCell>
											<TableCell>{translateStatus(row[gate].status)}</TableCell>
											<TableCell>{row[gate].booker || '---'}</TableCell>
											<TableCell>
												<GatesAction
													isUsed={row[gate].status !== 'available'}
													gate={gate}
													hour={hour}
												/>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</Fragment>
	);
}

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
import { useState, Fragment, useEffect, useMemo } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GatesAction from './GatesActions';
import { AifaDateString } from '../../../util/dates.helper';

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
	const [open, setOpen] = useState(false);
	const [available, setAvailable] = useState(0);
	const gates = useMemo(() => Object.keys(row), [row]);

	// count available
	useEffect(() => {
		const counted = gates.reduce(
			(prev, current) =>
				row[current].status === 'available' ? prev + 1 : prev,
			0
		);
		setAvailable(counted);
	}, [gates, row]);

	return (
		<Fragment>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				{/* Date */}
				<TableCell component='th' scope='row'>
					{AifaDateString(hour)}
				</TableCell>
				{/* Availables */}
				<TableCell>
					{available}/{gates.length}
				</TableCell>
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
									{gates.map((gate) => {
										return (
											<TableRow key={gate}>
												<TableCell component='th' scope='row'>
													{gate}
												</TableCell>
												<TableCell>
													{translateStatus(row[gate].status)}
												</TableCell>
												<TableCell>{row[gate].booker || '---'}</TableCell>
												<TableCell>
													<GatesAction
														isUsed={row[gate].status !== 'available'}
														gate={gate}
														hour={hour}
													/>
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</Fragment>
	);
}

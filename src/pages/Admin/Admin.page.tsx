import { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import NavBar from '../../components/NavBar';
import AdminPending from './AdminPendingTable';
import GatesPage from '../Gates';
import ReservationsTable from '../Gates/ReservationsTable';

export default function AdminPage() {
	// Focus tab
	const [tab, setTab] = useState('1');
	const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
		setTab(newValue);
	};

	return (
		<>
			<NavBar />
			<Box sx={{ width: '100%', typography: 'body1' }}>
				<TabContext value={tab}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList onChange={handleTabChange}>
							<Tab label='Horarios' value='1' />
							<Tab label='Pendientes' value='2' />
							<Tab label='Mis Resevaciones' value='3' />
						</TabList>
					</Box>
					<TabPanel value='1'>
						<GatesPage />
					</TabPanel>
					<TabPanel value='2'>
						<AdminPending />
					</TabPanel>
					<TabPanel value='3'>
						<ReservationsTable />
					</TabPanel>
				</TabContext>
			</Box>
		</>
	);
}

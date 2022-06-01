import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';
import shallow from 'zustand/shallow';
import NavBar from '../../components/NavBar';
import useGatesStore from '../../store/gates.store';
import AdminPending from './AdminPending';

export default function AdminPage() {
	// subscribe to gates
	const [gates] = useGatesStore((state) => [state.gates], shallow);
	// consle.log('current gates', gates);

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
							<Tab label='Pendientes' value='1' />
							<Tab label='Puertas' value='2' />
						</TabList>
					</Box>
					<TabPanel value='1'>
						<AdminPending />
					</TabPanel>
					<TabPanel value='2'>Item Two</TabPanel>
				</TabContext>
			</Box>
		</>
	);
}

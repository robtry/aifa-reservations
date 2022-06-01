import { useCallback } from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../../util/firebase_config';

export default function NavBar() {

	const logOut = useCallback(() => {
		signOut(auth);
	}, []);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						MetaMascota
					</Typography>
					<Button onClick={logOut} color='inherit'>
						Log Out
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

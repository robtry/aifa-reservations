import { useCallback } from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import shallow from 'zustand/shallow';
import { signOut } from 'firebase/auth';
import { auth } from '../../util/firebase_config';
import useUserStore from '../../store/user.store';

export default function NavBar() {

	const [user] = useUserStore(state => [state.user], shallow);

	const logOut = useCallback(() => {
		signOut(auth);
	}, []);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						{user?.displayName}
					</Typography>
					<Button onClick={logOut} color='inherit'>
						Log Out
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

import { createTheme } from '@mui/material';
import { orange } from '@mui/material/colors';

export const adminTheme = createTheme({ palette: {
		primary: {
			main: '#222'
		},
		secondary: {
			main: orange[500],
		},
	},
});

export const airLineTheme = createTheme({ palette: {
		primary: {
			main: '#34495e'
		},
		secondary: {
			main: orange[500],
		},
	},
});

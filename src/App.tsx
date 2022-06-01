import { Routes, Route } from 'react-router-dom';
import shallow from 'zustand/shallow';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import Loader from './pages/Auth/Loader.page';
import { LocalizationProvider } from '@mui/x-date-pickers';
import AuthPage from './pages/Auth';
import AdminPage from './pages/Admin';
import useUserStore from './store/user.store';
import useApp from './hooks/useApp.hook';

function App() {
	const [isAuth, isVerifying] = useUserStore(
		(state) => [state.isAuth, state.isVerifying],
		shallow
	);
	useApp();

	if (isVerifying) {
		return <Loader />;
	}

	if (!isAuth) {
		return <AuthPage />;
	}

	return (
		<LocalizationProvider dateAdapter={AdapterLuxon}>
			<Routes>
				<Route path='/' element={<AdminPage />} />
				{/* <Route path='about' element={<About />} /> */}
			</Routes>
		</LocalizationProvider>
	);
}

export default App;

import { Routes, Route } from 'react-router-dom';
import shallow from 'zustand/shallow';
import Loader from './pages/Auth/Loader.page';
import AuthPage from './pages/Auth';
import AdminPage from './pages/Admin';
import useUserStore from './store/user.store';
import useApp from './hooks/useApp.hook';
import Notifications from './components/Notifications';
import AirlinePage from './pages/Airline';
import { ThemeProvider } from '@emotion/react';
import { adminTheme, airLineTheme } from './theme';

function App() {
	const [isAuth, isVerifying, isAdmin] = useUserStore(
		(state) => [state.isAuth, state.isVerifying, state.isAdmin],
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
		<ThemeProvider theme={isAdmin ? adminTheme : airLineTheme}>
			<Notifications />
			<Routes>
				<Route path='/' element={isAdmin ? <AdminPage /> : <AirlinePage />} />
				{/* <Route path='about' element={<About />} /> */}
			</Routes>
		</ThemeProvider>
	);
}

export default App;

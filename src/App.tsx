import { Routes, Route, } from 'react-router-dom';
import shallow from 'zustand/shallow';
import AuthPage from './pages/Auth';
import ReservationPage from './pages/Reservations';
import useUserStore from './store/user.store';
import useApp from './hooks/useApp.hook';
import Loader from './pages/Auth/Loader.page';

function App() {
	const [isAuth, isVerifying] = useUserStore(state => [state.isAuth, state.isVerifying], shallow)
	useApp();

	if(isVerifying){
		return <Loader />
	}

	if (!isAuth) {
		return <AuthPage />
	}

	return <Routes>
		<Route path='/' element={<ReservationPage />} />
		{/* <Route path='about' element={<About />} /> */}
	</Routes>
}

export default App;
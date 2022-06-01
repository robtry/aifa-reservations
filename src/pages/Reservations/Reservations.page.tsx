import shallow from 'zustand/shallow';
import NavBar from '../../components/NavBar';
import useGatesStore from '../../store/gates.store';

export default function ReservationPage() {
	const [gates] = useGatesStore((state) => [state.gates], shallow);
	console.log('current gates', gates);
	return (
		<>
			<NavBar />
		</>
	);
}

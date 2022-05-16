import shallow from "zustand/shallow";
import useGatesStore from "../../store/gates.store"


export default function ReservationPage () {
	const [gates] = useGatesStore(state => [state.gates], shallow)
	console.log('current gates', gates);
	return <h1>Reservations</h1>
}
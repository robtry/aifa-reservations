interface Gate {
	name: string;
	status: string;
}

type PendingGate = { booker: string; id: string; gate: string; date: string };
type PendingGates = PendingGate[];

interface ScheduleGate {
	booker: string;
	status: string;
}

interface Schedule {
	[key: string]: {
		[key: string]: ScheduleGate;
	};
}

interface Reservation {
	booker: string;
	date: number;
	gate: string;
	id: string;
}

type Reservations = Reservation[]
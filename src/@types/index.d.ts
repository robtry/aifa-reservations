interface Gate {
	name: string;
	status: string;
}

type PendingGate = { booker: string; id: string; gate: string, date: string };
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

interface LocalSchedule {
	
}

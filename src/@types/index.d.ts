interface Gate {
	name: string;
	status: string;
}

type PendingGate = { date: number; booker: string; id: string; gate: string };
type PendingGates = PendingGate[];

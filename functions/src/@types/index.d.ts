interface Gate {
	booker: string;
	status: string;
}

interface Schedule {
	[key: string]: {
		[key: string]: Gate;
	};
}

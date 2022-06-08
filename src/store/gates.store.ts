import produce from 'immer';
import create from 'zustand';

interface GatesStore {
	schedules: Schedule | null;
	setSchedule: (schedules: Schedule) => void;
	// Dates
	queryDate: number | null;
	setQueryDate: (date: number) => void;
	// Hours
	queryTime: number | null;
	setQueryTime: (hour: number) => void;
}

const useGatesStore = create<GatesStore>((set) => ({
	queryDate: new Date().getTime(),
	queryTime: null,
	setQueryDate: (date) =>
		set((state) =>
			produce(state, (draft) => {
				draft.queryDate = date;
			})
		),
	setQueryTime: (time) =>
		set((state) =>
			produce(state, (draft) => {
				draft.queryTime = time;
			})
		),
	schedules: null,
	setSchedule: (gates) =>
		set((state) =>
			produce(state, (draft) => {
				draft.schedules = gates;
			})
		),
}));

export default useGatesStore;

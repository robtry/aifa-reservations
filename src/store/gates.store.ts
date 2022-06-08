import produce from 'immer';
import create from 'zustand';

interface GatesStore {
	// Date
	queryDate: number;
	setQueryDate: (date: number) => void;
}

const useGatesStore = create<GatesStore>((set) => ({
	queryDate: new Date().getTime(),
	setQueryDate: (date) =>
		set((state) =>
			produce(state, (draft) => {
				draft.queryDate = date;
			})
		),
}));

export default useGatesStore;

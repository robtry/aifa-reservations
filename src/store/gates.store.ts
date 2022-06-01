import { CollectionReference } from 'firebase/firestore';
import produce from 'immer';
import create from 'zustand';

interface GatesStore {
	firebaseGatesReference: CollectionReference | null;
	setFirebaseGateReference: (ref: CollectionReference) => void;
	gates: Gate[];
	setGates: (gates: Gate[]) => void;
}

const useGatesStore = create<GatesStore>((set) => ({
	gates: [],
	setGates: (gates) =>
		set((state) =>
			produce(state, (draft) => {
				draft.gates = gates;
			})
		),
	firebaseGatesReference: null,
	setFirebaseGateReference: (ref) =>
		set((state) =>
			produce(state, (draft) => {
				draft.firebaseGatesReference = ref;
			})
		),
}));

export default useGatesStore;

import { User } from 'firebase/auth';
import produce from 'immer';
import create from 'zustand';

interface UserStore {
	isAuth: boolean;
	setIsAuth: (status: boolean) => void;
	user: User | null;
	setUser: (info: User | null) => void;
	isVerifying: boolean;
	setIsVerifying: (status: boolean) => void;
}

const useUserStore = create<UserStore>((set) => ({
	isAuth: false,
	setIsAuth: (status) =>
		set((state) =>
			produce(state, (draft) => {
				draft.isAuth = status;
			})
		),
	user: null,
	setUser: (user) =>
		set((state) =>
			produce(state, (draft) => {
				draft.user = user;
			})
		),
	isVerifying: true,
	setIsVerifying: (status) =>
		set((state) =>
			produce(state, (draft) => {
				draft.isVerifying = status;
			})
		),
}));

export default useUserStore;

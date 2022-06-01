import { User } from 'firebase/auth';
import produce from 'immer';
import create from 'zustand';

interface UserStore {
	// User authentication
	isAuth: boolean;
	setIsAuth: (status: boolean) => void;
	// User details
	user: User | null;
	setUser: (info: User | null) => void;
	isAdmin: boolean;
	setIsAdmin: (isAdmin: boolean) => void;
	// To check if was aith
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
	isAdmin: false,
	setIsAdmin: (status) =>
		set((state) =>
			produce(state, (draft) => {
				draft.isAdmin = status;
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

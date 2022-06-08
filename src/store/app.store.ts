import produce from 'immer';
import create from 'zustand';

type Severities = 'error' | 'success';

interface AppStore {
	notificationMessage: string;
	notificationSeverity: Severities;
	setNotification: (message: string, severity: Severities) => void;
}

const useAppStore = create<AppStore>((set) => ({
	notificationMessage: '',
	notificationSeverity: 'success',
	setNotification: (message, severity) =>
		set((state) =>
			produce(state, (draft) => {
				draft.notificationMessage = message;
				draft.notificationSeverity = severity;
			})
		),
}));

export default useAppStore;

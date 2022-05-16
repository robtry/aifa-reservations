import useAuth from './useAuth.hook';
import 'firebaseui/dist/firebaseui.css';

export default function AuthPage() {

	// The hook manage the logic for authentication
	useAuth();

	return (
		<>
			<div id='firebaseui-auth-container' />
		</>
	);
}
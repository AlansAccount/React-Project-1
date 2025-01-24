import { Outlet } from "react-router-dom";

export default function AuthLayout() {
	// A specialized layout that can wrap the authentication routes
	// e.g., add a certain background, style, or title for the Auth pages
	return (
		<div>
			<h2>Authentication Area</h2>
			{/* The child routes: either <AuthFormPage /> or <NewUser /> */}
			<Outlet />
		</div>
	);
}

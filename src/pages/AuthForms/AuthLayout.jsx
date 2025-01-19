// AuthLayout.jsx
import { Outlet } from "react-router-dom";
// import "./AuthLayout.css"; // optional styling for auth pages

export default function AuthLayout() {
	// (1) This could be as simple as returning <Outlet />
	// or you could add a background, a special container, or a heading, etc.
	return (
		<div>
			{/* (2) If you want a special Auth heading or background, do it here */}
			<h2>Authentication Area</h2>

			{/* (3) The child route content: either <AuthFormPage/> or <NewUser/> */}
			<Outlet />
		</div>
	);
}

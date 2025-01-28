/**
 * frontend/src/App.jsx
 *
 * A top-level component that may hold a layout or routes (if not using separate router).
 */
import { useContext } from "react";
import { Outlet, Link } from "react-router-dom"; // if using react-router
import { AuthContext } from "./context/AuthContext";

export default function App() {
	const { isLoggedIn, currentUser, logout } = useContext(AuthContext);

	return (
		<div>
			<header style={{ background: "#ccc", padding: "1rem" }}>
				<h1>My Social Media Clone</h1>
				{isLoggedIn && currentUser ? (
					<>
						<p>Welcome, {currentUser.name}!</p>
						<nav>
							<Link to="/">Home</Link> | <Link to="/profile">Profile</Link> |{" "}
							<button onClick={logout}>Logout</button>
						</nav>
					</>
				) : (
					<nav>
						<Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
					</nav>
				)}
			</header>
			<main style={{ padding: "1rem" }}>
				<Outlet />
			</main>
			<footer
				style={{ background: "#ddd", padding: "1rem", marginTop: "2rem" }}
			>
				<p>Footer stuff here</p>
			</footer>
		</div>
	);
}

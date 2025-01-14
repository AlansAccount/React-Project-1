import NavBar from "./components/layout/NavBar";
import { Outlet } from "react-router-dom";
import "./App.css";
import AuthFormPage from "./pages/AuthFormPage";
import { useState } from "react";

export default function App() {
	const [isloggedIn, setIsLoggedIn] = useState(false);

	function handleLogin() {
		setIsLoggedIn(!isloggedIn);
	}

	return (
		<div className="outer-wrapper">
			<div className="centered-container">
				<header className="header">
					<h4>My Header</h4>

					{isloggedIn ? <NavBar /> : null}
				</header>

				<div className="main-content">
					{!isloggedIn ? <AuthFormPage onLogin={handleLogin} /> : <Outlet />}
				</div>

				<footer className="footer">
					<h4>My Footer</h4>
					<p style={{ textAlign: "center", color: "grey" }}>
						© My First React Frontend Project.
					</p>
				</footer>
			</div>
		</div>
	);
}

// {!isAuthenticated ? <LoginPage /> : <Outlet />}
// <button onClick={tempAuthentication}>
// 	Login
// </button>

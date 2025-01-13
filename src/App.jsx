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
			<header className="header">
				<h1>My Header</h1>
				<p>
					Keep in Mind: 1. This is 55% page width, 2. Its smaller when using
					DevTools.
				</p>
				{isloggedIn ? <NavBar /> : null}
			</header>
			<div className="centered-container">
				<div className="main-content">
					{!isloggedIn ? <AuthFormPage onLogin={handleLogin} /> : <Outlet />}
				</div>

				<footer className="footer">
					<h1>My Footer</h1>
					<h6 style={{ textAlign: "center", color: "grey" }}>
						© My First React Frontend Project.
					</h6>
				</footer>
			</div>
		</div>
	);
}

// {!isAuthenticated ? <LoginPage /> : <Outlet />}
// <button onClick={tempAuthentication}>
// 	Login
// </button>

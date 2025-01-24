import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.jsx";

import AuthFormPage from "./pages/AuthForms/AuthFormPage";
import Header from "./components/layout/Main Layout Components/Header";

import "./App.css";
import Footer from "./components/layout/Main Layout Components/Footer";

export default function App() {
	// 1) Use context to see if the user is logged in
	const { isLoggedIn } = useContext(AuthContext);

	return (
		<div className="outer-wrapper">
			<div className="centered-container">
				{/* 2) Show header with a welcome message if user is logged in */}
				<Header>{isLoggedIn && "Welcome to My App"}</Header>

				{/* 3) The main content area */}
				<div className="main-content">
					{
						// 4) If the user is not logged in, show AuthFormPage directly.
						//    Otherwise, render the child routes via <Outlet />
						!isLoggedIn ? <AuthFormPage /> : <Outlet />
					}
				</div>

				<Footer />
			</div>
		</div>
	);
}

import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.jsx";

import AuthFormPage from "./pages/AuthForms/AuthFormPage";
import Header from "./components/layout/Main Layout Components/Header";

import "./App.css";
import Footer from "./components/layout/Main Layout Components/Footer";

export default function App() {
	const { isLoggedIn } = useContext(AuthContext);

	return (
		<div className="outer-wrapper">
			<div className="centered-container">
				<Header>{isLoggedIn && "Welcome to My App"}</Header>
				<div className="main-content">
					{!isLoggedIn ? (
						<AuthFormPage />
					) : (
						<>
							<Outlet />
						</>
					)}
				</div>
				<Footer />
			</div>
		</div>
	);
}

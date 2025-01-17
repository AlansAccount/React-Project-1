import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";

import NavBar from "../NavBar";
import ProfileHeader from "../../profile/ProfileHeader";

export default function Header({ onNavClick }) {
	const { isLoggedIn } = useContext(AuthContext);
	const location = useLocation();

	if (!isLoggedIn) {
		return (
			<header className="header">
				<h4>Welcome</h4>
				<h6>Please Log in or Signup.</h6>
			</header>
		);
	}

	if (location.pathname === "/profile") {
		return (
			<header className="header">
				<ProfileHeader name="User's Name Here:" />
				{isLoggedIn ? <NavBar onNavClick={onNavClick} /> : null}
			</header>
		);
	} else if (location.pathname === "/settings") {
		return (
			<header className="header">
				<h4>Settings</h4>
				{isLoggedIn ? <NavBar onNavClick={onNavClick} /> : null}
			</header>
		);
	} else if (location.pathname === "/settings/account") {
		return (
			<header className="header">
				<h4>Account Settings Form</h4>
				{isLoggedIn ? <NavBar onNavClick={onNavClick} /> : null}
			</header>
		);
	} else {
		return (
			<header className="header">
				<h4>Home Page</h4>
				{isLoggedIn ? <NavBar onNavClick={onNavClick} /> : null}
			</header>
		);
	}
}

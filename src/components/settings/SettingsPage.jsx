import { useContext } from "react";
import SettingsSideBar from "../layout/SideBar Files/SettingsSideBar";
import { Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function SettingsPage() {
	const { isLoggedIn } = useContext(AuthContext);
	const location = useLocation();

	const settingsContent = (
		<>
			<h2>The SettingsPage.jsx file is rendered correctly</h2>
			<p>Now the settings link is in the NavBar works some what</p>
		</>
	);

	return (
		<>
			<aside className="sidebar">
				<SettingsSideBar />
			</aside>
			<main className="feed">
				{location.pathname === "/settings" && settingsContent}
				<Outlet />
			</main>
		</>
	);
}

import { NavLink, useLocation } from "react-router-dom";
import Button from "../../../common/Button";

export default function SettingsSideBar() {
	const location = useLocation();

	return (
		<>
			<h4>Settings Sidebar</h4>
			<p>Sidebar content goes here.</p>

			{location.pathname === "/settings" && (
				<NavLink to="/settings/account">
					<Button>Account Settings</Button>
				</NavLink>
			)}
			{location.pathname === "/settings/account" && (
				<NavLink to="/settings">
					<Button>General Settings</Button>
				</NavLink>
			)}
		</>
	);
}

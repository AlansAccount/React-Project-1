import { NavLink } from "react-router-dom";

export default function SettingsPage() {
	return (
		<div>
			<h1>The SettingsPage.jsx file is rendered correctly</h1>
			<p>Now the settings link is in the NavBar</p>
			<nav>
				<NavLink to="/settings/account">
					Account Settings
				</NavLink>
			</nav>
		</div>
	);
}

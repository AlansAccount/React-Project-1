import { NavLink } from "react-router-dom";

export default function SettingsPage() {
	return (
		<>
			<aside className="sidebar">
				<h2>Settings Sidebar</h2>
				<p>Sidebar content goes here.</p>
				This comes from the SettingsPage() function
				<nav>
					<button>
						<NavLink to="/settings/account">Account Settings</NavLink>
					</button>
				</nav>
			</aside>

			<main className="feed">
				<h2>The SettingsPage.jsx file is rendered correctly</h2>
				<p>Now the settings link is in the NavBar works some what</p>
			</main>
		</>
	);
}

import { NavLink } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";

export default function ProfilePage() {
	return (
		<div>
			<header>
				<ProfileHeader />
			</header>
			<h2>Profile Page</h2>
			<p>Profile information will be displayed here.</p>
			<NavLink to="/">Return Home</NavLink>
		</div>
	);
}

import { NavLink } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";

export default function ProfilePage() {
	return (
		<div className="outer-wrapper">
			<div className="centered-container">
				<header className="header">
					<ProfileHeader />
					<button>
						<NavLink to="/">Home 🏠</NavLink>
					</button>
				</header>

				<div className="main-content">
					<aside className="sidebar">
						<h2>Profile Details</h2>
						<p>Profile Details you can edit once you are authenticated.</p>
						<li>Name</li>
						<li>DOB</li>
						<li>Location</li>
						<li>Sex</li>
					</aside>

					<main className="feed">
						<h2>User Posts Area</h2>
						<p>Where all the posts user has posted will be </p>
						<p>It will look like the regular main feed.</p>
					</main>
				</div>

				<footer className="footer">
					<h1>My Footer</h1>
				</footer>
			</div>
		</div>
	);
}

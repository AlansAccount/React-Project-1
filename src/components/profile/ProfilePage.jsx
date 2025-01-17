import ProfileSideBar from "../layout/SideBar Files/ProfileSideBar";

export default function ProfilePage() {
	return (
		<>
			<aside className="sidebar">
				<ProfileSideBar />
			</aside>
			<main className="feed">
				<h2>User Posts Area</h2>
				<p>Where all the posts user has posted will be </p>
				<p>It will look like the regular main feed.</p>
			</main>
		</>
	);
}

import SideBar from "../components/layout/SideBar";

export default function HomePage() {
	return (
		<>
			<aside className="sidebar">
				<h2>Sidebar</h2>
				<SideBar />
			</aside>

			<main className="feed">
				<h2>Feed Area</h2>
				<p>This is where the feed will go.</p>
				This comes from the HomePage() function
			</main>
		</>
	);
}

import HomeSideBar from "../components/layout/SideBar Files/HomeSideBar";

export default function HomePage() {
	return (
		<>
			<aside className="sidebar">
				<HomeSideBar />
			</aside>
			<main className="feed">
				<h4>Main Feed Area</h4>
			</main>
		</>
	);
}

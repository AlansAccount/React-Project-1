import NavBar from "./components/layout/NavBar";
import SideBar from "./components/layout/SideBar";
import { useState } from "react";
import Backdrop from "./components/layout/Backdrop";
import { Outlet } from "react-router-dom";
import "./App.css";

export default function App() {
	// const [isOpen, setIsOpen] = useState(false);

	// function openDrawerHandler() {
	// 	setIsOpen(true);
	// }

	// function closeDrawerHandler() {
	// 	setIsOpen(false);
	// }
	return (
		<div className="outer-wrapper">
			{/* Centered container (60% of viewport width) */}
			<div className="centered-container">
				{/* Header Section */}
				<header className="header">
					<h1>My Header</h1>
				</header>

				{/* Main content row: sidebar on the left, feed on the right */}
				<div className="main-content">
					<aside className="sidebar">
						<h2>Sidebar</h2>
						<p>Sidebar content goes here.</p>
					</aside>

					<main className="feed">
						<h2>Feed Area</h2>
						<p>This is where the feed will go.</p>
					</main>
				</div>
				<footer className="footer"><h1>My Footer</h1></footer>
			</div>
		</div>
	);
}


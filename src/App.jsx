import NavBar from "./components/layout/NavBar";
import SideBar from "./components/layout/SideBar";
import { useState } from "react";
import Backdrop from "./components/layout/Backdrop";
import { Outlet } from "react-router-dom";
import './App.css';

export default function App() {
	const [isOpen, setIsOpen] = useState(false);

	function openDrawerHandler() {
		setIsOpen(true);
	}

	function closeDrawerHandler() {
		setIsOpen(false);
	}
	return (
		<div>
			<h1>Hello, React 18! - App.jsx is rendered as the parent rotue</h1>
			{isOpen && <Backdrop onClick={closeDrawerHandler} />}
			<NavBar show={isOpen} onClick={closeDrawerHandler}>
				SideBar
			</NavBar>
			<div>
				<SideBar />
				<Outlet />
			</div>
		</div>
	);
}

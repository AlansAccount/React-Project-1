import { NavLink } from "react-router-dom";
import Button from "../../common/Button";
import styles from "./SideBar.module.css";
import ReactDOM from "react-dom";

export default function SideBar({ children, ...props }) {
	return (
		<>
			<Button >
				<NavLink to="/Posts">My Posts 📰</NavLink>
			</Button>
			<Button>
				<NavLink to="/notifications">Notifications</NavLink>
			</Button>
			<Button>
				<NavLink to="/messages">Messages 📩</NavLink>
			</Button>
			<Button>
				<NavLink to="/logout">Logout ❗</NavLink>
			</Button>
		</>
	);
}

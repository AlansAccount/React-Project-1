import Button from "../../../common/Button";
import { NavLink } from "react-router-dom";

export default function HomeSideBar() {
	return (
		<>
			<h4>Notifications</h4>
			<NavLink to="/Posts">
				<Button>My Posts 📰</Button>
			</NavLink>
			<NavLink to="/notifications">
				<Button>Notifications</Button>
			</NavLink>
			<NavLink to="/messages">
				<Button>Messages 📩</Button>
			</NavLink>
			<NavLink to="/logout">
				<Button>Logout ❗</Button>
			</NavLink>
		</>
	);
}

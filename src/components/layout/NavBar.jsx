import { NavLink } from "react-router-dom";
import Button from "../../common/Button";

export default function NavBar() {
	return (
		<nav>
			<Button>
				<NavLink to="/">Home 🏠</NavLink>
			</Button>
			<Button>
				<NavLink to="/profile">Profile 👤</NavLink>
			</Button>
			<Button>
				<NavLink to="/settings">Settings ⚙️</NavLink>
			</Button>
		</nav>
	);
}

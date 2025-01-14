import { NavLink } from "react-router-dom";
import Button from "../../common/Button";
import styles from "./NavBar.module.css";

export default function NavBar() {
	return (
		<nav className={styles.navbar}>
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

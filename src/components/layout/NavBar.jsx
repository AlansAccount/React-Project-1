import { NavLink } from "react-router-dom";
import Button from "../../common/Button";
import styles from "./NavBar.module.css";

export default function NavBar({}) {
	return (
		<nav className={styles.navbar}>
			<NavLink to="/" end>
				<Button>Home 🏠</Button>
			</NavLink>
			<NavLink to="/profile">
				<Button>Profile 👤</Button>
			</NavLink>
			<NavLink to="/settings">
				<Button>Settings ⚙️</Button>
			</NavLink>
		</nav>
	);
}

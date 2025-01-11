import styles from "./SideBar.module.css";
import ReactDOM from "react-dom";

export default function SideBar({ children, ...props }) {
	return (
		<>
			{children}
			{ReactDOM.createPortal(
				props.content,
				document.getElementById("side-drawer")
			)}
		</>
	);
}

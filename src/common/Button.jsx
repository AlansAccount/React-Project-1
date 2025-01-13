import styles from "./Button.module.css";

export default function Button({ children, type, onClick }) {
	const buttonClass = `${styles.buttonBase} ${styles[type]}`;
	return <button className={buttonClass} onClick={onClick}>{children}</button>;
}

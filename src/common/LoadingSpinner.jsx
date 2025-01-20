import styles from "./Spinner.modules.css";

export default function LoadingSpinner() {
	return (
		<div className={styles.spinnerOverlay}>
			<div className={styles.spinner}></div>
		</div>
	);
}

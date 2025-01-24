import { useContext } from "react";
import styles from "./AuthFormPage.module.css";
import { AuthContext } from "../../context/AuthContext";

export default function LoginForm({ onChange }) {
	// You pull 'formData' from context, but also pass onChange from parent
	const { formData } = useContext(AuthContext);

	return (
		<>
			<div className={styles.formGroup}>
				<label htmlFor="email" className={styles.formLabel}>
					Email:
				</label>
				<input
					type="email"
					id="email"
					name="email"
					className={styles.formInput}
					placeholder="Enter your email."
					required
					onChange={onChange} // Parent-provided handler
				/>
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="password" className={styles.formLabel}>
					Password:
				</label>
				<input
					type="password"
					id="password"
					name="password"
					className={styles.formInput}
					placeholder="Enter your password."
					required
					onChange={onChange}
				/>
			</div>
		</>
	);
}

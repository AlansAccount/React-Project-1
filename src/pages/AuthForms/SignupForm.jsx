import styles from "./AuthFormPage.module.css";

const signupForm = (
	<>
		<div className={styles.formRow}>
			<label htmlFor="name" className={styles.formLabel}>
				Full Name:
			</label>
			<input
				type="text"
				id="name"
				name="name"
				className={styles.formInput}
				placeholder="Enter you full name."
				required
			/>
			<label htmlFor="dateOfBirth" className={styles.formLabel}>
				Date of Birth
			</label>
			<input
				type="date"
				id="dateOfBirth"
				name="dateOfBirth"
				className={styles.formInput}
				placeholder="Enter Date of Birth."
				required
			/>
		</div>
		<div className={styles.formRow}>
			<label htmlFor="email" className={styles.formLabel}>
				Email:
			</label>
			<input
				type="email"
				id="email"
				name="email"
				className={styles.formInput}
				placeholder="Enter your email"
				required
			/>
			<label htmlFor="password" className={styles.formLabel}>
				Password:
			</label>
			<input
				type="password"
				id="password"
				name="password"
				className={styles.formInput}
				placeholder="Create a password"
				required
			/>
		</div>
	</>
);

export default signupForm;

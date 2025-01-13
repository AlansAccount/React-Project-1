import { Form } from "react-router-dom";
import Button from "../common/Button";
import { useState } from "react";
import styles from "./AuthFormPage.module.css";

export default function AuthFormPage({ onLogin }) {
	const [loginSignup, setLoginSignup] = useState(true);

	function handleAuthMode() {
		setLoginSignup(!loginSignup);
	}

	function handleSubmit(event) {
		event.preventDefault();
		console.log(event.target.value);

		if (loginSignup) {
			console.log("Logging in...");
			onLogin(); // Notify App.jsx to update the login state
		} else {
			console.log("Signing up...");
			// Implement signup logic here
			onLogin(); // Simulate login after signup
		}
	}

	const loginForm = (
		<>
			<div className={styles.formGroup}>
				<label htmlFor="email" className={styles.formLabel}>
					Email:
				</label>
				<input
					type="email"
					id="email"
					className={styles.formInput}
					placeholder="Enter your email"
					required
				/>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor="password" className={styles.formLabel}>
					Password:
				</label>
				<input
					type="password"
					id="password"
					className={styles.formInput}
					placeholder="Create a password"
					required
				/>
			</div>
		</>
	);

	const signupForm = (
		<>
			<div className={styles.formGroup}>
				<label htmlFor="username">Full Name:</label>
				<input
					type="text"
					id="name"
					className={styles.formInput}
					placeholder="Enter you full name."
					required
				/>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor="dateOfBirth">Date of Birth</label>
				<input
					type="date"
					id="dateOfBirth"
					className={styles.formInput}
					placeholder="Enter Date of Birth."
					required
				/>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor="username">Username:</label>
				<input
					type="text"
					id="username"
					className={styles.formInput}
					placeholder="Choose a username"
					required
				/>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor="email" className={styles.formLabel}>
					Email:
				</label>
				<input
					type="email"
					id="email"
					className={styles.formInput}
					placeholder="Enter your email"
					required
				/>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor="password" className={styles.formLabel}>
					Password:
				</label>
				<input
					type="password"
					id="password"
					className={styles.formInput}
					placeholder="Create a password"
					required
				/>
			</div>
			<div className={styles.formGroup}>
				<div className={styles.formGroup}>
					<label htmlFor="repeatPassword" className={styles.formLabel}>
						Repeat Password:
					</label>
					<input
						type="password"
						id="repeatPassword"
						className={styles.formInput}
						placeholder="Repeat Password"
					/>
				</div>
			</div>
		</>
	);

	return (
		<div className={styles.authContainer}>
			<h2 className={styles.authTitle}>{loginSignup ? "Login" : "Signup"}</h2>
			<Form onSubmit={handleSubmit} className={styles.authForm}>
				{loginSignup ? loginForm : signupForm}
				<div>
					<Button type="submit" onLogin={handleSubmit}>
						{loginSignup ? "Login" : "Create Account"}
					</Button>
				</div>
			</Form>
			<Button onClick={handleAuthMode}>
				{!loginSignup ? "Have an account? Login." : "No account? Sign Up!"}
			</Button>
		</div>
	);
}

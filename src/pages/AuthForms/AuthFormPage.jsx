import { Form } from "react-router-dom";
import Button from "../../common/Button";
import styles from "./AuthFormPage.module.css";
import loginForm from "./LoginForm";
import signupForm from "./SignupForm";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function AuthFormPage() {
	const { loginSignup, handleLogin, handleAuthMode } = useContext(AuthContext);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		dateOfBirth: "",
	});

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData({ ...setFormData, [name]: value });
	}

	function handleSubmit(event) {
		event.preventDefault();
		console.log(event.target.value);

		console.log(formData);
		// const name = event.target.name.value;
		// const email = event.target.email.value;
		// const password = event.target.password.value;
		// const dateOfBirth = event.target.dateOfBirth.value;

		if (loginSignup) {
			console.log("Logging in...");
			handleLogin(); // Notify App.jsx to update the login state
		} else {
			console.log("Signing up...");
			// Implement signup logic here
			// signUpUser({ name, dateOfBirth, email, password });
			handleLogin(); // Simulate login after signup
		}
	}

	return (
		<div className={styles.authContainer}>
			<h2 className={styles.authTitle}>{loginSignup ? "Login" : "Signup"}</h2>
			<Form className={styles.authForm} onSubmit={handleSubmit}>
				{loginSignup ? loginForm : signupForm}
				<div>
					<Button type="submit">
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

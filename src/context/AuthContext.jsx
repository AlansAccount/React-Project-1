import { createContext, useState } from "react";

export const AuthContext = createContext();
export const DUMMY_USERS = [];

export function AuthProvider({ children }) {
	// We'll store some auth state here
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUserName] = useState("");
	const [loginSignup, setLoginSignup] = useState(true);

	// Example login function
	function login(name) {
		setIsLoggedIn(true);
		setUserName(name);
	}

	// Example logout function
	function logout() {
		setIsLoggedIn(false);
		setUserName("");
	}

	function handleLogin() {
		setIsLoggedIn(!isLoggedIn);
	}

	// Function to see (later if user credentials are correct)
	// but also to see if login button was clicked or not.
	function handleAuthMode() {
		setLoginSignup(!loginSignup);
	}

	function signupUser({ name, dateOfBorth, email, password }) {
		DUMMY_USERS.push({
			id: DUMMY_USERS.length + 1,
			name,
			dateOfBorth,
			email,
			password,
		});
		console.log("Dummy Users Array:", DUMMY_USERS);
	}

	// The value that gets passed to all children
	const value = {
		isLoggedIn,
		userName,
		loginSignup,
		handleLogin,
		handleAuthMode,
		login,
		logout,
		signupUser
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

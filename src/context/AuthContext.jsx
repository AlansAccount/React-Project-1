import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
	authMode: true,
	users: [],
	// ... default placeholders
});

export function AuthContextProvider({ children }) {
	// (A) Track login status
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// (B) authMode = login (true) or signup (false)
	const [authMode, setAuthMode] = useState(true);

	// (C) Our simple in-memory user "database"
	const [users, setUsers] = useState([]);

	// (D) The form data while user types in login/signup fields
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		dateOfBirth: "",
	});

	// Toggle between login and signup
	function handleAuthMode() {
		setAuthMode((prev) => !prev);
	}

	// Update typed fields for login/signup
	function handleChange(event) {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	// Attempt login
	function loginWithEmailPassword(email, password) {
		const foundUser = users.find(
			(u) => u.email === email && u.password === password
		);

		if (!foundUser) {
			return { success: false, message: "Invalid email or password" };
		}

		// Generate a token
		const token =
			Math.random().toString(36).substring(2) + Date.now().toString(36);

		// Store in localStorage
		localStorage.setItem("authToken", token);
		localStorage.setItem("authUserId", foundUser.id);

		// Mark as logged in
		setIsLoggedIn(true);

		return { success: true, user: foundUser };
	}

	// Sign up new user
	function signUpUser({ name, email, password, dateOfBirth }) {
		const existing = users.find((u) => u.email === email);
		if (existing) {
			return { success: false, message: "Email is already taken." };
		}

		// Create the new user
		const newUser = {
			id: users.length + 1,
			name,
			email,
			password,
			dateOfBirth,
		};

		// Add them to the array
		setUsers((prev) => [...prev, newUser]);

		// Generate a token
		const token =
			Math.random().toString(36).substring(2) + Date.now().toString(36);
		localStorage.setItem("authToken", token);
		localStorage.setItem("authUserId", newUser.id);

		setIsLoggedIn(true);
		return { success: true, user: newUser };
	}

	// Update user with extra fields (e.g., from the NewUser form)
	function updateUserProfile(userId, extraFields) {
		setUsers((prevUsers) => {
			return prevUsers.map((u) => {
				if (u.id === userId) {
					return { ...u, ...extraFields };
				}
				return u;
			});
		});
	}

	// Basic logout
	function logout() {
		localStorage.removeItem("authToken");
		localStorage.removeItem("authUserId");
		setIsLoggedIn(false);
	}

	// On component mount, check for token in localStorage
	useEffect(() => {
		const token = localStorage.getItem("authToken");
		const userId = localStorage.getItem("authUserId");
		if (token && userId) {
			setIsLoggedIn(true);
		}
	}, []);

	// Context value
	const value = {
		isLoggedIn,
		authMode,
		users,
		formData,
		handleAuthMode,
		handleChange,
		loginWithEmailPassword,
		signUpUser,
		updateUserProfile,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

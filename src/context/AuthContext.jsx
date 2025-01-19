import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // (A) Whether user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // (B) Whether form is "login" (true) or "signup" (false)
  const [loginSignup, setLoginSignup] = useState(true);

  // (C) Our in-memory "database" of users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Jane Tester",
      email: "test@test.com",
      password: "1234",
      dateOfBirth: "1990-01-01",
    },
  ]);

  // (D) The form data user is currently typing in the login/signup forms
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });

  // Toggle between login & signup
  function handleAuthMode() {
    setLoginSignup(!loginSignup);
  }

  // The function that updates the typed fields
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  /**
   * Attempt to log in with email + password
   */
  function loginWithEmailPassword(email, password) {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      return { success: false, message: "Invalid email or password" };
    }

    // If found, generate a token
    const token =
      Math.random().toString(36).substring(2) + Date.now().toString(36);

    // Save token + userId in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUserId", foundUser.id);

    // Mark isLoggedIn = true
    setIsLoggedIn(true);

    return { success: true, user: foundUser };
  }

  /**
   * Sign up a new user with the data from formData
   */
  function signUpUser({ name, email, password, dateOfBirth }) {
    const existing = users.find((u) => u.email === email);
    if (existing) {
      return { success: false, message: "Email is already taken." };
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      dateOfBirth,
    };

    // Add to array
    setUsers((prev) => [...prev, newUser]);

    // Generate token + store in localStorage
    const token =
      Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUserId", newUser.id);

    setIsLoggedIn(true);
    return { success: true, user: newUser };
  }

  /**
   * Update user with extra fields (like from NewUser step-2 form)
   */
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

  /**
   * remove the line below that references "newUser"
   * NO global code that sets localStorage out of any function
   *
   * // in signUpUser / loginWithEmailPassword
   * // localStorage.setItem("authUserId", newUser.id);
   */

  /**
   * Basic logout
   */
  function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUserId");
    setIsLoggedIn(false);
  }

  // On mount, check if there's a token
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("authUserId");
    if (token && userId) {
      setIsLoggedIn(true);
    }
  }, []);

  // The context value
  const value = {
    isLoggedIn,
    loginSignup,
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

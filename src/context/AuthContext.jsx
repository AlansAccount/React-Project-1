/**
 * frontend/src/context/AuthContext.jsx
 * 
 * Handles user authentication (signup, login, logout) 
 * and stores the currently logged-in user's info.
 */
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("authUser");
    if (token && userData) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  async function signUpUser({ name, email, password, dateOfBirth }) {
    try {
      const res = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, dateOfBirth }),
      });
      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data.user));
      setIsLoggedIn(true);
      setCurrentUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  async function loginWithEmailPassword({ email, password }) {
    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data.user));
      setIsLoggedIn(true);
      setCurrentUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setIsLoggedIn(false);
    setCurrentUser(null);
  }

  const value = {
    isLoggedIn,
    currentUser,
    signUpUser,
    loginWithEmailPassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// =======================================
// frontend/src/context/NotificationContext.jsx
// =======================================
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
	const { currentUser } = useContext(AuthContext);
	const [notifications, setNotifications] = useState([]);

	// fetch notifications
	useEffect(() => {
		if (!currentUser) return;
		fetch(`http://localhost:4000/api/users/${currentUser.id}/notifications`)
			.then((res) => res.json())
			.then((data) => setNotifications(data));
	}, [currentUser]);

	function refreshNotifications() {
		if (!currentUser) return;
		fetch(`http://localhost:4000/api/users/${currentUser.id}/notifications`)
			.then((res) => res.json())
			.then((data) => setNotifications(data));
	}

	function markAsRead(notifId) {
		fetch(`http://localhost:4000/api/notifications/${notifId}/read`, {
			method: "PATCH",
		}).then(() => {
			setNotifications((prev) =>
				prev.map((n) => (n.notifId === notifId ? { ...n, read: true } : n))
			);
		});
	}

	const value = {
		notifications,
		markAsRead,
		refreshNotifications,
	};

	return (
		<NotificationContext.Provider value={value}>
			{children}
		</NotificationContext.Provider>
	);
}

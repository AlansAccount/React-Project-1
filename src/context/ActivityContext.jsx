import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const ActivityContext = createContext();

export function ActivityProvider({ children }) {
	const { currentUser } = useContext(AuthContext);
	const [activities, setActivities] = useState([]);

	useEffect(() => {
		if (!currentUser) return;
		fetch(`http://localhost:4000/api/users/${currentUser.id}/activities`)
			.then((res) => res.json())
			.then((data) => setActivities(data))
			.catch((err) => console.error(err));
	}, [currentUser]);

	return (
		<ActivityContext.Provider value={{ activities }}>
			{children}
		</ActivityContext.Provider>
	);
}

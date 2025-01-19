import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function ProfileSideBar() {
	const { users } = useContext(AuthContext);

	const userId = localStorage.getItem("authUserId");
	if (!userId) {
		return <p>No user logged in</p>;
	}

	const user = users.find((u) => u.id === parseInt(userId, 10));
	if (!user) {
		return <p>User not found in context</p>;
	}

	return (
		<div>
			<h2>Profile Info</h2>
			<p>Name: {user.name}</p>
			<p>DOB: {user.dateOfBirth}</p>
			<p>Sex: {user.sex}</p>
			<p>Location: {user.location}</p>
			<p>About: {user.about}</p>
		</div>
	);
}

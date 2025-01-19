import ProfileSideBar from "../layout/SideBar Files/ProfileSideBar";
// ProfilePage.jsx
import { useContext } from "react";
import { PostContext } from "../../context/PostContext";
import { AuthContext } from "../../context/AuthContext";
import Feed from "../feed/Feed";

export default function ProfilePage() {
	const { posts } = useContext(PostContext);
	const { isLoggedIn } = useContext(AuthContext);
	const userId = localStorage.getItem("authUserId");
	// or from a user object in AuthContext if you prefer

	if (!isLoggedIn) {
		return <p>Please log in to see your profile.</p>;
	}

	// Filter posts to only those matching current userId
	const myPosts = posts.filter((p) => p.userId === userId);

	return (
		<>
			<aside className="sidebar">
				<ProfileSideBar />
			</aside>

			
			<main className="feed">
				<h2>User Posts Area</h2>
				<Feed userId={userId} myPosts={myPosts}/>
			</main>
		</>
	);
}

import { useContext } from "react";
import { PostContext } from "../../context/PostContext";
import { AuthContext } from "../../context/AuthContext";
import ProfileSideBar from "../layout/SideBar Files/ProfileSideBar";
import Feed from "../feed/Feed";

export default function ProfilePage() {
	const { posts } = useContext(PostContext);
	const { isLoggedIn } = useContext(AuthContext);

	// 1) Grab userId from localStorage (could also get from context if you store it there)
	const userId = localStorage.getItem("authUserId");

	if (!isLoggedIn) {
		return <p>Please log in to see your profile.</p>;
	}

	// 2) Filter the posts to only show those by the current user
	const myPosts = posts.filter((p) => p.userId === userId);

	return (
		<>
			<aside className="sidebar">
				<ProfileSideBar />
			</aside>

			<main className="feed">
				<h2>User Posts Area</h2>
				{/* 3) Pass 'myPosts' to <Feed /> if desired, or let Feed handle its own logic */}
				<Feed userId={userId} myPosts={myPosts} />
			</main>
		</>
	);
}

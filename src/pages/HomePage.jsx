// HomePage.jsx
import { useState } from "react";
import HomeSideBar from "../components/layout/SideBar Files/HomeSideBar";
import PostCard from "../components/feed/PostCard";
import Feed from "../components/feed/Feed";
import { useContext } from "react";
import { PostContext } from "../context/PostContext";

export default function HomePage() {
	const [createPost, setCreatePost] = useState(false);
	const { posts, likePost } = useContext(PostContext);

	function handleCreatePost() {
		setCreatePost(true);
	}

	function handleDone() {
		setCreatePost(false);
	}

	return (
		<>
			<aside className="sidebar">
				<HomeSideBar />
			</aside>
			<main className="feed">
				<h4>
					Main Feed Area
					<button onClick={handleCreatePost}>Create Post</button>
				</h4>

				{/* (1) If user clicked “Create Post,” show the PostCard modal */}
				{createPost && <PostCard onDone={handleDone} />}

				{/* (2) List all posts from PostContext */}
				<Feed />
			</main>
		</>
	);
}

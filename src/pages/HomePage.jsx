import { useState, useContext } from "react";
import HomeSideBar from "../components/layout/SideBar Files/HomeSideBar";
import PostCard from "../components/feed/PostCard";
import Feed from "../components/feed/Feed";
import { PostContext } from "../context/PostContext";

export default function HomePage() {
	// 1) Local state to show/hide create post modal
	const [createPost, setCreatePost] = useState(false);

	// 2) Get the 'posts' array and 'likePost' function from context (unused 'likePost' here)
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
				{/* 3) The left sidebar (e.g., nav links, etc.) */}
				<HomeSideBar />
			</aside>

			<main className="feed">
				<h4>
					Main Feed Area
					<button onClick={handleCreatePost}>Create Post</button>
				</h4>

				{/* 4) Show a modal for creating a post when 'createPost' is true */}
				{createPost && <PostCard onDone={handleDone} />}

				{/* 5) Display the list of posts */}
				<Feed />
			</main>
		</>
	);
}

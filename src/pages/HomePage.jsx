/**
 * frontend/src/pages/HomePage.jsx
 *
 * A simple page that shows the Feed plus a "create post" form.
 * Also demonstrates how we might open the ChatModal (optional).
 */
import { useState, useContext } from "react";
import { PostContext } from "../context/PostContext";
import Feed from "../components/feed/Feed";
import ChatModal from "./ChatModal";

export default function HomePage() {
	const { addPost } = useContext(PostContext);
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [showChat, setShowChat] = useState(false); // for chat modal

	function handleCreatePost(e) {
		e.preventDefault();
		if (!title.trim()) return;
		addPost({ title, description: desc });
		setTitle("");
		setDesc("");
	}

	return (
		<div style={{ display: "flex", gap: "1rem" }}>
			<aside style={{ width: "200px", background: "#f0f0f0", padding: "1rem" }}>
				<h3>Create a Post</h3>
				<form onSubmit={handleCreatePost}>
					<input
						placeholder="Post title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<textarea
						placeholder="Post description"
						value={desc}
						onChange={(e) => setDesc(e.target.value)}
					/>
					<button type="submit">Add Post</button>
				</form>

				<hr />

				<button onClick={() => setShowChat(true)}>Open Chat Modal</button>
			</aside>
			<main style={{ flexGrow: 1, padding: "1rem" }}>
				<h2>Home Feed</h2>
				<Feed />
			</main>

			{/* Chat modal for "targetUserId" = 2 or whomever you want */}
			<ChatModal
				isOpen={showChat}
				onClose={() => setShowChat(false)}
				targetUserId={2}
			/>
		</div>
	);
}

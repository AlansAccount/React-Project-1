// Feed.jsx
import { useContext } from "react";
import { PostContext } from "../../context/PostContext";

export default function Feed({ userId, myPosts }) {
	const { posts, likePost } = useContext(PostContext);

	// If userId is provided, filter posts for that user. Otherwise, show all.
	const displayPosts = userId
		? posts.filter((p) => p.userId === userId)
		: posts;

	if (displayPosts.length === 0) {
		return <p>No posts to display.</p>;
	}

	return (
		<div>
			{displayPosts.map((p) => (
				<div
					key={p.id}
					style={{
						border: "1px solid #ccc",
						margin: "1rem 0",
						padding: "0.5rem",
					}}
				>
					<h3>{p.title}</h3>
					<p>{p.description}</p>
					<p>Posted by userId: {p.userId}</p>
				</div>
			))}

			<button onClick={() => likePost(p.id)}>Like</button>
			<p>Likes: {p.likes}</p>
		</div>
	);
}

import { useContext, useRef, useState, useEffect } from "react";
import { PostContext } from "../../context/PostContext";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ userId, myPosts }) {
	const { posts, likePost, deletePost } = useContext(PostContext);
	const { users } = useContext(AuthContext);
	const [visibleCount, setVisibleCount] = useState(2); // Initial visible posts count

	// Filter posts based on userId or show all posts
	const displayPosts = Array.isArray(posts)
		? userId
			? posts.filter((p) => p.userId === userId)
			: posts
		: [];

	// Ref for the "load more" trigger
	const loadMoreRef = useRef();

	// This useEffect handles the infinite scrolling.
	useEffect(() => {
		// Function to handle observer trigger
		const handleIntersection = (entries) => {
			if (entries[0].isIntersecting) {
				setVisibleCount((prev) => prev + 1); // Load 1 more post
			}
		};

		// Create IntersectionObserver instance
		const observer = new IntersectionObserver(handleIntersection, {
			threshold: 1,
		});

		// Attach observer to the "load more" element
		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}

		// Clean up observer on unmount
		return () => {
			if (loadMoreRef.current) {
				observer.unobserve(loadMoreRef.current);
			}
		};
	}, [loadMoreRef.current]);

	// Slice the displayed posts up to the visibleCount
	const postsToShow = displayPosts.slice(0, visibleCount);

	// Handle case when there are no posts to display
	if (postsToShow.length === 0) {
		return <p>No posts to display.</p>;
	}

	return (
		<div>
			{postsToShow.map((p, index) => {
				const isLastItem = index === postsToShow.length - 1;
				return (
					<div
						key={p.id}
						style={{
							border: "1px solid #ccc",
							margin: "1rem 0",
							padding: "0.5rem",
						}}
						// Attach the ref only to the last post
						ref={isLastItem ? loadMoreRef : null}
					>
						<h3>{p.title}</h3>
						<p>{p.description}</p>
						<p>Posted by userId: {p.userId}</p>
						<button
							onClick={() => {
								deletePost(posts.id);
							}}
						>
							Delete Post
						</button>
					</div>
				);
			})}
		</div>
	);
}

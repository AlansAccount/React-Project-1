import { useContext, useRef, useState, useEffect } from "react";
import { PostContext } from "../../context/PostContext";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ userId, myPosts }) {
	const { posts, likePost, dislikePost, deletePost } = useContext(PostContext);
	const { users } = useContext(AuthContext);s
	// 1) For an infinite scrolling effect, track how many posts are visible
	const [visibleCount, setVisibleCount] = useState(2);

	// 2) If 'userId' is passed, filter for that user. Otherwise show all
	const displayPosts = Array.isArray(posts)
		? userId
			? posts.filter((p) => p.userId === userId)
			: posts
		: [];

	// 3) A ref to attach the "load more" intersection observer
	const loadMoreRef = useRef();

	useEffect(() => {
		const handleIntersection = (entries) => {
			if (entries[0].isIntersecting) {
				// Load 1 more post
				setVisibleCount((prev) => prev + 1);
			}
		};

		const observer = new IntersectionObserver(handleIntersection, {
			threshold: 1,
		});

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}

		return () => {
			if (loadMoreRef.current) {
				observer.unobserve(loadMoreRef.current);
			}
		};
	}, [loadMoreRef.current]);

	// 4) Slice the displayed posts up to 'visibleCount'
	const postsToShow = displayPosts.slice(0, visibleCount);

	// 5) If no posts to display, show a message
	if (postsToShow.length === 0) {
		return <p>No posts to display.</p>;
	}

	function CommentsSection({ post }) {
		const { addComment, replyToComment } = useContext(PostContext);
		const [commentText, setCommentText] = useState("");

		function handleAddComment(e) {
			e.preventDefault();
			// call addComment from context
			addComment(post.id, commentText);
			setCommentText("");
		}

		return (
			<div
				style={{ marginTop: "1rem", padding: "0.5rem", background: "#f9f9f9" }}
			>
				<h4>Comments</h4>
				{/* Comments List */}
				{post.comments.map((c) => (
					<div
						key={c.commentId}
						style={{
							border: "1px dashed #ddd",
							margin: "0.5rem 0",
							padding: "0.5rem",
						}}
					>
						<p>
							{c.text} (by user {c.userId})
						</p>
						{/* You might also implement comment likes here */}
						<RepliesSection postId={post.id} comment={c} />
					</div>
				))}

				{/* Add New Comment Form */}
				<form onSubmit={handleAddComment}>
					<input
						value={commentText}
						onChange={(e) => setCommentText(e.target.value)}
						placeholder="Add comment..."
					/>
					<button type="submit">Post Comment</button>
				</form>
			</div>
		);
	}

	// A separate sub-component to handle the replies for a single comment
	function RepliesSection({ postId, comment }) {
		const { replyToComment } = useContext(PostContext);
		const [replyText, setReplyText] = useState("");

		function handleReply(e) {
			e.preventDefault();
			replyToComment(postId, comment.commentId, replyText);
			setReplyText("");
		}

		return (
			<div style={{ marginLeft: "1rem" }}>
				{comment.replies.map((r) => (
					<div
						key={r.replyId}
						style={{
							margin: "0.5rem 0",
							padding: "0.25rem",
							borderLeft: "2px solid #ccc",
						}}
					>
						<p>
							{r.text} (by user {r.userId})
						</p>
						{/* Optionally, add a like button for each reply */}
					</div>
				))}
				{/* Add a new reply */}
				<form onSubmit={handleReply} style={{ marginTop: "0.5rem" }}>
					<input
						value={replyText}
						onChange={(e) => setReplyText(e.target.value)}
						placeholder="Reply to comment..."
					/>
					<button type="submit">Reply</button>
				</form>
			</div>
		);
	}

	function RepliesSection({ postId, comment }) {
		const { replyToComment } = useContext(PostContext);
		const [replyText, setReplyText] = useState("");

		function handleReply(event) {
			event.preventDault();
			replyToComment(postId, comment.commentId, replyText);
			setReplyText("");
		}

		return (
			<div style={{ marginLeft: "1rem" }}>
				{comment.replies.map((r) => (
					<div
						key={r.replyId}
						style={{
							margin: "0.5rem 0",
							padding: "0.25rem",
							borderLeft: "2px solid #ccc",
						}}
					>
						<p>
							{r.text} (by user{r.userId})
						</p>
						{/* Optionally, add a like button for each reply */}
						<div>
							<button onClick={() => likePost(p.id)}>Like ({p.likes})</button>
						</div>
					</div>
				))}
				<form onSubmit={handleReply} style={{ marginTop: "0.5rem" }}>
					<input
						value={replyText}
						onChange={(e) => setReplyText(e.target.value)}
						placeholder="Reply to comment..."
					/>
					<button type="submit">Reply</button>
				</form>
			</div>
		);
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
						ref={isLastItem ? loadMoreRef : null}
					>
						<h3>{p.title}</h3>
						<p>{p.description}</p>
						<p>Posted by userId: {p.userId}</p>

						<div>
							<button onClick={() => likePost(p.id)}>Like ({p.likes})</button>
							<button onClick={() => dislikePost(p.id)}>
								Dislike ({p.dislikes})
							</button>
						</div>

						<button
							onClick={() => {
								// Potential bug: should be p.id not posts.id
								deletePost(p.id);
							}}
						>
							Delete Post
						</button>
						{/* Comments section */}
						<CommentsSection post={p} />
					</div>
				);
			})}
		</div>
	);
}

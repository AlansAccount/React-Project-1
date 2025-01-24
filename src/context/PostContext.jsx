import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const PostContext = createContext({
	posts: [],
	addPost: () => {},
	deletePost: () => {},
});

export function PostProvider({ children }) {
	const [posts, setPosts] = useState([]);

	// Potential usage of auth context if we want to do something with user data
	const {} = useContext(AuthContext);

	// 1) Add a post, associating it with the logged-in user's ID
	function addPost(post) {
		const userId = localStorage.getItem("authUserId");
		const newPost = {
			...post,
			id: Math.random().toString(36).substring(2),
			userId: userId, // associate with user
			status: "active",
			createdAt: new Date().toISOString(),
			likes: 0,
			dislikes: 0,
			comments: [], // new field
		};
		setPosts((prevPosts) => [newPost, ...prevPosts]);
	}

	// 2) Increase the like count

	function likePost(postId) {
		setPosts((prevPosts) =>
			prevPosts.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
		);
	}

	function dislikePost(postId) {
		setPosts((prevPosts) =>
			prevPosts.map((p) =>
				p.id === postId ? { ...p, dislikes: p.dislikes + 1 } : p
			)
		);
	}

	function addComment(postId, commentText) {
		const currentUserId = localStorage.getItem("authUserId");

		setPosts((prevPosts) => {
			return prevPosts.map((post) => {
				if (post.id === postId) {
					const newComment = {
						commentId: Math.random().toString(36).substring(2),
						userId: currentUserId,
						text: commentText,
						likes: 0,
						dislikes: 0,
						replies: [],
					};
					return {
						...posts,
						commnets: [...post.comment, newComment],
					};
				}
				return post;
			});
		});
	}

	function replyToComment(postId, commentId, replyText) {
		const currentUserId = localStorage.getItem("authUserId");

		setPosts((prevPosts) => {
			return prevPosts.map((post) => {
				if (post.id !== postId) return post;
				const updatedComments = post.comments.map((c) => {
					if (c.commentId !== commentId) return c;
					const newReply = {
						replyId: Math.random().toString(36).substring(2),
						userId: currentUserId,
						text: replyText,
						likes: 0,
					};
					return {
						...c,
						replies: [...c.replies, newReply],
					};
				});

				return { ...post, comment: updatedComments };
			});
		});
	}

	// 	// 2) Increase reaactions count
	// 	function updateReaction(postId, reactionType) {
	// 	setPosts((prevPosts) =>
	// 		prevPosts.map((p) =>
	// 			p.id === postId
	// 				? {
	// 						...p,
	// 						reactions: {
	// 							...p.reactions,
	// 							[reactionType]: (p.reactions[reactionType] || 0) + 1,
	// 						},
	// 				  }
	// 				: p
	// 		)
	// 	);
	// }

	// 3) Delete a post
	function deletePost(postId) {
		setPosts((prevPosts) => {
			const updatedPosts = prevPosts.filter((p) => p.id !== postId);
			localStorage.setItem("posts", JSON.stringify(updatedPosts));
			return updatedPosts;
		});
	}

	// 4) Load posts from localStorage on mount
	useEffect(() => {
		const savedPosts = localStorage.getItem("posts");
		if (savedPosts) {
			setPosts(JSON.parse(savedPosts));
		}
	}, []);

	// 5) Save posts to localStorage whenever they change
	useEffect(() => {
		localStorage.setItem("posts", JSON.stringify(posts));
	}, [posts]);

	const postsContext = {
		posts,
		addPost,
		likePost,
		dislikePost,
		deletePost,
		addComment, // new
		replyToComment, // new
	};

	return (
		<PostContext.Provider value={postsContext}>{children}</PostContext.Provider>
	);
}

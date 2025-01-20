import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const PostContext = createContext({
	posts: [],
	addPost: () => {},
});

export function PostProvider({ children }) {
	const [posts, setPosts] = useState([]);

	// We might also want to know who is currently logged in from AuthContext
	const {
		/* something to get userId, if we store userId in localStorage or maybe from a user obj*/
	} = useContext(AuthContext);

	function addPost(post) {
		// We find the current user ID from localStorage or from AuthContext
		const userId = localStorage.getItem("authUserId");

		const newPost = {
			...post,
			id: Math.random().toString(36).substring(2),
			userId: userId, // associate the post with the logged in user
			status: "active",
			createdAt: new Date().toISOString(),
		};
		setPosts((prevPosts) => [newPost, ...prevPosts]);
	}
	function likePost(postId) {
		setPosts((prevPosts) =>
			prevPosts.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
		);
	}

	useEffect(() => {
		// load from localStorage on mount
		const savedPosts = localStorage.getItem("posts");
		if (savedPosts) {
			setPosts(JSON.parse(savedPosts));
		}
	}, []);

	useEffect(() => {
		// whenever posts change, save them to localStorage
		localStorage.setItem("posts", JSON.stringify(posts));
	}, [posts]);

	const postsContext = {
		posts,
		addPost,
		likePost,
	};

	return (
		<PostContext.Provider value={postsContext}>{children}</PostContext.Provider>
	);
}

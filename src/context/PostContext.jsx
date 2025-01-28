/**
 * frontend/src/context/PostContext.jsx
 *
 * Manages fetching, creating, and interacting with posts.
 */
import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);

  // On mount, fetch all posts from backend
  useEffect(() => {
    fetchPosts();
  }, []);

  function fetchPosts() {
    fetch("http://localhost:4000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data); // array of posts
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }

  async function addPost({ title, description }) {
    if (!currentUser) return;
    try {
      const bodyObj = {
        userId: currentUser.id,
        title,
        description,
      };
      const res = await fetch("http://localhost:4000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyObj),
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => [data.post, ...prev]);
      }
    } catch (err) {
      console.error("addPost error:", err);
    }
  }

  async function likePost(postId) {
    if (!currentUser) return;
    try {
      const res = await fetch(`http://localhost:4000/api/posts/${postId}/like`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actorUserId: currentUser.id }),
      });
      if (res.ok) {
        // increment likes locally
        setPosts((prev) =>
          prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
        );
      }
    } catch (err) {
      console.error("likePost error:", err);
    }
  }

  async function dislikePost(postId) {
    if (!currentUser) return;
    try {
      const res = await fetch(
        `http://localhost:4000/api/posts/${postId}/dislike`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ actorUserId: currentUser.id }),
        }
      );
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, dislikes: p.dislikes + 1 } : p
          )
        );
      }
    } catch (err) {
      console.error("dislikePost error:", err);
    }
  }

  async function addComment(postId, commentText) {
    if (!currentUser) return;
    try {
      const res = await fetch(
        `http://localhost:4000/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: currentUser.id, text: commentText }),
        }
      );
      if (res.ok) {
        // re-fetch or manually update state
        fetchPosts();
      }
    } catch (err) {
      console.error("addComment error:", err);
    }
  }

  async function replyToComment(postId, commentId, replyText) {
    if (!currentUser) return;
    try {
      const res = await fetch(
        `http://localhost:4000/api/posts/${postId}/comments/${commentId}/replies`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: currentUser.id, text: replyText }),
        }
      );
      if (res.ok) {
        fetchPosts();
      }
    } catch (err) {
      console.error("replyToComment error:", err);
    }
  }

  function deletePost(postId) {
    // optional: also remove from server
    fetch(`http://localhost:4000/api/posts/${postId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== postId));
      }
    });
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        likePost,
        dislikePost,
        addComment,
        replyToComment,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

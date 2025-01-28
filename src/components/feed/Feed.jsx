/**
 * frontend/src/components/feed/Feed.jsx
 *
 * Displays all posts from PostContext (or a subset if given a userId prop).
 * Also renders comments, etc. if you want.
 */
import { useContext, useState, useEffect, useRef } from "react";
import { PostContext } from "../../context/PostContext";

/**
 * Optional 'userId' prop: if present, only show that user's posts.
 */
export default function Feed({ userId }) {
  const { posts, likePost, dislikePost, deletePost } = useContext(PostContext);

  // We'll do an "infinite scroll" example with IntersectionObserver
  const [visibleCount, setVisibleCount] = useState(5);
  const loadMoreRef = useRef(null);

  // Filter posts if userId is provided
  const displayPosts = userId
    ? posts.filter((p) => p.userId === userId)
    : posts;

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // load 3 more
        setVisibleCount((prev) => prev + 3);
      }
    });

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loadMoreRef]);

  const postsToShow = displayPosts.slice(0, visibleCount);

  if (postsToShow.length === 0) {
    return <p>No posts to display.</p>;
  }

  return (
    <div>
      {postsToShow.map((post, idx) => {
        const isLast = idx === postsToShow.length - 1;
        return (
          <div
            key={post.id}
            ref={isLast ? loadMoreRef : null}
            style={{ border: "1px solid #ccc", margin: "1rem 0", padding: "1rem" }}
          >
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            {post.mediaUrl && (
              <img
                src={`http://localhost:4000${post.mediaUrl}`}
                alt="post media"
                style={{ maxWidth: "300px" }}
              />
            )}
            <p>By user: {post.userId} | Likes: {post.likes} | Dislikes: {post.dislikes}</p>
            <button onClick={() => likePost(post.id)}>
              Like
            </button>
            <button onClick={() => dislikePost(post.id)}>
              Dislike
            </button>
            <button onClick={() => deletePost(post.id)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

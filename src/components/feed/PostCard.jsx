import { useContext, useRef, useState } from "react";
import Button from "../../common/Button";
import Modal from "./Modal";

import { PostContext } from "../../context/PostContext";

export default function PostCard({ onDone }) {
	const { addPost } = useContext(PostContext);
	const [deleteButton, setDeleteButton] = useState(false);

	// 1) Refs for the form inputs
	const titleRef = useRef();
	const descRef = useRef();

	function handleSubmit(event) {
		event.preventDefault();

		const post = {
			title: titleRef.current.value,
			description: descRef.current.value,
		};
		// Possibly you might want to require a non-empty title and description

		setDeleteButton(true);
		addPost(post); // Add the new post
		onDone(); // Close the modal
	}

	return (
		<Modal title="New Post" onClose={onDone}>
			<form id="new-post" onSubmit={handleSubmit}>
				<p>
					<label htmlFor="title">Post Title</label>
					<input ref={titleRef} type="text" name="title" id="title" required />
				</p>

				<p>
					<label htmlFor="description">Your Post</label>
					<textarea
						ref={descRef}
						name="description"
						id="description"
						rows="4"
						cols="55"
						placeholder="Enter your post content here."
						required
					/>
				</p>

				{deleteButton && <button>Delete Post</button>}
				<div>
					<Button type="button" onClick={onDone}>
						Cancel
					</Button>
					<Button type="submit">Create Post</Button>
				</div>
			</form>
		</Modal>
	);
}

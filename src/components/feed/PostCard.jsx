import { useContext, useRef, useState } from "react";
import Button from "../../common/Button";
import Modal from "./Modal";

import { PostContext } from "../../context/PostContext";

export default function PostCard({ onDone }) {
	const { addPost } = useContext(PostContext);
	const [deleteButton, setDeleteButton] = useState(false);

	const titleRef = useRef();
	const descRef = useRef();

	function handleSubmit(event) {
		event.preventDefault();
		const post = {
			title: titleRef.current.value,
			description: descRef.current.value,
		};
		setDeleteButton(true);

		addPost(post); // add the new post to the context
		onDone(); // close modal
	}

	return (
		<Modal title="New Post" onClose={onDone}>
			<form id="new-post" onSubmit={handleSubmit}>
				<p>
					<label htmlFor="title">Post Title</label>
					<input ref={titleRef} type="text" name="title" id="title" />
				</p>
				<p>
					<label htmlFor="description">Your Post</label>
					<textarea
						ref={descRef}
						type="text"
						name="description"
						id="description"
						rows="4"
						cols="55"
						placeholder="Enter your post content here."
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

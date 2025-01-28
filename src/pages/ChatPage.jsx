// =======================================
// frontend/src/pages/ChatPage.jsx
// =======================================
import { useState, useEffect, useContext } from "react";
import { MessagingContext } from "../context/MessagingContext";
import { AuthContext } from "../context/AuthContext";

/**
 * This page might chat with a hard-coded otherUserId.
 * In reality, you'd select who you want to chat with, etc.
 */
export default function ChatPage({ otherUserId = 2 }) {
	const { currentUser } = useContext(AuthContext);
	const { conversations, fetchConversation, sendMessage } =
		useContext(MessagingContext);
	const [text, setText] = useState("");

	useEffect(() => {
		fetchConversation(otherUserId);
	}, [otherUserId]);

	const messages = conversations[otherUserId] || [];

	function handleSend() {
		if (!text.trim()) return;
		sendMessage(otherUserId, text);
		setText("");
	}

	return (
		<div>
			<h2>Chat with user {otherUserId}</h2>
			<div
				style={{
					border: "1px solid #ccc",
					maxHeight: "300px",
					overflowY: "auto",
				}}
			>
				{messages.map((m) => (
					<div key={m.messageId} style={{ margin: "0.5rem" }}>
						<strong>{m.senderId === currentUser?.id ? "Me" : "Them"}:</strong>{" "}
						{m.text}
					</div>
				))}
			</div>
			<div style={{ marginTop: "1rem" }}>
				<input
					placeholder="Type a message..."
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<button onClick={handleSend}>Send</button>
			</div>
		</div>
	);
}

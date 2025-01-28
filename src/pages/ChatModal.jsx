/**
 * frontend/src/components/chat/ChatModal.jsx
 *
 * A modal that shows a conversation with a specific "targetUserId"
 * and allows sending messages in real-time (or near real-time).
 */
import { useState, useEffect, useContext } from "react";
import Modal from "../common/Modal";
import { ChatContext } from "../context/MessagingContext";
import { AuthContext } from "../context/AuthContext";

export default function ChatModal({ isOpen, onClose, targetUserId }) {
	const { currentUser } = useContext(AuthContext);
	const { conversations, fetchConversation, sendMessage } =
		useContext(ChatContext);
	const [messageText, setMessageText] = useState("");

	// Load conversation on open
	useEffect(() => {
		if (isOpen && targetUserId) {
			fetchConversation(targetUserId);
		}
	}, [isOpen, targetUserId]);

	// array of messages for that user
	const messages = conversations[targetUserId] || [];

	// handle send
	function handleSend() {
		if (!messageText.trim()) return;
		sendMessage(targetUserId, messageText);
		setMessageText("");
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<h3>Chat with user {targetUserId}</h3>
			<div
				style={{
					maxHeight: "300px",
					overflowY: "auto",
					border: "1px solid #ccc",
					padding: "0.5rem",
				}}
			>
				{messages.map((m) => (
					<div key={m.messageId} style={{ margin: "0.25rem 0" }}>
						<strong>
							{m.senderId === currentUser?.id ? "Me" : `User ${m.senderId}`}:
						</strong>{" "}
						{m.text}
					</div>
				))}
			</div>

			<div style={{ marginTop: "0.5rem" }}>
				<input
					style={{ width: "80%" }}
					placeholder="Type a message..."
					value={messageText}
					onChange={(e) => setMessageText(e.target.value)}
				/>
				<button onClick={handleSend}>Send</button>
			</div>
		</Modal>
	);
}

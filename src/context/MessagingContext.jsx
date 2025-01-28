/**
 * frontend/src/context/ChatContext.jsx
 * 
 * Manages sending messages & storing conversations. 
 * We'll create a function to fetch conversation between currentUser and "targetUserId".
 */
import { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const { currentUser } = useContext(AuthContext);

  // We'll store all conversation arrays in an object { [userId]: [messages...] }
  const [conversations, setConversations] = useState({});

  // fetch conversation
  async function fetchConversation(otherUserId) {
    if (!currentUser) return;
    const res = await fetch(
      `http://localhost:4000/api/messages/${currentUser.id}/${otherUserId}`
    );
    const msgs = await res.json();
    setConversations((prev) => ({ ...prev, [otherUserId]: msgs }));
  }

  // send a message
  async function sendMessage(otherUserId, text) {
    if (!currentUser) return;
    const res = await fetch("http://localhost:4000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderId: currentUser.id,
        recipientId: otherUserId,
        text,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setConversations((prev) => {
        const old = prev[otherUserId] || [];
        return {
          ...prev,
          [otherUserId]: [...old, data.message],
        };
      });
    }
  }

  return (
    <ChatContext.Provider value={{ conversations, fetchConversation, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

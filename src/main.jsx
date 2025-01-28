/**
 * frontend/src/main.jsx
 *
 * Renders the React app, sets up routing, and wraps with our contexts.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/HomePage";
import ProfilePage from "./components/profile/ProfilePage";

import { AuthContextProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import { ChatProvider } from "./context/MessagingContext";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: "profile", element: <ProfilePage /> },
			// possibly: { path: "chat", element: <ChatPage /> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthContextProvider>
		<PostProvider>
			<ChatProvider>
				<RouterProvider router={router} />
			</ChatProvider>
		</PostProvider>
	</AuthContextProvider>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import App from "./App";
import SettingsPage from "./components/settings/SettingsPage";
import AccountSettingsForm from "./components/settings/AccountSettingsForm";
import ProfilePage from "./components/profile/ProfilePage";

// Here I want to add routing with createBrowserRouter and have the routes nested here.

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/settings",
				element: <SettingsPage />,
				children: [
					{ path: "/settings/account", element: <AccountSettingsForm /> },
				],
			},
		],
	},
	{
		path: "/profile",
		element: <ProfilePage />,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);

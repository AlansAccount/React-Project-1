import { createRoot } from "react-dom/client";
import "./index.css";


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import App from "./App";
import SettingsPage from "./components/settings/SettingsPage";
import AccountSettingsForm from "./components/settings/AccountSettingsForm";
import ProfilePage from "./components/profile/ProfilePage";
import AuthFormPage from "./pages/AuthForms/AuthFormPage";

// Here I want to add routing with createBrowserRouter and have the routes nested here.

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "/profile",
				element: <ProfilePage />,
			},
			{
				path: "/settings",
				element: <SettingsPage />,
				children: [
					{ path: "account", element: <AccountSettingsForm /> },
				],
			},
		],
	},
	{
		path: "/Auth",
		element: <AuthFormPage />,
	},
]);

createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<RouterProvider router={router} />
	</AuthProvider>
);

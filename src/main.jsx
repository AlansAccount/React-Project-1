import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";

import HomePage from "./pages/HomePage";
import App from "./App";
import SettingsPage from "./components/settings/SettingsPage";
import AccountSettingsForm from "./components/settings/AccountSettingsForm";
import ProfilePage from "./components/profile/ProfilePage";
import AuthLayout from "./pages/AuthForms/AuthLayout";
import AuthFormPage from "./pages/AuthForms/AuthFormPage";
import NewUser from "./pages/AuthForms/NewUser";
import NotFoundPage from "./pages/NotFoundPage";

// 1) Create a router with all the route definitions and nested routes.
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />, // The top-level layout
		children: [
			{
				index: true, // '/' route
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
					{
						path: "account",
						element: <AccountSettingsForm />,
					},
				],
			},
			{
				path: "/Auth",
				element: <AuthLayout />, // A layout for Auth routes
				children: [
					{
						index: true, // '/Auth' route
						element: <AuthFormPage />,
					},
					{
						path: "complete-registry",
						element: <NewUser />,
					},
				],
			},
			{
				path: "*", // Catch-all route for 404s
				element: <NotFoundPage />,
			},
		],
	},
]);

// 2) Render the app, wrapping with AuthContextProvider and PostProvider so that
//    all children have access to auth/post state and functions.
createRoot(document.getElementById("root")).render(
	<AuthContextProvider>
		<PostProvider>
			<RouterProvider router={router} />
		</PostProvider>
	</AuthContextProvider>
);

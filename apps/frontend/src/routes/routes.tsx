import { createBrowserRouter, Navigate } from "react-router";

import { AuthContainer } from "@/pages/auth/AuthContainer.tsx";
import { Editor } from "@/pages/Editor.tsx";
import { LoggedIn, Login, LoginCallback } from "@/pages/Login.tsx";

export const MainRoutes = createBrowserRouter([
    {
        path: "/editor",
        element: <Editor />,
    },
    {
        path: "/",
        element: <Navigate to={"/auth/login"} />,
    },
    {
        path: "auth",
        element: <AuthContainer />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "oidc/login",
                element: <LoginCallback />,
            },
            {
                path: "logged-in",
                element: <LoggedIn />,
            },
        ],
    },
]);

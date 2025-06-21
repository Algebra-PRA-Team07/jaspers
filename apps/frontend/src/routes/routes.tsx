import { createBrowserRouter, Navigate } from "react-router";

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
        path: "auth/login",
        element: <Login />,
    },
    {
        path: "auth/oidc/login",
        element: <LoginCallback />,
    },
    {
        path: "auth/data",
        element: <LoggedIn />,
    },
]);

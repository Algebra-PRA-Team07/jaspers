import { createBrowserRouter, Navigate, RouteObject } from "react-router";

import { Counter } from "@/pages/Counter";
import { Editor } from "@/pages/Editor.tsx";
import { Gates } from "@/pages/Gates";
import { UsersTest } from "@/pages/UsersTest.tsx";
import { LoggedIn, Login, LoginCallback } from "../pages/Login.tsx";
import { Root } from "@/Root";

export const MainRoutes = createBrowserRouter([
    {
        path: "/editor",
        element: <Editor />,
    },
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "counter",
                element: <Counter />,
            },
            {
                path: "gates",
                element: <Gates />,
            },
            {
                path: "users",
                element: <UsersTest />,
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
            {
                index: true,
                element: <Navigate to={"counter"} replace />,
            },
        ] satisfies RouteObject[],
    },
]);

import { createBrowserRouter, Navigate, RouteObject } from "react-router";

import { Counter } from "../pages/Counter";
import { Gates } from "../pages/Gates";
import { LoggedIn, Login, LoginCallback } from "../pages/Login.tsx";
import { UsersTest } from "../pages/UsersTest.tsx";
import { Root } from "../Root";

export const MainRoutes = createBrowserRouter([
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

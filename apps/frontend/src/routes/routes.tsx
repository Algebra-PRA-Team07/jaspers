import { createBrowserRouter, Navigate, RouteObject } from "react-router";

import { Counter } from "../pages/Counter";
import { Editor } from "../pages/Editor.tsx";
import { Gates } from "../pages/Gates";
import { UsersTest } from "../pages/UsersTest.tsx";
import { Root } from "../Root";

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
                index: true,
                element: <Navigate to={"counter"} replace />,
            },
        ] satisfies RouteObject[],
    },
]);

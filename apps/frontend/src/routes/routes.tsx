import { createBrowserRouter, Navigate, RouteObject } from "react-router";

import { Counter } from "../pages/Counter";
import { Gates } from "../pages/Gates";
import { Root } from "../Root";

export const MainRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [{
            path: "counter",
            element: <Counter />
        }, {
            path: "gates",
            element: <Gates />
        }, {
            index: true,
            element: <Navigate to={"counter"} replace />
        }] satisfies RouteObject[],
    },
]);

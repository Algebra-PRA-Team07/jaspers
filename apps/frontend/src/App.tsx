import { AppRouter } from "@jaspers/backend";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { RouterProvider } from "react-router";

import { MainRoutes } from "./routes/routes";
import { TRPCProvider } from "./utils/trpc";

let queryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
    if (!queryClient) {
        queryClient = new QueryClient();
    }

    return queryClient;
};

function App() {
    const queryClient = getQueryClient();
    const [trpcClient] = useState(() =>
        createTRPCClient<AppRouter>({
            links: [
                httpBatchLink({
                    url: "http://localhost:3000",
                }),
            ],
        }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
                <RouterProvider router={MainRoutes} />
            </TRPCProvider>
        </QueryClientProvider>
    );
}

export default App;

import { Gate } from "@jaspers/models";
import { publicProcedure, router } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { Globals } from "./globals";

const EXAMPLE_GATES: Gate[] = [
    {
        type: "and",
    },
    {
        type: "or",
    },
];

const appRouter = router({
    // available on http://localhost:3000/gateList by default
    gateList: publicProcedure.query(() => {
        return EXAMPLE_GATES;
    }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
    router: appRouter,
});

server.listen(Globals.port).on("listening", () => {
    console.log(`Listening on ${Globals.port}`);
});

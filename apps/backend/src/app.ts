import { Gate } from "@jaspers/models";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";

import { Globals } from "./globals";
import { publicProcedure, router } from "./trpc";

// example function that simulates getting some data from the database
const getSomeGates = async (): Promise<Gate[]> => {
    // simulate delay
    await new Promise((r) => setTimeout(r, 400));

    return [
        {
            id: Math.floor(Math.random() * 10),
            type: "and",
            no_operands: 2,
        },
        {
            id: Math.floor(10 + Math.random() * 10),

            type: "or",
            no_operands: 2,
        },
        {
            id: Math.floor(20 + Math.random() * 10),
            type: "not",
            no_operands: 1,
        },
        {
            id: Math.floor(30 + Math.random() * 10),
            type: "xor",
            no_operands: 2,
        },
    ];
};

const appRouter = router({
    // available on http://localhost:3000/gateList by default
    gateList: publicProcedure.query(async () => {
        const gates = await getSomeGates();

        return gates;
    }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
    router: appRouter,
    middleware: cors(),
});

server.listen(Globals.port).on("listening", () => {
    console.log(`Listening on ${Globals.port}`);
});

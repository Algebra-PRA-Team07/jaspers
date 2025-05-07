import { Gate, User } from "@jaspers/models";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";

import { database } from "./db/database";
import { users } from "./db/schema";
import { Globals } from "./globals";
import { Logger } from "./logging";
import { initOidc } from "./oidc";
import { authRouter } from "./routers/auth/authRouter";
import { createContext, publicProcedure, router } from "./trpc";

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
        return await getSomeGates();
    }),

    userList: publicProcedure.query<User[]>(async () => {
        return database.select().from(users);
    }),

    auth: authRouter,
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
    router: appRouter,
    middleware: cors(),
    createContext,
});

Promise.allSettled([
    initOidc()
        .then(() => Logger.info("OIDC initialized"))
        .catch((error) => Logger.panic("Failed to initialize OIDC", error)),
    // eslint-disable-next-line unicorn/prefer-top-level-await
]).then(() => {
    server.listen(Globals.port).on("listening", () => {
        Logger.info(`Listening on ${Globals.port}`);
    });

    Logger.info("Ready");
});

import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";

import { createContext } from "./context";
import { Globals } from "./globals";
import { initOidc } from "./lib/oidc";
import { Logger } from "./logging";
import { authRouter } from "./routers/auth/authRouter";
import { router } from "./trpc";

const appRouter = router({
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

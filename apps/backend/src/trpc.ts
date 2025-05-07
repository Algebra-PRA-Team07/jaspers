import { initTRPC } from "@trpc/server";

import { Context } from "./context";

const tRpc = initTRPC.context<Context>().create();

export const middleware = tRpc.middleware;
export const router = tRpc.router;
export const publicProcedure = tRpc.procedure;

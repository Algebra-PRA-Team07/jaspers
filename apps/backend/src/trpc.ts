import { URLSearchParams } from "node:url";

import { initTRPC } from "@trpc/server";
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";

export type Context = {
    query: URLSearchParams;
};

export const createContext = async ({ req }: CreateHTTPContextOptions): Promise<Context> => {
    const url = new URL(req.url ?? "", `http://${req.headers.host}`);

    return { query: url.searchParams };
};

const tRpc = initTRPC.context<Context>().create();

export const router = tRpc.router;
export const publicProcedure = tRpc.procedure;

import { initTRPC } from "@trpc/server";

const tRpc = initTRPC.create();

export const router = tRpc.router;
export const publicProcedure = tRpc.procedure;

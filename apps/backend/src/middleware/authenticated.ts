import { TRPCError } from "@trpc/server";

import { middleware } from "../trpc";

export const authenticated = middleware(async ({ ctx, next }) => {
    if (!ctx.user)
        throw new TRPCError({
            code: "UNAUTHORIZED",
        });

    return next({ ctx: { user: ctx.user } });
});

import { users } from "../../db/schema";
import { authenticated } from "../../middleware/authenticated";
import { publicProcedure, router } from "../../trpc";
import { oidcRouter } from "./oidcRouter";

export const authenticatedProcedure = publicProcedure.use(authenticated);

export const authRouter = router({
    oidc: oidcRouter,
    me: authenticatedProcedure.query<typeof users.$inferSelect>(({ ctx }) => {
        return ctx.user;
    }),
});

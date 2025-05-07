import { router } from "../../trpc";
import { oidcRouter } from "./oidcRouter";

export const authRouter = router({
    oidc: oidcRouter,
});

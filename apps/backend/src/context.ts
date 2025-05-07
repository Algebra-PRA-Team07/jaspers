import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { eq } from "drizzle-orm";

import { database } from "./db/database";
import { users } from "./db/schema";
import { validateJwt } from "./lib/auth";

export type Context = {
    user?: typeof users.$inferSelect;
};

export const createContext = async ({ req }: CreateHTTPContextOptions): Promise<Context> => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) return {};

    const token = authorization.slice("Bearer ".length);
    const jwtData = await validateJwt(token).catch(() => null);

    if (jwtData === null) return {};

    const { tokenData } = jwtData;

    const user = await database.query.users.findFirst({
        where: eq(users.id, tokenData.user_id),
    });

    return { user };
};

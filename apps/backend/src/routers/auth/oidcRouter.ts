import assert from "node:assert";

import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

import { database } from "../../db/database";
import { users } from "../../db/schema";
import { oidcExchangeAuthorizationToken, oidcMakeAuthorizationUrl } from "../../oidc";
import { publicProcedure, router } from "../../trpc";
import { generateGravatarUrl, generateJwt } from "../../util/auth";

export const oidcRouter = router({
    loginUrl: publicProcedure.query(() => {
        return oidcMakeAuthorizationUrl();
    }),
    callback: publicProcedure
        // .input(
        //     z.object({
        //         code: z.string(),
        //     }),
        // )
        .query(async ({ input, ctx }) => {
            const exchanged = await oidcExchangeAuthorizationToken(ctx.query.get("code")!);

            if (!exchanged.success || !exchanged.idTokenData.exp)
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                });

            const email = exchanged.data.email.toLowerCase();

            const userData = {
                oidc_id_token: exchanged.idToken,
                id_token_exp: new Date(exchanged.idTokenData.exp * 1000),
                name: exchanged.data.name,
                picture_url: exchanged.data.picture ?? generateGravatarUrl(email),
            };

            // doing an upsert burns sequence ids

            const existing = await database.query.users.findFirst({
                columns: { id: true },
                where: eq(users.email, email),
            });

            const databaseUser = await (existing
                ? database
                      .update(users)
                      .set(userData)
                      .where(eq(users.id, existing.id))
                      .returning({ id: users.id })
                : database
                      .insert(users)
                      .values({
                          email,
                          ...userData,
                      })
                      .returning({
                          id: users.id,
                      }));

            assert.ok(databaseUser.length === 1);

            const jwt = generateJwt(databaseUser[0].id, exchanged.data);

            const databaseUsers = await database.query.users.findMany();

            return {
                jwt,
                users: databaseUsers,
            };
        }),
});

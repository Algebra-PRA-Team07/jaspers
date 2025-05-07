import assert from "node:assert";

import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { database } from "../../db/database";
import { users } from "../../db/schema";
import { generateGravatarUrl, generateJwt } from "../../lib/auth";
import { oidcExchangeAuthorizationToken, oidcMakeAuthorizationUrl } from "../../lib/oidc";
import { publicProcedure, router } from "../../trpc";

export const oidcRouter = router({
    loginUrl: publicProcedure.query(() => {
        return oidcMakeAuthorizationUrl();
    }),
    login: publicProcedure
        .input(
            z.object({
                code: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            const exchanged = await oidcExchangeAuthorizationToken(input.code);

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

            // const databaseUsers = await database.query.users.findMany();

            return {
                jwt,
                // users: databaseUsers,
            };
        }),
});

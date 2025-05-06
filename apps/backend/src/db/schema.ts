import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    oidc_access_token: varchar(),
    oidc_refresh_token: varchar(),
});

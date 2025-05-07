import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    oidc_id_token: varchar().notNull(),
    id_token_exp: timestamp().notNull(),
    email: varchar().unique().notNull(),
    picture_url: varchar().notNull(),
    name: varchar().notNull(),
});

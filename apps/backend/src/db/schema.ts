import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    oidc_id_token: varchar(),
    id_token_exp: timestamp(),
    email: varchar().unique(),
    picture_url: varchar(),
    name: varchar(),
});

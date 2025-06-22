import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

import { Globals } from "../globals";
import * as schema from "./schema";

export const database = drizzle(Globals.databaseUrl, { schema });

export const initDatabase = async () => {
    if (process.env.NODE_ENV !== "production") return;

    await migrate(database, {
        migrationsFolder: "./migrations",
    });
};

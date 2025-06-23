import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

import { Globals } from "../globals";
import * as schema from "./schema";

export const database = drizzle(Globals.databaseUrl, { schema });

export const initDatabase = async () => {
    await migrate(database, {
        migrationsFolder: "./drizzle",
    });
};

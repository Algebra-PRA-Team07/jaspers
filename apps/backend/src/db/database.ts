import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";

import { Globals } from "../globals";
import * as schema from "./schema";

export const database = drizzle(Globals.databaseUrl, { schema });

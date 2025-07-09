import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export const getDb = (db: D1Database) => {
  return drizzle(db, { schema });
};

// This is the one to use for static routes (i.e. ISR/SSG)
export const getDbAsync = async (db: D1Database) => {
  return drizzle(db, { schema });
};

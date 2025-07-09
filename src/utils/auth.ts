import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDbAsync } from "../db/getDb";
import * as schema from "../db/schema";

export const auth = async (db: D1Database) => {
  const dbInstance = await getDbAsync(db);

  return betterAuth({
    database: drizzleAdapter(dbInstance, {
      provider: "sqlite",
      schema,
    }),
    emailAndPassword: {
      enabled: true,
    },
    secret:
      process.env.BETTER_AUTH_SECRET || import.meta.env.BETTER_AUTH_SECRET,
    baseUrl: process.env.BETTER_AUTH_URL || import.meta.env.BETTER_AUTH_URL,
    trustedOrigins: [
      "http://localhost:3000",
      "http://localhost:8787",
      process.env.BETTER_AUTH_URL || import.meta.env.BETTER_AUTH_URL || "",
      process.env.PRODUCTION_ORIGIN_URL ||
        import.meta.env.PRODUCTION_ORIGIN_URL ||
        "",
    ],
  });
};

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDbAsync } from "../db/getDb";
import * as schema from "../db/schema";

export const auth = async (envMap: Cloudflare.Env) => {
  const dbInstance = await getDbAsync(envMap.DB);

  console.log("(process env) prod url", process.env.PRODUCTION_ORIGIN_URL);
  console.log("(import env) prod url", import.meta.env.PRODUCTION_ORIGIN_URL);
  console.log("(cf env) prod url", envMap.PRODUCTION_ORIGIN_URL);

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

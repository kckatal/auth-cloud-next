import { auth } from "./src/utils/auth";
import { defineMiddleware } from "astro:middleware";
import type { APIContext, MiddlewareNext } from "astro";

export const onRequest = defineMiddleware(
  async (context: APIContext, next: MiddlewareNext) => {
    console.log("In the middleware");
    const authInstance = await auth(context.locals.runtime.env);
    const authSession = await authInstance.api.getSession({
      headers: context.request.headers,
    });

    console.log("Auth Session", authSession);

    if (authSession) {
      console.log("auth session user", authSession.user);
      context.locals.user = authSession.user;
      context.locals.session = authSession.session;
    } else {
      console.log("user is not authed");
      context.locals.user = null;
      context.locals.session = null;
    }

    return next();
  }
);

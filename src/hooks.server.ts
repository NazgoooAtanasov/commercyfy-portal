import { redirect, type Handle } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { CommercyfyCoreConnection } from "commercyfy-core-js";

export const handle: Handle = async ({ event, resolve }) => {
  const authToken = event.cookies.get("x-commercyfy-core-jwt");
  if (!authToken && !event.request.url.includes("/signin")) {
    return redirect(301, "/signin");
  }

  event.locals.commercyfyConnection = new CommercyfyCoreConnection(
    env.COMMERCYFY_CORE_URL,
    authToken!,
  );
  return await resolve(event);
};

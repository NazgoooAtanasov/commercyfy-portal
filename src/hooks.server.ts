import { redirect, type Handle } from "@sveltejs/kit";
import { COMMERCYFY_CORE_URL } from "$env/static/private";
import { CommercyfyCoreConnection } from "commercyfy-core-js";

export const handle: Handle = async ({ event, resolve }) => {
  const authToken = event.cookies.get("x-commercyfy-core-jwt");
  if (!authToken && !event.request.url.includes("/signin")) {
    return redirect(301, "/signin");
  }

  event.locals.commercyfyConnection = new CommercyfyCoreConnection(
    COMMERCYFY_CORE_URL,
    authToken!,
  );
  return await resolve(event);
};

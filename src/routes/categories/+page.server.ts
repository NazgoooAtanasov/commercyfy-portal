import { error } from "@sveltejs/kit";
import { COMMERCYFY_CORE_URL } from "$env/static/private";
import {
  CommercyfyConn,
  type Category,
  type ErrorMessage,
} from "commercyfy-core-js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad<{ categories: Category[] }> = async ({
  cookies,
}) => {
  const authCookie = cookies.get("x-commercyfy-core-jwt");
  if (!authCookie) {
    throw error(401, "Unauthorized, please sign in");
  }

  // @TODO: try streaming the promise instead of awaiting it.
  const categories = await new CommercyfyConn(
    COMMERCYFY_CORE_URL,
    `Bearer ${authCookie}`,
  ).getCategories();

  if ((categories as ErrorMessage).error_message) {
    throw error(
      400,
      `There was an error handling your request: \"${(categories as ErrorMessage).error_message}\"`,
    );
  }

  return { categories: categories as Category[] };
};

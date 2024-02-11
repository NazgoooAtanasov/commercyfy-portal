import {
  CommercyfyConn,
  type Category,
  type ErrorMessage,
} from "commercyfy-core-js";
import type { PageServerLoad } from "./$types";
import { COMMERCYFY_CORE_URL } from "$env/static/private";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, cookies }) => {
  const authCookie = cookies.get("x-commercyfy-core-jwt");
  if (!authCookie) {
    throw error(401, "Unauthozed, please sign in");
  }

  const categoryOrError = await new CommercyfyConn(
    COMMERCYFY_CORE_URL,
    `Bearer ${authCookie}`,
  ).getCategory(params.slug);

  if ((categoryOrError as ErrorMessage).error_message) {
    throw error(
      400,
      `There was an error handling your request: \"${(categoryOrError as ErrorMessage).error_message}\"`,
    );
  }

  return { category: categoryOrError as Category };
};

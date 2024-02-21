import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import {
  CommercyfyConn,
  type ErrorMessage,
  type Product,
} from "commercyfy-core-js";
import { COMMERCYFY_CORE_URL } from "$env/static/private";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const authCookie = cookies.get("x-commercyfy-core-jwt");
  if (!authCookie) {
    throw error(401, "Unauthozed, please sign in");
  }

  const productOrError = await new CommercyfyConn(
    COMMERCYFY_CORE_URL,
    `Bearer ${authCookie}`,
  ).getProduct(params.slug);

  if ((productOrError as ErrorMessage).error_message) {
    throw error(
      400,
      `There was an error handling your request: \"${(productOrError as ErrorMessage).error_message}\"`,
    );
  }

  return { product: productOrError as Product };
};

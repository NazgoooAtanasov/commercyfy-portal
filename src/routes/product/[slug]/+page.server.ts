import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { commercyfyUnwrap } from "commercyfy-core-js";

export const load: PageServerLoad = async ({ cookies, params, locals }) => {
  const authCookie = cookies.get("x-commercyfy-core-jwt");
  if (!authCookie) {
    throw error(401, "Unauthozed, please sign in");
  }

  const product = await locals.commercyfyConnection.getProduct(params.slug);
  if (commercyfyUnwrap(product)) {
    throw error(400, product.error);
  }

  return { product };
};

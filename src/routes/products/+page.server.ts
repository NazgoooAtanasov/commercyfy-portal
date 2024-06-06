import { commercyfyUnwrap } from "commercyfy-core-js";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  const products = await locals.commercyfyConnection.getProducts();
  if (commercyfyUnwrap(products)) {
    throw error(400, products.error);
  }

  return { products };
};

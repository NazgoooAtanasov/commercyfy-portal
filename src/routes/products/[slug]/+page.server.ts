import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { commercyfyUnwrap } from "commercyfy-core-js";

export const load: PageServerLoad = async ({ params, locals }) => {
  const product = await locals.commercyfyConnection.getProduct(params.slug, {
    categories: true,
    inventories: true,
    pricebooks: true,
  });
  if (commercyfyUnwrap(product)) {
    throw error(400, product.error);
  }

  return { product };
};

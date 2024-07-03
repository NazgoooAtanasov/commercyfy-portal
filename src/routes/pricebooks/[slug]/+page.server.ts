import { commercyfyUnwrap } from "commercyfy-core-js";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, params }) => {
  const pricebook = await locals.commercyfyConnection.getPricebook(params.slug);
  if (commercyfyUnwrap(pricebook)) {
    throw error(400, pricebook.error);
  }

  return { pricebook };
};

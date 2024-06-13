import { commercyfyUnwrap } from "commercyfy-core-js";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  const pricebooks = await locals.commercyfyConnection.getPricebooks();
  if (commercyfyUnwrap(pricebooks)) {
    throw error(400, pricebooks.error);
  }

  return { pricebooks };
};

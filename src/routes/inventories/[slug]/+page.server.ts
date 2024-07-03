import { commercyfyUnwrap } from "commercyfy-core-js";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, locals }) => {
  const inventory = await locals.commercyfyConnection.getInventory(params.slug);
  if (commercyfyUnwrap(inventory)) {
    throw error(400, inventory.error);
  }

  return { inventory };
};

import { commercyfyUnwrap } from "commercyfy-core-js";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  const inventories = await locals.commercyfyConnection.getInventories();
  if (commercyfyUnwrap(inventories)) {
    throw error(400, inventories.error);
  }

  return { inventories };
};

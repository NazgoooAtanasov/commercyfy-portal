import { commercyfyUnwrap } from "commercyfy-core-js";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, cookies, locals }) => {
  const authCookie = cookies.get("x-commercyfy-core-jwt");
  if (!authCookie) {
    throw error(401, "Unauthozed, please sign in");
  }

  const category = await locals.commercyfyConnection.getCategory(params.slug);
  if (commercyfyUnwrap(category)) {
    throw error(400, category.error);
  }

  return { category };
};

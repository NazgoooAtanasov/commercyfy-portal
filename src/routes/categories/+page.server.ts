import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { commercyfyUnwrap, type GetCategories } from "commercyfy-core-js";

export const load: PageServerLoad<{ categories: GetCategories }> = async ({
  locals,
}) => {
  const categories = await locals.commercyfyConnection.getCategories();
  if (commercyfyUnwrap(categories)) {
    throw error(400, categories.error);
  }

  return {
    categories,
    extensions: {
      values: locals.commercyfyConnection.getExtensions("category"),
    },
  };
};

export const actions: Actions = {
  default: async ({ request, cookies, locals }) => {
    const authCookie = cookies.get("x-commercyfy-core-jwt");
    if (!authCookie) {
      throw error(401, "Unauthorized, please sign in");
    }

    const formData = await request.formData();
    const categoryReference = formData.get("category_reference");
    if (!categoryReference) {
      throw error(400, "category_reference is required");
    }

    const categoryName = formData.get("category_name");
    if (!categoryName) {
      throw error(400, "category_name is required");
    }

    const creation = await locals.commercyfyConnection.createCategory({
      category_name: categoryName as string,
      category_reference: categoryReference as string,
      category_description: null,
      custom_fields: {},
    });

    if (commercyfyUnwrap(creation)) {
      throw error(400, creation.error);
    }

    return { id: creation.id };
  },
};

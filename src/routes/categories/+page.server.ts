import { error } from "@sveltejs/kit";
import { COMMERCYFY_CORE_URL } from "$env/static/private";
import {
  CommercyfyConn,
  type Category,
  type ErrorMessage,
} from "commercyfy-core-js";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad<{ categories: Category[] }> = async ({
  cookies,
}) => {
  const authCookie = cookies.get("x-commercyfy-core-jwt");
  if (!authCookie) {
    throw error(401, "Unauthorized, please sign in");
  }

  // @TODO: try streaming the promise instead of awaiting it.
  const categories = await new CommercyfyConn(
    COMMERCYFY_CORE_URL,
    `Bearer ${authCookie}`,
  ).getCategories();

  if ((categories as ErrorMessage).error_message) {
    throw error(
      400,
      `There was an error handling your request: \"${(categories as ErrorMessage).error_message}\"`,
    );
  }

  return { categories: categories as Category[] };
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const authCookie = cookies.get("x-commercyfy-core-jwt");
    if (!authCookie) {
      throw error(401, "Unauthorized, please sign in");
    }

    const formData = await request.formData();
    const categoryReference = formData.get("category_reference");
    if (!categoryReference) {
      //@TODO: do whatever
      console.log("no category_reference");
      return;
    }

    const categoryName = formData.get("category_name");
    if (!categoryName) {
      //@TODO: do whatever
      console.log("no category_name");
      return;
    }

    const result = await new CommercyfyConn(
      COMMERCYFY_CORE_URL,
      `Bearer ${authCookie}`,
    ).createCategory({
      category_name: categoryName as string,
      category_reference: categoryReference as string,
      category_description: formData.has("category_description")
        ? (formData.get("category_description") as string)
        : undefined,
    });

    if ((result as ErrorMessage).error_message) {
      console.log(result);
      return;
    }
  },
};

import { commercyfyUnwrap, type ObjectType } from "commercyfy-core-js";
import type { Actions, PageServerLoad } from "./$types";
import { error, fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  const extensions = await locals.commercyfyConnection.getExtensions("product");
  if (commercyfyUnwrap(extensions)) {
    throw error(400, extensions.error);
  }
  return { extensions };
};

export const actions: Actions = {
  filter: async ({ locals, request }) => {
    const form = await request.formData();
    if (!form.has("type")) {
      return fail(400, { message: "Type is required" });
    }

    let type: ObjectType;
    try {
      type = JSON.parse(
        form.get("type") as string,
      )[0].toLowerCase() as ObjectType;
    } catch (err) {
      return fail(400, { message: "Invalid type" });
    }

    const extensions = await locals.commercyfyConnection.getExtensions(type);
    if (commercyfyUnwrap(extensions)) {
      return fail(400, { message: extensions.error });
    }

    return { extensions };
  },
};

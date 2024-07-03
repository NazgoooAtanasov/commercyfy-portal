import { commercyfyUnwrap, type CreateCategory } from "commercyfy-core-js";
import type { Actions, PageServerLoad } from "./$types";
import { z } from "zod";
import { error, fail } from "@sveltejs/kit";
import { buildExtensionsObject, validateExternalFields, validateForm } from "$lib";

export const load: PageServerLoad = async ({ locals }) => {
  const extensions =
    await locals.commercyfyConnection.getExtensions("category");
  if (commercyfyUnwrap(extensions)) {
    throw error(400, extensions.error);
  }

  return { extensions };
};

const createCategorySchema = z.object({
  category_reference: z
    .string()
    .min(
      1,
      "Category Reference is required. It should contain at least 1 charachter",
    ),
  category_name: z
    .string()
    .min(
      1,
      "Category Name is required. It should contain at least 1 charachter",
    ),
  category_description: z.string().optional(),
});
export const actions: Actions = {
  create: async ({ request, locals }) => {
    const form = await request.formData();
    const baseValidation = await validateForm(form, createCategorySchema);
    if (!baseValidation.valid) {
      return fail(400, { message: baseValidation.message });
    }

    const extensions =
      await locals.commercyfyConnection.getExtensions("category");
    if (commercyfyUnwrap(extensions)) {
      throw error(400, extensions.error);
    }

    const categoryData = baseValidation.data!;
    const validation = validateExternalFields(form, extensions);
    if (!validation.valid) {
      return fail(400, { message: validation.message });
    }

    const category =
      await locals.commercyfyConnection.createCategory({
        category_reference: categoryData.category_reference,
        category_name: categoryData.category_name,
        category_description: categoryData.category_description ?? null,
        custom_fields: buildExtensionsObject(form, extensions),
      });
    if (commercyfyUnwrap(category)) {
      return fail(400, { message: category.error });
    }
  },
};

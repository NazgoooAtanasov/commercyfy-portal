import { commercyfyUnwrap, type CreateProduct } from "commercyfy-core-js";
import type { PageServerLoad } from "./$types";
import { error, type Actions, fail } from "@sveltejs/kit";
import { z } from "zod";
import {
  buildExtensionsObject,
  validateExternalFields,
  validateForm,
} from "$lib";

export const load: PageServerLoad = async ({ locals }) => {
  const extensions = await locals.commercyfyConnection.getExtensions("product");
  if (commercyfyUnwrap(extensions)) {
    throw error(400, extensions.error);
  }

  const categories = await locals.commercyfyConnection.getCategories();
  if (commercyfyUnwrap(categories)) {
    throw error(400, categories.error);
  }

  return { extensions, categories };
};

const createProductSchema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  product_description: z.string().min(1, "Product description is required"),
  product_color: z.string().optional(),
});
export const actions: Actions = {
  create: async ({ request, locals }) => {
    const form = await request.formData();
    const baseValidation = await validateForm(form, createProductSchema);
    if (!baseValidation.valid) {
      return fail(400, { message: baseValidation.message });
    }

    const extensions =
      await locals.commercyfyConnection.getExtensions("product");
    if (commercyfyUnwrap(extensions)) {
      return fail(400, { message: extensions.error });
    }

    const extensionValidations = validateExternalFields(form, extensions);
    if (!extensionValidations.valid) {
      return fail(400, { message: extensionValidations.message });
    }

    const productData = baseValidation.data!;
    const product = await locals.commercyfyConnection.createProduct({
      product_name: productData.product_name,
      product_description: productData.product_description,
      product_color: productData.product_color ?? null,
      category_assignments: form.get("categories")?.toString().split(",") ?? [],
      custom_fields: buildExtensionsObject(form, extensions),
    });
    if (commercyfyUnwrap(product)) {
      return fail(400, { message: product.error });
    }
  },
};

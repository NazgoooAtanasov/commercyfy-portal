import { commercyfyUnwrap, type CreatePricebook } from "commercyfy-core-js";
import type { Actions, PageServerLoad } from "./$types";
import { error, fail } from "@sveltejs/kit";
import { z } from "zod";
import { buildExtensionsObject, validateExternalFields, validateForm } from "$lib";

export const load: PageServerLoad = async ({ locals }) => {
  const extensions =
    await locals.commercyfyConnection.getExtensions("pricebook");
  if (commercyfyUnwrap(extensions)) {
    throw error(400, extensions.error);
  }

  return { extensions };
};

const createPricebookSchema = z.object({
  pricebook_reference: z.string().min(1, "Pricebook Reference is required"),
  pricebook_name: z.string().min(1, "Pricebook Name is required."),
  pricebook_currency_code: z
    .string()
    .min(1, "Pricebook currency code is required."),
});
export const actions: Actions = {
  create: async ({ locals, request }) => {
    const form = await request.formData();

    const baseValidation = await validateForm(form, createPricebookSchema);
    if (!baseValidation.valid) {
      return fail(400, { message: baseValidation.message });
    }

    const extensions =
      await locals.commercyfyConnection.getExtensions("pricebook");
    if (commercyfyUnwrap(extensions)) {
      return fail(400, { message: extensions.error });
    }

    const pricebookData = baseValidation.data!;
    const validation = validateExternalFields(form, extensions);
    if (!validation.valid) {
      return fail(400, { message: validation.message });
    }

    const createPricebook =
      await locals.commercyfyConnection.createPricebook({
        pricebook_name: pricebookData.pricebook_name,
        pricebook_reference: pricebookData.pricebook_reference,
        pricebook_currency_code: pricebookData.pricebook_currency_code,
        custom_fields: buildExtensionsObject(form, extensions)
      });
    if (commercyfyUnwrap(createPricebook)) {
      return fail(400, { message: createPricebook.error });
    }
  },
};

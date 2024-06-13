import { commercyfyUnwrap, type CreatePricebook } from "commercyfy-core-js";
import type { Actions, PageServerLoad } from "./$types";
import { error, fail } from "@sveltejs/kit";
import { z } from "zod";
import { validateExternalFields } from "$lib";

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
    const pricebookData = [...form.entries()].reduce(
      (acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      },
      {} as Record<string, string>,
    );

    const data = createPricebookSchema.safeParse(pricebookData);
    if (!data.success) {
      return fail(400, {
        message: data.error.issues
          .map((issue) => `${issue.path}: ${issue.message}`)
          .join(", "),
      });
    }

    const extensions =
      await locals.commercyfyConnection.getExtensions("pricebook");
    if (commercyfyUnwrap(extensions)) {
      return fail(400, { message: extensions.error });
    }

    const validation = validateExternalFields(pricebookData, extensions);
    if (!validation.valid) {
      return fail(400, { message: validation.message });
    }

    const pricebook: CreatePricebook = {
      pricebook_name: data.data.pricebook_name,
      pricebook_reference: data.data.pricebook_reference,
      pricebook_currency_code: data.data.pricebook_currency_code,
      custom_fields: extensions.reduce(
        (acc, value) => {
          if (value.$type === "string") {
            acc[value.name] = pricebookData[value.name];
          } else if (value.$type === "int") {
            acc[value.name] = parseInt(pricebookData[value.name]);
          }

          return acc;
        },
        {} as Record<string, unknown>,
      ),
    };

    const createPricebook =
      await locals.commercyfyConnection.createPricebook(pricebook);
    if (commercyfyUnwrap(createPricebook)) {
      return fail(400, { message: createPricebook.error });
    }
  },
};

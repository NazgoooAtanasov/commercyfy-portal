import { commercyfyUnwrap } from "commercyfy-core-js";
import type { PageServerLoad, Actions } from "./$types";
import { error, fail } from "@sveltejs/kit";
import { z } from "zod";
import { validateExternalFields, buildExtensionsObject, validateForm } from "$lib";

export const load: PageServerLoad = async ({ locals }) => {
  const extensions =
    await locals.commercyfyConnection.getExtensions("inventory");
  if (commercyfyUnwrap(extensions)) {
    throw error(400, extensions.error);
  }

  return { extensions };
};

const createInventorySchema = z.object({
  inventory_reference: z.string().min(1, "Inventory Reference is required"),
  inventory_name: z.string().min(1, "Inventory Name is required."),
});
export const actions: Actions = {
  create: async ({ request, locals }) => {
    const form = await request.formData();
    const baseValidation = await validateForm(form, createInventorySchema);
    if (!baseValidation.valid) {
      return fail(400, { message: baseValidation.message });
    }

    const extensions =
      await locals.commercyfyConnection.getExtensions("inventory");
    if (commercyfyUnwrap(extensions)) {
      return fail(400, { message: extensions.error });
    }

    const inventoryData = baseValidation.data!;
    const validation = validateExternalFields(form, extensions);
    if (!validation.valid) {
      return fail(400, { message: validation.message });
    }

    const createInventory = await locals.commercyfyConnection.createInventory({
      inventory_reference: inventoryData.inventory_reference,
      inventory_name: inventoryData.inventory_name,
      custom_fields: buildExtensionsObject(form, extensions),
    });
    if (commercyfyUnwrap(createInventory)) {
      return fail(400, { message: createInventory.error });
    }
  },
};

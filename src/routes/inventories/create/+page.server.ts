import { commercyfyUnwrap, type CreateInventory } from "commercyfy-core-js";
import type { PageServerLoad, Actions } from "./$types";
import { error, fail } from "@sveltejs/kit";
import { z } from "zod";
import { validateExternalFields } from "$lib";

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
    const inventoryData = [...form.entries()].reduce(
      (acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      },
      {} as Record<string, string>,
    );

    const data = createInventorySchema.safeParse(inventoryData);
    if (!data.success) {
      return fail(400, {
        message: data.error.issues
          .map((issue) => `${issue.path}: ${issue.message}`)
          .join(", "),
      });
    }

    const extensions =
      await locals.commercyfyConnection.getExtensions("inventory");
    if (commercyfyUnwrap(extensions)) {
      return fail(400, { message: extensions.error });
    }

    const validation = validateExternalFields(inventoryData, extensions);
    if (!validation.valid) {
      return fail(400, { message: validation.message });
    }

    const inventory: CreateInventory = {
      inventory_reference: data.data.inventory_reference,
      inventory_name: data.data.inventory_name,
      custom_fields: extensions.reduce(
        (acc, value) => {
          if (value.$type === "string") {
            acc[value.name] = inventoryData[value.name];
          } else if (value.$type === "int") {
            acc[value.name] = parseInt(inventoryData[value.name]);
          }

          return acc;
        },
        {} as Record<string, unknown>,
      ),
    };

    const createInventory =
      await locals.commercyfyConnection.createInventory(inventory);
    if (commercyfyUnwrap(createInventory)) {
      return fail(400, { message: createInventory.error });
    }
  },
};

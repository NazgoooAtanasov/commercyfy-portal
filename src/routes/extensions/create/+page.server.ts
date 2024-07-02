import { z } from "zod";
import type { Actions } from "./$types";
import { validateForm } from "$lib";
import { fail } from "@sveltejs/kit";
import { commercyfyUnwrap } from "commercyfy-core-js";

const ObjectType = z.union([
  z.literal("product"),
  z.literal("category"),
  z.literal("inventory"),
  z.literal("pricebook"),
]);

const createStringSchema = z.object({
  $object: ObjectType,
  $type: z.literal("string"),
  name: z.string().min(1, "Name is required"),
  mandatory: z.boolean(),
  min_len: z.number().optional(),
  max_len: z.number().optional(),
});

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const form = await request.formData();
    const type = form.get("type");
    const validation = await validateForm(form, createStringSchema);
    if (!validation.valid) {
      return fail(400, { message: validation.message });
    }

    const extension = await locals.commercyfyConnection.createExtension(
      validation.data!,
    );

    if (commercyfyUnwrap(extension)) {
      return fail(400, { message: extension.error });
    }
  },
};

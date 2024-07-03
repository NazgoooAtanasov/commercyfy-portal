import { z } from "zod";
import type { Actions } from "./$types";
import { validate } from "$lib";
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
  description: z.string().optional(),
  mandatory: z.boolean().default(false),
  min_len: z.number().optional(),
  max_len: z.number().optional(),
});

const createIntSchema = z.object({
  $object: ObjectType,
  $type: z.literal("int"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  mandatory: z.boolean().default(false),
});

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const form = await request.formData();
    const data: any = Object.fromEntries(form.entries());

    data.$type = JSON.parse(data.$type)[0];
    data.$object = JSON.parse(data.$object)[0];

    if (data.$type === "string" && !!data.min_len) {
      data.min_len = parseInt(data.min_len as string);
    } else {
      data.min_len = undefined;
    }
    if (data.$type === "string" && !!data.max_len) {
      data.max_len = parseInt(data.max_len as string);
    } else {
      data.max_len = undefined;
    }

    const validation = await validate(
      data,
      // @ts-ignore
      data.$type === "string" ? createStringSchema : createIntSchema,
    );
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

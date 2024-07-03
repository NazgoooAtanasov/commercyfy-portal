import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { z } from "zod";
import { commercyfyUnwrap } from "commercyfy-core-js";

const createImageSchema = z.object({
  src: z.string().min(1, "Image source is required"),
  srcset: z.string().min(1, "Image source set is required"),
  alt: z.string().optional(),
});
export const actions: Actions = {
  create: async ({ request, locals, params }) => {
    const form = await request.formData();
    const formData = [...form.entries()].reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, unknown>,
    );

    const data = createImageSchema.safeParse(formData);
    if (!data.success) {
      return fail(400, {
        message: data.error.issues
          .map((issue) => `${issue.path}: ${issue.message}`)
          .join(", "),
      });
    }

    const image = await locals.commercyfyConnection.createProductImage(
      params.slug,
      data.data,
    );
    if (commercyfyUnwrap(image)) {
      return fail(400, { message: image.error });
    }
  },
};

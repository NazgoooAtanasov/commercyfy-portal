import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { z } from "zod";
import { commercyfyUnwrap } from "commercyfy-core-js";

export const load: PageServerLoad = async ({ locals }) => {
  return {
    products: {
      values: locals.commercyfyConnection.getProducts(),
    },
  };
};

const assignProductsSchema = z.object({
  productIds: z.string().min(1, "You must select at least one product"),
});

export const actions: Actions = {
  products: async ({ request, params, locals }) => {
    const formData = await request.formData();
    const inputData = {
      productIds: formData.get("productIds") as string,
    };

    const data = assignProductsSchema.safeParse(inputData);
    if (!data.success) {
      return fail(400, {
        message: data.error.issues
          .map((issue) => `${issue.path}: ${issue.message}`)
          .join(", "),
      });
    }

    const productIds = data.data.productIds.split(",");
    productIds.pop();
    const assign = await locals.commercyfyConnection.assignProducts(
      params.slug,
      productIds,
    );
    if (commercyfyUnwrap(assign)) {
      return fail(400, { message: assign.error });
    }
  },
};

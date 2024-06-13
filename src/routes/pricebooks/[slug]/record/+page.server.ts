import {
  commercyfyUnwrap,
  type CreatePricebookRecord,
} from "commercyfy-core-js";
import type { Actions, PageServerLoad } from "./$types";
import { error, fail } from "@sveltejs/kit";
import { z } from "zod";

export const load: PageServerLoad = async ({ locals, params }) => {
  const pricebook = await locals.commercyfyConnection.getPricebook(params.slug);
  if (commercyfyUnwrap(pricebook)) {
    throw error(400, pricebook.error);
  }

  const products = await locals.commercyfyConnection.getProducts();
  if (commercyfyUnwrap(products)) {
    throw error(400, products.error);
  }

  const filter = products.filter(
    (product) =>
      !pricebook.records.find((record) => record.product_id === product.id),
  );

  return { pricebook, products: filter };
};

const createRecordSchema = z.object({
  productId: z.string().min(1, "Selecting a product is mandatory"),
  price: z.string().min(0, "Allocation must be a positive number"),
});
export const actions: Actions = {
  record: async ({ params, locals, request }) => {
    const form = await request.formData();
    const recordData = [...form.entries()].reduce(
      (acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      },
      {} as Record<string, unknown>,
    );

    const data = createRecordSchema.safeParse(recordData);
    if (!data.success) {
      return fail(400, {
        message: data.error.issues
          .map((issue) => `${issue.path}: ${issue.message}`)
          .join(", "),
      });
    }

    const recordSchema: CreatePricebookRecord = {
      price: parseFloat(data.data.price),
      product_id: data.data.productId,
      pricebook_id: params.slug,
    };

    const record =
      await locals.commercyfyConnection.createPricebookRecord(recordSchema);
    if (commercyfyUnwrap(record)) {
      return fail(400, { message: record.error });
    }
  },
};

import {
  commercyfyUnwrap,
  type CreateInventoryRecord,
} from "commercyfy-core-js";
import type { Actions, PageServerLoad } from "./$types";
import { error, fail } from "@sveltejs/kit";
import { z } from "zod";

export const load: PageServerLoad = async ({ locals, params }) => {
  const inventory = await locals.commercyfyConnection.getInventory(params.slug);
  if (commercyfyUnwrap(inventory)) {
    throw error(400, inventory.error);
  }

  const products = await locals.commercyfyConnection.getProducts();
  if (commercyfyUnwrap(products)) {
    throw error(400, products.error);
  }

  const filter = products.filter(
    (product) =>
      !inventory.records.find((record) => record.product_id === product.id),
  );
  return { inventory, products: filter };
};

const createRecordSchema = z.object({
  productId: z.string().min(1, "Selecting a product is mandatory"),
  allocation: z.number().min(0, "Allocation must be a positive number"),
});
export const actions: Actions = {
  record: async ({ request, params, locals }) => {
    const form = await request.formData();
    const recordData = [...form.entries()].reduce(
      (acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      },
      {} as Record<string, unknown>,
    );
    recordData.allocation = parseInt(recordData.allocation as string);

    const data = createRecordSchema.safeParse(recordData);
    if (!data.success) {
      return fail(400, {
        message: data.error.issues
          .map((issue) => `${issue.path}: ${issue.message}`)
          .join(", "),
      });
    }

    const recordSchema: CreateInventoryRecord = {
      allocation: data.data.allocation,
      product_id: data.data.productId,
      inventory_id: params.slug,
    };

    const record =
      await locals.commercyfyConnection.createInventoryRecord(recordSchema);
    if (commercyfyUnwrap(record)) {
      return fail(400, { message: record.error });
    }
  },
};

import { commercyfyUnwrap, type CreateProduct } from "commercyfy-core-js";
import type { PageServerLoad } from "./$types";
import { error, type Actions, fail } from "@sveltejs/kit";
import { z } from "zod";

export const load: PageServerLoad = async ({ locals }) => {
  const extensions = await locals.commercyfyConnection.getExtensions("product");
  if (commercyfyUnwrap(extensions)) {
    throw error(400, extensions.error);
  }

  const categories = await locals.commercyfyConnection.getCategories();
  if (commercyfyUnwrap(categories)) {
    throw error(400, categories.error);
  }

  return { extensions, categories };
};

const createProductSchema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  product_description: z.string().min(1, "Product description is required"),
  product_color: z.string().optional(),
});
export const actions: Actions = {
  create: async ({ request, locals }) => {
    const formData = await request.formData();
    const form = [...formData.entries()].reduce(
      (acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      },
      {} as Record<string, string>,
    );

    const data = createProductSchema.safeParse(form);
    if (!data.success) {
      return fail(400, {
        message: data.error.issues
          .map((issue) => `${issue.path}: ${issue.message}`)
          .join(", "),
      });
    }

    const extensions =
      await locals.commercyfyConnection.getExtensions("product");
    if (commercyfyUnwrap(extensions)) {
      return fail(400, { message: extensions.error });
    }

    const validations = extensions.map((extension) => {
      let field: unknown = form[extension.name];
      if (!field) {
        return { valid: false };
      }

      let schema = null;
      if (extension.$type === "string") {
        schema = z.string();

        if (extension.min_len) {
          schema = schema.min(
            extension.min_len,
            `${extension.name} should contain at least ${extension.min_len} characters`,
          );
        }

        if (extension.max_len) {
          schema = schema.max(
            extension.max_len,
            `${extension.name} should contain maximum of ${extension.max_len} characters`,
          );
        }
      } else if (extension.$type === "int") {
        field = parseInt(field as string, 10);
        schema = z.number();
      }

      if (extension.mandatory) {
        schema = schema?.min(1, `${extension.name} is required`);
      }

      if (!schema) {
        return { valid: false };
      }

      const fieldData = schema.safeParse(field);
      if (fieldData.success) {
        return { valid: true };
      }

      return {
        valid: false,
        message: fieldData.error.issues
          .map((issue) => `${issue.path}: ${issue.message}`)
          .join(", "),
      };
    });

    const isValid = validations.every((validation) => validation.valid);
    if (!isValid) {
      const message = validations
        .filter((validation) => !validation.valid)
        .map((validation) => validation.message)
        .join(", ");
      return fail(400, { message });
    }

    const createCategoryData: CreateProduct = {
      product_name: data.data.product_name,
      product_description: data.data.product_description,
      product_color: data.data.product_color ?? null,
      category_assignments:
        formData.get("categories")?.toString().split(",") ?? [],
      custom_fields: extensions.reduce(
        (acc, value) => {
          if (value.$type === "string") {
            acc[value.name] = form[value.name];
          } else if (value.$type === "int") {
            acc[value.name] = parseInt(form[value.name]);
          }

          return acc;
        },
        {} as Record<string, unknown>,
      ),
    };

    const createProduct =
      await locals.commercyfyConnection.createProduct(createCategoryData);
    if (commercyfyUnwrap(createProduct)) {
      return fail(400, { message: createProduct.error });
    }
  },
};

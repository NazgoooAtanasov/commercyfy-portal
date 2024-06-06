import { commercyfyUnwrap, type CreateCategory } from "commercyfy-core-js";
import type { Actions, PageServerLoad } from "./$types";
import { z } from "zod";
import { error, fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  const extensions =
    await locals.commercyfyConnection.getExtensions("category");
  if (commercyfyUnwrap(extensions)) {
    throw error(400, extensions.error);
  }

  return { extensions };
};

const createCategorySchema = z.object({
  category_reference: z
    .string()
    .min(
      1,
      "Category Reference is required. It should contain at least 1 charachter",
    ),
  category_name: z
    .string()
    .min(
      1,
      "Category Name is required. It should contain at least 1 charachter",
    ),
  category_description: z.string().optional(),
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

    const data = createCategorySchema.safeParse(form);
    if (!data.success) {
      return fail(400, {
        message: data.error.issues
          .map((issue) => `${issue.path}: ${issue.message}`)
          .join(", "),
      });
    }

    const extensions =
      await locals.commercyfyConnection.getExtensions("category");
    if (commercyfyUnwrap(extensions)) {
      throw error(400, extensions.error);
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

    const createCategoryData: CreateCategory = {
      category_reference: data.data.category_reference,
      category_name: data.data.category_name,
      category_description: data.data.category_description ?? null,
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
    const category =
      await locals.commercyfyConnection.createCategory(createCategoryData);
    if (commercyfyUnwrap(category)) {
      return fail(400, { message: category.error });
    }
  },
};

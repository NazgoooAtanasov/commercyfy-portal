import type { GetBaseExtensions } from "commercyfy-core-js";
import { z } from "zod";

export function validateExternalFields(
  form: FormData,
  extensions: GetBaseExtensions,
): { valid: true } | { valid: false; message?: string } {
  const object = Object.fromEntries(form.entries());
  const validations = extensions.map((extension) => {
    let field: unknown = object[extension.name];
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
    return { valid: false, message };
  }

  return { valid: true };
}

export * from "./forms";

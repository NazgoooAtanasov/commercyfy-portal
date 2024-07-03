import type { GetBaseExtensions } from "commercyfy-core-js";
import { type ZodObject, type ZodRawShape } from "zod";

export async function validate<T extends ZodRawShape>(
  data: any,
  schema: ZodObject<T>,
) {
  const validation = await schema.safeParseAsync(data);
  if (!validation.success) {
    return {
      valid: false,
      message: validation.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  return { valid: true, data: validation.data };
}

export async function validateForm<T extends ZodRawShape>(
  formData: FormData,
  schema: ZodObject<T>,
) {
  const entries = Object.fromEntries(formData.entries());
  return validate(entries, schema);
}

export function buildExtensionsObject(
  form: FormData,
  extensions: GetBaseExtensions,
): Record<string, unknown> {
  return extensions.reduce(
    (acc, value) => {
      if (value.$type === "string") {
        acc[value.name] = form.get(value.name);
      } else if (value.$type === "int") {
        acc[value.name] = form.has(value.name)
          ? parseInt(form.get(value.name)! as string)
          : null;
      }

      return acc;
    },
    {} as Record<string, unknown>,
  );
}

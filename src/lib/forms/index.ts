import type { GetBaseExtensions } from "commercyfy-core-js";
import { type ZodObject, type ZodRawShape } from "zod";

export async function validateForm<T extends ZodRawShape>(
  formData: FormData,
  schema: ZodObject<T>,
) {
  const entries = Object.fromEntries(formData.entries());

  const validation = await schema.safeParseAsync(entries);
  if (!validation.success) {
    return {
      valid: false,
      message: validation.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  return { valid: true, data: validation.data };
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

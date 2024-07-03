import type { Product } from ".";

export type GetCategory = {
  id: string;
  category_name: string;
  category_reference: string;
  category_description: string | null;
  products: Product[];
  custom_fields: Record<string, any>;
};

export type GetCategories = Omit<GetCategory, "products" | "custom_fields">[];

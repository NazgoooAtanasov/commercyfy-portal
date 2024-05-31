export type CreateProductImage = {
  src: string;
  srcset: string | null;
  alt: string | null;
};

export type CreateProduct = {
  product_name: string;
  product_description: string;
  product_color: string | null;
  category_assignments: string[] | null;
  custom_fields: Record<string, any>;
};

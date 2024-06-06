export type Product = {
  id: string;
  product_name: string;
  product_description: string;
  product_color: string | null;
};

export type ProductImage = {
  id: string;
  src: string;
  srcset: string | null;
  alt: string | null;
  product_id: string;
};

export type GetProduct = Product & {
  images: ProductImage[];
  custom_fields: Record<string, any>;
};

export type GetProducts = Product[];

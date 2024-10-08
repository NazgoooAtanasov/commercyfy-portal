import type { GetCategories, GetInventoryRecord, GetPricebookRecord } from ".";

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
  categories?: GetCategories;
  inventories?: GetInventoryRecord[];
  pricebooks?: GetPricebookRecord[];
};

export type GetProducts = Product[];

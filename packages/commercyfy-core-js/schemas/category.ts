export type CreateCategory = {
  category_name: string;
  category_description: string | null;
  category_reference: string;
  custom_fields: Record<string, any>;
};

type FromSchemaConfiguration = {
  displayValue: string;
  type: "string" | "array";
  required?: boolean;
  placeholder?: string;
};

export type FormSchema = [string, FromSchemaConfiguration];

export const CategoryFormSchema: FormSchema[] = [
  [
    "category_reference",
    {
      type: "string",
      displayValue: "Category reference",
      required: true,
      placeholder: "Must be an unique value",
    },
  ],
  [
    "category_name",
    {
      type: "string",
      displayValue: "Category name",
      required: true,
      placeholder: "Name of the new category",
    },
  ],
  [
    "category_description",
    {
      type: "string",
      displayValue: "Category description",
      placeholder: "Description of the new category",
    },
  ],
];

export const CategoryProductAssignSchema: FormSchema[] = [
  [
    "product_ids",
    { type: "array", required: true, displayValue: "Product Id" },
  ],
];

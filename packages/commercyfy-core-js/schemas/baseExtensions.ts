export type CreateCustomFieldBase = {
  $object: "product" | "category" | "inventory" | "pricebook";
  name: string;
  description?: string;
  mandatory: boolean;
};

export type CreateCustomStringField = CreateCustomFieldBase & {
  type: "string";
  min_len: number;
  max_len: number;
};

export type CreateCustomIntField = CreateCustomFieldBase & { type: "int" };

export type CreateCustomField = CreateCustomStringField | CreateCustomIntField;

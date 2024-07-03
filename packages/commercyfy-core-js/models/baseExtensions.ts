export type ObjectType = "product" | "category" | "inventory" | "pricebook";
export type BaseExtension = {
  id: string;
  $object: ObjectType;
  $type: "int" | "string";
  name: string;
  mandatory: boolean;
  description?: string;

  // could only available if the extension field is of type string
  max_len?: number;
  min_len?: number;
};

export type GetBaseExtensions = BaseExtension[];

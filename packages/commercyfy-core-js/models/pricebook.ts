export type GetPricebookRecord = {
  id: string;
  pricebook_id: string;
  product_id: string;
  price: number;
};

export type GetPricebook = {
  id: string;
  pricebook_name: string;
  pricebook_reference: string;
  pricebook_currency_code: string;
  records: GetPricebookRecord[];
  custom_fields: Record<string, any>;
};

export type GetPricebooks = Omit<GetPricebook, "custom_fields" | "records">[];

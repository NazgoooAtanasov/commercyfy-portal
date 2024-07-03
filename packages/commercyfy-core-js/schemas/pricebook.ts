export type CreatePricebookRecord = {
  pricebook_id: string;
  product_id: string;
  price: number;
};

export type CreatePricebook = {
  pricebook_name: string;
  pricebook_reference: string;
  pricebook_currency_code: string;
  custom_fields: Record<string, any>;
};

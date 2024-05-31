export type CreateInventoryRecord = {
  product_id: string;
  inventory_id: string;
  allocation: number;
};

export type CreateInventory = {
  inventory_reference: string;
  inventory_name: string;
  custom_fields: Record<string, any>;
};

export type GetInventoryRecord = {
  id: string;
  product_id: string;
  inventory_id: string;
  allocation: number;
};

export type GetInventory = {
  id: string;
  inventory_name: string;
  inventory_reference: string;
  records: GetInventoryRecord[];
  custom_fields: Record<string, any>;
};

export type GetInventories = Omit<GetInventory, "records" | "custom_fields">[];

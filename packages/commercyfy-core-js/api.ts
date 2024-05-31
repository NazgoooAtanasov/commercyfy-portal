import type {
  BaseExtension,
  GetBaseExtensions,
  GetCategories,
  GetCategory,
  GetInventories,
  GetInventory,
  GetInventoryRecord,
  GetPricebook,
  GetPricebookRecord,
  GetPricebooks,
  GetProduct,
  ObjectType,
  PortalUser,
} from "./models";
import type {
  CreateProduct,
  CreateProductImage,
  CreateCategory,
  CreateInventory,
  CreateInventoryRecord,
  CreatePricebook,
  CreatePricebookRecord,
  CreatePortalUser,
  CreateCustomField,
} from "./schemas";

export type CommercyfyError = { error: string };
export type CommercyfyResponse<T> = Promise<T | CommercyfyError>;
export type CommercyfyEntryResponse = { id: string };
export type CommercyfyAuthResponse = { jwt: string };

export interface CommercyfyCoreActions {
  getCategories(): CommercyfyResponse<GetCategories>;
  getCategory(id: string): CommercyfyResponse<GetCategory>;
  createCategory(
    categorySchema: CreateCategory,
  ): CommercyfyResponse<CommercyfyEntryResponse>;

  getProduct(id: string): CommercyfyResponse<GetProduct>;
  createProduct(
    productSchema: CreateProduct,
  ): CommercyfyResponse<CommercyfyEntryResponse>;
  createProductImage(
    id: string,
    productImageSchema: CreateProductImage,
  ): CommercyfyResponse<CommercyfyEntryResponse>;

  getInventories(): CommercyfyResponse<GetInventories>;
  getInventory(id: string): CommercyfyResponse<GetInventory>;
  getInventoryRecord(
    inventoryId: string,
    productId: string,
  ): CommercyfyResponse<GetInventoryRecord>;
  createInventory(
    inventorySchema: CreateInventory,
  ): CommercyfyResponse<CommercyfyEntryResponse>;
  createInventoryRecord(
    inventoryRecordSchema: CreateInventoryRecord,
  ): CommercyfyResponse<CommercyfyEntryResponse>;

  getPricebooks(): CommercyfyResponse<GetPricebooks>;
  getPricebook(id: string): CommercyfyResponse<GetPricebook>;
  getPricebookRecord(
    pricebookId: string,
    productId: string,
  ): CommercyfyResponse<GetPricebookRecord>;
  createPricebook(
    pricebookSchema: CreatePricebook,
  ): CommercyfyResponse<CommercyfyEntryResponse>;
  createPricebookRecord(
    pricebookRecordSchema: CreatePricebookRecord,
  ): CommercyfyResponse<CommercyfyEntryResponse>;

  getExtensions(objectType: ObjectType): CommercyfyResponse<GetBaseExtensions>;
  createExtension(
    extensionSchema: CreateCustomField,
  ): CommercyfyResponse<CommercyfyEntryResponse>;

  getPrortalUser(id: string): CommercyfyResponse<PortalUser>;
  createPrortalUser(
    portalUserSchema: CreatePortalUser,
  ): CommercyfyResponse<CommercyfyEntryResponse>;
  signinPortalUser(
    email: string,
    password: string,
  ): CommercyfyResponse<CommercyfyAuthResponse>;
}

export function commercyfyUnwrap<T>(
  response: T | CommercyfyError,
): response is CommercyfyError {
  return (response as CommercyfyError).error !== undefined;
}

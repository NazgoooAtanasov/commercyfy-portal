import type {
  CommercyfyAuthResponse,
  CommercyfyCoreActions,
  CommercyfyEntryResponse,
  CommercyfyError,
  CommercyfyResponse,
} from "./api";
import type {
  GetCategories,
  GetCategory,
  GetProduct,
  GetInventories,
  GetInventory,
  GetInventoryRecord,
  GetPricebooks,
  GetPricebook,
  GetPricebookRecord,
  PortalUser,
  ObjectType,
  GetBaseExtensions,
  GetProducts,
} from "./models";
import type {
  CreateCategory,
  CreateProduct,
  CreateProductImage,
  CreateInventory,
  CreateInventoryRecord,
  CreatePricebook,
  CreatePricebookRecord,
  CreatePortalUser,
  CreateCustomField,
} from "./schemas";

export class CommercyfyCoreConnection implements CommercyfyCoreActions {
  constructor(
    private apiUrl: string,
    private authToken: string,
  ) {}

  private url(path: string): URL {
    return new URL(`${this.apiUrl}${path}`);
  }

  private genHeaders(): Headers {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.authToken}`);
    return headers;
  }

  private async send<T>(
    path: string,
    data?: T,
    method: "GET" | "POST" = "GET",
  ): CommercyfyResponse<any> {
    try {
      const headers = this.genHeaders();

      if (method === "POST") {
        headers.append("Content-Type", "application/json");
      }

      const options: Record<string, any> = {
        headers: headers,
        method: method,
      };

      if (method === "POST" && data) {
        options.body = JSON.stringify(data);
      }

      const request = await fetch(this.url(path), options);
      if (request.status !== 200) {
        if (request.status === 401) {
          return { error: "Unauthorized" } satisfies CommercyfyError;
        }
      }

      return request.json();
    } catch (error) {
      return {
        error: "Networking error. Try again.",
      } satisfies CommercyfyError;
    }
  }

  getCategories(): CommercyfyResponse<GetCategories> {
    return this.send("/categories");
  }

  getCategory(id: string): CommercyfyResponse<GetCategory> {
    return this.send(`/categories/${id}`);
  }

  createCategory(
    categorySchema: CreateCategory,
  ): CommercyfyResponse<CommercyfyEntryResponse> {
    return this.send("/categories", categorySchema, "POST");
  }

  assignProducts(id: string, productIds: string[]): CommercyfyResponse<void> {
    return this.send(
      "/categories/assign/products",
      { category_id: id, product_ids: productIds },
      "POST",
    );
  }

  getProducts(): CommercyfyResponse<GetProducts> {
    return this.send("/products");
  }

  getProduct(
    id: string,
    extend?: { categories: boolean; inventories: boolean },
  ): CommercyfyResponse<GetProduct> {
    const searchParams = new URLSearchParams();
    if (extend?.categories) {
      searchParams.append("extend", "categories");
    }

    if (extend?.inventories) {
      const extend = searchParams.get("extend");
      if (!extend) {
        searchParams.append("extend", "categories");
      } else {
        searchParams.set("extend", `${extend},inventories`);
      }
    }

    return this.send(
      `/product/${id}${searchParams.size > 0 ? "?" + searchParams.toString() : ""}`,
    );
  }

  createProduct(
    productSchema: CreateProduct,
  ): CommercyfyResponse<CommercyfyEntryResponse> {
    return this.send("/product", productSchema, "POST");
  }

  createProductImage(
    id: string,
    productImageSchema: CreateProductImage,
  ): CommercyfyResponse<CommercyfyEntryResponse> {
    return this.send(`/product/${id}/images`, productImageSchema, "POST");
  }

  getInventories(): CommercyfyResponse<GetInventories> {
    return this.send("/inventories");
  }

  getInventory(id: string): CommercyfyResponse<GetInventory> {
    return this.send(`/inventory/${id}`);
  }

  getInventoryRecord(
    inventoryId: string,
    productId: string,
  ): CommercyfyResponse<GetInventoryRecord> {
    return this.send(`/inventory/${inventoryId}/record/${productId}`);
  }

  createInventory(
    inventorySchema: CreateInventory,
  ): CommercyfyResponse<CommercyfyEntryResponse> {
    return this.send("/inventory", inventorySchema, "POST");
  }

  createInventoryRecord(
    inventoryRecordSchema: CreateInventoryRecord,
  ): CommercyfyResponse<CommercyfyEntryResponse> {
    return this.send("/inventory/record", inventoryRecordSchema, "POST");
  }

  getPricebooks(): CommercyfyResponse<GetPricebooks> {
    return this.send("/pricebooks");
  }

  getPricebook(id: string): CommercyfyResponse<GetPricebook> {
    return this.send(`/pricebooks/${id}`);
  }

  getPricebookRecord(
    pricebookId: string,
    productId: string,
  ): CommercyfyResponse<GetPricebookRecord> {
    return this.send(`/pricebooks/${pricebookId}/record/${productId}`);
  }

  createPricebook(
    pricebookSchema: CreatePricebook,
  ): CommercyfyResponse<CommercyfyEntryResponse> {
    return this.send("/pricebook", pricebookSchema, "POST");
  }

  createPricebookRecord(
    pricebookRecordSchema: CreatePricebookRecord,
  ): CommercyfyResponse<CommercyfyEntryResponse> {
    return this.send("/pricebook/record", pricebookRecordSchema, "POST");
  }

  getExtensions(objectType: ObjectType): CommercyfyResponse<GetBaseExtensions> {
    return this.send(`/extensions/${objectType}`);
  }

  createExtension(
    extensionSchema: CreateCustomField,
  ): CommercyfyResponse<CommercyfyEntryResponse> {
    return this.send("/extensions", extensionSchema, "POST");
  }

  getPrortalUser(id: string): CommercyfyResponse<PortalUser> {
    return this.send(`/portal/user/${id}`);
  }

  createPrortalUser(
    portalUserSchema: CreatePortalUser,
  ): CommercyfyResponse<CommercyfyEntryResponse> {
    return this.send("/portal/user", portalUserSchema, "POST");
  }

  signinPortalUser(
    email: string,
    password: string,
  ): CommercyfyResponse<CommercyfyAuthResponse> {
    return this.send("/portal/signin", { email, password }, "POST");
  }
}

export type ErrorMessage = {
  error_message: string;
};

type ProductImage = {};

export type Product = {
  id: string;
  product_name: string;
  product_description: string;
  product_color: string | undefined;
  product_images: ProductImage[] | undefined;
};

export type Category = {
  id: string;
  category_name: string;
  category_description: string | undefined;
  category_reference: string;
  products: Product[] | undefined;
};

type Endpoint = "/categories/list" | "/categories/{slug}";
type Method = "GET";

interface Commercyfy {
  getCategories(): Promise<Category[] | ErrorMessage>;
  getCategory(id: string): Promise<Category | ErrorMessage>;
}

export class CommercyfyConn implements Commercyfy {
  constructor(
    private address: string,
    private auth: string,
  ) {}

  private genHeaders(): Record<string, string> {
    return { Authorization: this.auth };
  }

  private async handledFetch<T>(
    endpoint: Endpoint,
    method: Method,
    data?: Record<string, any>,
  ): Promise<T | ErrorMessage> {
    try {
      const options: Record<string, any> = {
        method,
        headers: this.genHeaders(),
      };
      if (options.method !== "GET") {
        options.body = JSON.stringify(data);
      }

      const result = await fetch(`${this.address}${endpoint}`, options);
      if (!result.ok) {
        return (await result.json()) as ErrorMessage;
      }
      return result.json() as T;
    } catch (err) {
      return { error_message: err } as ErrorMessage;
    }
  }

  async getCategories(): Promise<Category[] | ErrorMessage> {
    const result = await this.handledFetch<Category[]>(
      "/categories/list",
      "GET",
    );
    return result;
  }

  async getCategory(id: string): Promise<Category | ErrorMessage> {
    const result = await this.handledFetch<Category>(
      "/categories/{slug}".replace("{slug}", id) as Endpoint,
      "GET",
    );
    return result;
  }
}

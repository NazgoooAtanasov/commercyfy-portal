<script lang="ts">
  import type { Product } from "commercyfy-core-js";
  export let product: Product;
</script>

<div class="border-b"><div class="m-4 h-[65px] w-[65px] bg-silver"></div></div>
<div class="col-span-4 border-b pb-8 pt-8 text-blue-900">
  <a href={`/products/${product.id}`}>{product.id}</a>
</div>
<div class="col-span-3 border-b pb-8 pt-8">{product.product_name}</div>
<div class="col-span-2 border-b pb-8 pt-8">{product.product_color}</div>
<div class="col-span-2 border-b pb-8 pt-8"></div>

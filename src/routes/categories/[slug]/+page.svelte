<script lang="ts">
  import CreateView from "$lib/components/CreateView.svelte";
  import DetailView from "$lib/components/DetailView.svelte";
  import Table from "$lib/components/Table.svelte";
  import { CategoryProductAssignSchema } from "$lib/formSchemas/index.js";
  export let data;
</script>

<DetailView headerName="Category properties" object={data.category} />

<Table
  tableName="Products in category"
  headerEntries={["ID", "Product name", "Product Description", "Product color"]}
>
  {#each data.category.products ?? [] as product}
    <div class="row">
      <a href="/product/{product.id}">{product.id}</a>
      <div>{product.product_name}</div>
      <div>{product.product_description}</div>
      <div>{product.product_color}</div>
    </div>
  {/each}
</Table>

<CreateView
  triggerText="Assign product"
  method="POST"
  schema={CategoryProductAssignSchema}
  entry="Product assignement"
/>

<style>
</style>

<script lang="ts">
  import CreateView from "$lib/components/CreateView.svelte";
  import Flyout from "$lib/components/Flyout.svelte";
  import Table from "$lib/components/Table.svelte";
  import { CategoryFormSchema } from "$lib/formSchemas/index.js";
  import type { Category } from "commercyfy-core-js";

  export let data;
  let categoryProductPreview: Category | null = null;

  function setProductPreview(category: Category) {
    if (categoryProductPreview && categoryProductPreview.id === category.id) {
      categoryProductPreview = null;
    } else {
      categoryProductPreview = category;
    }
  }
</script>

<Table tableName="Categories" headerEntries={["ID", "Description"]}>
  {#each data.categories as category}
    <button on:click={() => setProductPreview(category)} class="row">
      <div>
        <a href="/categories/{category.id}">{category.category_reference}</a>
      </div>
      <div>{category.category_description}</div>
    </button>
  {/each}
</Table>

<Flyout visible={categoryProductPreview !== null}>
  <h2 slot="slider-title">Products</h2>

  <Table tableName="Products in category" headerEntries={["ID", "Description"]}>
    {#each categoryProductPreview?.products || [] as product}
      <a href="/product/{product.id}" class="row">
        <div><a href="/product/{product.id}">{product.id}</a></div>
        <div>{product.product_description}</div>
      </a>
    {/each}
  </Table>
</Flyout>

<CreateView
  triggerText="+"
  method="POST"
  schema={CategoryFormSchema}
  entry="Category"
/>

<style>
  button {
    text-align: left;
  }
</style>

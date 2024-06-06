<script lang="ts">
  import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";
  import DetailView from "$lib/components/DetailView.svelte";
  import Dropdown from "$lib/components/Dropdown.svelte";
  import Table from "$lib/components/Table.svelte";
  export let data;
</script>

<DetailView object={data.category} />

<Dropdown text="Proucts in category">
  <div class="assign-products">
    <Button
      displayValue="Assign Products"
      href="/categories/{$page.params.slug}/assign"
    />
  </div>
  <Table
    headerEntries={[
      "ID",
      "Product name",
      "Product Description",
      "Product color",
    ]}
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
</Dropdown>

<style>
  .assign-products {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
</style>

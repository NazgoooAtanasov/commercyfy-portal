<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import DetailView from "$lib/components/DetailView.svelte";
  import Dropdown from "$lib/components/Dropdown.svelte";
  import Table from "$lib/components/Table.svelte";
  import { page } from "$app/stores";
  export let data;
</script>

<DetailView object={data.pricebook} />

<Dropdown text="Records">
  <div class="assign-products">
    <Button
      displayValue="Assign Products"
      href="/pricebooks/{$page.params.slug}/record"
    />
  </div>
  <Table headerEntries={["Price", "Product id"]}>
    {#each data.pricebook.records as record}
      <div class="row">
        <div>{record.price}</div>
        <a href="/products/{record.product_id}">{record.product_id}</a>
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

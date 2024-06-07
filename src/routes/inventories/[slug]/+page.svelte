<script lang="ts">
  import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";
  import DetailView from "$lib/components/DetailView.svelte";
  import Dropdown from "$lib/components/Dropdown.svelte";
  import Table from "$lib/components/Table.svelte";

  export let data;
</script>

<DetailView object={data.inventory} />
<Dropdown text="Records">
  <div class="assign-products">
    <Button
      displayValue="Create record"
      href="/inventories/{$page.params.slug}/record"
    />
  </div>
  <Table headerEntries={["Allocation", "Product id"]}>
    {#each data.inventory.records as record}
      <div class="row">
        <div>{record.allocation}</div>
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

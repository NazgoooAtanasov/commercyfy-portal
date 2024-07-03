<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Table from "$lib/components/Table.svelte";
  export let data;
</script>

<Table
  tableName="Inventories"
  headerEntries={["Inventory reference", "Inventory name"]}
>
  <div slot="table-head">
    <Button displayValue="Create" href="/inventories/create" />
  </div>
  {#each data.inventories as inventory}
    <div class="row">
      <div>
        <a href="/inventories/{inventory.id}">{inventory.inventory_reference}</a
        >
      </div>
      <div>{inventory.inventory_name}</div>
    </div>
  {/each}
</Table>
